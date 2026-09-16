import { PlanStep, StepRelationship, DependencyType, StepStatus } from '../types/finance';

/**
 * Utility date helpers for CPM calendar day math
 */
export function toDateOnlyString(date: Date | string | null | undefined): string {
  if (!date) return new Date().toISOString().split('T')[0];
  if (typeof date === 'string') {
    if (date.includes('T')) {
      return date.split('T')[0];
    }
    return date;
  }
  if (date instanceof Date) {
    if (isNaN(date.getTime())) {
      return new Date().toISOString().split('T')[0];
    }
    try {
      return date.toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  }
  return new Date().toISOString().split('T')[0];
}

export function parseDate(dateStr: string | null | undefined): Date {
  if (!dateStr || typeof dateStr !== 'string') return new Date();
  const cleanStr = toDateOnlyString(dateStr);
  const parts = cleanStr.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      const parsed = new Date(y, m, d);
      if (!isNaN(parsed.getTime())) return parsed;
    }
  }
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function addDays(dateStr: string | null | undefined, days: number): string {
  const d = parseDate(dateStr);
  if (isNaN(days) || !isFinite(days)) return toDateOnlyString(d);
  const safeDays = Math.max(-36500, Math.min(36500, Math.round(days)));
  d.setDate(d.getDate() + safeDays);
  return toDateOnlyString(d);
}

