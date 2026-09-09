import React, { useState, useMemo } from 'react';
import { PlanItem, PlanPriority } from '../../../types/finance';
import { FinancialEngine } from '../../../services/financialEngine';
import { useI18n } from '../../../context/I18nContext';
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Pause,
  ChevronDown,
  ChevronUp,
  Target,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface PlansGanttScheduleCardProps {
  plans: PlanItem[];
  unallocatedBalance: number;
  monthlyCapacity: number;
  onOpenDetail?: (plan: PlanItem) => void;
  onOpenAllocate?: (plan: PlanItem) => void;
}

export const PlansGanttScheduleCard: React.FC<PlansGanttScheduleCardProps> = ({
  plans,
  unallocatedBalance,
  monthlyCapacity,
  onOpenDetail,
  onOpenAllocate,
}) => {
  const { t, language, formatCurrency, isRTL } = useI18n();
  const [showAllPlans, setShowAllPlans] = useState(false);

  // Active (non-completed) plans
  const activePlans = useMemo(() => plans.filter(p => !p.isCompleted), [plans]);

  // Priority color config
  const priorityConfig: Record<
    PlanPriority,
    {
      labelEn: string;
      labelAr: string;
      dotColor: string;
      solidProgress: string;
      barTrack: string;
      textBadge: string;
    }
  > = {
    critical: {
      labelEn: 'Critical',
      labelAr: 'حرجة',
      dotColor: 'bg-rose-500',
      solidProgress: 'bg-rose-500',
      barTrack: 'bg-rose-100 dark:bg-rose-950/40',
      textBadge: 'text-rose-600 dark:text-rose-400',
    },
    high: {
      labelEn: 'High',
      labelAr: 'عالية',
      dotColor: 'bg-amber-500',
      solidProgress: 'bg-amber-500',
      barTrack: 'bg-amber-100 dark:bg-amber-950/40',
      textBadge: 'text-amber-600 dark:text-amber-400',
    },
    medium: {
      labelEn: 'Medium',
      labelAr: 'متوسطة',
      dotColor: 'bg-[#007AFF]',
      solidProgress: 'bg-[#007AFF]',
      barTrack: 'bg-blue-100 dark:bg-blue-950/40',
      textBadge: 'text-[#007AFF] dark:text-blue-400',
    },
    low: {
      labelEn: 'Low',
      labelAr: 'منخفضة',
      dotColor: 'bg-emerald-500',
      solidProgress: 'bg-emerald-500',
      barTrack: 'bg-emerald-100 dark:bg-emerald-950/40',
      textBadge: 'text-emerald-600 dark:text-emerald-400',
    },
  };

  // Format short month/year date (e.g. Oct '26 or تشرين الأول 26)
  const formatShortDate = (d: Date): string => {
    return d.toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', {
      month: 'short',
      year: '2-digit',
    });
  };

  // Analyze each plan for timing and progress metrics
  const processedPlans = useMemo(() => {
    const today = new Date();

    return activePlans.map(plan => {
      const analysis = FinancialEngine.analyzePlan(plan, unallocatedBalance, monthlyCapacity);

      // Start Date
      let startDate = plan.startDate ? new Date(plan.startDate) : new Date(plan.createdAt || today);
      if (isNaN(startDate.getTime())) startDate = new Date(today);

      // Target Date
      let targetDate: Date | null = null;
      if (plan.targetDate) {
        targetDate = new Date(plan.targetDate);
        if (isNaN(targetDate.getTime())) targetDate = null;
      }

      // If no explicit target date, estimate from monthly rate
      if (!targetDate) {
        const remaining = Math.max(0, plan.targetAmount - (plan.allocatedAmount || 0));
        const rate = Math.max(1, plan.plannedMonthlyAmount || monthlyCapacity || 100000);
        const months = Math.max(1, Math.ceil(remaining / rate));
        targetDate = new Date(startDate);
        targetDate.setMonth(targetDate.getMonth() + months);
      }

      // Projected Completion Date
      let projectedDate: Date | null = null;
      if (analysis.projectedCompletionDate) {
        projectedDate = new Date(analysis.projectedCompletionDate);
        if (isNaN(projectedDate.getTime())) projectedDate = null;
      }

      // Funded Progress percentage (capped 0 - 100)
      const progressPercent = Math.min(
        100,
        Math.max(0, Math.round(((plan.allocatedAmount || 0) / Math.max(1, plan.targetAmount)) * 100))
      );

      // Delay detection: projected completion date > target date + 15 days
      const isDelayed = Boolean(
        !plan.isPaused &&
        projectedDate &&
        targetDate &&
        projectedDate.getTime() > targetDate.getTime() + 15 * 24 * 60 * 60 * 1000
      );

      const delayMonths = isDelayed && projectedDate && targetDate
        ? Math.max(
            1,
            (projectedDate.getFullYear() - targetDate.getFullYear()) * 12 +
              (projectedDate.getMonth() - targetDate.getMonth())
          )
        : 0;

      // Status flag title
      let statusFlag = '';
      let statusType: 'ontrack' | 'ahead' | 'delay' | 'upcoming' | 'paused' = 'ontrack';

      if (plan.isPaused) {
        statusFlag = language === 'ar' ? 'مؤقتة' : 'Paused';
        statusType = 'paused';
      } else if (startDate.getTime() > today.getTime() + 7 * 24 * 60 * 60 * 1000) {
        statusFlag = language === 'ar' ? 'مجدولة' : 'Upcoming';
        statusType = 'upcoming';
      } else if (isDelayed) {
        statusFlag = language === 'ar' ? `⚠ +${delayMonths} شهر` : `⚠ +${delayMonths} Mo`;
        statusType = 'delay';
      } else if (analysis.status === 'ahead') {
        statusFlag = language === 'ar' ? 'متقدم' : 'Ahead';
        statusType = 'ahead';
      } else {
        statusFlag = language === 'ar' ? 'في المسار' : 'On Track';
        statusType = 'ontrack';
      }

      // Date range string: Start Date ➔ Target Date
      const dateRangeStr = `${formatShortDate(startDate)} – ${formatShortDate(targetDate)}`;

      return {
        plan,
        analysis,
        startDate,
        targetDate,
        progressPercent,
        isDelayed,
        delayMonths,
        dateRangeStr,
        statusFlag,
        statusType,
      };
    });
  }, [activePlans, unallocatedBalance, monthlyCapacity, language]);

  // Limit visible items to 4 unless expanded
  const visiblePlans = showAllPlans ? processedPlans : processedPlans.slice(0, 4);

  if (activePlans.length === 0) {
    return null;
  }

  return (
    <div
      id="plans-timeline-mini-card"
      className="w-full overflow-hidden rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-3.5 transition-all"
    >
      {/* 1. Header: Timeline Overview & Active Count Pill */}
      <div className="flex items-center justify-between pb-1 border-b border-[#F2F2F7] dark:border-[#38383A]">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#007AFF]" />
          <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white">
            {language === 'ar' ? 'الجدول الزمني للخطط' : 'Timeline Overview'}
          </h3>
        </div>

        <span className="rounded-full bg-[#F2F2F7] px-2.5 py-0.5 text-[11px] font-bold text-[#8E8E93] dark:bg-[#1C1C1E] dark:text-gray-300">
          {activePlans.length} {language === 'ar' ? 'نشطة' : 'Active'}
        </span>
      </div>

      {/* 2. Stacked Mobile Plan Rows (100% Screen Width, Zero Horizontal Scrolling) */}
      <div className="divide-y divide-[#F2F2F7] dark:divide-[#38383A]">
        {visiblePlans.map(item => {
          const { plan, progressPercent, isDelayed, dateRangeStr, statusFlag, statusType } = item;
          const pri = priorityConfig[plan.priority] || priorityConfig.medium;

          return (
            <div
              key={plan.id}
              onClick={() => onOpenDetail && onOpenDetail(plan)}
              className="group py-3 first:pt-1 last:pb-1 cursor-pointer transition-all active:scale-[0.99]"
              title={language === 'ar' ? 'انقر لعرض تفاصيل الخطة' : 'Tap to inspect plan details'}
            >
              {/* Top Line: Plan Name & Priority Left ➔ Date Range Right */}
              <div className="flex items-center justify-between gap-2 text-xs">
                {/* Left: Plan Name with Priority Dot & Priority Label */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`h-2 w-2 rounded-full shrink-0 ${pri.dotColor}`} />
                  <span className="font-bold text-[#1C1C1E] dark:text-white truncate">
                    {plan.name}
                  </span>
                  <span className="text-[10px] font-semibold text-[#8E8E93] shrink-0">
                    ({language === 'ar' ? pri.labelAr : pri.labelEn})
                  </span>
                </div>

                {/* Right: Date Window: Start Date ➔ Target Date */}
                <span className="text-[11px] font-semibold text-[#8E8E93] dark:text-gray-300 shrink-0 font-mono">
                  {dateRangeStr}
                </span>
              </div>

              {/* Bottom Line: Full-width Progress Bar + Right Compact Status Badge */}
              <div className="mt-2 flex items-center gap-3">
                {/* Progress Track Bar */}
                <div className={`relative flex-1 h-3 rounded-full overflow-hidden ${pri.barTrack} flex items-center`}>
                  {/* Solid Progress Fill */}
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${pri.solidProgress}`}
                    style={{ width: `${progressPercent}%` }}
                  />

                  {/* Delay Marker Strip (if delayed beyond target date) */}
                  {isDelayed && (
                    <div
                      className="h-full bg-amber-400 dark:bg-amber-500 w-3 shrink-0 ml-auto rounded-r-full shadow-xs"
                      title={statusFlag}
                    />
                  )}
                </div>

                {/* Right Status Badge: Percentage% • Short State Flag */}
                <div className="flex items-center gap-1.5 text-[11px] shrink-0 font-bold whitespace-nowrap">
                  <span className="text-[#1C1C1E] dark:text-white">
                    {progressPercent}%
                  </span>
                  <span className="text-[#8E8E93]">•</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold ${
                      statusType === 'delay'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                        : statusType === 'ahead'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : statusType === 'paused'
                        ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
                        : statusType === 'upcoming'
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                        : 'bg-blue-50 text-[#007AFF] dark:bg-blue-950/50 dark:text-blue-400'
                    }`}
                  >
                    {statusFlag}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. View All Plans Toggle Button (if more than 4 plans) */}
      {processedPlans.length > 4 && (
        <button
          type="button"
          onClick={() => setShowAllPlans(!showAllPlans)}
          className="w-full pt-1 text-center text-xs font-bold text-[#007AFF] flex items-center justify-center gap-1 hover:underline transition-all"
        >
          {showAllPlans ? (
            <>
              <span>{language === 'ar' ? 'عرض أقل' : 'Show less'}</span>
              <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              <span>
                {language === 'ar'
                  ? `عرض جميع الخطط (${processedPlans.length})`
                  : `View all schedules (${processedPlans.length})`}
              </span>
              <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};
