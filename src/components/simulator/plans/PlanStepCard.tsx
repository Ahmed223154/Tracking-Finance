import React, { useState } from 'react';
import { PlanStep, StepStatus } from '../../../types/finance';
import { useI18n } from '../../../context/I18nContext';
import { addDays, toDateOnlyString, parseDate } from '../../../services/cpmEngine';
import { financeStore } from '../../../store/useFinanceStore';
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  Flame,
  Link,
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Check,
  Calendar,
  Clock,
  Wallet,
  Play,
  Pause,
  CalendarClock,
  MoreVertical,
  X,
  History,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export interface PlanStepCardProps {
  step: PlanStep;
  index: number;
  totalSteps: number;
  allSteps?: PlanStep[];
  planId?: string;
  currency?: string;
  onOpenAllocate?: (stepId: string) => void;
  onToggleStatus?: (stepId: string) => void;
  onStopStep?: (stepId: string) => void;
  onResumeStep?: (stepId: string) => void;
  onSuspendStep?: (stepId: string, durationDaysOrDate: number | string) => void;
  onRescheduleStep?: (
    stepId: string,
    newStartDate: string,
    newDuration: number,
    reason?: string
  ) => void;
  onEdit?: (stepId: string) => void;
  onDelete?: (stepId: string) => void;
  onMove?: (index: number, direction: 'up' | 'down') => void;
  allowReorder?: boolean;
  readOnly?: boolean;
  showScheduleInfo?: boolean;
}

