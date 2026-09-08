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
  | 'completed';

export interface PlanItem {
  id: string;
  name: string;
  targetAmount: number;
  allocatedAmount: number;
  currency: string;
  targetDate: string | null; // ISO string or null
  priority: PlanPriority;
  plannedMonthlyAmount: number; // Target monthly savings commitment
  planDescription: string;
  isCompleted: boolean;
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
