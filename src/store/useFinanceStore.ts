import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { PlanItem, PlanStep, PlanPriority, StepStatus } from '../types/finance';
import { StorageService } from '../services/storage';
import { CPMEngine, addDays, toDateOnlyString, parseDate } from '../services/cpmEngine';

/**
 * Check if a plan is currently in a timed suspension or manual pause.
 * Automatically handles temporal expiration if suspension date has elapsed.
 */
export function checkPlanSuspensionStatus(plan: PlanItem, now = new Date()): {
  isSuspended: boolean;
  isPaused: boolean;
  resumesDate: string | null;
  resumesDateObj: Date | null;
} {
  if (plan.suspendedUntil) {
    const suspDate = parseDate(plan.suspendedUntil);
    // If suspension end date is still in the future (today < suspDate or end of day)
    if (suspDate.getTime() > now.getTime()) {
      return {
        isSuspended: true,
        isPaused: true,
        resumesDate: toDateOnlyString(suspDate),
        resumesDateObj: suspDate,
      };
    }
  }

  // If manual pause without suspension end date, or suspension expired
  return {
    isSuspended: false,
    isPaused: Boolean(plan.isPaused && !plan.suspendedUntil),
    resumesDate: null,
    resumesDateObj: null,
  };
}

// Clean up expired suspensions across loaded plans and individual steps
function reconcileSuspendedPlans(plansList: PlanItem[]): PlanItem[] {
  const now = new Date();
  let modified = false;

  const reconciled = plansList.map(plan => {
    let planModified = false;
    let nextPlan: PlanItem = { ...plan };

    // 1. Plan-level suspension expiration check
    if (nextPlan.suspendedUntil) {
      const suspDate = parseDate(nextPlan.suspendedUntil);
      if (suspDate.getTime() <= now.getTime()) {
        // Suspension elapsed -> Automatically reactivate plan!
        planModified = true;
        nextPlan = {
          ...nextPlan,
          isPaused: false,
          pausedAt: null,
          suspendedUntil: null,
          suspensionDurationLabel: null,
        };
      }
    }

    // 2. Individual Step-level suspension expiration check
    if (nextPlan.steps && nextPlan.steps.length > 0) {
      const updatedSteps = nextPlan.steps.map(step => {
        if (step.status === 'suspended' && step.suspendedUntil) {
          const stepSuspDate = parseDate(step.suspendedUntil);
          if (stepSuspDate.getTime() <= now.getTime()) {
            // Step suspension elapsed -> Automatically reactivate step!
            planModified = true;
            const hasAllocated = (step.allocatedAmount || 0) > 0;
            const isCompleted = step.targetAmount > 0 && (step.allocatedAmount || 0) >= step.targetAmount;
            return {
              ...step,
              status: (isCompleted ? 'completed' : hasAllocated ? 'in_progress' : 'not_started') as StepStatus,
              suspendedUntil: null,
              stoppedAt: null,
            };
          }
        }
        return step;
      });

      if (planModified) {
        nextPlan.steps = updatedSteps;
      }
    }

    if (planModified) {
      modified = true;
      nextPlan.updatedAt = new Date().toISOString();
      return nextPlan;
    }
    return plan;
  });

  if (modified) {
    StorageService.savePlans(reconciled);
  }
  return reconciled;
}

// Global in-memory state & subscriber bus for reactive updates
let globalPlans: PlanItem[] = reconcileSuspendedPlans(StorageService.loadPlans());
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach(listener => listener());
}

function updateGlobalPlans(updater: (prev: PlanItem[]) => PlanItem[]) {
  const next = updater(globalPlans);
  globalPlans = next;
  StorageService.savePlans(next);
  notify();
}

/**
 * Core Plan & CPM State Manager API
 */