export function diffDays(startStr: string | null | undefined, endStr: string | null | undefined): number {
  const s = parseDate(startStr);
  const e = parseDate(endStr);
  const diffTime = e.getTime() - s.getTime();
  if (isNaN(diffTime)) return 0;
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

export interface CPMAnalysisSummary {
  totalBudget: number;
  totalAllocated: number;
  progressPercent: number;
  completedStepsCount: number;
  inProgressStepsCount: number;
  notStartedStepsCount: number;
  stoppedStepsCount: number;
  suspendedStepsCount: number;
  earliestStartDate: string | null;
  latestEndDate: string | null;
  totalDurationDays: number;
  criticalStepIds: string[];
}

export class CPMEngine {
  /**
   * Recalculates all step dates, end dates, and critical path in a topological order
   * based on Primavera P6 standard dependencies: FS, SS, FF, SF with lag.
   */
  static rebaselineStepNetwork(
    steps: PlanStep[],
    basePlanStartDate?: string | null
  ): PlanStep[] {
    if (!steps || steps.length === 0) return [];

    const defaultStartDate = basePlanStartDate
      ? toDateOnlyString(basePlanStartDate)
      : toDateOnlyString(new Date());

    // 1. Create working copy with normalized fields
    const stepMap = new Map<string, PlanStep>();
    steps.forEach((step, index) => {
      const duration = Math.max(1, Math.round(Number(step.duration) || 1));
      const startDate = step.startDate ? toDateOnlyString(step.startDate) : defaultStartDate;
      const endDate = step.endDate ? toDateOnlyString(step.endDate) : addDays(startDate, duration);
      const targetAmount = Number(step.targetAmount) || 0;
      const allocatedAmount = Number(step.allocatedAmount) || 0;
      const progress = targetAmount > 0 ? Math.min(100, Math.round((allocatedAmount / targetAmount) * 100)) : (allocatedAmount > 0 ? 100 : 0);
      stepMap.set(step.id, {
        ...step,
        order: step.order ?? index + 1,
        duration,
        startDate,
        endDate,
        targetAmount,
        allocatedAmount,
        progress,
        predecessors: Array.isArray(step.predecessors) ? [...step.predecessors] : [],
        status: step.status || 'not_started',
        isCritical: false,
      });
    });

    // 2. Build adjacency for topological sorting & cycle detection
    // Edge: predecessor -> successor
    const inDegree = new Map<string, number>();
    const outgoing = new Map<string, string[]>();

    stepMap.forEach((_, id) => {
      inDegree.set(id, 0);
      outgoing.set(id, []);
    });

    stepMap.forEach(step => {
      step.predecessors.forEach(rel => {
        if (stepMap.has(rel.predecessorId)) {
          inDegree.set(step.id, (inDegree.get(step.id) || 0) + 1);
          outgoing.get(rel.predecessorId)!.push(step.id);
        }
      });
    });

    // Kahn's algorithm for topological ordering
    const queue: string[] = [];
    inDegree.forEach((degree, id) => {
      if (degree === 0) queue.push(id);
    });

    const topoOrder: string[] = [];
    while (queue.length > 0) {
      const u = queue.shift()!;
      topoOrder.push(u);
      (outgoing.get(u) || []).forEach(v => {
        const nextDegree = (inDegree.get(v) || 0) - 1;
        inDegree.set(v, nextDegree);
        if (nextDegree === 0) queue.push(v);
      });
    }

    // In case of cycles or orphaned nodes, append remaining steps
    stepMap.forEach((_, id) => {
      if (!topoOrder.includes(id)) {
        topoOrder.push(id);
      }
    });

    // 3. Forward pass: Calculate Earliest Start (ES) and Earliest Finish (EF)
    topoOrder.forEach(stepId => {
      const step = stepMap.get(stepId)!;
      let earliestStart = step.startDate || defaultStartDate;

      if (step.predecessors.length > 0) {
        let maxConstraintStart = earliestStart;

        step.predecessors.forEach(rel => {
          const pred = stepMap.get(rel.predecessorId);
          if (!pred) return;

          const lag = Number(rel.lag) || 0;
          let requiredStart: string;

          switch (rel.type) {
            case 'FS': // Finish-to-Start: successor starts after predecessor finishes + lag
              requiredStart = addDays(pred.endDate!, lag);
              break;

            case 'SS': // Start-to-Start: successor starts with predecessor start + lag
              requiredStart = addDays(pred.startDate, lag);
              break;

            case 'FF': // Finish-to-Finish: successor finishes with predecessor finish + lag
              // successor.endDate >= pred.endDate + lag -> successor.startDate = successor.endDate - duration
              const targetEndFF = addDays(pred.endDate!, lag);
              requiredStart = addDays(targetEndFF, -step.duration);
              break;

            case 'SF': // Start-to-Finish: successor finishes after predecessor starts + lag
              const targetEndSF = addDays(pred.startDate, lag);
              requiredStart = addDays(targetEndSF, -step.duration);
              break;

            default:
              requiredStart = addDays(pred.endDate!, lag);
              break;
          }

          if (parseDate(requiredStart).getTime() > parseDate(maxConstraintStart).getTime()) {
            maxConstraintStart = requiredStart;
          }
        });

        earliestStart = maxConstraintStart;
      }

      step.startDate = earliestStart;
      step.endDate = addDays(earliestStart, step.duration);
      stepMap.set(stepId, step);
    });

    // 4. Backward pass & Critical Path identification
    // Find project max completion date
    let projectFinishDate = defaultStartDate;
    stepMap.forEach(s => {
      if (parseDate(s.endDate!).getTime() > parseDate(projectFinishDate).getTime()) {
        projectFinishDate = s.endDate!;
      }
    });

    // Calculate latest allowable finish (LF) and start (LS)
    const latestFinish = new Map<string, string>();
    stepMap.forEach((s, id) => {
      // Default latest finish to project finish date
      latestFinish.set(id, projectFinishDate);
    });

    // Reverse topological traversal
    for (let i = topoOrder.length - 1; i >= 0; i--) {
      const stepId = topoOrder[i];
      const step = stepMap.get(stepId)!;
      const successors = outgoing.get(stepId) || [];

      if (successors.length > 0) {
        let minRequiredFinish = latestFinish.get(stepId)!;

        successors.forEach(succId => {
          const succ = stepMap.get(succId)!;
          const rel = succ.predecessors.find(r => r.predecessorId === stepId);
          if (!rel) return;

          const lag = Number(rel.lag) || 0;
          let constraintFinish: string;

          switch (rel.type) {
            case 'FS':
              constraintFinish = addDays(succ.startDate, -lag);
              break;
            case 'SS':
              // succ.startDate = pred.startDate + lag
              // indirectly constrains predecessor
              constraintFinish = addDays(succ.startDate, -lag + step.duration);
              break;
            case 'FF':
              constraintFinish = addDays(succ.endDate!, -lag);
              break;
            case 'SF':
              constraintFinish = addDays(succ.endDate!, -lag + step.duration);
              break;
            default:
              constraintFinish = addDays(succ.startDate, -lag);
              break;
          }

          if (parseDate(constraintFinish).getTime() < parseDate(minRequiredFinish).getTime()) {
            minRequiredFinish = constraintFinish;
          }
        });

        latestFinish.set(stepId, minRequiredFinish);
      }

      const lf = latestFinish.get(stepId)!;
      const ls = addDays(lf, -step.duration);
      const totalFloat = diffDays(step.startDate, ls);

      // Activities with float <= 0 or ending on project finish without slack are Critical Path
      if (totalFloat <= 0 || step.endDate === projectFinishDate) {
        step.isCritical = true;
      }
    }

    return Array.from(stepMap.values()).sort((a, b) => {
      const dateDiff = parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime();
      if (dateDiff !== 0) return dateDiff;
      return (a.order || 0) - (b.order || 0);
    });
  }

  /**
   * Cascades date changes down the CPM network starting from a modified/rescheduled step.
   * Only downstream successors of modifiedStepId (or steps directly/indirectly constrained by it)
   * will have their start and finish dates adjusted. Unaffected predecessors and unrelated branches
   * remain strictly untouched.
   */
  static cascadeSuccessors(steps: PlanStep[], modifiedStepId: string): PlanStep[] {
    if (!steps || steps.length === 0) return [];

    const stepMap = new Map<string, PlanStep>();
    steps.forEach(s => {
      stepMap.set(s.id, {
        ...s,
        duration: Math.max(1, Math.round(Number(s.duration) || 1)),
        startDate: toDateOnlyString(s.startDate),
        endDate: s.endDate ? toDateOnlyString(s.endDate) : addDays(s.startDate, s.duration),
        predecessors: Array.isArray(s.predecessors) ? [...s.predecessors] : [],
      });
    });

    if (!stepMap.has(modifiedStepId)) {
      return this.rebaselineStepNetwork(steps);
    }

    // 1. Build adjacency graph (pred -> succ)
    const outgoing = new Map<string, string[]>();
    stepMap.forEach((_, id) => outgoing.set(id, []));
    stepMap.forEach(step => {
      step.predecessors.forEach(rel => {
        if (outgoing.has(rel.predecessorId)) {
          outgoing.get(rel.predecessorId)!.push(step.id);
        }
      });
    });

    // 2. Discover all downstream descendants of modifiedStepId via BFS
    const downstreamIds = new Set<string>();
    const queue = [modifiedStepId];
    while (queue.length > 0) {
      const current = queue.shift()!;
      const successors = outgoing.get(current) || [];
      for (const succId of successors) {
        if (!downstreamIds.has(succId)) {
          downstreamIds.add(succId);
          queue.push(succId);
        }
      }
    }

    // 3. Recompute dates for downstream steps in topological order
    // Extract in-degrees for downstream subnetwork
    const inDegree = new Map<string, number>();
    downstreamIds.forEach(id => {
      const step = stepMap.get(id)!;
      // count how many predecessors are also inside downstreamIds
      const internalPreds = step.predecessors.filter(r => downstreamIds.has(r.predecessorId)).length;
      inDegree.set(id, internalPreds);
    });

    const topoQueue: string[] = [];
    downstreamIds.forEach(id => {
      if ((inDegree.get(id) || 0) === 0) {
        topoQueue.push(id);
      }
    });

    const topoOrder: string[] = [];
    while (topoQueue.length > 0) {
      const u = topoQueue.shift()!;
      topoOrder.push(u);
      const successors = outgoing.get(u) || [];
      successors.forEach(v => {
        if (downstreamIds.has(v)) {
          const nextDeg = (inDegree.get(v) || 0) - 1;
          inDegree.set(v, nextDeg);
          if (nextDeg === 0) {
            topoQueue.push(v);
          }
        }
      });
    }

    // Append any cycle remnants if any
    downstreamIds.forEach(id => {
      if (!topoOrder.includes(id)) {
        topoOrder.push(id);
      }
    });

    // 4. Update dates for downstream steps based on all their predecessors
    topoOrder.forEach(stepId => {
      const step = stepMap.get(stepId)!;
      let earliestConstraint = step.startDate;

      if (step.predecessors && step.predecessors.length > 0) {
        let maxPredFinish = earliestConstraint;
        step.predecessors.forEach(rel => {
          const pred = stepMap.get(rel.predecessorId);
          if (!pred) return;
          const lag = Number(rel.lag) || 0;
          let constraintDate: string;

          switch (rel.type) {
            case 'FS':
              constraintDate = addDays(pred.endDate!, lag);
              break;
            case 'SS':
              constraintDate = addDays(pred.startDate, lag);
              break;
            case 'FF':
              constraintDate = addDays(pred.endDate!, lag - step.duration);
              break;
            case 'SF':
              constraintDate = addDays(pred.startDate, lag - step.duration);
              break;
            default:
              constraintDate = addDays(pred.endDate!, lag);
              break;
          }

          if (parseDate(constraintDate).getTime() > parseDate(maxPredFinish).getTime()) {
            maxPredFinish = constraintDate;
          }
        });
        earliestConstraint = maxPredFinish;
      }

      step.startDate = earliestConstraint;
      step.endDate = addDays(earliestConstraint, step.duration);
      stepMap.set(stepId, step);
    });

    // 5. Re-evaluate critical paths across the network
    return this.rebaselineStepNetwork(Array.from(stepMap.values()));
  }

  /**
   * Computes high-level progress and metrics across all activity steps.
   */
  static analyzeSteps(steps: PlanStep[]): CPMAnalysisSummary {
    if (!steps || steps.length === 0) {
      return {
        totalBudget: 0,
        totalAllocated: 0,
        progressPercent: 0,
        completedStepsCount: 0,
        inProgressStepsCount: 0,
        notStartedStepsCount: 0,
        stoppedStepsCount: 0,
        suspendedStepsCount: 0,
        earliestStartDate: null,
        latestEndDate: null,
        totalDurationDays: 0,
        criticalStepIds: [],
      };
    }

    let totalBudget = 0;
    let totalAllocated = 0;
    let completedStepsCount = 0;
    let inProgressStepsCount = 0;
    let notStartedStepsCount = 0;
    let stoppedStepsCount = 0;
    let suspendedStepsCount = 0;
    let earliest: Date | null = null;
    let latest: Date | null = null;
    const criticalStepIds: string[] = [];

    steps.forEach(step => {
      totalBudget += Number(step.targetAmount) || 0;
      totalAllocated += Number(step.allocatedAmount) || 0;

      if (step.status === 'completed') {
        completedStepsCount++;
      } else if (step.status === 'stopped') {
        stoppedStepsCount++;
      } else if (step.status === 'suspended') {
        suspendedStepsCount++;
      } else if (step.status === 'in_progress') {
        inProgressStepsCount++;
      } else {
        notStartedStepsCount++;
      }

      if (step.isCritical) {
        criticalStepIds.push(step.id);
      }

      const s = parseDate(step.startDate);
      const e = parseDate(step.endDate || addDays(step.startDate, step.duration));

      if (!earliest || s.getTime() < earliest.getTime()) earliest = s;
      if (!latest || e.getTime() > latest.getTime()) latest = e;
    });

    const progressPercent = totalBudget > 0
      ? Math.min(100, Math.round((totalAllocated / totalBudget) * 100))
      : 0;

    const totalDurationDays = earliest && latest ? Math.max(1, diffDays(toDateOnlyString(earliest), toDateOnlyString(latest))) : 0;

    return {
      totalBudget,
      totalAllocated,
      progressPercent,
      completedStepsCount,
      inProgressStepsCount,
      notStartedStepsCount,
      stoppedStepsCount,
      suspendedStepsCount,
      earliestStartDate: earliest ? toDateOnlyString(earliest) : null,
      latestEndDate: latest ? toDateOnlyString(latest) : null,
      totalDurationDays,
      criticalStepIds,
    };
  }

  /**
   * Creates a default step template with sensible defaults.
   */
  static createDefaultStep(
    index: number,
    baseStartDate?: string | null,
    predecessorId?: string
  ): PlanStep {
    const startDate = baseStartDate ? toDateOnlyString(baseStartDate) : toDateOnlyString(new Date());
    const duration = 14; // Default 2 weeks
    const endDate = addDays(startDate, duration);

    const predecessors: StepRelationship[] = [];
    if (predecessorId) {
      predecessors.push({
        predecessorId,
        type: 'FS',
        lag: 0,
      });
    }

    return {
      id: 'step-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      title: `Step ${index + 1}`,
      targetAmount: 1000000,
      allocatedAmount: 0,
      progress: 0,
      startDate,
      duration,
      endDate,
      predecessors,
      status: 'not_started',
      order: index + 1,
      isCritical: false,
    };
  }

  /**
   * Helper description string for dependency link (e.g. "Step 1 [FS+0d] ➔ Step 2")
   */
  static formatRelationshipBadge(rel: StepRelationship, steps: PlanStep[]): string {
    const pred = steps.find(s => s.id === rel.predecessorId);
    const predName = pred ? pred.title : 'Predecessor';
    const lagStr = rel.lag !== undefined && rel.lag !== 0
      ? `${rel.lag >= 0 ? '+' : ''}${rel.lag}d`
      : '+0d';
    return `${predName} [${rel.type}${lagStr}]`;
  }
}
