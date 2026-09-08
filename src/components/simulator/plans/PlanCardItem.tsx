import React from 'react';
import { PlanItem, PlanPriority } from '../../../types/finance';
import { FinancialEngine } from '../../../services/financialEngine';
import { Coins, Clock, Calendar, Trash2 } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { useLongPress } from '../../../hooks/useLongPress';

interface PlanCardItemProps {
  plan: PlanItem;
  unallocatedBalance: number;
  avgSavings: number;
  monthlyCapacity: number;
  priorityBadges: Record<PlanPriority, { labelEn: string; labelAr: string; color: string; badge: string }>;
  onOpenDetail: (plan: PlanItem) => void;
  onOpenAllocate: (plan: PlanItem) => void;
  onRequestDelete: (plan: PlanItem) => void;
}

export const PlanCardItem: React.FC<PlanCardItemProps> = ({
  plan,
  unallocatedBalance,
  avgSavings,
  monthlyCapacity,
  priorityBadges,
  onOpenDetail,
  onOpenAllocate,
  onRequestDelete,
}) => {
  const { t, language, formatCurrency } = useI18n();

  const analysis = FinancialEngine.analyzePlan(
    plan,
    unallocatedBalance,
    avgSavings,
    monthlyCapacity
  );

  const progress =
    plan.targetAmount > 0
      ? Math.min(100, Math.round((plan.allocatedAmount / plan.targetAmount) * 100))
      : 0;

  const priBadge = priorityBadges[plan.priority || 'medium'];

  const longPressProps = useLongPress(
    () => {
      onRequestDelete(plan);
    },
    () => {
      onOpenDetail(plan);
    },
    { delay: 500 }
  );

  const formattedTargetDate = plan.targetDate
    ? new Date(plan.targetDate).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', {
        month: 'short',
        year: 'numeric',
      })
    : language === 'ar'
    ? 'أفق مفتوح'
    : 'Open Horizon';

  const formattedForecastDate = analysis.projectedCompletionDate
    ? new Date(analysis.projectedCompletionDate).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', {
        month: 'short',
        year: 'numeric',
      })
    : `~${analysis.projectedMonths} ${language === 'ar' ? 'أشهر' : 'mos'}`;

  return (
    <div
      {...longPressProps}
      className="group rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm transition-all hover:border-[#007AFF]/40 dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-3 select-none cursor-pointer active:scale-[0.99]"
    >
      {/* Card Top: Priority, Status, Title, Quick Actions */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${priBadge.badge}`}
            >
              {language === 'ar' ? priBadge.labelAr : priBadge.labelEn}
            </span>
            <span
              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${analysis.statusBadgeColor}`}
            >
              {analysis.statusTitle}
            </span>
          </div>
          <h4 className="mt-1 font-bold text-base text-[#1C1C1E] dark:text-white truncate">
            {plan.name}
          </h4>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenAllocate(plan);
            }}
            className="flex items-center gap-1 rounded-xl bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-[#007AFF] hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 transition-colors"
            title={t.allocateFundsBtn}
          >
            <Coins className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">{t.allocateFundsBtn}</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRequestDelete(plan);
            }}
            className="rounded-xl p-1.5 text-[#C7C7CC] hover:bg-red-50 hover:text-[#FF3B30] dark:text-[#8E8E93] dark:hover:bg-red-950/40 dark:hover:text-[#FF3B30] transition-colors"
            title={t.delete}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar & Amounts */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-[#007AFF] font-bold">
            {formatCurrency(plan.allocatedAmount)}{' '}
            <span className="text-[#8E8E93] font-normal">
              / {formatCurrency(plan.targetAmount)}
            </span>
          </span>
          <span className="text-xs font-bold text-[#8E8E93]">{progress}%</span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5EA] dark:bg-[#38383A]">
          <div
            className="h-full rounded-full bg-[#007AFF] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Prominent Forecast Completion Date Row - User Requirement 4 */}
      <div className="flex items-center justify-between rounded-xl bg-[#F2F2F7] px-3 py-2 text-xs dark:bg-[#1C1C1E]">
        <div className="flex items-center gap-1.5 text-[#8E8E93]">
          <Calendar className="h-3.5 w-3.5 text-blue-500 shrink-0" />
          <span>{language === 'ar' ? 'تاريخ الهدف:' : 'Target:'}</span>
          <span className="font-semibold text-[#1C1C1E] dark:text-white">
            {formattedTargetDate}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase text-[#8E8E93]">
            {language === 'ar' ? 'المتوقع:' : 'Forecast:'}
          </span>
          <span className="font-bold text-[#007AFF]">
            {formattedForecastDate}
          </span>
        </div>
      </div>

      {/* Timeline & Variance Footer */}
      <div className="flex items-center justify-between text-[11px] text-[#8E8E93] pt-0.5">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-blue-500" />
          <span>
            ~{analysis.projectedMonths} {language === 'ar' ? 'أشهر' : 'mos'}
          </span>
        </span>

        <span className="flex items-center gap-1">
          <span>{t.plannedMonthlyRate}:</span>
          <strong className="text-[#1C1C1E] dark:text-white">
            {formatCurrency(plan.plannedMonthlyAmount || 0)}/mo
          </strong>
        </span>

        <span
          className={`font-bold ${
            analysis.varianceMonthly >= 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'
          }`}
        >
          {analysis.varianceMonthly >= 0 ? '+' : ''}
          {formatCurrency(analysis.varianceMonthly)}
        </span>
      </div>
    </div>
  );
};
