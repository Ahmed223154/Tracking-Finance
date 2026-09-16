export type TransactionType = 'income' | 'expense';

export interface TransactionItem {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  date: string; // ISO string
  category: string;
  source: string;
  itemDescription: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type PlanPriority = 'critical' | 'high' | 'medium' | 'low';

export type PlanStatus =
  | 'ahead'
  | 'onSchedule'
  | 'atRisk'
  | 'behind'
  | 'notFeasible'
  | 'completed'
  | 'paused'
  | 'suspended'
  | 'upcoming';

export type DependencyType = 'FS' | 'SS' | 'FF' | 'SF';

export type StepStatus = 'not_started' | 'in_progress' | 'completed' | 'stopped' | 'suspended';

export interface StepScheduleAdjustment {
  previousStartDate: string;
  newStartDate: string;
  previousDuration: number;
  newDuration: number;
  reason?: string;
  adjustedAt: string;
}

export interface StepRelationship {
  predecessorId: string;
  type: DependencyType; // FS (Finish-to-Start), SS (Start-to-Start), FF (Finish-to-Finish), SF (Start-to-Finish)
  lag?: number; // lag in days (positive or negative)
}

export interface PlanStep {
  id: string;
  title: string;
  targetAmount: number;
  allocatedAmount: number;
  progress?: number; // Computed as (allocatedAmount / targetAmount) * 100 (capped at 100%)
  completedAmount?: number;
  startDate: string; // YYYY-MM-DD or ISO
  duration: number; // Duration in days (>= 1)
  endDate?: string; // computed end date (startDate + duration)
  predecessors: StepRelationship[];
  status: StepStatus;
  suspendedUntil?: string | null; // ISO date or timestamp indicating when a suspended step resumes
  stoppedAt?: string | null; // Timestamp when step execution was manually halted
  scheduleHistory?: StepScheduleAdjustment[]; // Audit tracking original vs rescheduled dates
  notes?: string;
  order?: number;
  isCritical?: boolean; // Critical Path flag
}

export interface PlanItem {
  id: string;
  name: string;
  targetAmount: number;
  allocatedAmount: number;
  currency: string;
  startDate?: string | null; // ISO string or YYYY-MM-DD
  targetDate: string | null; // ISO string or null
  priority: PlanPriority;
  plannedMonthlyAmount: number; // Target monthly savings commitment
  planDescription: string;
  isCompleted: boolean;
  isPaused?: boolean; // Plan Lifecycle: Postpone / Pause
  pausedAt?: string | null;
  suspendedUntil?: string | null; // Timed Suspension (e.g. ISO string or YYYY-MM-DD)
  suspensionDurationLabel?: string | null; // e.g. "7 Days", "1 Month", "3 Months", "Custom Date"
  steps?: PlanStep[]; // Optional Work Breakdown Structure & CPM Activity Steps
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

// Backwards compatibility alias for existing code
export type GoalItem = PlanItem;

export interface BudgetItem {
  id: string;
  category: string;
  monthlyLimit: number;
  createdAt: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  type: 'income_source' | 'expense_category';
  isDefault: boolean;
}

export type TimeRange = 
  | 'thisWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'last3Months'
  | 'last6Months'
  | 'thisYear'
  | 'allTime';

export interface PlanMilestones {
  m25: boolean;
  m50: boolean;
  m75: boolean;
  m100: boolean;
}

export interface PlanAnalysis {
  status: PlanStatus;
  statusTitle: string;
  statusBadgeColor: string; // Tailwind class
  explanation: string;
  requiredMonthlySavings: number;
  monthsRemaining: number;
  varianceMonthly: number; // actual/capacity vs planned
  projectedCompletionDate: string | null;
  projectedMonths: number;
  milestones: PlanMilestones;
  shortfallMonthly?: number;
  extensionMonths?: number;
  isPaused?: boolean;
  isUpcoming?: boolean;
  expectedContributionToDate?: number;
  elapsedMonthsFromStart?: number;
  startPacingVariance?: number;
}

// Backwards compatibility alias
export type GoalAnalysis = PlanAnalysis;

export interface FinancialCapacityAnalysis {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyCapacity: number; // monthly net cash flow (income - expense)
  totalPlannedMonthlyCommitment: number;
  capacityVariance: number; // monthlyCapacity - totalPlannedMonthlyCommitment
  healthStatus: 'healthy' | 'tight' | 'overcommitted';
  totalTargetAmount: number;
  totalAllocatedAmount: number;
  overallProgressPercent: number;
  priorityDistribution: {
    critical: { count: number; plannedMonthly: number; allocated: number; target: number };
    high: { count: number; plannedMonthly: number; allocated: number; target: number };
    medium: { count: number; plannedMonthly: number; allocated: number; target: number };
    low: { count: number; plannedMonthly: number; allocated: number; target: number };
  };
  recommendedAllocations: {
    planId: string;
    planName: string;
    priority: PlanPriority;
    recommendedMonthly: number;
  }[];
  actionItems: {
    id: string;
    type: 'critical' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
  }[];
}

export interface WhatIfResult {
  adjustedIncome: number;
  adjustedExpenses: number;
  newCapacity: number;
  plansProjected: {
    planId: string;
    planName: string;
    originalMonths: number;
    newMonths: number;
    monthsSaved: number;
    isFeasible: boolean;
  }[];
}

export interface IndividualPlanWhatIfResult {
  planId: string;
  planName: string;
  originalTargetAmount: number;
  simulatedTargetAmount: number;
  originalPlannedMonthly: number;
  simulatedMonthlyAllocation: number;
  extraMonthlySavings: number;
  totalSimulatedMonthlyRate: number;
  originalTargetDate: string | null;
  simulatedTargetDate: string | null;
  originalForecastDate: string;
  simulatedForecastDate: string;
  originalMonths: number;
  simulatedMonths: number;
  monthsGained: number; // positive if finished earlier
  monthsDelayed: number; // positive if delayed
  simulatedRemaining: number;
  requiredMonthlySavings: number;
  varianceMonthly: number; // totalSimulatedMonthlyRate - requiredMonthlySavings
  feasibilityStatus: 'ahead' | 'onSchedule' | 'atRisk' | 'behind' | 'notFeasible';
  feasibilityTitle: string;
  feasibilityBadgeColor: string;
  feasibilityExplanation: string;
}