export const financeStore = {
  getPlans: (): PlanItem[] => globalPlans,

  setPlans: (plans: PlanItem[]) => {
    updateGlobalPlans(() => plans);
  },

  getPlan: (id: string): PlanItem | undefined => {
    return globalPlans.find(p => p.id === id);
  },

  /**
   * Create a new Plan with optional initial steps and automatic budget rollup integrity.
   * Performs an atomic save with steps properly indexed, rebaselined, and persisted.
   */
  createPlan: (
    planData: Omit<PlanItem, 'id' | 'createdAt' | 'updatedAt' | 'completedAt' | 'allocatedAmount' | 'isCompleted'> & {
      id?: string;
      allocatedAmount?: number;
      isCompleted?: boolean;
      steps?: PlanStep[];
    }
  ): PlanItem => {
    const rawSteps = planData.steps || [];
    const hasSteps = rawSteps.length > 0;

    // Integrity Guard: If steps exist, enforce plan.targetAmount = sum(steps.targetAmount)
    const stepsTargetSum = rawSteps.reduce(
      (sum, s) => sum + (Number(s.targetAmount) || 0),
      0
    );
    const finalTargetAmount = hasSteps ? stepsTargetSum : (Number(planData.targetAmount) || 0);

    // Properly index and rebaseline steps network with CPM forward/backward passes
    const indexedSteps = hasSteps
      ? CPMEngine.rebaselineStepNetwork(
          rawSteps.map((s, idx) => ({
            ...s,
            id: s.id || `step-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
            order: idx + 1,
            targetAmount: Number(s.targetAmount) || 0,
            allocatedAmount: Number(s.allocatedAmount) || 0,
            duration: Math.max(1, Number(s.duration) || 1),
            status: s.status || 'not_started',
            predecessors: s.predecessors || [],
          })),
          planData.startDate
        )
      : [];

    const planId = planData.id || 'plan-' + Date.now();
    const newPlan: PlanItem = {
      ...planData,
      id: planId,
      targetAmount: finalTargetAmount,
      allocatedAmount: planData.allocatedAmount || 0,
      isCompleted: planData.isCompleted || false,
      completedAt: null,
      steps: indexedSteps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    updateGlobalPlans(prev => [newPlan, ...prev.filter(p => p.id !== planId)]);
    return newPlan;
  },

  /**
   * Alias for createPlan
   */
  addPlan: (
    planData: Omit<PlanItem, 'id' | 'createdAt' | 'updatedAt' | 'completedAt' | 'allocatedAmount' | 'isCompleted'> & {
      id?: string;
      allocatedAmount?: number;
      isCompleted?: boolean;
      steps?: PlanStep[];
    }
  ): PlanItem => {
    return financeStore.createPlan(planData);
  },

  // 1. LIFECYCLE CONTROLS

  /**
   * Reschedule: Modify planned start date, deadline (targetDate), or pace
   */
  reschedulePlan: (
    planId: string,
    startDate: string,
    targetDate: string,
    plannedMonthly?: number
  ) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId) return p;

        const s = new Date(startDate);
        const t = new Date(targetDate);
        const months = Math.max(
          1,
          (t.getFullYear() - s.getFullYear()) * 12 + (t.getMonth() - s.getMonth())
        );
        const remaining = Math.max(0, p.targetAmount - (p.allocatedAmount || 0));
        const autoMonthly = Math.round(remaining / months);

        return {
          ...p,
          startDate: new Date(startDate).toISOString(),
          targetDate: new Date(targetDate).toISOString(),
          plannedMonthlyAmount:
            plannedMonthly !== undefined && plannedMonthly > 0
              ? plannedMonthly
              : autoMonthly > 0
              ? autoMonthly
              : p.plannedMonthlyAmount,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Pause / Resume: Toggle contribution status
   */
  togglePausePlan: (planId: string) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId) return p;
        const willPause = !p.isPaused;
        return {
          ...p,
          isPaused: willPause,
          pausedAt: willPause ? new Date().toISOString() : null,
          suspendedUntil: null,
          suspensionDurationLabel: null,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  resumePlan: (planId: string) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId) return p;
        return {
          ...p,
          isPaused: false,
          pausedAt: null,
          suspendedUntil: null,
          suspensionDurationLabel: null,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Timed Suspension (Snooze / Freeze for a specific duration or date)
   */
  suspendPlan: (
    planId: string,
    options: {
      durationDays?: number;
      durationMonths?: number;
      specificDate?: string;
      durationLabel?: string;
    }
  ) => {
    let resumeDateStr: string;
    let label = options.durationLabel || 'Custom';

    if (options.specificDate) {
      resumeDateStr = toDateOnlyString(options.specificDate);
    } else if (options.durationDays) {
      resumeDateStr = addDays(toDateOnlyString(new Date()), options.durationDays);
      label = `${options.durationDays} Days`;
    } else if (options.durationMonths) {
      const d = new Date();
      d.setMonth(d.getMonth() + options.durationMonths);
      resumeDateStr = toDateOnlyString(d);
      label = `${options.durationMonths} ${options.durationMonths === 1 ? 'Month' : 'Months'}`;
    } else {
      resumeDateStr = addDays(toDateOnlyString(new Date()), 7);
      label = '7 Days';
    }

    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId) return p;
        return {
          ...p,
          isPaused: true,
          pausedAt: new Date().toISOString(),
          suspendedUntil: resumeDateStr,
          suspensionDurationLabel: label,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Mark as Completed: Manually close early or toggle completion
   */
  markPlanCompleted: (planId: string, completed = true) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId) return p;
        return {
          ...p,
          isCompleted: completed,
          completedAt: completed ? new Date().toISOString() : null,
          isPaused: false,
          suspendedUntil: null,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * In-Place Property Updates (Target Amount, Priority Level, Title, Description)
   */
  updatePlanProperties: (
    planId: string,
    updates: {
      targetAmount?: number;
      priority?: PlanPriority;
      name?: string;
      planDescription?: string;
      plannedMonthlyAmount?: number;
    }
  ) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId) return p;

        // Integrity Guard: If steps exist, target amount is strictly tied to steps budget sum
        const hasSteps = p.steps && p.steps.length > 0;
        const stepsTargetSum = hasSteps
          ? p.steps!.reduce((sum, s) => sum + (Number(s.targetAmount) || 0), 0)
          : undefined;

        const newTarget =
          stepsTargetSum !== undefined
            ? stepsTargetSum
            : updates.targetAmount !== undefined
            ? updates.targetAmount
            : p.targetAmount;

        let newMonthly = updates.plannedMonthlyAmount ?? p.plannedMonthlyAmount;

        // If target changed, automatically recalculate monthly pace if targetDate is set
        if ((updates.targetAmount !== undefined || stepsTargetSum !== undefined) && p.targetDate) {
          const s = parseDate(p.startDate);
          const t = parseDate(p.targetDate);
          const months = Math.max(
            1,
            (t.getFullYear() - s.getFullYear()) * 12 + (t.getMonth() - s.getMonth())
          );
          const rem = Math.max(0, newTarget - (p.allocatedAmount || 0));
          newMonthly = Math.round(rem / months);
        }

        return {
          ...p,
          name: updates.name?.trim() || p.name,
          targetAmount: newTarget,
          priority: updates.priority || p.priority,
          planDescription: updates.planDescription !== undefined ? updates.planDescription : p.planDescription,
          plannedMonthlyAmount: newMonthly,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  // 2. OPTIONAL WORK BREAKDOWN STRUCTURE & CPM STEPS ENGINE

  /**
   * Add a new Step to a plan, recalculate CPM schedule, and synchronize plan budget rollup
   */
  addStep: (planId: string, stepData: Omit<PlanStep, 'id'>) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId) return p;

        const currentSteps = p.steps || [];
        const newStep: PlanStep = {
          ...stepData,
          id: 'step-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
          order: currentSteps.length + 1,
        };

        const rebaselined = CPMEngine.rebaselineStepNetwork(
          [...currentSteps, newStep],
          p.startDate
        );

        // Synchronize parent targetAmount & allocatedAmount with sum of steps
        const newTargetAmount = rebaselined.reduce(
          (sum, s) => sum + (Number(s.targetAmount) || 0),
          0
        );
        const newAllocatedAmount = rebaselined.reduce(
          (sum, s) => sum + (Number(s.allocatedAmount) || 0),
          0
        );
        const isPlanCompleted = newTargetAmount > 0 && newAllocatedAmount >= newTargetAmount;

        return {
          ...p,
          targetAmount: newTargetAmount,
          allocatedAmount: newAllocatedAmount,
          isCompleted: isPlanCompleted,
          completedAt: isPlanCompleted ? (p.completedAt || new Date().toISOString()) : null,
          steps: rebaselined,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Edit Step properties (targetAmount, duration, startDate, predecessors, etc.)
   * and automatically trigger cascading CPM date recalculations and budget rollup.
   */
  updateStep: (
    planId: string,
    stepId: string,
    updates: Partial<PlanStep>,
    autoRebaseline = true
  ) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId) return p;

        const currentSteps = p.steps || [];
        const modified = currentSteps.map(s => {
          if (s.id !== stepId) return s;
          const merged = { ...s, ...updates };
          const t = Number(merged.targetAmount) || 0;
          const a = Number(merged.allocatedAmount) || 0;
          merged.progress = t > 0 ? Math.min(100, Math.round((a / t) * 100)) : (a > 0 ? 100 : 0);
          return merged;
        });

        const nextSteps = autoRebaseline
          ? CPMEngine.rebaselineStepNetwork(modified, p.startDate)
          : modified;

        // Synchronize parent targetAmount & allocatedAmount with sum of steps
        const newTargetAmount = nextSteps.reduce(
          (sum, s) => sum + (Number(s.targetAmount) || 0),
          0
        );
        const newAllocatedAmount = nextSteps.reduce(
          (sum, s) => sum + (Number(s.allocatedAmount) || 0),
          0
        );
        const isPlanCompleted = newTargetAmount > 0 && newAllocatedAmount >= newTargetAmount;

        return {
          ...p,
          targetAmount: newTargetAmount,
          allocatedAmount: newAllocatedAmount,
          isCompleted: isPlanCompleted,
          completedAt: isPlanCompleted ? (p.completedAt || new Date().toISOString()) : null,
          steps: nextSteps,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Delete a Step, cleanly remove references to it from successors, and synchronize budget rollup
   */
  deleteStep: (planId: string, stepId: string) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId) return p;

        const remaining = (p.steps || [])
          .filter(s => s.id !== stepId)
          .map(s => ({
            ...s,
            predecessors: s.predecessors.filter(r => r.predecessorId !== stepId),
          }));

        const rebaselined = CPMEngine.rebaselineStepNetwork(remaining, p.startDate);

        // Synchronize parent targetAmount & allocatedAmount if steps remain
        const newTargetAmount =
          rebaselined.length > 0
            ? rebaselined.reduce((sum, s) => sum + (Number(s.targetAmount) || 0), 0)
            : p.targetAmount;
        const newAllocatedAmount =
          rebaselined.length > 0
            ? rebaselined.reduce((sum, s) => sum + (Number(s.allocatedAmount) || 0), 0)
            : 0;
        const isPlanCompleted = newTargetAmount > 0 && newAllocatedAmount >= newTargetAmount;

        return {
          ...p,
          targetAmount: newTargetAmount,
          allocatedAmount: newAllocatedAmount,
          isCompleted: isPlanCompleted,
          completedAt: isPlanCompleted ? (p.completedAt || new Date().toISOString()) : null,
          steps: rebaselined,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Directly synchronize full steps array with CPM schedule and plan budget rollup
   */
  updatePlanSteps: (planId: string, newSteps: PlanStep[]) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId) return p;
        const rebaselined = CPMEngine.rebaselineStepNetwork(newSteps, p.startDate);
        const newTargetAmount =
          rebaselined.length > 0
            ? rebaselined.reduce((sum, s) => sum + (Number(s.targetAmount) || 0), 0)
            : p.targetAmount;
        const newAllocatedAmount =
          rebaselined.length > 0
            ? rebaselined.reduce((sum, s) => sum + (Number(s.allocatedAmount) || 0), 0)
            : p.allocatedAmount;
        const isPlanCompleted = newTargetAmount > 0 && newAllocatedAmount >= newTargetAmount;

        return {
          ...p,
          targetAmount: newTargetAmount,
          allocatedAmount: newAllocatedAmount,
          isCompleted: isPlanCompleted,
          completedAt: isPlanCompleted ? (p.completedAt || new Date().toISOString()) : null,
          steps: rebaselined,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Reorder steps
   */
  reorderSteps: (planId: string, fromIndex: number, toIndex: number) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId || !p.steps) return p;

        const list = [...p.steps];
        const [moved] = list.splice(fromIndex, 1);
        list.splice(toIndex, 0, moved);

        list.forEach((s, idx) => {
          s.order = idx + 1;
        });

        const rebaselined = CPMEngine.rebaselineStepNetwork(list, p.startDate);

        return {
          ...p,
          steps: rebaselined,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Toggle Step Status (not_started <-> in_progress <-> completed)
   * When completed, ensures allocatedAmount reflects full target budget and rolls up parent plan.
   */
  toggleStepStatus: (planId: string, stepId: string, forcedStatus?: StepStatus) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId || !p.steps) return p;

        const updatedSteps = p.steps.map(s => {
          if (s.id !== stepId) return s;

          let nextStatus: StepStatus;
          if (forcedStatus) {
            nextStatus = forcedStatus;
          } else if (s.status === 'completed') {
            nextStatus = 'not_started';
          } else if (s.status === 'not_started') {
            nextStatus = 'in_progress';
          } else {
            nextStatus = 'completed';
          }

          // If completed, allocate full target budget if not already done
          const nextAllocated = nextStatus === 'completed'
            ? Math.max(s.allocatedAmount, s.targetAmount)
            : s.allocatedAmount;

          const progress = s.targetAmount > 0
            ? Math.min(100, Math.round((nextAllocated / s.targetAmount) * 100))
            : (nextAllocated > 0 ? 100 : 0);

          return {
            ...s,
            status: nextStatus,
            allocatedAmount: nextAllocated,
            progress,
            completedAmount: nextStatus === 'completed' ? s.targetAmount : 0,
          };
        });

        const totalAllocated = updatedSteps.reduce((sum, s) => sum + (s.allocatedAmount || 0), 0);
        const totalTarget = updatedSteps.reduce((sum, s) => sum + (s.targetAmount || 0), 0);
        const isPlanCompleted = totalTarget > 0 && totalAllocated >= totalTarget;

        return {
          ...p,
          targetAmount: totalTarget > 0 ? totalTarget : p.targetAmount,
          allocatedAmount: totalAllocated,
          isCompleted: isPlanCompleted,
          completedAt: isPlanCompleted ? (p.completedAt || new Date().toISOString()) : null,
          steps: updatedSteps,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Allocate (deposit or withdraw) funds directly to an individual step.
   * Updates step.allocatedAmount, step.progress, badges fully funded steps as completed,
   * and automatically rolls up parent plan's allocatedAmount and overall financial progress.
   * Freezes fund allocation if the step is currently stopped or suspended.
   */
  allocateToPlanStep: (planId: string, stepId: string, amount: number, isAbsolute = false) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId || !p.steps) return p;

        const targetStep = p.steps.find(s => s.id === stepId);
        // Halts active progress and freezes fund allocation to stopped or suspended steps
        if (targetStep && (targetStep.status === 'stopped' || targetStep.status === 'suspended')) {
          return p;
        }

        const updatedSteps = p.steps.map(s => {
          if (s.id !== stepId) return s;
          const nextAlloc = isAbsolute
            ? Math.max(0, amount)
            : Math.max(0, (s.allocatedAmount || 0) + amount);
          const isDone = s.targetAmount > 0 && nextAlloc >= s.targetAmount;
          const progress = s.targetAmount > 0
            ? Math.min(100, Math.round((nextAlloc / s.targetAmount) * 100))
            : (nextAlloc > 0 ? 100 : 0);

          return {
            ...s,
            allocatedAmount: nextAlloc,
            progress,
            status: isDone ? 'completed' : nextAlloc > 0 ? 'in_progress' : s.status,
            completedAmount: isDone ? s.targetAmount : 0,
          };
        });

        // Parent Plan Rollup: sum of step allocations
        const totalAllocated = updatedSteps.reduce((sum, s) => sum + (s.allocatedAmount || 0), 0);
        const totalTarget = updatedSteps.reduce((sum, s) => sum + (s.targetAmount || 0), 0);
        const isPlanCompleted = totalTarget > 0 && totalAllocated >= totalTarget;

        return {
          ...p,
          targetAmount: totalTarget > 0 ? totalTarget : p.targetAmount,
          allocatedAmount: totalAllocated,
          isCompleted: isPlanCompleted,
          completedAt: isPlanCompleted ? (p.completedAt || new Date().toISOString()) : null,
          steps: updatedSteps,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Alias for allocateToPlanStep
   */
  allocateToStep: (planId: string, stepId: string, amount: number, isAbsolute = false) => {
    financeStore.allocateToPlanStep(planId, stepId, amount, isAbsolute);
  },

  /**
   * Stop Step: Sets status = 'stopped', records stoppedAt, halts active progress,
   * freezes fund allocations, and ensures Finish-to-Start successor activities remain locked.
   */
  stopPlanStep: (planId: string, stepId: string) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId || !p.steps) return p;

        const updatedSteps = p.steps.map(s => {
          if (s.id === stepId) {
            return {
              ...s,
              status: 'stopped' as StepStatus,
              stoppedAt: new Date().toISOString(),
              suspendedUntil: null,
            };
          }

          // Successor steps with Finish-to-Start (FS) dependencies remain locked in 'not_started'
          const isFSSuccessor = s.predecessors?.some(
            rel => rel.predecessorId === stepId && rel.type === 'FS'
          );
          if (isFSSuccessor && s.status === 'in_progress' && (s.allocatedAmount || 0) === 0) {
            return {
              ...s,
              status: 'not_started' as StepStatus,
            };
          }

          return s;
        });

        return {
          ...p,
          steps: updatedSteps,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Resume Step: Transitions step back to 'in_progress' (or 'not_started' if allocated amount is zero)
   * or 'completed' if fully funded. Clears suspendedUntil and stoppedAt.
   */
  resumePlanStep: (planId: string, stepId: string) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId || !p.steps) return p;

        const updatedSteps = p.steps.map(s => {
          if (s.id !== stepId) return s;

          const isFullyFunded = s.targetAmount > 0 && (s.allocatedAmount || 0) >= s.targetAmount;
          const hasAllocated = (s.allocatedAmount || 0) > 0;
          const nextStatus: StepStatus = isFullyFunded
            ? 'completed'
            : hasAllocated
            ? 'in_progress'
            : 'not_started';

          return {
            ...s,
            status: nextStatus,
            suspendedUntil: null,
            stoppedAt: null,
          };
        });

        return {
          ...p,
          steps: updatedSteps,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Suspend Step: Sets status = 'suspended' and sets suspendedUntil date.
   * Freezes step allocations until the target date passes or user manually resumes.
   */
  suspendPlanStep: (
    planId: string,
    stepId: string,
    resumeDateOrDurationDays: string | number
  ) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId || !p.steps) return p;

        const resumeDate =
          typeof resumeDateOrDurationDays === 'number'
            ? addDays(toDateOnlyString(new Date()), resumeDateOrDurationDays)
            : toDateOnlyString(resumeDateOrDurationDays);

        const updatedSteps = p.steps.map(s => {
          if (s.id !== stepId) return s;

          return {
            ...s,
            status: 'suspended' as StepStatus,
            suspendedUntil: resumeDate,
            stoppedAt: null,
          };
        });

        return {
          ...p,
          steps: updatedSteps,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Reschedule Step: Updates startDate and duration (recomputing endDate = startDate + duration).
   * Appends to scheduleHistory audit array.
   * CPM Cascade: If this step has downstream successors (FS, SS, FF, SF), recalculates downstream
   * successor start/end dates respecting defined dependency relationships and lag without
   * disrupting unaffected predecessor activities.
   */
  reschedulePlanStep: (
    planId: string,
    stepId: string,
    newStartDate: string,
    newDuration: number,
    reason?: string
  ) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId || !p.steps) return p;

        const targetStep = p.steps.find(s => s.id === stepId);
        if (!targetStep) return p;

        const cleanNewStartDate = toDateOnlyString(newStartDate);
        const cleanNewDuration = Math.max(1, Math.round(Number(newDuration) || 1));
        const cleanNewEndDate = addDays(cleanNewStartDate, cleanNewDuration);

        const adjustment = {
          previousStartDate: targetStep.startDate,
          newStartDate: cleanNewStartDate,
          previousDuration: targetStep.duration,
          newDuration: cleanNewDuration,
          reason: reason?.trim() || undefined,
          adjustedAt: new Date().toISOString(),
        };

        const updatedSteps = p.steps.map(s => {
          if (s.id !== stepId) return s;
          return {
            ...s,
            startDate: cleanNewStartDate,
            duration: cleanNewDuration,
            endDate: cleanNewEndDate,
            scheduleHistory: [...(s.scheduleHistory || []), adjustment],
          };
        });

        // CPM Cascade: Recalculate downstream successor dates respecting dependencies & lag
        const cascadedSteps = CPMEngine.cascadeSuccessors(updatedSteps, stepId);

        // Synchronize parent plan dates if steps define new project bounds
        const summary = CPMEngine.analyzeSteps(cascadedSteps);
        let nextPlanStartDate = p.startDate;
        let nextPlanTargetDate = p.targetDate;
        let nextMonthly = p.plannedMonthlyAmount;

        if (summary.earliestStartDate && summary.latestEndDate) {
          const s = parseDate(summary.earliestStartDate);
          const t = parseDate(summary.latestEndDate);
          nextPlanStartDate = s.toISOString();
          nextPlanTargetDate = t.toISOString();

          const months = Math.max(
            1,
            (t.getFullYear() - s.getFullYear()) * 12 + (t.getMonth() - s.getMonth())
          );
          const remaining = Math.max(0, p.targetAmount - (p.allocatedAmount || 0));
          const calculatedMonthly = Math.round(remaining / months);
          if (calculatedMonthly > 0) {
            nextMonthly = calculatedMonthly;
          }
        }

        return {
          ...p,
          startDate: nextPlanStartDate,
          targetDate: nextPlanTargetDate,
          plannedMonthlyAmount: nextMonthly,
          steps: cascadedSteps,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Synchronize the parent plan's startDate & targetDate with the CPM Activity Steps bounds
   */
  syncPlanDatesWithSteps: (planId: string) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId || !p.steps || p.steps.length === 0) return p;

        const summary = CPMEngine.analyzeSteps(p.steps);
        if (!summary.earliestStartDate || !summary.latestEndDate) return p;

        const s = parseDate(summary.earliestStartDate);
        const t = parseDate(summary.latestEndDate);
        const months = Math.max(
          1,
          (t.getFullYear() - s.getFullYear()) * 12 + (t.getMonth() - s.getMonth())
        );
        const remaining = Math.max(0, p.targetAmount - (p.allocatedAmount || 0));
        const newMonthly = Math.round(remaining / months);

        return {
          ...p,
          startDate: s.toISOString(),
          targetDate: t.toISOString(),
          plannedMonthlyAmount: newMonthly > 0 ? newMonthly : p.plannedMonthlyAmount,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },

  /**
   * Explicitly rebaseline a plan's steps network
   */
  rebaselinePlanSteps: (planId: string) => {
    updateGlobalPlans(prev =>
      prev.map(p => {
        if (p.id !== planId || !p.steps) return p;
        const rebaselined = CPMEngine.rebaselineStepNetwork(p.steps, p.startDate);
        return {
          ...p,
          steps: rebaselined,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  },
};

/**
 * React hook to subscribe to the finance store plans
 */
export function useFinanceStore() {
  const subscribe = useCallback((callback: () => void) => {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  }, []);

  const getSnapshot = useCallback(() => globalPlans, []);

  const plans = useSyncExternalStore(subscribe, getSnapshot);

  return {
    plans,
    ...financeStore,
  };
}

/**
 * Integrity Helper: Validates and enforces plan targetAmount equals the sum of step budgets when steps exist
 */
export function validatePlanRollup(plan: PlanItem): PlanItem {
  if (plan.steps && plan.steps.length > 0) {
    const rolledUp = plan.steps.reduce(
      (sum, s) => sum + (Number(s.targetAmount) || 0),
      0
    );
    return {
      ...plan,
      targetAmount: rolledUp,
    };
  }
  return plan;
}