export const PlanStepCard: React.FC<PlanStepCardProps> = ({
  step,
  index,
  totalSteps,
  allSteps = [],
  planId,
  currency = 'IQD',
  onOpenAllocate,
  onToggleStatus,
  onStopStep,
  onResumeStep,
  onSuspendStep,
  onRescheduleStep,
  onEdit,
  onDelete,
  onMove,
  allowReorder = false,
  readOnly = false,
  showScheduleInfo = true,
}) => {
  const { language, formatCurrency } = useI18n();

  // Modal / Popover states
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);

  // Form states for Reschedule
  const [rescheduleDate, setRescheduleDate] = useState(step.startDate || toDateOnlyString(new Date()));
  const [rescheduleDuration, setRescheduleDuration] = useState<number>(step.duration || 14);
  const [rescheduleReason, setRescheduleReason] = useState('');

  // Form states for Suspend
  const [suspendPreset, setSuspendPreset] = useState<number | 'custom'>(7);
  const [customResumeDate, setCustomResumeDate] = useState(
    addDays(toDateOnlyString(new Date()), 7)
  );

  const target = Number(step.targetAmount) || 0;
  const allocated = Number(step.allocatedAmount) || 0;
  const isFullyFunded = target > 0 && allocated >= target;
  const isDone = step.status === 'completed' || isFullyFunded;
  const isStopped = step.status === 'stopped';
  const isSuspended = step.status === 'suspended';
  const isInProgress = step.status === 'in_progress' || (allocated > 0 && !isDone && !isStopped && !isSuspended);

  // Compute progress capped at 100%
  const progress =
    step.progress !== undefined
      ? step.progress
      : target > 0
      ? Math.min(100, Math.round((allocated / target) * 100))
      : allocated > 0
      ? 100
      : 0;

  const remaining = Math.max(0, target - allocated);

  // Lifecycle Actions handlers
  const handleStop = () => {
    setShowActionMenu(false);
    if (onStopStep) {
      onStopStep(step.id);
    } else if (planId) {
      financeStore.stopPlanStep(planId, step.id);
    }
  };

  const handleResume = () => {
    setShowActionMenu(false);
    if (onResumeStep) {
      onResumeStep(step.id);
    } else if (planId) {
      financeStore.resumePlanStep(planId, step.id);
    }
  };

  const handleApplySuspend = () => {
    const value = suspendPreset === 'custom' ? customResumeDate : suspendPreset;
    if (onSuspendStep) {
      onSuspendStep(step.id, value);
    } else if (planId) {
      financeStore.suspendPlanStep(planId, step.id, value);
    }
    setShowSuspendModal(false);
    setShowActionMenu(false);
  };

  const handleApplyReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDuration = Math.max(1, Math.round(Number(rescheduleDuration) || 1));
    if (onRescheduleStep) {
      onRescheduleStep(step.id, rescheduleDate, cleanDuration, rescheduleReason);
    } else if (planId) {
      financeStore.reschedulePlanStep(planId, step.id, rescheduleDate, cleanDuration, rescheduleReason);
    }
    setShowRescheduleModal(false);
    setShowActionMenu(false);
    setRescheduleReason('');
  };

  // Format suspended until date readable
  const formatSuspendedUntil = (dateStr?: string | null) => {
    if (!dateStr) return '';
    try {
      const d = parseDate(dateStr);
      return d.toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const computedEndDate = addDays(rescheduleDate, rescheduleDuration);

  return (
    <div
      id={`plan-step-card-${step.id}`}
      className={`group relative rounded-2xl border transition-all duration-200 ${
        isDone
          ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/50 dark:bg-emerald-950/20'
          : isStopped
          ? 'border-amber-300 bg-amber-50/20 dark:border-amber-900/40 dark:bg-amber-950/15'
          : isSuspended
          ? 'border-purple-300 bg-purple-50/20 dark:border-purple-900/40 dark:bg-purple-950/15'
          : isInProgress
          ? 'border-blue-200 bg-white ring-1 ring-blue-400/20 shadow-xs dark:border-blue-900/40 dark:bg-[#252528]'
          : step.isCritical
          ? 'border-rose-200 bg-white dark:border-rose-900/50 dark:bg-[#252528]'
          : 'border-[#E5E5EA] bg-white dark:border-[#3A3A3C] dark:bg-[#252528]'
      } p-3.5 sm:p-4 shadow-xs hover:shadow-sm`}
    >
      {/* Header Row: Status Toggle, Title, Status Badges, Quick Lifecycle Controls */}
      <div className="flex items-start justify-between gap-2.5">
        {/* Left: Icon & Title */}
        <div className="flex items-start gap-2.5 min-w-0 flex-1">
          {onToggleStatus && !readOnly ? (
            <button
              type="button"
              onClick={() => onToggleStatus(step.id)}
              className="mt-0.5 rounded-full text-[#8E8E93] hover:text-[#007AFF] transition-colors shrink-0"
              title={
                isDone
                  ? language === 'ar'
                    ? 'مكتملة'
                    : 'Completed'
                  : isStopped
                  ? language === 'ar'
                    ? 'متوقفة مؤقتاً'
                    : 'Stopped'
                  : isSuspended
                  ? language === 'ar'
                    ? 'معلقة زمنياً'
                    : 'Suspended'
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
                <Circle className="h-5 w-5 text-[#C7C7CC] dark:text-[#636366]" />
              )}
            </button>
          ) : (
            <div className="mt-0.5 shrink-0">
              {isDone ? (
                <CheckCircle2 className="h-5 w-5 text-[#34C759]" />
              ) : isStopped ? (
                <Pause className="h-5 w-5 text-amber-500 fill-amber-500/20" />
              ) : isSuspended ? (
                <Clock className="h-5 w-5 text-purple-500" />
              ) : isInProgress ? (
                <PlayCircle className="h-5 w-5 text-[#007AFF]" />
              ) : (
                <Circle className="h-5 w-5 text-[#C7C7CC] dark:text-[#636366]" />
              )}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-[#8E8E93]">#{index + 1}</span>
              <h5
                className={`text-xs sm:text-sm font-bold truncate ${
                  isDone
                    ? 'text-zinc-600 line-through dark:text-zinc-300'
                    : 'text-[#1C1C1E] dark:text-white'
                }`}
              >
                {step.title}
              </h5>

              {/* Status Badges */}
              {isStopped && (
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-[9px] font-black text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  <Pause className="h-2.5 w-2.5 fill-current" />
                  {language === 'ar' ? 'متوقفة' : 'Stopped'}
                </span>
              )}

              {isSuspended && (
                <span className="inline-flex items-center gap-1 rounded-md bg-purple-100 px-2 py-0.5 text-[9px] font-black text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                  <Clock className="h-2.5 w-2.5" />
                  <span>
                    {language === 'ar'
                      ? `معلقة حتى ${formatSuspendedUntil(step.suspendedUntil)}`
                      : `Suspended until ${formatSuspendedUntil(step.suspendedUntil)}`}
                  </span>
                </span>
              )}

              {isInProgress && !isStopped && !isSuspended && (
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-[9px] font-black text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                  <Play className="h-2.5 w-2.5 fill-current" />
                  {language === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
                </span>
              )}

              {isDone && (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <Check className="h-2.5 w-2.5" />
                  {language === 'ar' ? 'مكتملة' : 'Completed'}
                </span>
              )}

              {/* Critical Path Badge */}
              {step.isCritical && (
                <span className="inline-flex items-center gap-0.5 rounded bg-rose-100 px-1.5 py-0.2 text-[9px] font-black text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  <Flame className="h-2.5 w-2.5" />
                  CPM
                </span>
              )}

              {/* Fully Funded Badge */}
              {isFullyFunded && !isDone && (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <Check className="h-2.5 w-2.5" />
                  {language === 'ar' ? 'ممولة' : 'Funded'}
                </span>
              )}

              {/* Schedule Adjustment History Indicator */}
              {step.scheduleHistory && step.scheduleHistory.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowHistoryModal(true)}
                  className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-1.5 py-0.5 text-[9px] font-bold text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
                  title={
                    language === 'ar'
                      ? `تمت إعادة جدولة هذه المرحلة (${step.scheduleHistory.length} تعديل)`
                      : `Rescheduled (${step.scheduleHistory.length} adjustments)`
                  }
                >
                  <History className="h-2.5 w-2.5" />
                  <span>{step.scheduleHistory.length}</span>
                </button>
              )}
            </div>

            {/* Schedule Info (Dates & Duration) */}
            {showScheduleInfo && (
              <div className="flex items-center gap-2 text-[10px] text-[#8E8E93] mt-0.5 flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {step.startDate} ➔ {step.endDate || step.startDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {step.duration} {language === 'ar' ? 'يوم' : 'days'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick Lifecycle Controls, Allocate, and Action Menu */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Stop / Resume Quick Action Button */}
          {!readOnly && (
            <>
              {isStopped || isSuspended ? (
                <button
                  type="button"
                  onClick={handleResume}
                  className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 transition-colors border border-emerald-200 dark:border-emerald-800"
                  title={language === 'ar' ? 'استئناف المرحلة' : 'Resume Step'}
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span className="hidden sm:inline">{language === 'ar' ? 'استئناف' : 'Resume'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStop}
                  className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 transition-colors border border-amber-200 dark:border-amber-800"
                  title={language === 'ar' ? 'إيقاف مؤقت للمرحلة' : 'Stop Step'}
                >
                  <Pause className="h-3 w-3 fill-current" />
                  <span className="hidden sm:inline">{language === 'ar' ? 'إيقاف' : 'Stop'}</span>
                </button>
              )}

              {/* Suspend Quick Trigger */}
              <button
                type="button"
                onClick={() => setShowSuspendModal(true)}
                className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold transition-colors border ${
                  isSuspended
                    ? 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
                    : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
                }`}
                title={language === 'ar' ? 'تعليق لفترة محددة' : 'Suspend for Duration'}
              >
                <Clock className="h-3 w-3" />
                <span className="hidden sm:inline">{language === 'ar' ? 'تعليق' : 'Suspend'}</span>
              </button>

              {/* Reschedule Quick Trigger */}
              <button
                type="button"
                onClick={() => {
                  setRescheduleDate(step.startDate || toDateOnlyString(new Date()));
                  setRescheduleDuration(step.duration || 14);
                  setShowRescheduleModal(true);
                }}
                className="flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-bold text-[#007AFF] hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 transition-colors border border-blue-200 dark:border-blue-800"
                title={language === 'ar' ? 'إعادة جدولة المرحلة' : 'Reschedule Step'}
              >
                <CalendarClock className="h-3 w-3" />
                <span className="hidden sm:inline">{language === 'ar' ? 'جدولة' : 'Reschedule'}</span>
              </button>
            </>
          )}

          {/* Quick Allocate Button */}
          {onOpenAllocate && (
            <button
              type="button"
              disabled={isStopped || isSuspended}
              onClick={() => onOpenAllocate(step.id)}
              className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold transition-all shadow-xs ${
                isStopped || isSuspended
                  ? 'opacity-40 cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                  : isFullyFunded
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-[#007AFF] text-white hover:bg-[#0062CC] shadow-blue-500/20 active:scale-95'
              }`}
              title={
                isStopped || isSuspended
                  ? language === 'ar'
                    ? 'التخصيص مجمد لأن المرحلة متوقفة أو معلقة'
                    : 'Allocation frozen while step is stopped or suspended'
                  : language === 'ar'
                  ? `تخصيص رصيد لهذه المرحلة (المتبقي: ${formatCurrency(remaining)})`
                  : `Allocate funds to this step (Remaining: ${formatCurrency(remaining)})`
              }
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{language === 'ar' ? 'تخصيص' : 'Allocate'}</span>
            </button>
          )}

          {/* Reorder Buttons */}
          {allowReorder && onMove && !readOnly && (
            <div className="flex items-center gap-0.5 border-r border-[#E5E5EA] dark:border-[#38383A] pr-1.5 mr-0.5 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-1.5 rtl:mr-0 rtl:ml-0.5">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => onMove(index, 'up')}
                className="rounded p-1 text-[#8E8E93] hover:text-[#007AFF] hover:bg-[#F2F2F7] disabled:opacity-25 dark:hover:bg-[#38383A] transition-colors"
                title={language === 'ar' ? 'تحريك للأعلى' : 'Move Up'}
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                disabled={index === totalSteps - 1}
                onClick={() => onMove(index, 'down')}
                className="rounded p-1 text-[#8E8E93] hover:text-[#007AFF] hover:bg-[#F2F2F7] disabled:opacity-25 dark:hover:bg-[#38383A] transition-colors"
                title={language === 'ar' ? 'تحريك للأسفل' : 'Move Down'}
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Delete Button */}
          {onDelete && !readOnly && (
            <button
              type="button"
              onClick={() => onDelete(step.id)}
              className="rounded-lg p-1 text-[#8E8E93] hover:text-[#FF3B30] hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              title={language === 'ar' ? 'حذف المرحلة' : 'Delete Step'}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Financial Progress Section */}
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5 text-[#8E8E93]" />
            <span className="font-bold text-[#1C1C1E] dark:text-white">
              {formatCurrency(allocated)}
            </span>
            <span className="text-[#8E8E93]">/</span>
            <span className="text-[#8E8E93]">{formatCurrency(target)}</span>
          </div>

          <div className="flex items-center gap-1">
            <span
              className={`font-black ${
                isFullyFunded
                  ? 'text-[#34C759]'
                  : isStopped
                  ? 'text-amber-600'
                  : isSuspended
                  ? 'text-purple-600'
                  : isInProgress
                  ? 'text-[#007AFF]'
                  : 'text-[#8E8E93]'
              }`}
            >
              {progress}%
            </span>
            {remaining > 0 && (
              <span className="text-[10px] text-[#8E8E93] hidden sm:inline">
                ({language === 'ar' ? 'المتبقي:' : 'rem:'} {formatCurrency(remaining)})
              </span>
            )}
          </div>
        </div>

        {/* Dedicated Progress Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5EA] dark:bg-[#38383A]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isFullyFunded
                ? 'bg-[#34C759]'
                : isStopped
                ? 'bg-amber-500'
                : isSuspended
                ? 'bg-purple-500'
                : step.isCritical
                ? 'bg-rose-500'
                : isInProgress
                ? 'bg-[#007AFF]'
                : 'bg-zinc-400'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Predecessors / Dependencies Chips */}
      {step.predecessors && step.predecessors.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5 pt-1 border-t border-[#F2F2F7] dark:border-[#38383A] text-[9px]">
          {step.predecessors.map((rel, rIdx) => {
            const pred = allSteps.find(s => s.id === rel.predecessorId);
            const lagStr =
              rel.lag !== undefined && rel.lag !== 0
                ? `${rel.lag >= 0 ? '+' : ''}${rel.lag}d`
                : '+0d';
            return (
              <span
                key={rIdx}
                className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[#007AFF] dark:bg-blue-950/60 dark:text-blue-300 font-medium"
              >
                <Link className="h-2.5 w-2.5" />
                <span>{pred ? pred.title : `Step #${rIdx + 1}`}</span>
                <strong className="font-mono text-[8px] bg-blue-100 dark:bg-blue-900 px-1 rounded">
                  {rel.type}
                  {lagStr}
                </strong>
              </span>
            );
          })}
        </div>
      )}

      {/* ===================== RESCHEDULE MODAL ===================== */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#38383A]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-[#38383A]">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#007AFF] dark:bg-blue-950/50">
                  <CalendarClock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                    {language === 'ar' ? 'إعادة جدولة المرحلة' : 'Reschedule Step'}
                  </h4>
                  <p className="text-[11px] text-[#8E8E93] truncate max-w-[240px]">{step.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="rounded-full p-1 text-[#8E8E93] hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleApplyReschedule} className="mt-4 space-y-4">
              {/* Start Date */}
              <div>
                <label className="block text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">
                  {language === 'ar' ? 'تاريخ البدء الجديد' : 'New Start Date'}
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={e => setRescheduleDate(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D1D1D6] bg-white px-3.5 py-2.5 text-xs text-[#1C1C1E] focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] dark:border-[#38383A] dark:bg-[#2C2C2E] dark:text-white font-medium"
                />
              </div>

              {/* Duration in Days */}
              <div>
                <label className="block text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">
                  {language === 'ar' ? 'المدة المخططة (بالأيام)' : 'Planned Duration (Days)'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="1825"
                    value={rescheduleDuration}
                    onChange={e => setRescheduleDuration(Math.max(1, parseInt(e.target.value) || 1))}
                    required
                    className="flex-1 rounded-xl border border-[#D1D1D6] bg-white px-3.5 py-2.5 text-xs text-[#1C1C1E] focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] dark:border-[#38383A] dark:bg-[#2C2C2E] dark:text-white font-medium"
                  />
                  <div className="flex gap-1">
                    {[7, 14, 30].map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setRescheduleDuration(d)}
                        className={`rounded-lg px-2.5 py-2 text-xs font-bold border transition-colors ${
                          rescheduleDuration === d
                            ? 'bg-[#007AFF] text-white border-[#007AFF]'
                            : 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
                        }`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculated End Date Preview */}
              <div className="rounded-xl bg-[#F2F2F7] p-3 text-xs dark:bg-[#2C2C2E]">
                <div className="flex items-center justify-between text-[#8E8E93]">
                  <span>{language === 'ar' ? 'تاريخ الانتهاء المحسوب:' : 'Computed End Date:'}</span>
                  <span className="font-mono font-bold text-[#1C1C1E] dark:text-white">
                    {computedEndDate}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-[#8E8E93]">
                  {language === 'ar'
                    ? 'سيتم ترحيل وتحديث تواريخ المراحل اللاحقة المرتبطة بهذه المرحلة تلقائياً وفق شبكة CPM.'
                    : 'Successor steps linked to this step will have their schedules automatically cascaded via CPM forward pass.'}
                </p>
              </div>

              {/* Optional Reason */}
              <div>
                <label className="block text-xs font-bold text-[#1C1C1E] dark:text-white mb-1">
                  {language === 'ar' ? 'سبب التعديل (اختياري للتوثيق)' : 'Reason for Adjustment (Optional)'}
                </label>
                <input
                  type="text"
                  placeholder={
                    language === 'ar'
                      ? 'مثال: تأخير تدفق السيولة، إعادة تنظيم الأولويات'
                      : 'e.g., Delay in funding, vendor lead time adjustment'
                  }
                  value={rescheduleReason}
                  onChange={e => setRescheduleReason(e.target.value)}
                  className="w-full rounded-xl border border-[#D1D1D6] bg-white px-3.5 py-2 text-xs text-[#1C1C1E] focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] dark:border-[#38383A] dark:bg-[#2C2C2E] dark:text-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E5EA] dark:border-[#38383A]">
                <button
                  type="button"
                  onClick={() => setShowRescheduleModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#8E8E93] hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#007AFF] px-4 py-2 text-xs font-bold text-white hover:bg-[#0062CC] shadow-md shadow-blue-500/20 active:scale-95"
                >
                  {language === 'ar' ? 'تطبيق وإعادة ترحيل المسار' : 'Apply & Cascade'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== SUSPEND MODAL ===================== */}
      {showSuspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div
            className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#38383A]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-[#38383A]">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                    {language === 'ar' ? 'تعليق المرحلة مؤقتاً' : 'Suspend Step'}
                  </h4>
                  <p className="text-[11px] text-[#8E8E93] truncate max-w-[200px]">{step.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSuspendModal(false)}
                className="rounded-full p-1 text-[#8E8E93] hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <p className="text-xs text-[#8E8E93]">
                {language === 'ar'
                  ? 'سيتم تجميد تخصيص الأموال لهذه المرحلة حتى تاريخ الاستئناف المحدد، أو حتى استئنافها يدوياً.'
                  : 'Fund allocation to this step will be frozen until the resumption date or manual resume.'}
              </p>

              {/* Preset Durations */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { days: 7, label: language === 'ar' ? '7 أيام' : '7 Days' },
                  { days: 14, label: language === 'ar' ? '14 يوماً' : '14 Days' },
                  { days: 30, label: language === 'ar' ? '30 يوماً' : '30 Days' },
                ].map(p => (
                  <button
                    key={p.days}
                    type="button"
                    onClick={() => setSuspendPreset(p.days)}
                    className={`rounded-xl py-2.5 text-xs font-bold border transition-colors ${
                      suspendPreset === p.days
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Custom Date Option */}
              <div>
                <button
                  type="button"
                  onClick={() => setSuspendPreset('custom')}
                  className={`w-full rounded-xl py-2 text-xs font-bold border text-center transition-colors ${
                    suspendPreset === 'custom'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
                  }`}
                >
                  {language === 'ar' ? 'تحديد تاريخ مخصص' : 'Custom Resumption Date'}
                </button>

                {suspendPreset === 'custom' && (
                  <input
                    type="date"
                    min={toDateOnlyString(new Date())}
                    value={customResumeDate}
                    onChange={e => setCustomResumeDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-purple-300 bg-white px-3.5 py-2 text-xs text-[#1C1C1E] focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-purple-800 dark:bg-[#2C2C2E] dark:text-white"
                  />
                )}
              </div>

              {/* Preview Resumption Date */}
              <div className="rounded-xl bg-purple-50 p-3 text-xs text-purple-900 dark:bg-purple-950/40 dark:text-purple-300">
                <span className="font-semibold">
                  {language === 'ar' ? 'تاريخ الاستئناف التلقائي: ' : 'Resumes automatically: '}
                </span>
                <span className="font-bold underline">
                  {suspendPreset === 'custom'
                    ? customResumeDate
                    : addDays(toDateOnlyString(new Date()), suspendPreset)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E5EA] dark:border-[#38383A]">
                <button
                  type="button"
                  onClick={() => setShowSuspendModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#8E8E93] hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={handleApplySuspend}
                  className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 active:scale-95"
                >
                  {language === 'ar' ? 'تأكيد التعليق' : 'Confirm Suspension'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SCHEDULE AUDIT HISTORY MODAL ===================== */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#38383A]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-[#38383A]">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  <History className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                    {language === 'ar' ? 'سجل تعديلات الجدولة' : 'Schedule Adjustment History'}
                  </h4>
                  <p className="text-[11px] text-[#8E8E93] truncate max-w-[240px]">{step.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="rounded-full p-1 text-[#8E8E93] hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 max-h-80 overflow-y-auto space-y-2.5 pr-1">
              {step.scheduleHistory && step.scheduleHistory.length > 0 ? (
                step.scheduleHistory.map((item, hIdx) => (
                  <div
                    key={hIdx}
                    className="rounded-xl border border-[#E5E5EA] bg-[#F9F9FB] p-3 text-xs dark:border-[#38383A] dark:bg-[#2C2C2E]"
                  >
                    <div className="flex items-center justify-between font-semibold text-[11px]">
                      <span className="text-[#007AFF]">#{hIdx + 1}</span>
                      <span className="text-[#8E8E93]">
                        {new Date(item.adjustedAt).toLocaleString(
                          language === 'ar' ? 'ar-IQ' : 'en-US',
                          { dateStyle: 'short', timeStyle: 'short' }
                        )}
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500 line-through">
                        {item.previousStartDate} ({item.previousDuration}d)
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ➔ {item.newStartDate} ({item.newDuration}d)
                      </span>
                    </div>

                    {item.reason && (
                      <p className="mt-1.5 rounded-lg bg-white p-2 text-[10px] text-zinc-600 italic dark:bg-[#1C1C1E] dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                        "{item.reason}"
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center py-6 text-xs text-[#8E8E93]">
                  {language === 'ar' ? 'لا توجد تعديلات سابقة' : 'No previous adjustments recorded.'}
                </p>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="rounded-xl bg-[#007AFF] px-4 py-2 text-xs font-bold text-white hover:bg-[#0062CC]"
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
