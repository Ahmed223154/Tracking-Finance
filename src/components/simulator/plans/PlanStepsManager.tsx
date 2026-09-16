import React, { useState } from 'react';
import { PlanStep, StepRelationship, DependencyType, StepStatus, PlanItem } from '../../../types/finance';
import { CPMEngine, addDays, toDateOnlyString, diffDays } from '../../../services/cpmEngine';
import { useI18n } from '../../../context/I18nContext';
import {
  Plus,
  Trash2,
  Calendar,
  Clock,
  Link,
  CheckCircle2,
  Circle,
  PlayCircle,
  Flame,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Coins,
  Check,
  Wallet,
  Play,
  Pause,
  CalendarClock,
  History,
  X,
} from 'lucide-react';
import { AmountInput } from '../AmountInput';
import { formatAmountInput, parseRawAmount } from '../../../services/currencyFormatter';

interface PlanStepsManagerProps {
  steps: PlanStep[];
  planStartDate?: string | null;
  planTargetAmount: number;
  currency?: string;
  isRollupMode?: boolean;
  onUpdateSteps: (newSteps: PlanStep[]) => void;
  onSyncDatesWithPlan?: (startDate: string, targetDate: string) => void;
  onOpenAllocate?: (stepId: string) => void;
}

export const PlanStepsManager: React.FC<PlanStepsManagerProps> = ({
  steps,
  planStartDate,
  planTargetAmount,
  currency = 'IQD',
  isRollupMode = false,
  onUpdateSteps,
  onSyncDatesWithPlan,
  onOpenAllocate,
}) => {
  const { t, language, formatCurrency } = useI18n();
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [newRelPredecessorId, setNewRelPredecessorId] = useState<string>('');
  const [newRelType, setNewRelType] = useState<DependencyType>('FS');
  const [newRelLag, setNewRelLag] = useState<number>(0);

  // Lifecycle Modals & Form State
  const [rescheduleStep, setRescheduleStep] = useState<PlanStep | null>(null);
  const [suspendStep, setSuspendStep] = useState<PlanStep | null>(null);
  const [historyStep, setHistoryStep] = useState<PlanStep | null>(null);

  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleDuration, setRescheduleDuration] = useState<number>(14);
  const [rescheduleReason, setRescheduleReason] = useState('');

  const [suspendPreset, setSuspendPreset] = useState<number | 'custom'>(7);
  const [customResumeDate, setCustomResumeDate] = useState(
    addDays(toDateOnlyString(new Date()), 7)
  );

  const summary = CPMEngine.analyzeSteps(steps);
  const effectiveTarget = isRollupMode ? summary.totalBudget : planTargetAmount;
  const budgetDifference = effectiveTarget - summary.totalBudget;

  const handleAddStep = () => {
    const lastStep = steps.length > 0 ? steps[steps.length - 1] : null;
    const baseDate = lastStep
      ? lastStep.endDate || addDays(lastStep.startDate, lastStep.duration)
      : planStartDate || toDateOnlyString(new Date());

    const newStep = CPMEngine.createDefaultStep(
      steps.length,
      baseDate,
      lastStep ? lastStep.id : undefined
    );

    const updated = CPMEngine.rebaselineStepNetwork([...steps, newStep], planStartDate);
    onUpdateSteps(updated);
    setEditingStepId(newStep.id);
  };

  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= steps.length) return;
    const list = [...steps];
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);
    list.forEach((s, idx) => {
      s.order = idx + 1;
    });
    const rebaselined = CPMEngine.rebaselineStepNetwork(list, planStartDate);
    onUpdateSteps(rebaselined);
  };

  const handleDeleteStep = (id: string) => {
    const remaining = steps
      .filter(s => s.id !== id)
      .map(s => ({
        ...s,
        predecessors: s.predecessors.filter(r => r.predecessorId !== id),
      }));
    const updated = CPMEngine.rebaselineStepNetwork(remaining, planStartDate);
    onUpdateSteps(updated);
    if (editingStepId === id) {
      setEditingStepId(null);
    }
  };

  const handleUpdateStepField = (id: string, updates: Partial<PlanStep>) => {
    const updatedList = steps.map(s => {
      if (s.id !== id) return s;
      return { ...s, ...updates };
    });
    const rebaselined = CPMEngine.rebaselineStepNetwork(updatedList, planStartDate);
    onUpdateSteps(rebaselined);
  };

  const handleToggleStatus = (step: PlanStep) => {
    let nextStatus: StepStatus;
    if (step.status === 'completed') nextStatus = 'not_started';
    else if (step.status === 'stopped' || step.status === 'suspended')
      nextStatus = (step.allocatedAmount || 0) > 0 ? 'in_progress' : 'not_started';
    else if (step.status === 'not_started') nextStatus = 'in_progress';
    else nextStatus = 'completed';

    const nextAllocated = nextStatus === 'completed'
      ? Math.max(step.allocatedAmount, step.targetAmount)
      : step.allocatedAmount;

    handleUpdateStepField(step.id, {
      status: nextStatus,
      allocatedAmount: nextAllocated,
      completedAmount: nextStatus === 'completed' ? step.targetAmount : 0,
      suspendedUntil: null,
      stoppedAt: null,
    });
  };

  const handleStopStep = (stepId: string) => {
    const updatedList = steps.map(s => {
      if (s.id === stepId) {
        return {
          ...s,
          status: 'stopped' as StepStatus,
          stoppedAt: new Date().toISOString(),
          suspendedUntil: null,
        };
      }
      const isFSSuccessor = s.predecessors?.some(
        rel => rel.predecessorId === stepId && rel.type === 'FS'
      );
      if (isFSSuccessor && s.status === 'in_progress' && (s.allocatedAmount || 0) === 0) {
        return { ...s, status: 'not_started' as StepStatus };
      }
      return s;
    });
    onUpdateSteps(updatedList);
  };

  const handleResumeStep = (stepId: string) => {
    const updatedList = steps.map(s => {
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
    onUpdateSteps(updatedList);
  };

  const handleApplySuspend = () => {
    if (!suspendStep) return;
    const resumeDate =
      suspendPreset === 'custom'
        ? customResumeDate
        : addDays(toDateOnlyString(new Date()), suspendPreset);

    const updatedList = steps.map(s => {
      if (s.id !== suspendStep.id) return s;
      return {
        ...s,
        status: 'suspended' as StepStatus,
        suspendedUntil: resumeDate,
        stoppedAt: null,
      };
    });
    onUpdateSteps(updatedList);
    setSuspendStep(null);
  };

  const handleApplyReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleStep) return;
    const cleanStartDate = toDateOnlyString(rescheduleDate);
    const cleanDuration = Math.max(1, Math.round(Number(rescheduleDuration) || 1));
    const cleanEndDate = addDays(cleanStartDate, cleanDuration);

    const adjustment = {
      previousStartDate: rescheduleStep.startDate,
      newStartDate: cleanStartDate,
      previousDuration: rescheduleStep.duration,
      newDuration: cleanDuration,
      reason: rescheduleReason?.trim() || undefined,
      adjustedAt: new Date().toISOString(),
    };

    const updatedList = steps.map(s => {
      if (s.id !== rescheduleStep.id) return s;
      return {
        ...s,
        startDate: cleanStartDate,
        duration: cleanDuration,
        endDate: cleanEndDate,
        scheduleHistory: [...(s.scheduleHistory || []), adjustment],
      };
    });

    const cascaded = CPMEngine.cascadeSuccessors(updatedList, rescheduleStep.id);
    onUpdateSteps(cascaded);

    if (onSyncDatesWithPlan) {
      const sum = CPMEngine.analyzeSteps(cascaded);
      if (sum.earliestStartDate && sum.latestEndDate) {
        onSyncDatesWithPlan(sum.earliestStartDate, sum.latestEndDate);
      }
    }

    setRescheduleStep(null);
    setRescheduleReason('');
  };

  const handleAddPredecessor = (targetStepId: string) => {
    if (!newRelPredecessorId || newRelPredecessorId === targetStepId) return;

    const targetStep = steps.find(s => s.id === targetStepId);
    if (!targetStep) return;

    // Avoid duplicate predecessor
    const exists = targetStep.predecessors.some(r => r.predecessorId === newRelPredecessorId);
    if (exists) return;

    const newPreds: StepRelationship[] = [
      ...targetStep.predecessors,
      {
        predecessorId: newRelPredecessorId,
        type: newRelType,
        lag: Number(newRelLag) || 0,
      },
    ];

    handleUpdateStepField(targetStepId, { predecessors: newPreds });
    setNewRelPredecessorId('');
    setNewRelLag(0);
  };

  const handleRemovePredecessor = (targetStepId: string, predId: string) => {
    const targetStep = steps.find(s => s.id === targetStepId);
    if (!targetStep) return;

    const newPreds = targetStep.predecessors.filter(r => r.predecessorId !== predId);
    handleUpdateStepField(targetStepId, { predecessors: newPreds });
  };

  const handleSyncWithPlan = () => {
    if (summary.earliestStartDate && summary.latestEndDate && onSyncDatesWithPlan) {
      onSyncDatesWithPlan(summary.earliestStartDate, summary.latestEndDate);
    }
  };

  return (
    <div className="space-y-3.5">
      {/* Header & CPM Summary Metrics */}
      <div className="rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] p-3.5 dark:border-[#3A3A3C] dark:bg-[#1C1C1E] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#007AFF]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1C1E] dark:text-white">
              {language === 'ar' ? 'مراحل العمل ومسار CPM' : 'Work Breakdown Structure (CPM)'}
            </h4>
          </div>
          <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-extrabold text-[#007AFF] shadow-xs dark:bg-[#2C2C2E] dark:text-blue-400">
            {steps.length} {language === 'ar' ? 'مراحل' : 'Activities'}
          </span>
        </div>

        {/* Budget Alignment Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span className="text-[#8E8E93]">
              {language === 'ar' ? 'ميزانية المراحل المجمعة:' : 'Steps Budget Sum:'}
            </span>
            <span className="font-bold text-[#1C1C1E] dark:text-white">
              {formatCurrency(summary.totalBudget)} {isRollupMode ? '' : `/ ${formatCurrency(planTargetAmount)}`}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5EA] dark:bg-[#38383A]">
            <div
              className={`h-full rounded-full transition-all ${
                isRollupMode || summary.totalBudget === planTargetAmount
                  ? 'bg-[#34C759]'
                  : summary.totalBudget > planTargetAmount
                  ? 'bg-rose-500'
                  : 'bg-[#007AFF]'
              }`}
              style={{
                width: `${
                  isRollupMode
                    ? 100
                    : Math.min(
                        100,
                        Math.round((summary.totalBudget / Math.max(1, planTargetAmount)) * 100)
                      )
                }%`,
              }}
            />
          </div>
          {isRollupMode ? (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#34C759] dark:text-emerald-400 pt-0.5">
              <Sparkles className="h-3 w-3 shrink-0" />
              <span>
                {language === 'ar'
                  ? 'الميزانية الإجمالية للخطة مرتبطة تلقائياً بمجموع ميزانيات المراحل.'
                  : 'Target budget is automatically rolled up and synchronized from all activity steps.'}
              </span>
            </div>
          ) : (
            budgetDifference !== 0 && (
              <p
                className={`text-[10px] font-medium ${
                  budgetDifference > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {budgetDifference > 0
                  ? `${language === 'ar' ? 'المتبقي لتوزيعه على المراحل:' : 'Unbudgeted remainder:'} ${formatCurrency(budgetDifference)}`
                  : `${language === 'ar' ? 'تجاوز ميزانية الخطة بمقدار:' : 'Steps exceed plan target by:'} ${formatCurrency(Math.abs(budgetDifference))}`}
              </p>
            )
          )}
        </div>

        {/* Schedule & Critical Path Badges */}
        {summary.totalDurationDays > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-[#E5E5EA] dark:border-[#2C2C2E] text-[10px]">
            <div className="flex items-center gap-1.5 text-[#8E8E93]">
              <Clock className="h-3 w-3 text-[#007AFF]" />
              <span>
                {language === 'ar' ? 'المدة الإجمالية:' : 'Total Duration:'}{' '}
                <strong className="text-[#1C1C1E] dark:text-white">{summary.totalDurationDays} {language === 'ar' ? 'يوم' : 'days'}</strong>
              </span>
            </div>

            {summary.criticalStepIds.length > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                <Flame className="h-2.5 w-2.5" />
                {summary.criticalStepIds.length} {language === 'ar' ? 'مراحل حرجة' : 'Critical Steps'}
              </span>
            )}

            {onSyncDatesWithPlan && summary.earliestStartDate && summary.latestEndDate && (
              <button
                type="button"
                onClick={handleSyncWithPlan}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-[#007AFF] hover:underline"
              >
                <RefreshCw className="h-2.5 w-2.5" />
                {language === 'ar' ? 'مزامنة تواريخ الخطة' : 'Sync Plan Dates'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Steps List */}
      <div className="space-y-2.5">
        {steps.map((step, idx) => {
          const isExpanded = editingStepId === step.id;
          const target = Number(step.targetAmount) || 0;
          const allocated = Number(step.allocatedAmount) || 0;
          const isFullyFunded = target > 0 && allocated >= target;
          const isDone = step.status === 'completed' || isFullyFunded;
          const isStopped = step.status === 'stopped';
          const isSuspended = step.status === 'suspended';
          const isInProgress =
            step.status === 'in_progress' ||
            (allocated > 0 && !isDone && !isStopped && !isSuspended);
          const isBlocked = isStopped || isSuspended;

          const progress =
            step.progress !== undefined
              ? step.progress
              : target > 0
              ? Math.min(100, Math.round((allocated / target) * 100))
              : allocated > 0
              ? 100
              : 0;

          return (
            <div
              key={step.id}
              className={`rounded-2xl border transition-all ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/20 dark:border-emerald-900/40 dark:bg-emerald-950/10'
                  : isStopped
                  ? 'border-amber-300 bg-amber-50/30 dark:border-amber-900/50 dark:bg-amber-950/20'
                  : isSuspended
                  ? 'border-purple-300 bg-purple-50/30 dark:border-purple-900/50 dark:bg-purple-950/20'
                  : step.isCritical
                  ? 'border-rose-300 bg-white shadow-xs dark:border-rose-900/60 dark:bg-[#222326]'
                  : 'border-[#E5E5EA] bg-white dark:border-[#3A3A3C] dark:bg-[#222326]'
              }`}
            >
              {/* Main Step Row Header */}
              <div className="flex items-center justify-between p-3 gap-2">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  {/* Status Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(step)}
                    className="p-0.5 text-zinc-400 hover:text-[#007AFF] transition-colors shrink-0"
                    title={
                      isStopped
                        ? language === 'ar'
                          ? 'متوقفة - انقر للاستئناف'
                          : 'Stopped - Click to resume'
                        : isSuspended
                        ? language === 'ar'
                          ? `معلقة حتى ${step.suspendedUntil} - انقر للاستئناف`
                          : `Suspended until ${step.suspendedUntil} - Click to resume`
                        : isDone
                        ? language === 'ar'
                          ? 'مكتملة وممولة بالكامل'
                          : 'Completed & Fully Funded'
                        : isInProgress
                        ? language === 'ar'
                          ? 'قيد التنفيذ'
                          : 'In Progress'
                        : language === 'ar'
                        ? 'لم تبدأ'
                        : 'Not Started'
                    }
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-[#34C759]" />
                    ) : isStopped ? (
                      <Pause className="h-5 w-5 text-amber-500 fill-amber-500/20" />
                    ) : isSuspended ? (
                      <Clock className="h-5 w-5 text-purple-500" />
                    ) : isInProgress ? (
                      <PlayCircle className="h-5 w-5 text-[#007AFF]" />
                    ) : (
                      <Circle className="h-5 w-5 text-zinc-400" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold text-[#8E8E93]">#{idx + 1}</span>
                      <h5
                        className={`text-xs font-bold truncate ${
                          isDone
                            ? 'text-zinc-500 line-through'
                            : isStopped
                            ? 'text-amber-900 dark:text-amber-200'
                            : isSuspended
                            ? 'text-purple-900 dark:text-purple-200'
                            : 'text-[#1C1C1E] dark:text-white'
                        }`}
                      >
                        {step.title}
                      </h5>

                      {/* Status Badges */}
                      {isStopped && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-1.5 py-0.2 text-[9px] font-black text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                          <Pause className="h-2 w-2" />
                          {language === 'ar' ? 'متوقفة' : 'Stopped'}
                        </span>
                      )}

                      {isSuspended && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-purple-100 px-1.5 py-0.2 text-[9px] font-black text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                          <Clock className="h-2 w-2" />
                          {language === 'ar'
                            ? `معلقة حتى ${step.suspendedUntil}`
                            : `Suspended until ${step.suspendedUntil}`}
                        </span>
                      )}

                      {step.isCritical && (
                        <span className="inline-flex items-center gap-0.5 rounded-md bg-rose-100 px-1.5 py-0.2 text-[9px] font-black text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                          <Flame className="h-2 w-2" />
                          CPM
                        </span>
                      )}

                      {isFullyFunded && !isDone && (
                        <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-100 px-1.5 py-0.2 text-[9px] font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          <Check className="h-2 w-2" />
                          {language === 'ar' ? 'ممولة' : 'Funded'}
                        </span>
                      )}

                      {/* Schedule History Audit Button */}
                      {step.scheduleHistory && step.scheduleHistory.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setHistoryStep(step)}
                          className="inline-flex items-center gap-0.5 rounded-md bg-indigo-50 px-1.5 py-0.2 text-[9px] font-bold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 transition-colors"
                          title={language === 'ar' ? 'سجل التعديلات الزمنية' : 'Schedule Audit History'}
                        >
                          <History className="h-2 w-2" />
                          <span>{step.scheduleHistory.length}</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-[#8E8E93] mt-0.5 flex-wrap">
                      <span className="font-mono font-bold text-[#1C1C1E] dark:text-zinc-300">
                        {formatCurrency(allocated)} / {formatCurrency(target)} ({progress}%)
                      </span>
                      <span>•</span>
                      <span>
                        {step.startDate} ➔ {step.endDate} ({step.duration}d)
                      </span>
                    </div>

                    {/* Step Dedicated Financial Progress Bar */}
                    <div className="mt-1.5 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-[#E5E5EA] dark:bg-[#38383A]">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isFullyFunded
                            ? 'bg-[#34C759]'
                            : isStopped
                            ? 'bg-amber-400'
                            : isSuspended
                            ? 'bg-purple-400'
                            : isInProgress
                            ? 'bg-[#007AFF]'
                            : 'bg-zinc-400'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right controls: Lifecycle actions, Allocate, Reorder & Expand */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Quick Stop/Resume Button */}
                  {isStopped ? (
                    <button
                      type="button"
                      onClick={() => handleResumeStep(step.id)}
                      className="flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-2xs"
                      title={language === 'ar' ? 'استئناف المرحلة' : 'Resume step'}
                    >
                      <Play className="h-2.5 w-2.5" />
                      <span className="hidden sm:inline">{language === 'ar' ? 'استئناف' : 'Resume'}</span>
                    </button>
                  ) : isSuspended ? (
                    <button
                      type="button"
                      onClick={() => handleResumeStep(step.id)}
                      className="flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-2xs"
                      title={language === 'ar' ? 'استئناف المرحلة فوراً' : 'Resume now'}
                    >
                      <Play className="h-2.5 w-2.5" />
                      <span className="hidden sm:inline">{language === 'ar' ? 'استئناف' : 'Resume'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStopStep(step.id)}
                      className="flex items-center gap-1 rounded-lg px-1.5 py-0.5 text-[10px] font-medium text-[#8E8E93] hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                      title={language === 'ar' ? 'إيقاف المرحلة مؤقتاً' : 'Stop step'}
                    >
                      <Pause className="h-2.5 w-2.5" />
                      <span className="hidden sm:inline">{language === 'ar' ? 'إيقاف' : 'Stop'}</span>
                    </button>
                  )}

                  {/* Suspend Button */}
                  {!isDone && (
                    <button
                      type="button"
                      onClick={() => {
                        setSuspendStep(step);
                        setSuspendPreset(7);
                        setCustomResumeDate(addDays(toDateOnlyString(new Date()), 7));
                      }}
                      className="flex items-center gap-1 rounded-lg px-1.5 py-0.5 text-[10px] font-medium text-[#8E8E93] hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                      title={language === 'ar' ? 'تعليق المرحلة لمدة محددة' : 'Suspend for duration'}
                    >
                      <Clock className="h-2.5 w-2.5" />
                      <span className="hidden sm:inline">{language === 'ar' ? 'تعليق' : 'Suspend'}</span>
                    </button>
                  )}

                  {/* Reschedule Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setRescheduleStep(step);
                      setRescheduleDate(step.startDate);
                      setRescheduleDuration(step.duration);
                      setRescheduleReason('');
                    }}
                    className="flex items-center gap-1 rounded-lg px-1.5 py-0.5 text-[10px] font-medium text-[#8E8E93] hover:text-[#007AFF] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                    title={language === 'ar' ? 'إعادة جدولة المرحلة مع تحديث التبعيات' : 'Reschedule & cascade'}
                  >
                    <CalendarClock className="h-2.5 w-2.5" />
                    <span className="hidden sm:inline">{language === 'ar' ? 'جدولة' : 'Reschedule'}</span>
                  </button>

                  {/* Allocate Button (Blocked when stopped or suspended) */}
                  {onOpenAllocate && (
                    <button
                      type="button"
                      disabled={isBlocked}
                      onClick={() => onOpenAllocate(step.id)}
                      className={`flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold transition-all shadow-2xs ${
                        isBlocked
                          ? 'opacity-40 cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                          : isFullyFunded
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-[#007AFF] text-white hover:bg-[#0062CC] active:scale-95'
                      }`}
                      title={
                        isStopped
                          ? language === 'ar'
                            ? 'لا يمكن تخصيص مبالغ لمرحلة متوقفة. يرجى استئنافها أولاً.'
                            : 'Cannot allocate funds to a stopped step. Resume it first.'
                          : isSuspended
                          ? language === 'ar'
                            ? `المرحلة معلقة حتى ${step.suspendedUntil}. لا يمكن تخصيص مبالغ.`
                            : `Step suspended until ${step.suspendedUntil}. Allocations blocked.`
                          : language === 'ar'
                          ? 'تخصيص رصيد لهذه المرحلة'
                          : 'Allocate funds to this step'
                      }
                    >
                      <Plus className="h-3 w-3" />
                      <span>{language === 'ar' ? 'تخصيص' : 'Allocate'}</span>
                    </button>
                  )}

                  {/* Step Reorder Buttons */}
                  <div className="flex items-center gap-0.5 border-r border-[#E5E5EA] dark:border-[#38383A] pr-1.5 mr-0.5 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-1.5 rtl:mr-0 rtl:ml-0.5">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveStep(idx, 'up')}
                      className="rounded p-1 text-[#8E8E93] hover:text-[#007AFF] hover:bg-[#F2F2F7] disabled:opacity-25 dark:hover:bg-[#38383A] transition-colors"
                      title={language === 'ar' ? 'تحريك للأعلى' : 'Move Up'}
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === steps.length - 1}
                      onClick={() => handleMoveStep(idx, 'down')}
                      className="rounded p-1 text-[#8E8E93] hover:text-[#007AFF] hover:bg-[#F2F2F7] disabled:opacity-25 dark:hover:bg-[#38383A] transition-colors"
                      title={language === 'ar' ? 'تحريك للأسفل' : 'Move Down'}
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {step.predecessors.length > 0 && (
                    <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-[#007AFF] dark:bg-blue-950/50 dark:text-blue-300">
                      <Link className="h-2.5 w-2.5" />
                      {step.predecessors.length} {language === 'ar' ? 'اعتمادية' : 'dep'}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => setEditingStepId(isExpanded ? null : step.id)}
                    className="rounded-lg p-1 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded In-Place Step Editor */}
              {isExpanded && (
                <div className="border-t border-[#F2F2F7] bg-[#F9F9FB] p-3.5 dark:border-[#38383A] dark:bg-[#1C1C1E] rounded-b-2xl space-y-3 animate-in fade-in duration-150 text-xs">
                  {/* Title & Target Amount Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block">
                        {language === 'ar' ? 'عنوان المرحلة / النشاط' : 'Activity Title'}
                      </label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={e => handleUpdateStepField(step.id, { title: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D1D1D6] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block">
                        {language === 'ar' ? 'ميزانية المرحلة المطلوبة' : 'Target Budget (IQD)'}
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={formatAmountInput(step.targetAmount.toString())}
                        onChange={e =>
                          handleUpdateStepField(step.id, {
                            targetAmount: parseRawAmount(e.target.value) || 0,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-[#D1D1D6] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Dates & Duration (Days) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block">
                        {language === 'ar' ? 'تاريخ البدء' : 'Start Date'}
                      </label>
                      <input
                        type="date"
                        value={step.startDate}
                        onChange={e => handleUpdateStepField(step.id, { startDate: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#D1D1D6] bg-white px-2 py-1.5 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block">
                        {language === 'ar' ? 'المدة (أيام)' : 'Duration (Days)'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={step.duration}
                        onChange={e =>
                          handleUpdateStepField(step.id, {
                            duration: Math.max(1, parseInt(e.target.value, 10) || 1),
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-[#D1D1D6] bg-white px-2 py-1.5 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block">
                        {language === 'ar' ? 'تاريخ الانتهاء المحسوب' : 'Calculated End Date'}
                      </label>
                      <div className="mt-1 rounded-xl bg-[#E5E5EA]/70 dark:bg-[#2C2C2E] px-2 py-1.5 text-xs font-semibold text-[#1C1C1E] dark:text-white">
                        {step.endDate}
                      </div>
                    </div>
                  </div>

                  {/* Predecessors / Primavera P6 Relationships */}
                  <div className="space-y-2 pt-1 border-t border-[#E5E5EA] dark:border-[#38383A]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1">
                      <Link className="h-3 w-3 text-[#007AFF]" />
                      {language === 'ar' ? 'الاعتماديات السابقة (Predecessors)' : 'Predecessor Relationships'}
                    </span>

                    {/* Existing Predecessor Badges */}
                    {step.predecessors.length === 0 ? (
                      <p className="text-[11px] text-[#8E8E93] italic">
                        {language === 'ar'
                          ? 'لا توجد اعتماديات مرتبطة (تبدأ وفق تاريخها المحدد).'
                          : 'No predecessor dependencies (starts independently on specified start date).'}
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {step.predecessors.map((rel, rIdx) => {
                          const predStep = steps.find(s => s.id === rel.predecessorId);
                          const lagText =
                            rel.lag !== undefined && rel.lag !== 0
                              ? `${rel.lag >= 0 ? '+' : ''}${rel.lag}d`
                              : '+0d';

                          return (
                            <span
                              key={rIdx}
                              className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-white px-2 py-1 text-[11px] font-semibold text-[#007AFF] dark:border-blue-900 dark:bg-[#2C2C2E] dark:text-blue-300"
                            >
                              <span>{predStep ? predStep.title : 'Activity'}</span>
                              <strong className="rounded bg-blue-100 px-1 text-[9px] dark:bg-blue-900">
                                {rel.type}
                                {lagText}
                              </strong>
                              <button
                                type="button"
                                onClick={() => handleRemovePredecessor(step.id, rel.predecessorId)}
                                className="ml-1 text-[#8E8E93] hover:text-[#FF3B30]"
                              >
                                ×
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Add Relationship Control */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <select
                        value={newRelPredecessorId}
                        onChange={e => setNewRelPredecessorId(e.target.value)}
                        className="rounded-xl border border-[#D1D1D6] bg-white px-2 py-1.5 text-[11px] font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                      >
                        <option value="">{language === 'ar' ? '-- اختر مرحلة سابقة --' : '-- Choose Predecessor --'}</option>
                        {steps
                          .filter(s => s.id !== step.id)
                          .map(s => (
                            <option key={s.id} value={s.id}>
                              {s.title} ({s.startDate})
                            </option>
                          ))}
                      </select>

                      <select
                        value={newRelType}
                        onChange={e => setNewRelType(e.target.value as DependencyType)}
                        className="rounded-xl border border-[#D1D1D6] bg-white px-2 py-1.5 text-[11px] font-bold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                        title="FS: Finish to Start, SS: Start to Start, FF: Finish to Finish, SF: Start to Finish"
                      >
                        <option value="FS">FS (Finish ➔ Start)</option>
                        <option value="SS">SS (Start ➔ Start)</option>
                        <option value="FF">FF (Finish ➔ Finish)</option>
                        <option value="SF">SF (Start ➔ Finish)</option>
                      </select>

                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-[#8E8E93]">Lag:</span>
                        <input
                          type="number"
                          value={newRelLag}
                          onChange={e => setNewRelLag(parseInt(e.target.value, 10) || 0)}
                          className="w-14 rounded-xl border border-[#D1D1D6] bg-white px-1.5 py-1.5 text-[11px] font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white text-center"
                          placeholder="0d"
                        />
                        <span className="text-[10px] text-[#8E8E93]">d</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddPredecessor(step.id)}
                        disabled={!newRelPredecessorId}
                        className="rounded-xl bg-[#007AFF] px-2.5 py-1.5 text-[11px] font-bold text-white shadow-xs hover:bg-[#0062CC] disabled:opacity-40 transition-colors"
                      >
                        + {language === 'ar' ? 'ربط' : 'Link'}
                      </button>
                    </div>
                  </div>

                  {/* Footer Actions: Delete Step */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E5E5EA] dark:border-[#38383A]">
                    <span className="text-[10px] text-[#8E8E93]">
                      {language === 'ar' ? 'إعادة الحساب التلقائي مفعلة لجميع المراحل اللاحقة.' : 'Cascading re-baselining auto-applied.'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteStep(step.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#FF3B30] hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {language === 'ar' ? 'حذف المرحلة' : 'Delete Step'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Step Button */}
      <button
        type="button"
        onClick={handleAddStep}
        className="w-full flex items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-[#D1D1D6] py-2.5 text-xs font-bold text-[#007AFF] hover:bg-blue-50/50 dark:border-[#3A3A3C] dark:hover:bg-blue-950/20 transition-colors"
      >
        <Plus className="h-4 w-4" />
        {language === 'ar' ? 'إضافة مرحلة عمل جديدة (WBS Step)' : 'Add Work Breakdown Step (CPM)'}
      </button>

      {/* Suspend Step Modal */}
      {suspendStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2F2F7] dark:border-[#2C2C2E]">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-purple-100 p-1.5 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                    {language === 'ar' ? 'تعليق المرحلة مؤقتاً' : 'Suspend Step'}
                  </h4>
                  <p className="text-[11px] text-[#8E8E93] truncate max-w-[200px]">
                    {suspendStep.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSuspendStep(null)}
                className="rounded-lg p-1 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <p className="text-zinc-600 dark:text-zinc-300">
                {language === 'ar'
                  ? 'اختر مدة التعليق. سيتم تجميد التخصيص المالي تلقائياً حتى تاريخ الاستئناف.'
                  : 'Select suspension duration. Fund allocations will be frozen until the resume date.'}
              </p>

              {/* Presets */}
              <div className="grid grid-cols-3 gap-2">
                {[7, 14, 30].map(days => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => {
                      setSuspendPreset(days);
                      setCustomResumeDate(addDays(toDateOnlyString(new Date()), days));
                    }}
                    className={`rounded-xl border py-2 text-center text-xs font-bold transition-all ${
                      suspendPreset === days
                        ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                        : 'border-[#E5E5EA] text-[#8E8E93] hover:border-purple-300 dark:border-[#38383A]'
                    }`}
                  >
                    {days} {language === 'ar' ? 'أيام' : 'days'}
                  </button>
                ))}
              </div>

              {/* Custom Date Picker */}
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] block mb-1 uppercase tracking-wider">
                  {language === 'ar' ? 'تاريخ الاستئناف المجدول' : 'Scheduled Resume Date'}
                </label>
                <input
                  type="date"
                  value={customResumeDate}
                  min={toDateOnlyString(new Date())}
                  onChange={e => {
                    setCustomResumeDate(e.target.value);
                    setSuspendPreset('custom');
                  }}
                  className="w-full rounded-xl border border-[#D1D1D6] bg-white px-3 py-2 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F2F2F7] dark:border-[#2C2C2E]">
                <button
                  type="button"
                  onClick={() => setSuspendStep(null)}
                  className="rounded-xl px-3 py-1.5 text-xs font-semibold text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E]"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={handleApplySuspend}
                  className="rounded-xl bg-purple-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-purple-700 active:scale-95 transition-all"
                >
                  {language === 'ar' ? 'تأكيد التعليق' : 'Confirm Suspension'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Step Modal */}
      {rescheduleStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2F2F7] dark:border-[#2C2C2E]">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-blue-100 p-1.5 text-[#007AFF] dark:bg-blue-950 dark:text-blue-300">
                  <CalendarClock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                    {language === 'ar' ? 'إعادة جدولة المرحلة' : 'Reschedule Step'}
                  </h4>
                  <p className="text-[11px] text-[#8E8E93] truncate max-w-[200px]">
                    {rescheduleStep.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRescheduleStep(null)}
                className="rounded-lg p-1 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleApplyReschedule} className="mt-4 space-y-3 text-xs">
              <p className="text-zinc-600 dark:text-zinc-300">
                {language === 'ar'
                  ? 'سيتم ترحيل التواريخ تلقائياً للمراحل التابعة المتأثرة بالمسار الحرج (CPM).'
                  : 'Downstream dependent activities will automatically cascade forward according to CPM rules.'}
              </p>

              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] block mb-1 uppercase tracking-wider">
                  {language === 'ar' ? 'تاريخ البدء الجديد' : 'New Start Date'}
                </label>
                <input
                  type="date"
                  required
                  value={rescheduleDate}
                  onChange={e => setRescheduleDate(e.target.value)}
                  className="w-full rounded-xl border border-[#D1D1D6] bg-white px-3 py-2 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] block mb-1 uppercase tracking-wider">
                  {language === 'ar' ? 'المدة الجديدة (أيام)' : 'New Duration (Days)'}
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={rescheduleDuration}
                  onChange={e => setRescheduleDuration(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full rounded-xl border border-[#D1D1D6] bg-white px-3 py-2 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] block mb-1 uppercase tracking-wider">
                  {language === 'ar' ? 'سبب إعادة الجدولة (اختياري)' : 'Adjustment Reason (Optional)'}
                </label>
                <input
                  type="text"
                  placeholder={
                    language === 'ar'
                      ? 'مثال: تأخر توريد المواد، تعديل الخطة'
                      : 'e.g., Procurement delay, resource bottleneck'
                  }
                  value={rescheduleReason}
                  onChange={e => setRescheduleReason(e.target.value)}
                  className="w-full rounded-xl border border-[#D1D1D6] bg-white px-3 py-2 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                />
              </div>

              {/* End Date Preview */}
              <div className="rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E] p-2.5 text-[11px] flex items-center justify-between">
                <span className="text-[#8E8E93]">{language === 'ar' ? 'تاريخ الانتهاء المحسوب:' : 'Calculated End Date:'}</span>
                <span className="font-bold text-[#1C1C1E] dark:text-white">
                  {addDays(toDateOnlyString(rescheduleDate || new Date().toISOString()), rescheduleDuration)}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F2F2F7] dark:border-[#2C2C2E]">
                <button
                  type="button"
                  onClick={() => setRescheduleStep(null)}
                  className="rounded-xl px-3 py-1.5 text-xs font-semibold text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E]"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#007AFF] px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#0062CC] active:scale-95 transition-all"
                >
                  {language === 'ar' ? 'تطبيق وإعادة الترحيل' : 'Apply & Cascade'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History Audit Modal */}
      {historyStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2F2F7] dark:border-[#2C2C2E]">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-indigo-100 p-1.5 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  <History className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                    {language === 'ar' ? 'سجل التعديلات الزمنية' : 'Schedule Audit History'}
                  </h4>
                  <p className="text-[11px] text-[#8E8E93] truncate max-w-[240px]">
                    {historyStep.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHistoryStep(null)}
                className="rounded-lg p-1 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto text-xs">
              {(!historyStep.scheduleHistory || historyStep.scheduleHistory.length === 0) ? (
                <p className="text-center py-4 text-xs text-[#8E8E93]">
                  {language === 'ar' ? 'لا توجد تعديلات سابقة مسجلة.' : 'No schedule adjustments recorded.'}
                </p>
              ) : (
                historyStep.scheduleHistory.map((adj, hIdx) => (
                  <div
                    key={hIdx}
                    className="rounded-xl border border-[#E5E5EA] dark:border-[#38383A] bg-[#F9F9FB] dark:bg-[#2C2C2E]/60 p-3 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#8E8E93]">
                      <span>
                        #{hIdx + 1} • {new Date(adj.adjustedAt).toLocaleDateString()}
                      </span>
                      {adj.reason && (
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {adj.reason}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500 line-through">
                        {adj.previousStartDate} ({adj.previousDuration}d)
                      </span>
                      <span className="text-[#007AFF] font-bold">
                        ➔ {adj.newStartDate} ({adj.newDuration}d)
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-[#F2F2F7] dark:border-[#2C2C2E]">
              <button
                type="button"
                onClick={() => setHistoryStep(null)}
                className="rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E] px-4 py-1.5 text-xs font-bold text-[#1C1C1E] dark:text-white hover:bg-[#E5E5EA]"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
