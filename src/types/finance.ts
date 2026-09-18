export type TransactionType = 'income' | 'expense';

export type AccountType = 'personal' | 'business';

export type BusinessBudgetMode = 'bulk' | 'plan';

export interface AccountProfile {
  id: string; // 'personal' for default personal profile, auto-generated UUID for businesses
  type: AccountType;
  name: string; // Non-empty, unique display name across accounts
  currency: string; // ISO code, e.g. 'IQD' | 'USD'
  color: string; // Color accent (e.g. '#007AFF', '#FF9500', '#34C759', '#AF52DE')
  icon: string; // Identifier for icon badge (e.g. 'User', 'Building', 'Briefcase', 'Store', 'Cpu')
  createdAt: string;
  description?: string;
  allocatedBudget?: number; // Total allocated operating budget
  budgetMode?: BusinessBudgetMode; // 'bulk' (Direct Bulk Allocation) | 'plan' (Step-by-Step CPM Plan)
  steps?: PlanStep[]; // Optional Work Breakdown Structure & CPM Activity Steps for business plan
}

export interface BusinessAccount extends AccountProfile {
  type: 'business';
  budgetMode?: BusinessBudgetMode;
  steps?: PlanStep[];
}

export type BusinessExpenseType = 'opex' | 'capex';
export type ExpenseType = BusinessExpenseType;

export interface TransactionItem {
  id: string;
  accountId?: string; // Bound account ID (defaults to 'personal' if undefined)
  type: TransactionType;
  amount: number;
  currency: string;
  date: string; // ISO string or YYYY-MM-DD
  category: string;
  source: string;
  itemDescription: string;
  notes: string;
  createdAt: string;
  updatedAt: string;

  // Optional Business Step Tagging
  stepId?: string; // Associated operational step in business plan breakdown

  // Deprecated Legacy Business Accounting Fields (retained for backward compatibility)
  expenseType?: BusinessExpenseType;
  isTaxDeductible?: boolean;
  receiptNote?: string;
  projectCode?: string;
  clientContract?: string;

  // Atomic Cross-Account Linked Transfer Fields
  linkedTransferId?: string; // ID of paired cross-account transfer
  transferType?: 'transfer_in' | 'transfer_out';
  counterpartAccountId?: string; // The other account involved in transfer
}

// BusinessTransaction type alias
export type BusinessTransaction = TransactionItem & {
  accountId: string;
};

export type InvoiceType = 'incoming' | 'outgoing'; // 'incoming' (Money to Receive / Client Bill) | 'outgoing' (Money to Pay / Vendor Bill)
export type BusinessInvoiceStatus = 'not_submitted' | 'submitted' | 'approved' | 'settled';
export type TaxType = 'add' | 'deduct'; // Direction: added on top or deducted from total

export interface BusinessInvoice {
  id: string; // Unique UUID
  accountId: string; // Target business account ID
  type: InvoiceType; // 'incoming' (Money to Receive / Client Bill) | 'outgoing' (Money to Pay / Vendor Bill)
  invoiceNumber: string; // Unique alphanumeric invoice code (e.g., INV-2026-001)
  title: string; // Name / short title of the invoice
  amount: number; // Base numerical amount
  currency: 'IQD' | 'USD'; // toggleable per invoice
  date: string; // Invoice creation / issue date (YYYY-MM-DD)
  estimatedDate: string; // Expected date to be paid or received (YYYY-MM-DD)
  taxPercent: number; // Custom arbitrary percentage (e.g. 7.5)
  taxType: TaxType; // Direction: added on top or deducted from total
  taxAmount: number; // Calculated tax amount
  totalAmount: number; // Final calculated amount affecting ledger/budget
  description: string; // Free-text notes or deliverables description
  attachments?: string; // Base64 string or local file URI for supporting receipts, PDFs, or photos
  status: BusinessInvoiceStatus; // 'not_submitted' | 'submitted' | 'approved' | 'settled'
  linkedTransactionId?: string; // Atomic ledger transaction ID when settled
  createdAt: string;
  updatedAt: string;

  // Backward compatibility optional fields
  direction?: 'receivable' | 'payable';
  clientOrVendorName?: string;
  issueDate?: string;
  dueDate?: string;
  paidAt?: string | null;
  itemsSummary?: string;
  notes?: string;
  projectCode?: string;
}

// Legacy aliases
export type InvoiceItem = BusinessInvoice;
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | BusinessInvoiceStatus;
export type InvoiceDirection = 'receivable' | 'payable' | InvoiceType;

export interface LinkedTransfer {
  id: string;
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  currency: string;
  date: string;
  note?: string;
  sourceTransactionId: string;
  destinationTransactionId: string;
  createdAt: string;
}

export interface SimplifiedBusinessMetrics {
  allocatedBudget: number; // Total funding allocated/injected
  budgetSpent: number; // Total actual expenses deducted
  budgetRemaining: number; // allocatedBudget - budgetSpent
  budgetProgressPercent: number; // (budgetSpent / allocatedBudget) * 100%
  totalIncome: number; // All money brought in (revenue, settled incoming invoices, transfers in)
  totalExpenses: number; // All money paid out (vendor bills, settled outgoing invoices, expenses)
  netProfit: number; // totalIncome - totalExpenses
  pendingInflow: number; // Total money from approved/submitted incoming invoices
  pendingOutflow: number; // Total money from approved/submitted outgoing bills
  upcomingDueCount: number; // Invoices due within 7 to 14 days
  upcomingDueInvoices: BusinessInvoice[];
}

// Backward compatible BusinessMetrics
export interface BusinessMetrics extends SimplifiedBusinessMetrics {
  grossRevenue: number;
  operatingExpenses: number;
  capitalExpenditures: number;
  netOperatingProfit: number;
  netMarginPercent: number;
  liquidReserves: number;
  monthlyBurnRate: number;
  runwayMonths: number;
  totalReceivables: number;
  overdueReceivables: number;
  totalPayables: number;
  overduePayables: number;
  taxDeductibleTotal: number;
  projectMargins: ProjectMarginSummary[];
}

export interface ProjectMarginSummary {
  projectCode: string;
  revenue: number;
  expenses: number;
  netMargin: number;
  marginPercent: number;
  transactionCount: number;
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
