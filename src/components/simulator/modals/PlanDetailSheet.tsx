import React, { useState } from 'react';
import { PlanItem, TransactionItem, PlanPriority } from '../../../types/finance';
import { FinancialEngine } from '../../../services/financialEngine';
import {
  X,
  Target,
  Calendar,
  Coins,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Scissors,
  Clock,
  Trash2,
  Flag,
  Award,
  ArrowRight,
  Pause,
  Play,
  CalendarClock,
  Sparkles,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';

interface PlanDetailSheetProps {
  plan?: PlanItem;
  goal?: PlanItem;
  transactions: TransactionItem[];
  allPlans?: PlanItem[];
  allGoals?: PlanItem[];
  onClose: () => void;
  onOpenAllocate: () => void;
  onToggleComplete?: () => void;
  onToggleCompleteGoal?: () => void;
  onDeletePlan?: () => void;
  onDeleteGoal?: () => void;
  onUpdatePlan?: (updated: PlanItem) => void;
  onUpdateGoal?: (updated: PlanItem) => void;
}

export const PlanDetailSheet: React.FC<PlanDetailSheetProps> = ({
  plan,
  goal,
  transactions,
  allPlans,
  allGoals,
  onClose,
  onOpenAllocate,
  onToggleComplete,
  onToggleCompleteGoal,
  onDeletePlan,
  onDeleteGoal,
  onUpdatePlan,
  onUpdateGoal,
}) => {
  const { t, language, formatCurrency } = useI18n();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Support both plan and goal prop conventions safely
  const activePlan = (plan || goal)!;
  const plansList = allPlans || allGoals || [];

  // Reschedule state initialized with plan dates
  const [rescheduleTargetDate, setRescheduleTargetDate] = useState<string>(() => {
    if (activePlan.targetDate) {
      return new Date(activePlan.targetDate).toISOString().split('T')[0];
    }
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    return d.toISOString().split('T')[0];
  });
  const [rescheduleStartDate, setRescheduleStartDate] = useState<string>(() => {
    if (activePlan.startDate) {
      return new Date(activePlan.startDate).toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  });

  const handleToggle = () => {
    if (onToggleComplete) onToggleComplete();
    else if (onToggleCompleteGoal) onToggleCompleteGoal();
  };

  const handleDelete = () => {
    if (onDeletePlan) onDeletePlan();
    else if (onDeleteGoal) onDeleteGoal();
  };

  const handleUpdate = (updated: PlanItem) => {
    if (onUpdatePlan) onUpdatePlan(updated);
    else if (onUpdateGoal) onUpdateGoal(updated);
  };

  const handleTogglePause = () => {
    const isNowPaused = !activePlan.isPaused;
    const updated: PlanItem = {
      ...activePlan,
      isPaused: isNowPaused,
      pausedAt: isNowPaused ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString(),
    };
    handleUpdate(updated);
  };

  // Quick Shift Reschedule Helper
  const handleShiftTargetMonths = (monthsToAdd: number) => {
    const base = activePlan.targetDate ? new Date(activePlan.targetDate) : new Date();
    base.setMonth(base.getMonth() + monthsToAdd);
    setRescheduleTargetDate(base.toISOString().split('T')[0]);
  };

  const handleSaveReschedule = () => {
    const remaining = Math.max(0, activePlan.targetAmount - activePlan.allocatedAmount);
    const start = new Date(rescheduleStartDate);
    const target = new Date(rescheduleTargetDate);
    const months = Math.max(1, (target.getFullYear() - start.getFullYear()) * 12 + (target.getMonth() - start.getMonth()));
    const newMonthly = Math.round(remaining / months);

    const updated: PlanItem = {
      ...activePlan,
      startDate: new Date(rescheduleStartDate).toISOString(),
      targetDate: new Date(rescheduleTargetDate).toISOString(),
      plannedMonthlyAmount: newMonthly > 0 ? newMonthly : activePlan.plannedMonthlyAmount,
      updatedAt: new Date().toISOString(),
    };
    handleUpdate(updated);
    setIsRescheduling(false);
  };

  const unallocatedBalance = FinancialEngine.unallocatedBalance(transactions, plansList);
  const avgSavings = FinancialEngine.historicalMonthlyAverageSavings(transactions);
  const monthlyCapacity = Math.max(0, FinancialEngine.monthlyIncome(transactions) - FinancialEngine.monthlyExpenses(transactions));
  const analysis = FinancialEngine.analyzePlan(activePlan, unallocatedBalance, avgSavings, monthlyCapacity);

  const progress = activePlan.targetAmount > 0 ? Math.min(100, Math.round((activePlan.allocatedAmount / activePlan.targetAmount) * 100)) : 0;
  const remaining = Math.max(0, activePlan.targetAmount - activePlan.allocatedAmount);

  // Date Formattings
  const startDateFormatted = activePlan.startDate
    ? new Date(activePlan.startDate).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', {
        month: 'short',
        year: 'numeric',
      })
    : (language === 'ar' ? 'البداية' : 'Start');

  const originalTargetDateFormatted = activePlan.targetDate
    ? new Date(activePlan.targetDate).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', {
        month: 'short',
        year: 'numeric',
      })
    : (language === 'ar' ? 'أفق مفتوح' : 'Open Horizon');

  const forecastCompletionDateFormatted = analysis.projectedCompletionDate
    ? new Date(analysis.projectedCompletionDate).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', {
        month: 'short',
        year: 'numeric',
      })
    : (language === 'ar' ? 'غير محدد' : 'N/A');

  const monthsDiff = analysis.projectedMonths - (analysis.monthsRemaining || 0);
  const isAhead = activePlan.targetDate && monthsDiff < 0;
  const isDelayed = activePlan.targetDate && monthsDiff > 0;
  const isOnTrack = activePlan.targetDate && monthsDiff === 0;

  // Real-time calculation for Reschedule Preview
  const previewTarget = new Date(rescheduleTargetDate);
  const previewNow = new Date();
  const previewMonths = Math.max(1, (previewTarget.getFullYear() - previewNow.getFullYear()) * 12 + (previewTarget.getMonth() - previewNow.getMonth()));
  const previewRequiredMonthly = Math.round(remaining / previewMonths);
  const monthlyRateDiff = previewRequiredMonthly - (activePlan.plannedMonthlyAmount || 0);

  const priorityConfig: Record<PlanPriority, { labelEn: string; labelAr: string; color: string; badge: string }> = {
    critical: {
      labelEn: 'Critical',
      labelAr: 'حرجة (قصوى)',
      color: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300',
    },
    high: {
      labelEn: 'High',
      labelAr: 'عالية',
      color: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300',
    },
    medium: {
      labelEn: 'Medium',
      labelAr: 'متوسطة',
      color: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300',
    },
    low: {
      labelEn: 'Low',
      labelAr: 'منخفضة',
      color: 'text-gray-600 dark:text-gray-400',
      badge: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-300',
    },
  };

  const currentPriority = priorityConfig[activePlan.priority || 'medium'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#007AFF] dark:bg-blue-950/40">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">
                  {language === 'ar' ? 'تفاصيل الخطة المالية' : 'Plan Overview'}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${currentPriority.badge}`}>
                  {language === 'ar' ? currentPriority.labelAr : currentPriority.labelEn}
                </span>
                {activePlan.isPaused && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                    ⏸️ {language === 'ar' ? 'متوقفة' : 'Paused'}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white truncate max-w-[220px]">
                {activePlan.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Paused State Banner if active */}
          {activePlan.isPaused && (
            <div className="rounded-2xl border border-zinc-300 bg-zinc-100 p-3.5 dark:border-zinc-700 dark:bg-zinc-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                  <Pause className="h-4 w-4" />
                  <div>
                    <h4 className="text-xs font-bold">{language === 'ar' ? 'الخطة متوقفة مؤقتاً' : 'Plan is Paused'}</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {language === 'ar'
                        ? 'الالتزامات الشهرية متوقفة ولا تُحسب ضمن سعة الادخار.'
                        : 'Savings commitments are on hold and excluded from monthly capacity.'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleTogglePause}
                  className="flex items-center gap-1 rounded-xl bg-[#007AFF] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#0062CC]"
                >
                  <Play className="h-3.5 w-3.5" />
                  {language === 'ar' ? 'استئناف' : 'Resume'}
                </button>
              </div>
            </div>
          )}

          {/* Prominent Forecast Completion Date & Target Comparison Card */}
          <div className="rounded-2xl border border-[#007AFF]/20 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
            <div className="flex items-center justify-between pb-2 border-b border-blue-200/50 dark:border-blue-900/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#007AFF] flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {t.forecastCompletion}
              </span>
              {activePlan.targetDate && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isAhead
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : isDelayed
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                }`}>
                  {isAhead
                    ? `🎉 ${Math.abs(monthsDiff)} ${language === 'ar' ? 'أشهر متقدم' : 'mos ahead'}`
                    : isDelayed
                    ? `⚠️ ${monthsDiff} ${language === 'ar' ? 'أشهر متأخر' : 'mos behind'}`
                    : (language === 'ar' ? '✓ على الموعد' : '✓ On Target')}
                </span>
              )}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
                  {t.originalTargetDate}
                </span>
                <p className="mt-0.5 font-bold text-xs text-[#1C1C1E] dark:text-white">
                  {originalTargetDateFormatted}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-wider">
                  {t.forecastCompletion}
                </span>
                <p className="mt-0.5 font-black text-xs text-[#007AFF]">
                  {forecastCompletionDateFormatted}
                  {analysis.projectedMonths > 0 && (
                    <span className="text-[10px] font-normal text-[#8E8E93] ml-1">
                      (~{analysis.projectedMonths} {language === 'ar' ? 'أشهر' : 'mos'})
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* VISUAL HORIZONTAL TIMELINE: Start Date ➔ Milestones ➔ Today ➔ Target Date ➔ Projected Completion */}
          <div className="rounded-2xl border border-[#E5E5EA] bg-white p-4 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5">
                <CalendarClock className="h-3.5 w-3.5 text-[#007AFF]" />
                {language === 'ar' ? 'المسار الزمني والمحطات' : 'Visual Timeline & Milestones'}
              </span>
              <span className="text-xs font-black text-[#007AFF]">{progress}%</span>
            </div>

            {/* Stepper Timeline Visual Track */}
            <div className="relative py-2">
              {/* Connecting baseline line */}
              <div className="absolute top-6 left-3 right-3 h-1 bg-[#E5E5EA] dark:bg-[#38383A] -translate-y-1/2 z-0" />
              {/* Progress colored fill on line */}
              <div
                className="absolute top-6 left-3 h-1 bg-[#007AFF] -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${Math.min(95, Math.max(5, progress))}%` }}
              />

              {/* 5 Sequential Milestone Nodes */}
              <div className="relative z-10 flex justify-between items-start text-center">
                {/* Node 1: Start Date */}
                <div className="flex flex-col items-center flex-1 max-w-[64px]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#007AFF] text-white ring-4 ring-white dark:ring-[#1C1C1E] shadow-sm">
                    <Play className="h-3 w-3 fill-current" />
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-[#1C1C1E] dark:text-white truncate w-full">
                    {startDateFormatted}
                  </span>
                  <span className="text-[8px] text-[#8E8E93] uppercase font-bold">
                    {language === 'ar' ? 'البدء' : 'Start'}
                  </span>
                </div>

                {/* Node 2: Milestones */}
                <div className="flex flex-col items-center flex-1 max-w-[64px]">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-white dark:ring-[#1C1C1E] shadow-sm ${
                    progress >= 50
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white border-2 border-[#007AFF] text-[#007AFF] dark:bg-[#2C2C2E]'
                  }`}>
                    <Award className="h-3.5 w-3.5" />
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-[#1C1C1E] dark:text-white">
                    {progress}%
                  </span>
                  <span className="text-[8px] text-[#8E8E93] uppercase font-bold">
                    {language === 'ar' ? 'المرحلة' : 'Target'}
                  </span>
                </div>

                {/* Node 3: Today */}
                <div className="flex flex-col items-center flex-1 max-w-[64px]">
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white ring-4 ring-white dark:ring-[#1C1C1E] shadow-sm animate-pulse">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <span className="mt-1 text-[9px] font-black text-amber-600 dark:text-amber-400">
                    {language === 'ar' ? 'اليوم' : 'Today'}
                  </span>
                  <span className="text-[8px] text-[#8E8E93] font-semibold">
                    {new Date().toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', { month: 'short' })}
                  </span>
                </div>

                {/* Node 4: Target Date */}
                <div className="flex flex-col items-center flex-1 max-w-[64px]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-white ring-4 ring-white dark:ring-[#1C1C1E] shadow-sm">
                    <Target className="h-3.5 w-3.5" />
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-[#1C1C1E] dark:text-white truncate w-full">
                    {originalTargetDateFormatted}
                  </span>
                  <span className="text-[8px] text-[#8E8E93] uppercase font-bold">
                    {language === 'ar' ? 'الهدف' : 'Target'}
                  </span>
                </div>

                {/* Node 5: Projected Completion */}
                <div className="flex flex-col items-center flex-1 max-w-[64px]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white ring-4 ring-white dark:ring-[#1C1C1E] shadow-sm">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-[#007AFF] truncate w-full">
                    {forecastCompletionDateFormatted}
                  </span>
                  <span className="text-[8px] text-[#8E8E93] uppercase font-bold">
                    {language === 'ar' ? 'المتوقع' : 'Forecast'}
                  </span>
                </div>
              </div>
            </div>

            {/* Past Start Date Pacing Baseline Details */}
            {analysis.expectedContributionToDate !== undefined && (
              <div className="mt-3 pt-2.5 border-t border-[#F2F2F7] dark:border-[#38383A] flex items-center justify-between text-[11px]">
                <span className="text-[#8E8E93]">
                  {language === 'ar'
                    ? `المتوقع منذ البدء (${analysis.elapsedMonthsFromStart || 0} شهر):`
                    : `Expected since start (${analysis.elapsedMonthsFromStart || 0} mos):`}
                </span>
                <span className="font-bold text-[#1C1C1E] dark:text-white">
                  {formatCurrency(analysis.expectedContributionToDate)}
                </span>
                <span
                  className={`font-black px-2 py-0.5 rounded-full text-[10px] ${
                    (analysis.startPacingVariance || 0) >= 0
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {(analysis.startPacingVariance || 0) >= 0 ? '+' : ''}
                  {formatCurrency(analysis.startPacingVariance || 0)}
                </span>
              </div>
            )}
          </div>

          {/* Amount Cards Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] p-3.5 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {t.allocatedProgress}
              </span>
              <p className="mt-1 font-black text-sm text-[#007AFF]">
                {formatCurrency(activePlan.allocatedAmount)}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] p-3.5 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {t.targetAmount}
              </span>
              <p className="mt-1 font-black text-sm text-[#1C1C1E] dark:text-white">
                {formatCurrency(activePlan.targetAmount)}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] p-3.5 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {t.remainingAmount}
              </span>
              <p className="mt-1 font-black text-sm text-[#FF9500]">
                {formatCurrency(remaining)}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] p-3.5 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {t.plannedMonthlyRate}
              </span>
              <p className="mt-1 font-black text-sm text-[#34C759]">
                {formatCurrency(activePlan.plannedMonthlyAmount || 0)}/mo
              </p>
            </div>
          </div>

          {/* INLINE RESCHEDULE ACCORDION / TOOL */}
          {isRescheduling && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900/60 dark:bg-[#202534] space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200/60 dark:border-blue-900/50">
                <span className="text-xs font-bold text-[#007AFF] flex items-center gap-1.5">
                  <CalendarClock className="h-4 w-4" />
                  {language === 'ar' ? 'إعادة جدولة الخطة' : 'Reschedule Timeline'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsRescheduling(false)}
                  className="text-xs font-semibold text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"
                >
                  {t.cancel}
                </button>
              </div>

              {/* Quick Shift Pills */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block mb-1.5">
                  {language === 'ar' ? 'تمديد الجدول الزمني سريعاً' : 'Quick Extension Options'}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { label: '+1 mo', ar: '+1 شهر', val: 1 },
                    { label: '+3 mos', ar: '+3 أشهر', val: 3 },
                    { label: '+6 mos', ar: '+6 أشهر', val: 6 },
                    { label: '+1 yr', ar: '+سنة', val: 12 },
                  ].map(shift => (
                    <button
                      key={shift.val}
                      type="button"
                      onClick={() => handleShiftTargetMonths(shift.val)}
                      className="rounded-xl border border-blue-200 bg-white py-2 px-1 text-xs font-bold text-[#007AFF] shadow-sm hover:bg-blue-50 dark:border-blue-900 dark:bg-[#1C1C1E] dark:text-blue-300"
                    >
                      {language === 'ar' ? shift.ar : shift.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Input Pickers */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block">
                    {language === 'ar' ? 'تاريخ البدء' : 'Start Date'}
                  </label>
                  <input
                    type="date"
                    value={rescheduleStartDate}
                    onChange={e => setRescheduleStartDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#D1D1D6] bg-white px-2.5 py-2 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block">
                    {language === 'ar' ? 'تاريخ الهدف الجديد' : 'New Target Date'}
                  </label>
                  <input
                    type="date"
                    value={rescheduleTargetDate}
                    onChange={e => setRescheduleTargetDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#D1D1D6] bg-white px-2.5 py-2 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
                  />
                </div>
              </div>

              {/* Dynamic Rate Recalculation Notice */}
              <div className="rounded-xl bg-white p-2.5 text-xs dark:bg-[#1C1C1E] border border-blue-100 dark:border-blue-900/50">
                <div className="flex justify-between items-center font-semibold text-[#1C1C1E] dark:text-white">
                  <span>{language === 'ar' ? 'الادخار الشهري المطلوب الجديد:' : 'New Required Monthly:'}</span>
                  <strong className="text-[#007AFF]">{formatCurrency(previewRequiredMonthly)}/mo</strong>
                </div>
                <div className="mt-1 text-[11px] text-[#8E8E93] flex justify-between items-center">
                  <span>{language === 'ar' ? 'الفرق عن الخطة السابقة:' : 'Difference from current:'}</span>
                  <span className={monthlyRateDiff <= 0 ? 'text-[#34C759] font-bold' : 'text-[#FF9500] font-bold'}>
                    {monthlyRateDiff <= 0 ? '' : '+'}
                    {formatCurrency(monthlyRateDiff)}/mo
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveReschedule}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#007AFF] py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC]"
              >
                <Check className="h-4 w-4" />
                {language === 'ar' ? 'حفظ الجدولة وتحديث الخطة' : 'Save Rescheduled Timeline'}
              </button>
            </div>
          )}

          {/* Action Center Buttons */}
          <div className="space-y-2.5 pt-2 border-t border-[#F2F2F7] dark:border-[#38383A]">
            <button
              onClick={() => {
                onClose();
                onOpenAllocate();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#007AFF] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors"
            >
              <Coins className="h-4 w-4" /> {t.allocateFundsBtn}
            </button>

            {/* Lifecycle Controls: Pause/Resume and Reschedule */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleTogglePause}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-colors ${
                  activePlan.isPaused
                    ? 'bg-blue-50 text-[#007AFF] border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800'
                    : 'bg-[#F2F2F7] text-[#1C1C1E] hover:bg-[#E5E5EA] dark:bg-[#1C1C1E] dark:text-[#F2F2F7] dark:hover:bg-[#2C2C2E]'
                }`}
              >
                {activePlan.isPaused ? (
                  <>
                    <Play className="h-3.5 w-3.5" />
                    {language === 'ar' ? 'استئناف الخطة' : 'Resume Plan'}
                  </>
                ) : (
                  <>
                    <Pause className="h-3.5 w-3.5" />
                    {language === 'ar' ? 'إيقاف مؤقت' : 'Pause Plan'}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsRescheduling(!isRescheduling)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#F2F2F7] py-2.5 text-xs font-bold text-[#1C1C1E] hover:bg-[#E5E5EA] dark:bg-[#1C1C1E] dark:text-[#F2F2F7] dark:hover:bg-[#2C2C2E] transition-colors"
              >
                <CalendarClock className="h-3.5 w-3.5 text-[#007AFF]" />
                {language === 'ar' ? 'إعادة جدولة' : 'Reschedule'}
              </button>
            </div>

            {confirmDelete ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-950/40 space-y-2">
                <p className="text-xs font-semibold text-[#FF3B30] text-center">
                  {t.deletePlanConfirmMsg}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleDelete();
                      onClose();
                    }}
                    className="flex-1 rounded-xl bg-[#FF3B30] py-2.5 text-xs font-bold text-white hover:bg-red-700 transition-colors"
                  >
                    {language === 'ar' ? 'نعم، احذف الخطة' : 'Yes, Delete Plan'}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="rounded-xl bg-gray-200 dark:bg-gray-700 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleToggle();
                    onClose();
                  }}
                  className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-colors ${
                    activePlan.isCompleted
                      ? 'bg-[#E5E5EA] text-[#3A3A3C] dark:bg-[#38383A] dark:text-white'
                      : 'bg-green-50 text-[#34C759] border border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900'
                  }`}
                >
                  {activePlan.isCompleted ? t.markActive : t.markCompleted}
                </button>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-[#FF3B30] hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 transition-colors"
                  title={t.deletePlanBtn}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Backwards compatibility alias
export const GoalDetailSheet = PlanDetailSheet;
