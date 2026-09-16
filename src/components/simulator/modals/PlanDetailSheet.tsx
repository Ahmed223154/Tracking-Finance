import React, { useState } from 'react';
import { PlanItem, TransactionItem, PlanPriority, PlanStep } from '../../../types/finance';
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
  Edit3,
  Layers,
  Timer,
  Lock,
} from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { PlanStepsManager } from '../plans/PlanStepsManager';
import { CPMEngine, addDays, toDateOnlyString, parseDate } from '../../../services/cpmEngine';
import { formatAmountInput, parseRawAmount } from '../../../services/currencyFormatter';

interface PlanDetailSheetProps {
  plan?: PlanItem;
  goal?: PlanItem;
  transactions: TransactionItem[];
  allPlans?: PlanItem[];
  allGoals?: PlanItem[];
  onClose: () => void;
  onOpenAllocate: (stepId?: string) => void;
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
  const [activeTab, setActiveTab] = useState<'overview' | 'steps'>('overview');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isSuspending, setIsSuspending] = useState(false);
  const [isEditingProps, setIsEditingProps] = useState(false);

  // Support both plan and goal prop conventions safely
  const activePlan = (plan || goal)!;
  const plansList = allPlans || allGoals || [];

  // In-place editable plan properties
  const [editName, setEditName] = useState(activePlan.name);
  const [editTargetAmount, setEditTargetAmount] = useState(activePlan.targetAmount);
  const [editPriority, setEditPriority] = useState<PlanPriority>(activePlan.priority || 'medium');
  const [editDescription, setEditDescription] = useState(activePlan.planDescription || '');

  // Reschedule state initialized with plan dates
  const [rescheduleTargetDate, setRescheduleTargetDate] = useState<string>(() => {
    if (activePlan.targetDate) {
      return toDateOnlyString(activePlan.targetDate);
    }
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    return toDateOnlyString(d);
  });
  const [rescheduleStartDate, setRescheduleStartDate] = useState<string>(() => {
    if (activePlan.startDate) {
      return toDateOnlyString(activePlan.startDate);
    }
    return toDateOnlyString(new Date());
  });

  // Timed suspension state
  const [suspendDaysOption, setSuspendDaysOption] = useState<number | 'custom'>(7);
  const [customSuspendDate, setCustomSuspendDate] = useState<string>(() =>
    addDays(toDateOnlyString(new Date()), 7)
  );

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

  // Check if suspension is active
  const isSuspended = Boolean(
    activePlan.suspendedUntil && parseDate(activePlan.suspendedUntil).getTime() > Date.now()
  );

  // Pause / Resume Toggle
  const handleTogglePause = () => {
    const isNowPaused = !activePlan.isPaused;
    const updated: PlanItem = {
      ...activePlan,
      isPaused: isNowPaused,
      pausedAt: isNowPaused ? new Date().toISOString() : null,
      suspendedUntil: null,
      suspensionDurationLabel: null,
      updatedAt: new Date().toISOString(),
    };
    handleUpdate(updated);
  };

  // Immediate resume from suspension
  const handleResumeNow = () => {
    const updated: PlanItem = {
      ...activePlan,
      isPaused: false,
      pausedAt: null,
      suspendedUntil: null,
      suspensionDurationLabel: null,
      updatedAt: new Date().toISOString(),
    };
    handleUpdate(updated);
    setIsSuspending(false);
  };

  // Apply Timed Suspension
  const handleApplySuspension = () => {
    let resumeDateStr: string;
    let label = 'Custom';

    if (suspendDaysOption === 'custom') {
      resumeDateStr = customSuspendDate;
      label = customSuspendDate;
    } else {
      resumeDateStr = addDays(toDateOnlyString(new Date()), suspendDaysOption);
      label =
        suspendDaysOption === 7
          ? '7 Days'
          : suspendDaysOption === 14
          ? '14 Days'
          : suspendDaysOption === 30
          ? '1 Month'
          : `${suspendDaysOption} Days`;
    }

    const updated: PlanItem = {
      ...activePlan,
      isPaused: true,
      pausedAt: new Date().toISOString(),
      suspendedUntil: resumeDateStr,
      suspensionDurationLabel: label,
      updatedAt: new Date().toISOString(),
    };
    handleUpdate(updated);
    setIsSuspending(false);
  };

  // Quick Shift Reschedule Helper
  const handleShiftTargetMonths = (monthsToAdd: number) => {
    const base = activePlan.targetDate ? parseDate(activePlan.targetDate) : new Date();
    base.setMonth(base.getMonth() + monthsToAdd);
    setRescheduleTargetDate(toDateOnlyString(base));
  };

  const handleSaveReschedule = () => {
    const remaining = Math.max(0, activePlan.targetAmount - activePlan.allocatedAmount);
    const start = parseDate(rescheduleStartDate);
    const target = parseDate(rescheduleTargetDate);
    const months = Math.max(
      1,
      (target.getFullYear() - start.getFullYear()) * 12 + (target.getMonth() - start.getMonth())
    );
    const newMonthly = Math.round(remaining / months);

    const updated: PlanItem = {
      ...activePlan,
      startDate: start.toISOString(),
      targetDate: target.toISOString(),
      plannedMonthlyAmount: newMonthly > 0 ? newMonthly : activePlan.plannedMonthlyAmount,
      updatedAt: new Date().toISOString(),
    };
    handleUpdate(updated);
    setIsRescheduling(false);
  };

  // Save In-Place Property Updates (Target Amount, Priority, Name, Description)
  const handleSaveProperties = () => {
    const remaining = Math.max(0, editTargetAmount - activePlan.allocatedAmount);
    let newMonthly = activePlan.plannedMonthlyAmount;

    if (activePlan.targetDate) {
      const start = parseDate(activePlan.startDate);
      const target = parseDate(activePlan.targetDate);
      const months = Math.max(
        1,
        (target.getFullYear() - start.getFullYear()) * 12 + (target.getMonth() - start.getMonth())
      );
      newMonthly = Math.round(remaining / months);
    }

    const updated: PlanItem = {
      ...activePlan,
      name: editName.trim() || activePlan.name,
      targetAmount: editTargetAmount,
      priority: editPriority,
      planDescription: editDescription,
      plannedMonthlyAmount: newMonthly > 0 ? newMonthly : activePlan.plannedMonthlyAmount,
      updatedAt: new Date().toISOString(),
    };
    handleUpdate(updated);
    setIsEditingProps(false);
  };

  // Handle CPM Step updates
  const handleUpdateSteps = (newSteps: PlanStep[]) => {
    // Automatically recalculate and synchronize targetAmount from steps if steps exist
    const newTarget =
      newSteps.length > 0
        ? newSteps.reduce((sum, s) => sum + (Number(s.targetAmount) || 0), 0)
        : activePlan.targetAmount;

    const updated: PlanItem = {
      ...activePlan,
      targetAmount: newTarget,
      steps: newSteps,
      updatedAt: new Date().toISOString(),
    };
    handleUpdate(updated);
  };

  // Sync plan dates with CPM steps bounds
  const handleSyncDatesWithSteps = (startDate: string, targetDate: string) => {
    setRescheduleStartDate(startDate);
    setRescheduleTargetDate(targetDate);

    const remaining = Math.max(0, activePlan.targetAmount - activePlan.allocatedAmount);
    const s = new Date(startDate);
    const t = new Date(targetDate);
    const months = Math.max(
      1,
      (t.getFullYear() - s.getFullYear()) * 12 + (t.getMonth() - s.getMonth())
    );
    const newMonthly = Math.round(remaining / months);

    const updated: PlanItem = {
      ...activePlan,
      startDate: new Date(startDate).toISOString(),
      targetDate: new Date(targetDate).toISOString(),
      plannedMonthlyAmount: newMonthly > 0 ? newMonthly : activePlan.plannedMonthlyAmount,
      updatedAt: new Date().toISOString(),
    };
    handleUpdate(updated);
  };

  const unallocatedBalance = FinancialEngine.unallocatedBalance(transactions, plansList);
  const avgSavings = FinancialEngine.historicalMonthlyAverageSavings(transactions);
  const monthlyCapacity = Math.max(
    0,
    FinancialEngine.monthlyIncome(transactions) - FinancialEngine.monthlyExpenses(transactions)
  );
  const analysis = FinancialEngine.analyzePlan(
    activePlan,
    unallocatedBalance,
    avgSavings,
    monthlyCapacity
  );

  const progress =
    activePlan.targetAmount > 0
      ? Math.min(100, Math.round((activePlan.allocatedAmount / activePlan.targetAmount) * 100))
      : 0;
  const remaining = Math.max(0, activePlan.targetAmount - activePlan.allocatedAmount);

  // Date Formattings
  const startDateFormatted = activePlan.startDate
    ? new Date(activePlan.startDate).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', {
        month: 'short',
        year: 'numeric',
      })
    : language === 'ar'
    ? 'البداية'
    : 'Start';

  const originalTargetDateFormatted = activePlan.targetDate
    ? new Date(activePlan.targetDate).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', {
        month: 'short',
        year: 'numeric',
      })
    : language === 'ar'
    ? 'أفق مفتوح'
    : 'Open Horizon';

  const forecastCompletionDateFormatted = analysis.projectedCompletionDate
    ? new Date(analysis.projectedCompletionDate).toLocaleDateString(
        language === 'ar' ? 'ar-IQ' : 'en-US',
        {
          month: 'short',
          year: 'numeric',
        }
      )
    : language === 'ar'
    ? 'غير محدد'
    : 'N/A';

  const monthsDiff = analysis.projectedMonths - (analysis.monthsRemaining || 0);
  const isAhead = activePlan.targetDate && monthsDiff < 0;
  const isDelayed = activePlan.targetDate && monthsDiff > 0;

  // Real-time calculation for Reschedule Preview
  const previewTarget = new Date(rescheduleTargetDate);
  const previewNow = new Date();
  const previewMonths = Math.max(
    1,
    (previewTarget.getFullYear() - previewNow.getFullYear()) * 12 +
      (previewTarget.getMonth() - previewNow.getMonth())
  );
  const previewRequiredMonthly = Math.round(remaining / previewMonths);
  const monthlyRateDiff = previewRequiredMonthly - (activePlan.plannedMonthlyAmount || 0);

  const priorityConfig: Record<
    PlanPriority,
    { labelEn: string; labelAr: string; color: string; badge: string }
  > = {
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
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">
                  {language === 'ar' ? 'الخطة المالية' : 'Plan Detail'}
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${currentPriority.badge}`}
                >
                  {language === 'ar' ? currentPriority.labelAr : currentPriority.labelEn}
                </span>
                {activePlan.isCompleted && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300">
                    ✓ {language === 'ar' ? 'مكتملة' : 'Completed'}
                  </span>
                )}
                {isSuspended ? (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300">
                    ⏸️ {language === 'ar' ? `معلقة (${activePlan.suspendedUntil?.split('T')[0]})` : `Suspended`}
                  </span>
                ) : activePlan.isPaused ? (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                    ⏸️ {language === 'ar' ? 'متوقفة' : 'Paused'}
                  </span>
                ) : null}
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

        {/* Segmented Tab Navigation: Overview vs Activity Steps (CPM) */}
        <div className="mt-3.5 flex rounded-xl bg-[#F2F2F7] p-1 dark:bg-[#1C1C1E]">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-[#1C1C1E] shadow-xs dark:bg-[#2C2C2E] dark:text-white'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            <Target className="h-3.5 w-3.5 text-[#007AFF]" />
            <span>{language === 'ar' ? 'نظرة عامة والتحليل' : 'Overview & Lifecycle'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('steps')}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all ${
              activeTab === 'steps'
                ? 'bg-white text-[#1C1C1E] shadow-xs dark:bg-[#2C2C2E] dark:text-white'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-[#007AFF]" />
            <span>{language === 'ar' ? 'خطوات العمل (CPM)' : 'Activity Steps'}</span>
            <span className="rounded-full bg-blue-100 px-1.5 py-0.2 text-[10px] font-extrabold text-[#007AFF] dark:bg-blue-900/60 dark:text-blue-300">
              {(activePlan.steps || []).length}
            </span>
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* TAB 1: OVERVIEW & LIFECYCLE CONTROLS */}
          {activeTab === 'overview' && (
            <>
              {/* Timed Suspension Active Banner */}
              {isSuspended && (
                <div className="rounded-2xl border border-amber-300 bg-amber-50 p-3.5 dark:border-amber-800 dark:bg-amber-950/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
                      <Timer className="h-4 w-4 text-amber-600" />
                      <div>
                        <h4 className="text-xs font-bold">
                          {language === 'ar'
                            ? `الخطة معلقة مؤقتاً حتى ${activePlan.suspendedUntil?.split('T')[0]}`
                            : `Plan suspended until ${activePlan.suspendedUntil?.split('T')[0]}`}
                        </h4>
                        <p className="text-[11px] text-amber-700 dark:text-amber-300">
                          {language === 'ar'
                            ? 'المخصصات الشهرية مجمدة، وستُستأنف تلقائياً بحلول التاريخ المحدد.'
                            : 'Allocations are frozen and will automatically resume on the target date.'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleResumeNow}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-amber-700"
                  >
                    <Play className="h-3.5 w-3.5" />
                    {language === 'ar' ? 'استئناف الخطة فوراً' : 'Resume Plan Immediately'}
                  </button>
                </div>
              )}

              {/* Indefinite Paused State Banner if active and not timed */}
              {!isSuspended && activePlan.isPaused && (
                <div className="rounded-2xl border border-zinc-300 bg-zinc-100 p-3.5 dark:border-zinc-700 dark:bg-zinc-800/80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                      <Pause className="h-4 w-4" />
                      <div>
                        <h4 className="text-xs font-bold">
                          {language === 'ar' ? 'الخطة متوقفة مؤقتاً' : 'Plan is Paused'}
                        </h4>
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

              {/* In-Place Property Updates Card (Target Amount, Priority, Title, Description) */}
              <div className="rounded-2xl border border-[#E5E5EA] bg-[#F9F9FB] p-3.5 dark:border-[#38383A] dark:bg-[#1C1C1E] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5">
                    <Edit3 className="h-3.5 w-3.5 text-[#007AFF]" />
                    {language === 'ar' ? 'تعديل خصائص الخطة' : 'Plan Goal & Priority'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingProps(!isEditingProps)}
                    className="text-xs font-bold text-[#007AFF] hover:underline"
                  >
                    {isEditingProps
                      ? language === 'ar'
                        ? 'إلغاء'
                        : 'Cancel'
                      : language === 'ar'
                      ? 'تعديل في المكان'
                      : 'Edit Properties'}
                  </button>
                </div>

                {isEditingProps ? (
                  <div className="space-y-3 pt-1 animate-in fade-in duration-150">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#8E8E93] block">
                        {language === 'ar' ? 'اسم الخطة' : 'Plan Title'}
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-[#D1D1D6] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-[#8E8E93] block">
                          {language === 'ar' ? 'المبلغ المستهدف (IQD)' : 'Target Amount'}
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={formatAmountInput(editTargetAmount.toString())}
                          onChange={e =>
                            setEditTargetAmount(parseRawAmount(e.target.value) || 0)
                          }
                          className="mt-1 w-full rounded-xl border border-[#D1D1D6] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase text-[#8E8E93] block">
                          {language === 'ar' ? 'مستوى الأولوية' : 'Priority Level'}
                        </label>
                        <select
                          value={editPriority}
                          onChange={e => setEditPriority(e.target.value as PlanPriority)}
                          className="mt-1 w-full rounded-xl border border-[#D1D1D6] bg-white px-2 py-1.5 text-xs font-bold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                        >
                          <option value="critical">{language === 'ar' ? 'حرجة (قصوى)' : 'Critical'}</option>
                          <option value="high">{language === 'ar' ? 'عالية' : 'High'}</option>
                          <option value="medium">{language === 'ar' ? 'متوسطة' : 'Medium'}</option>
                          <option value="low">{language === 'ar' ? 'منخفضة' : 'Low'}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#8E8E93] block">
                        {language === 'ar' ? 'الوصف / ملاحظات' : 'Description'}
                      </label>
                      <input
                        type="text"
                        value={editDescription}
                        onChange={e => setEditDescription(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-[#D1D1D6] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveProperties}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#007AFF] py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0062CC]"
                    >
                      <Check className="h-4 w-4" />
                      {language === 'ar' ? 'حفظ التعديلات' : 'Save Property Changes'}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-[#8E8E93] block">
                        {language === 'ar' ? 'المستهدف الإجمالي:' : 'Total Goal:'}
                      </span>
                      <strong className="font-mono text-[#1C1C1E] dark:text-white">
                        {formatCurrency(activePlan.targetAmount)}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8E8E93] block">
                        {language === 'ar' ? 'ترتيب الأولوية:' : 'Priority Ordering:'}
                      </span>
                      <span className={`inline-block font-extrabold text-[11px] ${currentPriority.color}`}>
                        {language === 'ar' ? currentPriority.labelAr : currentPriority.labelEn}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Forecast Completion Date & Comparison */}
              <div className="rounded-2xl border border-[#007AFF]/20 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
                <div className="flex items-center justify-between pb-2 border-b border-blue-200/50 dark:border-blue-900/40">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#007AFF] flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {t.forecastCompletion}
                  </span>
                  {activePlan.targetDate && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isAhead
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : isDelayed
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      {isAhead
                        ? `🎉 ${Math.abs(monthsDiff)} ${language === 'ar' ? 'أشهر متقدم' : 'mos ahead'}`
                        : isDelayed
                        ? `⚠️ ${monthsDiff} ${language === 'ar' ? 'أشهر متأخر' : 'mos behind'}`
                        : language === 'ar'
                        ? '✓ على الموعد'
                        : '✓ On Target'}
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

              {/* Progress Bar & Amounts */}
              <div className="rounded-2xl border border-[#E5E5EA] bg-white p-4 dark:border-[#3A3A3C] dark:bg-[#1C1C1E] space-y-3">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                      {t.currentAllocation}
                    </span>
                    <p className="text-lg font-black text-[#1C1C1E] dark:text-white">
                      {formatCurrency(activePlan.allocatedAmount)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                      {language === 'ar' ? 'المتبقي للهدف' : 'Deficit Remaining'}
                    </span>
                    <p className="text-sm font-bold text-[#8E8E93]">
                      {formatCurrency(remaining)}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#8E8E93]">
                      {language === 'ar' ? 'نسبة الإنجاز المالي:' : 'Funded Progress:'}
                    </span>
                    <span className="font-bold text-[#007AFF]">{progress}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-[#E5E5EA] dark:bg-[#38383A]">
                    <div
                      className="h-full rounded-full bg-[#007AFF] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Timed Suspension Drawer */}
              {isSuspending && (
                <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4 dark:border-amber-900/60 dark:bg-amber-950/40 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-1.5 border-b border-amber-200 dark:border-amber-900/40">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                      <Timer className="h-3.5 w-3.5 text-amber-600" />
                      {language === 'ar' ? 'تعليق الخطة لفترة زمنية محددة' : 'Suspend for Specific Duration'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSuspending(false)}
                      className="text-amber-700 hover:text-amber-900 text-xs font-bold"
                    >
                      ×
                    </button>
                  </div>

                  <p className="text-[11px] text-amber-800 dark:text-amber-300">
                    {language === 'ar'
                      ? 'خلال فترة التعليق، تُجمد مساهمات الادخار وتستثنى الخطة من التوزيع التلقائي حتى حلول موعد الاستئناف.'
                      : 'During suspension, automatic savings allocations freeze until the chosen resumption date.'}
                  </p>

                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { days: 7, label: '7d', ar: '7 أيام' },
                      { days: 14, label: '14d', ar: '14 يوماً' },
                      { days: 30, label: '1mo', ar: 'شهر' },
                      { days: 90, label: '3mo', ar: '3 أشهر' },
                    ].map(opt => (
                      <button
                        key={opt.days}
                        type="button"
                        onClick={() => setSuspendDaysOption(opt.days)}
                        className={`py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          suspendDaysOption === opt.days
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-white text-amber-900 border-amber-200 dark:bg-[#1C1C1E] dark:text-amber-300 dark:border-amber-900'
                        }`}
                      >
                        {language === 'ar' ? opt.ar : opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-amber-900 dark:text-amber-300 block uppercase">
                      {language === 'ar' ? 'أو اختر تاريخ استئناف مخصص:' : 'Or Specific Resumption Date:'}
                    </label>
                    <input
                      type="date"
                      value={customSuspendDate}
                      onChange={e => {
                        setCustomSuspendDate(e.target.value);
                        setSuspendDaysOption('custom');
                      }}
                      className="w-full rounded-xl border border-amber-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1C1C1E] dark:border-amber-800 dark:bg-[#1C1C1E] dark:text-white"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleApplySuspension}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-amber-700"
                  >
                    <Timer className="h-4 w-4" />
                    {language === 'ar' ? 'تأكيد تعليق الخطة' : 'Apply Timed Suspension'}
                  </button>
                </div>
              )}

              {/* Reschedule Drawer */}
              {isRescheduling && (
                <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900/60 dark:bg-blue-950/40 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-1.5 border-b border-blue-200 dark:border-blue-900/40">
                    <span className="text-xs font-bold text-[#007AFF] flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5" />
                      {language === 'ar' ? 'إعادة جدولة الخطة وتعديل وتيرة الادخار' : 'Reschedule Timeline & Pace'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsRescheduling(false)}
                      className="text-[#007AFF] text-xs font-bold"
                    >
                      ×
                    </button>
                  </div>

                  {/* Quick Shift Buttons */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block">
                      {language === 'ar' ? 'تمديد سريع لموعد الهدف' : 'Quick Horizon Extension'}
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { label: '+1 mo', ar: '+شهر', val: 1 },
                        { label: '+3 mo', ar: '+3 أشهر', val: 3 },
                        { label: '+6 mo', ar: '+6 أشهر', val: 6 },
                        { label: '+1 yr', ar: '+سنة', val: 12 },
                      ].map(shift => (
                        <button
                          key={shift.val}
                          type="button"
                          onClick={() => handleShiftTargetMonths(shift.val)}
                          className="rounded-xl border border-blue-200 bg-white py-2 px-1 text-xs font-bold text-[#007AFF] shadow-xs hover:bg-blue-50 dark:border-blue-900 dark:bg-[#1C1C1E] dark:text-blue-300"
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
                {/* Allocate button - locked if plan is completed */}
                {activePlan.isCompleted ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-center text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900 flex items-center justify-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" />
                    {language === 'ar' ? 'الخطة مكتملة وتم قفل المخصصات' : 'Plan Completed (Allocations Locked)'}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAllocate();
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#007AFF] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors"
                  >
                    <Coins className="h-4 w-4" /> {t.allocateFundsBtn}
                  </button>
                )}

                {/* Primary Lifecycle Row: Pause/Resume, Suspend, Reschedule */}
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={handleTogglePause}
                    className={`flex items-center justify-center gap-1 rounded-xl py-2 text-xs font-bold transition-colors ${
                      activePlan.isPaused
                        ? 'bg-blue-50 text-[#007AFF] border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800'
                        : 'bg-[#F2F2F7] text-[#1C1C1E] hover:bg-[#E5E5EA] dark:bg-[#1C1C1E] dark:text-[#F2F2F7] dark:hover:bg-[#2C2C2E]'
                    }`}
                  >
                    {activePlan.isPaused ? (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        <span>{language === 'ar' ? 'استئناف' : 'Resume'}</span>
                      </>
                    ) : (
                      <>
                        <Pause className="h-3.5 w-3.5" />
                        <span>{language === 'ar' ? 'إيقاف مؤقت' : 'Pause'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSuspending(!isSuspending)}
                    className="flex items-center justify-center gap-1 rounded-xl bg-[#F2F2F7] py-2 text-xs font-bold text-amber-700 hover:bg-amber-50 dark:bg-[#1C1C1E] dark:text-amber-400 dark:hover:bg-amber-950/30 transition-colors"
                  >
                    <Timer className="h-3.5 w-3.5" />
                    <span>{language === 'ar' ? 'تعليق بوقت' : 'Suspend'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRescheduling(!isRescheduling)}
                    className="flex items-center justify-center gap-1 rounded-xl bg-[#F2F2F7] py-2 text-xs font-bold text-[#1C1C1E] hover:bg-[#E5E5EA] dark:bg-[#1C1C1E] dark:text-[#F2F2F7] dark:hover:bg-[#2C2C2E] transition-colors"
                  >
                    <CalendarClock className="h-3.5 w-3.5 text-[#007AFF]" />
                    <span>{language === 'ar' ? 'جدولة' : 'Reschedule'}</span>
                  </button>
                </div>

                {/* Mark Completed and Delete */}
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
                      }}
                      className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                        activePlan.isCompleted
                          ? 'bg-[#E5E5EA] text-[#3A3A3C] dark:bg-[#38383A] dark:text-white'
                          : 'bg-green-50 text-[#34C759] border border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{activePlan.isCompleted ? t.markActive : (language === 'ar' ? 'إغلاق واعتبار الخطة مكتملة' : 'Mark as Completed')}</span>
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
            </>
          )}

          {/* TAB 2: CPM ACTIVITY STEPS & WBS NETWORK */}
          {activeTab === 'steps' && (
            <div className="animate-in fade-in duration-200">
              <PlanStepsManager
                steps={activePlan.steps || []}
                planStartDate={activePlan.startDate}
                planTargetAmount={activePlan.targetAmount}
                isRollupMode={true}
                currency={activePlan.currency || 'IQD'}
                onUpdateSteps={handleUpdateSteps}
                onSyncDatesWithPlan={handleSyncDatesWithSteps}
                onOpenAllocate={(stepId) => {
                  onClose();
                  onOpenAllocate(stepId);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Backwards compatibility alias
export const GoalDetailSheet = PlanDetailSheet;
