import {
  TransactionItem,
  PlanItem,
  GoalItem,
  PlanAnalysis,
  GoalAnalysis,
  FinancialCapacityAnalysis,
  WhatIfResult,
  IndividualPlanWhatIfResult,
  PlanPriority,
} from '../types/finance';
import { CurrencyFormatter } from './currencyFormatter';

export class FinancialEngine {
  static totalIncome(transactions: TransactionItem[]): number {
    return transactions
      .filter(t => t.type.toLowerCase() === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
  }

  static totalExpenses(transactions: TransactionItem[]): number {
    return transactions
      .filter(t => t.type.toLowerCase() === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
  }

  static actualBalance(transactions: TransactionItem[]): number {
    return this.totalIncome(transactions) - this.totalExpenses(transactions);
  }

  static totalAllocatedToPlans(plans: PlanItem[]): number {
    return plans
      .filter(p => !p.isCompleted)
      .reduce((acc, p) => acc + (p.allocatedAmount || 0), 0);
  }

  // Backwards compatibility alias
  static totalAllocatedToGoals(goals: GoalItem[]): number {
    return this.totalAllocatedToPlans(goals);
  }

  static unallocatedBalance(transactions: TransactionItem[], plans: PlanItem[]): number {
    return this.actualBalance(transactions) - this.totalAllocatedToPlans(plans);
  }

  static monthlyIncome(transactions: TransactionItem[], targetDate: Date = new Date()): number {
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();
    return transactions
      .filter(t => {
        const d = new Date(t.date);
        return t.type.toLowerCase() === 'income' &&
          d.getFullYear() === targetYear &&
          d.getMonth() === targetMonth;
      })
      .reduce((acc, t) => acc + t.amount, 0);
  }

  static monthlyExpenses(transactions: TransactionItem[], targetDate: Date = new Date()): number {
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();
    return transactions
      .filter(t => {
        const d = new Date(t.date);
        return t.type.toLowerCase() === 'expense' &&
          d.getFullYear() === targetYear &&
          d.getMonth() === targetMonth;
      })
      .reduce((acc, t) => acc + t.amount, 0);
  }

  static monthlySavings(transactions: TransactionItem[], targetDate: Date = new Date()): number {
    return this.monthlyIncome(transactions, targetDate) - this.monthlyExpenses(transactions, targetDate);
  }

  static historicalMonthlyAverageSavings(transactions: TransactionItem[]): number {
    if (transactions.length === 0) return 0;
    const monthlyBuckets: { [key: string]: { income: number; expense: number } } = {};

    transactions.forEach(t => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      if (!monthlyBuckets[key]) {
        monthlyBuckets[key] = { income: 0, expense: 0 };
      }
      if (t.type.toLowerCase() === 'income') {
        monthlyBuckets[key].income += t.amount;
      } else {
        monthlyBuckets[key].expense += t.amount;
      }
    });

    const months = Object.values(monthlyBuckets);
    if (months.length === 0) return 0;
    const totalNet = months.reduce((acc, m) => acc + (m.income - m.expense), 0);
    return Math.max(0, totalNet / months.length);
  }

  static analyzePlan(
    plan: PlanItem,
    unallocatedBalance: number,
    historicalAvgSavings: number,
    monthlyCapacity?: number
  ): PlanAnalysis {
    const remainingAmount = Math.max(0, plan.targetAmount - (plan.allocatedAmount || 0));
    const effectiveCapacity = monthlyCapacity !== undefined ? monthlyCapacity : historicalAvgSavings;

    const milestones = {
      m25: plan.targetAmount > 0 ? (plan.allocatedAmount / plan.targetAmount) >= 0.25 : false,
      m50: plan.targetAmount > 0 ? (plan.allocatedAmount / plan.targetAmount) >= 0.50 : false,
      m75: plan.targetAmount > 0 ? (plan.allocatedAmount / plan.targetAmount) >= 0.75 : false,
      m100: plan.targetAmount > 0 ? (plan.allocatedAmount / plan.targetAmount) >= 1.00 : false,
    };

    if (plan.isCompleted || remainingAmount <= 0) {
      return {
        status: 'completed',
        statusTitle: 'Completed',
        statusBadgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
        explanation: 'Plan fully achieved and completed.',
        requiredMonthlySavings: 0,
        monthsRemaining: 0,
        varianceMonthly: 0,
        projectedCompletionDate: plan.completedAt || new Date().toISOString(),
        projectedMonths: 0,
        milestones,
      };
    }

    // Plan Lifecycle: Postpone / Pause
    if (plan.isPaused) {
      return {
        status: 'paused',
        statusTitle: 'Paused',
        statusBadgeColor: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700',
        explanation: 'Plan is temporarily paused. Monthly savings commitments and allocation pressure are on hold.',
        requiredMonthlySavings: 0,
        monthsRemaining: 0,
        varianceMonthly: 0,
        projectedCompletionDate: null,
        projectedMonths: 0,
        milestones,
        isPaused: true,
      };
    }

    const now = new Date();
    let elapsedMonthsFromStart: number | undefined;
    let expectedContributionToDate: number | undefined;
    let startPacingVariance: number | undefined;

    // Explicit Start Date Evaluation
    if (plan.startDate) {
      const start = new Date(plan.startDate);
      const diffMonths = (start.getFullYear() - now.getFullYear()) * 12 + (start.getMonth() - now.getMonth());
      if (diffMonths > 0) {
        // Future start date -> Scheduled / Upcoming
        return {
          status: 'upcoming',
          statusTitle: 'Upcoming',
          statusBadgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800',
          explanation: `Scheduled to start in ${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}. Monthly allocation pressure is deferred until start date.`,
          requiredMonthlySavings: plan.plannedMonthlyAmount || 0,
          monthsRemaining: plan.targetDate
            ? Math.max(1, (new Date(plan.targetDate).getFullYear() - start.getFullYear()) * 12 + (new Date(plan.targetDate).getMonth() - start.getMonth()))
            : 12,
          varianceMonthly: 0,
          projectedCompletionDate: plan.targetDate || null,
          projectedMonths: 0,
          milestones,
          isUpcoming: true,
        };
      } else {
        // Past or current start date
        elapsedMonthsFromStart = Math.max(0, -diffMonths);
        expectedContributionToDate = (elapsedMonthsFromStart + 1) * (plan.plannedMonthlyAmount || 0);
        startPacingVariance = (plan.allocatedAmount || 0) - expectedContributionToDate;
      }
    }

    // No target deadline set
    if (!plan.targetDate) {
      const projectedMonths = effectiveCapacity > 0 ? Math.ceil(remainingAmount / effectiveCapacity) : 12;
      const projDate = new Date();
      projDate.setMonth(projDate.getMonth() + projectedMonths);

      if (unallocatedBalance >= remainingAmount) {
        return {
          status: 'ahead',
          statusTitle: 'Achievable Now',
          statusBadgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
          explanation: 'Fully fundable with current available unallocated cash.',
          requiredMonthlySavings: plan.plannedMonthlyAmount || (remainingAmount / Math.max(1, projectedMonths)),
          monthsRemaining: projectedMonths,
          varianceMonthly: (plan.plannedMonthlyAmount || 0) - (remainingAmount / Math.max(1, projectedMonths)),
          projectedCompletionDate: projDate.toISOString(),
          projectedMonths,
          milestones,
          expectedContributionToDate,
          elapsedMonthsFromStart,
          startPacingVariance,
        };
      } else {
        return {
          status: 'onSchedule',
          statusTitle: 'In Progress',
          statusBadgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
          explanation: `Projected completion in ${projectedMonths} months at average savings capacity.`,
          requiredMonthlySavings: plan.plannedMonthlyAmount || (remainingAmount / Math.max(1, projectedMonths)),
          monthsRemaining: projectedMonths,
          varianceMonthly: 0,
          projectedCompletionDate: projDate.toISOString(),
          projectedMonths,
          milestones,
          expectedContributionToDate,
          elapsedMonthsFromStart,
          startPacingVariance,
        };
      }
    }

    // Target Date Provided
    const target = new Date(plan.targetDate);
    const monthsDiff = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
    const monthsRemaining = Math.max(1, monthsDiff);
    const requiredMonthlySavings = remainingAmount / monthsRemaining;

    // Projected timeline based on monthly capacity or planned rate
    const savingRate = Math.max(1, plan.plannedMonthlyAmount > 0 ? plan.plannedMonthlyAmount : effectiveCapacity);
    const projectedMonths = Math.ceil(remainingAmount / savingRate);
    const projDate = new Date();
    projDate.setMonth(projDate.getMonth() + projectedMonths);

    // Variance = Planned monthly allocation vs Required monthly allocation
    const varianceMonthly = (plan.plannedMonthlyAmount || 0) - requiredMonthlySavings;

    // Evaluate Plan Status
    if (plan.plannedMonthlyAmount >= requiredMonthlySavings * 1.15 || (effectiveCapacity >= requiredMonthlySavings * 1.25 && plan.plannedMonthlyAmount >= requiredMonthlySavings)) {
      return {
        status: 'ahead',
        statusTitle: 'Ahead of Schedule',
        statusBadgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
        explanation: `Pacing ahead of target deadline! Required: ${CurrencyFormatter.format(requiredMonthlySavings)}/mo.`,
        requiredMonthlySavings,
        monthsRemaining,
        varianceMonthly,
        projectedCompletionDate: projDate.toISOString(),
        projectedMonths,
        milestones,
        expectedContributionToDate,
        elapsedMonthsFromStart,
        startPacingVariance,
      };
    } else if (plan.plannedMonthlyAmount >= requiredMonthlySavings || (effectiveCapacity >= requiredMonthlySavings && Math.abs(varianceMonthly) < requiredMonthlySavings * 0.15)) {
      return {
        status: 'onSchedule',
        statusTitle: 'On Schedule',
        statusBadgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
        explanation: `Allocations match the timeline smoothly (${CurrencyFormatter.format(requiredMonthlySavings)}/mo required).`,
        requiredMonthlySavings,
        monthsRemaining,
        varianceMonthly,
        projectedCompletionDate: projDate.toISOString(),
        projectedMonths,
        milestones,
        expectedContributionToDate,
        elapsedMonthsFromStart,
        startPacingVariance,
      };
    } else if (effectiveCapacity >= requiredMonthlySavings * 0.7 || plan.plannedMonthlyAmount >= requiredMonthlySavings * 0.75) {
      const shortfallMonthly = requiredMonthlySavings - (plan.plannedMonthlyAmount || effectiveCapacity);
      return {
        status: 'atRisk',
        statusTitle: 'At Risk',
        statusBadgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
        explanation: `Shortfall of ${CurrencyFormatter.format(shortfallMonthly)}/mo against required pace.`,
        requiredMonthlySavings,
        monthsRemaining,
        varianceMonthly,
        shortfallMonthly,
        projectedCompletionDate: projDate.toISOString(),
        projectedMonths,
        milestones,
        expectedContributionToDate,
        elapsedMonthsFromStart,
        startPacingVariance,
      };
    } else if (effectiveCapacity > 0 && requiredMonthlySavings > effectiveCapacity * 2) {
      const extensionMonths = Math.max(1, projectedMonths - monthsRemaining);
      return {
        status: 'notFeasible',
        statusTitle: 'Not Feasible',
        statusBadgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
        explanation: `Required ${CurrencyFormatter.format(requiredMonthlySavings)}/mo far exceeds current cash flow. Extend deadline by ${extensionMonths} months.`,
        requiredMonthlySavings,
        monthsRemaining,
        varianceMonthly,
        shortfallMonthly: requiredMonthlySavings - effectiveCapacity,
        extensionMonths,
        projectedCompletionDate: projDate.toISOString(),
        projectedMonths,
        milestones,
        expectedContributionToDate,
        elapsedMonthsFromStart,
        startPacingVariance,
      };
    } else {
      const shortfallMonthly = requiredMonthlySavings - (plan.plannedMonthlyAmount || effectiveCapacity);
      const extensionMonths = Math.max(1, projectedMonths - monthsRemaining);
      return {
        status: 'behind',
        statusTitle: 'Behind Schedule',
        statusBadgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
        explanation: `Behind timeline by ~${extensionMonths} months. Needs +${CurrencyFormatter.format(shortfallMonthly)}/mo boost.`,
        requiredMonthlySavings,
        monthsRemaining,
        varianceMonthly,
        shortfallMonthly,
        extensionMonths,
        projectedCompletionDate: projDate.toISOString(),
        projectedMonths,
        milestones,
        expectedContributionToDate,
        elapsedMonthsFromStart,
        startPacingVariance,
      };
    }
  }

  // Backwards compatibility alias
  static analyzeGoal(
    goal: GoalItem,
    unallocatedBalance: number,
    historicalAvgSavings: number
  ): GoalAnalysis {
    return this.analyzePlan(goal, unallocatedBalance, historicalAvgSavings);
  }

  static analyzeFinancialCapacity(
    transactions: TransactionItem[],
    plans: PlanItem[]
  ): FinancialCapacityAnalysis {
    const monthlyIncome = this.monthlyIncome(transactions);
    const monthlyExpenses = this.monthlyExpenses(transactions);
    const monthlyCapacity = Math.max(0, monthlyIncome - monthlyExpenses);

    const now = new Date();
    // Exclude completed plans, paused plans, and future/upcoming scheduled plans
    const activePlans = plans.filter(p => {
      if (p.isCompleted || p.isPaused) return false;
      if (p.startDate) {
        const s = new Date(p.startDate);
        const diffMonths = (s.getFullYear() - now.getFullYear()) * 12 + (s.getMonth() - now.getMonth());
        if (diffMonths > 0) return false;
      }
      return true;
    });
    const totalPlannedMonthlyCommitment = activePlans.reduce(
      (sum, p) => sum + (p.plannedMonthlyAmount || 0),
      0
    );
    const capacityVariance = monthlyCapacity - totalPlannedMonthlyCommitment;

    let healthStatus: 'healthy' | 'tight' | 'overcommitted' = 'healthy';
    if (capacityVariance < -100000) {
      healthStatus = 'overcommitted';
    } else if (capacityVariance < 150000) {
      healthStatus = 'tight';
    }

    const totalTargetAmount = plans.reduce((sum, p) => sum + p.targetAmount, 0);
    const totalAllocatedAmount = plans.reduce((sum, p) => sum + (p.allocatedAmount || 0), 0);
    const overallProgressPercent =
      totalTargetAmount > 0 ? Math.min(100, Math.round((totalAllocatedAmount / totalTargetAmount) * 100)) : 0;

    // Priority Distribution
    const priorityDistribution = {
      critical: { count: 0, plannedMonthly: 0, allocated: 0, target: 0 },
      high: { count: 0, plannedMonthly: 0, allocated: 0, target: 0 },
      medium: { count: 0, plannedMonthly: 0, allocated: 0, target: 0 },
      low: { count: 0, plannedMonthly: 0, allocated: 0, target: 0 },
    };

    activePlans.forEach(p => {
      const pri = (p.priority || 'medium') as PlanPriority;
      if (priorityDistribution[pri]) {
        priorityDistribution[pri].count += 1;
        priorityDistribution[pri].plannedMonthly += p.plannedMonthlyAmount || 0;
        priorityDistribution[pri].allocated += p.allocatedAmount || 0;
        priorityDistribution[pri].target += p.targetAmount || 0;
      }
    });

    // Priority based allocation recommendation engine:
    // Sort active plans by priority weight: Critical (4), High (3), Medium (2), Low (1)
    const priorityWeight: Record<PlanPriority, number> = {
      critical: 4,
      high: 3,
      medium: 2,
      low: 1,
    };

    const sortedPlans = [...activePlans].sort(
      (a, b) => (priorityWeight[b.priority || 'medium'] || 0) - (priorityWeight[a.priority || 'medium'] || 0)
    );

    let remainingCapacity = monthlyCapacity;
    const recommendedAllocations: FinancialCapacityAnalysis['recommendedAllocations'] = [];

    sortedPlans.forEach(p => {
      const remainingTarget = Math.max(0, p.targetAmount - (p.allocatedAmount || 0));
      const requested = p.plannedMonthlyAmount || Math.round(remainingTarget / 6);
      const allocatedRec = Math.min(requested, Math.max(0, remainingCapacity));
      remainingCapacity -= allocatedRec;

      recommendedAllocations.push({
        planId: p.id,
        planName: p.name,
        priority: p.priority || 'medium',
        recommendedMonthly: allocatedRec,
      });
    });

    // Action Center recommendations generator
    const actionItems: FinancialCapacityAnalysis['actionItems'] = [];

    if (healthStatus === 'overcommitted') {
      actionItems.push({
        id: 'act-overcommit',
        type: 'critical',
        title: 'Monthly Capacity Overcommitted',
        message: `Your planned commitments (${CurrencyFormatter.format(totalPlannedMonthlyCommitment)}) exceed your net cash flow by ${CurrencyFormatter.format(Math.abs(capacityVariance))}. Consider extending deadlines or reducing discretionary spending.`,
      });
    } else if (healthStatus === 'tight') {
      actionItems.push({
        id: 'act-tight',
        type: 'warning',
        title: 'Tight Cash Flow Margin',
        message: `Your planned monthly allocations leave only ${CurrencyFormatter.format(capacityVariance)} buffer. Keep discretionary expenses disciplined.`,
      });
    } else {
      actionItems.push({
        id: 'act-surplus',
        type: 'success',
        title: 'Surplus Savings Capacity',
        message: `You have ${CurrencyFormatter.format(capacityVariance)} surplus monthly capacity. You can accelerate your Critical plans or fund additional investments.`,
      });
    }

    // Check critical plans status
    const criticalPlans = activePlans.filter(p => p.priority === 'critical');
    criticalPlans.forEach(cp => {
      const analysis = this.analyzePlan(cp, this.unallocatedBalance(transactions, plans), monthlyCapacity);
      if (analysis.status === 'atRisk' || analysis.status === 'behind' || analysis.status === 'notFeasible') {
        actionItems.push({
          id: `act-crit-${cp.id}`,
          type: 'critical',
          title: `Action Needed: Critical Plan "${cp.name}"`,
          message: `This critical plan is ${analysis.statusTitle.toLowerCase()}. Increase allocation by ${CurrencyFormatter.format(analysis.shortfallMonthly || 100000)}/mo to ensure security.`,
        });
      }
    });

    return {
      monthlyIncome,
      monthlyExpenses,
      monthlyCapacity,
      totalPlannedMonthlyCommitment,
      capacityVariance,
      healthStatus,
      totalTargetAmount,
      totalAllocatedAmount,
      overallProgressPercent,
      priorityDistribution,
      recommendedAllocations,
      actionItems,
    };
  }

  static calculateWhatIf(
    plans: PlanItem[],
    baseCapacity: number,
    incomeBoost: number,
    expenseCut: number,
    lumpSum: number
  ): WhatIfResult {
    const newCapacity = Math.max(0, baseCapacity + incomeBoost + expenseCut);
    const activePlans = plans.filter(p => !p.isCompleted);

    const plansProjected = activePlans.map(plan => {
      const remaining = Math.max(0, plan.targetAmount - (plan.allocatedAmount || 0) - (lumpSum / Math.max(1, activePlans.length)));
      const originalRate = plan.plannedMonthlyAmount > 0 ? plan.plannedMonthlyAmount : baseCapacity;
      const newRate = plan.plannedMonthlyAmount > 0
        ? plan.plannedMonthlyAmount + ((incomeBoost + expenseCut) / Math.max(1, activePlans.length))
        : newCapacity;

      const originalMonths = originalRate > 0 ? Math.ceil(remaining / originalRate) : 24;
      const newMonths = newRate > 0 ? Math.ceil(remaining / newRate) : 24;
      const monthsSaved = Math.max(0, originalMonths - newMonths);

      return {
        planId: plan.id,
        planName: plan.name,
        originalMonths,
        newMonths,
        monthsSaved,
        isFeasible: newRate > 0,
      };
    });

    return {
      adjustedIncome: incomeBoost,
      adjustedExpenses: expenseCut,
      newCapacity,
      plansProjected,
    };
  }

  static calculateIndividualPlanWhatIf(
    plan: PlanItem,
    simulatedTargetAmount: number,
    simulatedMonthlyAllocation: number,
    extraMonthlySavings: number,
    simulatedTargetDate: string | null,
    baseSavingsCapacity: number
  ): IndividualPlanWhatIfResult {
    const allocated = plan.allocatedAmount || 0;
    const originalRemaining = Math.max(0, plan.targetAmount - allocated);
    const simulatedRemaining = Math.max(0, simulatedTargetAmount - allocated);

    const originalRate = Math.max(
      1,
      plan.plannedMonthlyAmount > 0 ? plan.plannedMonthlyAmount : baseSavingsCapacity
    );
    const totalSimulatedMonthlyRate = Math.max(
      1,
      simulatedMonthlyAllocation + extraMonthlySavings
    );

    // Original projection
    const originalMonths = Math.ceil(originalRemaining / originalRate);
    const origDate = new Date();
    origDate.setMonth(origDate.getMonth() + originalMonths);
    const originalForecastDate = origDate.toISOString();

    // Simulated projection
    const simulatedMonths = Math.ceil(simulatedRemaining / totalSimulatedMonthlyRate);
    const simDate = new Date();
    simDate.setMonth(simDate.getMonth() + simulatedMonths);
    const simulatedForecastDate = simDate.toISOString();

    // Months difference (positive = finished earlier)
    const monthsDifference = originalMonths - simulatedMonths;
    const monthsGained = monthsDifference > 0 ? monthsDifference : 0;
    const monthsDelayed = monthsDifference < 0 ? Math.abs(monthsDifference) : 0;

    // Feasibility calculation against target date
    const targetToEvaluate = simulatedTargetDate !== undefined ? simulatedTargetDate : plan.targetDate;
    let requiredMonthlySavings = totalSimulatedMonthlyRate;
    let varianceMonthly = 0;
    let feasibilityStatus: IndividualPlanWhatIfResult['feasibilityStatus'] = 'onSchedule';
    let feasibilityTitle = 'On Schedule';
    let feasibilityBadgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';
    let feasibilityExplanation = 'Pacing matches projected savings rate.';

    if (simulatedRemaining <= 0) {
      feasibilityStatus = 'ahead';
      feasibilityTitle = 'Fully Funded';
      feasibilityBadgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
      feasibilityExplanation = 'This plan target is already 100% funded with allocated balance!';
    } else if (targetToEvaluate) {
      const now = new Date();
      const targetObj = new Date(targetToEvaluate);
      const monthsToTarget = Math.max(
        1,
        (targetObj.getFullYear() - now.getFullYear()) * 12 +
          (targetObj.getMonth() - now.getMonth())
      );
      requiredMonthlySavings = simulatedRemaining / monthsToTarget;
      varianceMonthly = totalSimulatedMonthlyRate - requiredMonthlySavings;

      if (totalSimulatedMonthlyRate >= requiredMonthlySavings * 1.15) {
        feasibilityStatus = 'ahead';
        feasibilityTitle = 'Ahead of Target';
        feasibilityBadgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
        feasibilityExplanation = `Surplus of ${CurrencyFormatter.format(varianceMonthly)}/mo against required target pace.`;
      } else if (totalSimulatedMonthlyRate >= requiredMonthlySavings * 0.95) {
        feasibilityStatus = 'onSchedule';
        feasibilityTitle = 'On Track';
        feasibilityBadgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';
        feasibilityExplanation = `Allocations match required target rate of ${CurrencyFormatter.format(requiredMonthlySavings)}/mo.`;
      } else if (totalSimulatedMonthlyRate >= requiredMonthlySavings * 0.7) {
        feasibilityStatus = 'atRisk';
        feasibilityTitle = 'At Risk';
        feasibilityBadgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
        feasibilityExplanation = `Shortfall of ${CurrencyFormatter.format(Math.abs(varianceMonthly))}/mo against deadline.`;
      } else {
        feasibilityStatus = 'behind';
        feasibilityTitle = 'Behind Schedule';
        feasibilityBadgeColor = 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
        feasibilityExplanation = `Heavy shortfall. Need ${CurrencyFormatter.format(requiredMonthlySavings)}/mo to reach deadline.`;
      }
    } else {
      feasibilityStatus = totalSimulatedMonthlyRate >= baseSavingsCapacity * 0.8 ? 'ahead' : 'onSchedule';
      feasibilityTitle = 'Capacity Driven';
      feasibilityBadgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
      feasibilityExplanation = `Projected completion in ${simulatedMonths} months at simulated contribution rate.`;
    }

    return {
      planId: plan.id,
      planName: plan.name,
      originalTargetAmount: plan.targetAmount,
      simulatedTargetAmount,
      originalPlannedMonthly: plan.plannedMonthlyAmount || 0,
      simulatedMonthlyAllocation,
      extraMonthlySavings,
      totalSimulatedMonthlyRate,
      originalTargetDate: plan.targetDate,
      simulatedTargetDate: targetToEvaluate,
      originalForecastDate,
      simulatedForecastDate,
      originalMonths,
      simulatedMonths,
      monthsGained,
      monthsDelayed,
      simulatedRemaining,
      requiredMonthlySavings,
      varianceMonthly,
      feasibilityStatus,
      feasibilityTitle,
      feasibilityBadgeColor,
      feasibilityExplanation,
    };
  }
}
