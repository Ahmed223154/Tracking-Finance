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
}) => {
  const { t, language, formatCurrency } = useI18n();
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Support both plan and goal prop conventions safely
  const activePlan = (plan || goal)!;
  const plansList = allPlans || allGoals || [];

  const handleToggle = () => {
    if (onToggleComplete) onToggleComplete();
    else if (onToggleCompleteGoal) onToggleCompleteGoal();
  };

  const handleDelete = () => {
    if (onDeletePlan) onDeletePlan();
    else if (onDeleteGoal) onDeleteGoal();
  };

  const unallocatedBalance = FinancialEngine.unallocatedBalance(transactions, plansList);
  const avgSavings = FinancialEngine.historicalMonthlyAverageSavings(transactions);
  const monthlyCapacity = Math.max(0, FinancialEngine.monthlyIncome(transactions) - FinancialEngine.monthlyExpenses(transactions));
  const analysis = FinancialEngine.analyzePlan(activePlan, unallocatedBalance, avgSavings, monthlyCapacity);

  const progress = activePlan.targetAmount > 0 ? Math.min(100, Math.round((activePlan.allocatedAmount / activePlan.targetAmount) * 100)) : 0;
  const remaining = Math.max(0, activePlan.targetAmount - activePlan.allocatedAmount);

  // Forecast date vs target date comparison
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
                  <span className="text-[10px] font-normal text-[#8E8E93] ml-1">
                    (~{analysis.projectedMonths} {language === 'ar' ? 'أشهر' : 'mos'})
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Status & Feasibility Banner */}
          <div className="flex items-center justify-between rounded-2xl bg-[#F2F2F7] p-4 dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#3A3A3C]">
            <div>
              <div className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
                {language === 'ar' ? 'حالة التوافق مع الخطة' : 'Pace & Feasibility'}
              </div>
              <div className="mt-0.5 font-bold text-sm text-[#1C1C1E] dark:text-white">
                {analysis.statusTitle}
              </div>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-black uppercase ${analysis.statusBadgeColor}`}>
              {analysis.statusTitle}
            </span>
          </div>

          {/* Explanation Text */}
          <p className="text-xs text-[#1C1C1E] dark:text-[#F2F2F7] leading-relaxed bg-[#F2F2F7] p-3.5 rounded-2xl border border-[#E5E5EA] dark:bg-[#1C1C1E] dark:border-[#3A3A3C]">
            {analysis.explanation}
          </p>

          {/* Milestones Bar */}
          <div className="rounded-2xl border border-[#E5E5EA] bg-white p-4 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-[#007AFF]" /> {t.milestonesLabel}
              </span>
              <span className="text-xs font-black text-[#007AFF]">{progress}%</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 text-center">
              {[
                { label: '25%', achieved: analysis.milestones.m25 },
                { label: '50%', achieved: analysis.milestones.m50 },
                { label: '75%', achieved: analysis.milestones.m75 },
                { label: '100%', achieved: analysis.milestones.m100 },
              ].map(m => (
                <div
                  key={m.label}
                  className={`rounded-xl py-2 px-1 text-[10px] font-bold border transition-colors ${
                    m.achieved
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-[#F2F2F7] text-[#8E8E93] border-transparent dark:bg-[#2C2C2E]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {m.achieved && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                    <span>{m.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Track */}
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#E5E5EA] dark:bg-[#38383A]">
              <div
                className="h-full rounded-full bg-[#007AFF] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
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

          {/* Timeline & Variance Analytics */}
          <div className="rounded-2xl border border-[#E5E5EA] bg-white p-4 dark:border-[#3A3A3C] dark:bg-[#1C1C1E] space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
              {language === 'ar' ? 'الجدول الزمني ومؤشرات الأداء' : 'Timeline & Plan vs Actual'}
            </span>

            <div className="flex justify-between items-center text-xs py-1 border-b border-[#F2F2F7] dark:border-[#38383A]">
              <span className="text-[#8E8E93] flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#007AFF]" /> {t.targetDate}
              </span>
              <span className="font-semibold text-[#1C1C1E] dark:text-white">
                {originalTargetDateFormatted}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs py-1 border-b border-[#F2F2F7] dark:border-[#38383A]">
              <span className="text-[#007AFF] font-semibold flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#007AFF]" /> {t.forecastCompletion}
              </span>
              <span className="font-black text-[#007AFF]">
                {forecastCompletionDateFormatted} ({analysis.projectedMonths} {language === 'ar' ? 'أشهر' : 'mos'})
              </span>
            </div>

            <div className="flex justify-between items-center text-xs py-1">
              <span className="text-[#8E8E93] flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-[#34C759]" /> {t.varianceLabel}
              </span>
              <span className={`font-bold ${analysis.varianceMonthly >= 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
                {analysis.varianceMonthly >= 0 ? '+' : ''}
                {formatCurrency(analysis.varianceMonthly)}/mo
              </span>
            </div>
          </div>

          {/* Plan Description / Notes */}
          {activePlan.planDescription && (
            <div className="rounded-2xl bg-[#F2F2F7] p-3.5 dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#3A3A3C]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {t.planDescLabel}
              </span>
              <p className="mt-1 text-xs text-[#1C1C1E] dark:text-[#D1D1D6] leading-relaxed">
                {activePlan.planDescription}
              </p>
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
