import React, { useState, useMemo } from 'react';
import { PlanItem, PlanPriority, PlanStep } from '../../../types/finance';
import { FinancialEngine } from '../../../services/financialEngine';
import { useI18n } from '../../../context/I18nContext';
import { CPMEngine, parseDate, diffDays, toDateOnlyString } from '../../../services/cpmEngine';
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
  Flame,
  Link,
  Plus,
  PlayCircle,
  Circle,
  Coins,
  Check,
  Wallet,
} from 'lucide-react';

interface PlansGanttScheduleCardProps {
  plans: PlanItem[];
  unallocatedBalance: number;
  monthlyCapacity: number;
  onOpenDetail?: (plan: PlanItem) => void;
  onOpenAllocate?: (plan: PlanItem, stepId?: string) => void;
}

export const PlansGanttScheduleCard: React.FC<PlansGanttScheduleCardProps> = ({
  plans,
  unallocatedBalance,
  monthlyCapacity,
  onOpenDetail,
  onOpenAllocate,
}) => {
  const { t, language, formatCurrency } = useI18n();
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [expandedPlanIds, setExpandedPlanIds] = useState<Set<string>>(new Set());

  // Active (non-completed) plans
  const activePlans = useMemo(() => plans.filter(p => !p.isCompleted), [plans]);

  const toggleExpand = (planId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedPlanIds(prev => {
      const next = new Set(prev);
      if (next.has(planId)) next.delete(planId);
      else next.add(planId);
      return next;
    });
  };

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

  // Format short month/year date
  const formatShortDate = (d: Date | null | undefined): string => {
    if (!d || !(d instanceof Date) || isNaN(d.getTime())) return '';
    try {
      return d.toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', {
        month: 'short',
        year: '2-digit',
      });
    } catch {
      return '';
    }
  };

  // Analyze each plan for timing and progress metrics
  const processedPlans = useMemo(() => {
    const today = new Date();

    return activePlans.map(plan => {
      const analysis = FinancialEngine.analyzePlan(plan, unallocatedBalance, monthlyCapacity);

      // Start Date
      let startDate = plan.startDate ? parseDate(plan.startDate) : new Date(plan.createdAt || today);
      if (isNaN(startDate.getTime())) startDate = new Date(today);

      // Target Date
      let targetDate: Date | null = null;
      if (plan.targetDate) {
        const parsedT = parseDate(plan.targetDate);
        if (!isNaN(parsedT.getTime())) targetDate = parsedT;
      }

      // If no explicit target date, estimate from monthly rate
      if (!targetDate) {
        const remaining = Math.max(0, plan.targetAmount - (plan.allocatedAmount || 0));
        const rate = Math.max(10000, plan.plannedMonthlyAmount || monthlyCapacity || 100000);
        const months = Math.min(360, Math.max(1, Math.ceil(remaining / rate)));
        targetDate = new Date(startDate);
        targetDate.setMonth(targetDate.getMonth() + months);
      }

      // Projected Completion Date
      let projectedDate: Date | null = null;
      if (analysis.projectedCompletionDate) {
        const parsedP = parseDate(analysis.projectedCompletionDate);
        if (!isNaN(parsedP.getTime())) projectedDate = parsedP;
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
      let statusType: 'ontrack' | 'ahead' | 'delay' | 'upcoming' | 'paused' | 'suspended' = 'ontrack';

      if (plan.suspendedUntil && new Date(plan.suspendedUntil).getTime() > today.getTime()) {
        const resumesStr = plan.suspendedUntil.split('T')[0];
        statusFlag = language === 'ar' ? `معلقة (${resumesStr})` : `Suspended (${resumesStr})`;
        statusType = 'suspended';
      } else if (plan.isPaused) {
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

      // Step analysis if steps exist
      const steps = plan.steps || [];
      const stepSummary = CPMEngine.analyzeSteps(steps);

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
        steps,
        stepSummary,
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
            {language === 'ar' ? 'الجدول الزمني ومسار CPM' : 'Timeline & CPM Schedule'}
          </h3>
        </div>

        <span className="rounded-full bg-[#F2F2F7] px-2.5 py-0.5 text-[11px] font-bold text-[#8E8E93] dark:bg-[#1C1C1E] dark:text-gray-300">
          {activePlans.length} {language === 'ar' ? 'نشطة' : 'Active'}
        </span>
      </div>

      {/* 2. Stacked Mobile Plan Rows with Hierarchical Drill-down */}
      <div className="divide-y divide-[#F2F2F7] dark:divide-[#38383A]">
        {visiblePlans.map(item => {
          const { plan, progressPercent, isDelayed, dateRangeStr, statusFlag, statusType, steps, stepSummary } = item;
          const pri = priorityConfig[plan.priority] || priorityConfig.medium;
          const isExpanded = expandedPlanIds.has(plan.id);

          // Calculate bounds for step Gantt relative percentages
          const planStartMs = item.startDate ? item.startDate.getTime() : Date.now();
          const planEndMs = item.targetDate ? item.targetDate.getTime() : (planStartMs + 30 * 86400000);
          const totalPlanSpan = Math.max(1000 * 60 * 60 * 24, planEndMs - planStartMs);

          return (
            <div key={plan.id} className="py-3 first:pt-1 last:pb-1">
              {/* Top Line: Plan Name & Priority Left ➔ Date Range Right */}
              <div
                onClick={() => onOpenDetail && onOpenDetail(plan)}
                className="cursor-pointer group hover:opacity-90 transition-opacity"
              >
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

                    {/* Step count badge */}
                    {steps.length > 0 && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-blue-50 px-1.5 py-0.2 text-[9px] font-extrabold text-[#007AFF] dark:bg-blue-950/60 dark:text-blue-300">
                        {stepSummary.completedStepsCount}/{steps.length} {language === 'ar' ? 'مراحل' : 'steps'}
                      </span>
                    )}
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
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${pri.solidProgress}`}
                      style={{ width: `${progressPercent}%` }}
                    />
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
                          : statusType === 'suspended'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300'
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

              {/* Expand / Drill-Down Toggle for Steps Breakdown */}
              <div className="mt-1.5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => toggleExpand(plan.id, e)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#007AFF] hover:underline"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-3 w-3" />
                      <span>{language === 'ar' ? 'إخفاء مسار المراحل' : 'Hide Activity Steps'}</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3" />
                      <span>
                        {steps.length > 0
                          ? `${language === 'ar' ? 'عرض مسار المراحل' : 'View CPM Steps'} (${steps.length})`
                          : language === 'ar' ? '+ إضافة خطوات تفصيلية (WBS)' : '+ Add Work Breakdown Steps'}
                      </span>
                    </>
                  )}
                </button>

                {steps.length > 0 && stepSummary.criticalStepIds.length > 0 && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400">
                    <Flame className="h-3 w-3 text-rose-500" />
                    {stepSummary.criticalStepIds.length} {language === 'ar' ? 'حرجة' : 'Critical'}
                  </span>
                )}
              </div>

              {/* 3. Hierarchical Drill-down View: Mini Gantt Chart of Activity Steps */}
              {isExpanded && (
                <div className="mt-2.5 rounded-2xl border border-[#E5E5EA] bg-[#F9F9FB] p-3 dark:border-[#38383A] dark:bg-[#1C1C1E] space-y-2 animate-in fade-in duration-200">
                  {steps.length === 0 ? (
                    <div className="text-center py-3 space-y-2">
                      <p className="text-xs text-[#8E8E93]">
                        {language === 'ar'
                          ? 'لم تتم إضافة خطوات عمل (WBS) لهذه الخطة بعد.'
                          : 'No activity steps added to this plan yet.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => onOpenDetail && onOpenDetail(plan)}
                        className="inline-flex items-center gap-1 rounded-xl bg-[#007AFF] px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#0062CC]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        {language === 'ar' ? 'إدارة وتقسيم المراحل' : 'Set Up Activity Steps'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Gantt Header Timeline Scale */}
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#8E8E93] pb-1 border-b border-[#E5E5EA] dark:border-[#2C2C2E]">
                        <span>{language === 'ar' ? 'النشاط والاعتماديات' : 'Activity & Predecessors'}</span>
                        <div className="flex items-center gap-3">
                          <span>{language === 'ar' ? 'الميزانية' : 'Budget'}</span>
                          <span>{language === 'ar' ? 'الجدول الزمني (Gantt)' : 'Gantt Timeline'}</span>
                        </div>
                      </div>

                      {/* Steps Rows */}
                      <div className="space-y-2">
                        {steps.map((step, sIdx) => {
                          const sTarget = Number(step.targetAmount) || 0;
                          const sAlloc = Number(step.allocatedAmount) || 0;
                          const isFullyFunded = sTarget > 0 && sAlloc >= sTarget;
                          const isDone = step.status === 'completed' || isFullyFunded;
                          const isInProgress = step.status === 'in_progress' || (sAlloc > 0 && !isDone);
                          const sProgress = step.progress !== undefined
                            ? step.progress
                            : (sTarget > 0 ? Math.min(100, Math.round((sAlloc / sTarget) * 100)) : (sAlloc > 0 ? 100 : 0));

                          const sStart = parseDate(step.startDate).getTime();
                          const sEnd = parseDate(step.endDate || step.startDate).getTime();

                          // Calculate relative offset and width within plan span
                          const offsetPercent = Math.max(0, Math.min(95, ((sStart - planStartMs) / totalPlanSpan) * 100));
                          const widthPercent = Math.max(5, Math.min(100 - offsetPercent, ((sEnd - sStart) / totalPlanSpan) * 100));

                          return (
                            <div
                              key={step.id}
                              className={`rounded-xl border p-2.5 text-xs shadow-2xs space-y-2 transition-all ${
                                isFullyFunded || isDone
                                  ? 'border-emerald-200 bg-emerald-50/20 dark:border-emerald-900/40 dark:bg-emerald-950/10'
                                  : 'border-[#E5E5EA] bg-white dark:border-[#2C2C2E] dark:bg-[#252528]'
                              }`}
                            >
                              {/* Step Top Row */}
                              <div className="flex items-center justify-between gap-1.5">
                                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                  {isDone ? (
                                    <CheckCircle2 className="h-4 w-4 text-[#34C759] shrink-0" />
                                  ) : isInProgress ? (
                                    <PlayCircle className="h-4 w-4 text-[#007AFF] shrink-0" />
                                  ) : (
                                    <Circle className="h-4 w-4 text-zinc-400 shrink-0" />
                                  )}

                                  <span className="font-bold text-[11px] text-[#1C1C1E] dark:text-white truncate">
                                    #{sIdx + 1} {step.title}
                                  </span>

                                  {step.isCritical && (
                                    <span className="inline-flex items-center gap-0.5 rounded bg-rose-100 px-1 text-[8px] font-black text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                                      <Flame className="h-2 w-2" />
                                      CPM
                                    </span>
                                  )}

                                  {isFullyFunded && (
                                    <span className="inline-flex items-center gap-0.5 rounded bg-emerald-100 px-1.5 py-0.2 text-[8px] font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                                      <Check className="h-2 w-2" />
                                      {language === 'ar' ? 'ممولة' : 'Funded'}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  {onOpenAllocate && (
                                    <button
                                      type="button"
                                      onClick={() => onOpenAllocate(plan, step.id)}
                                      className={`flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold transition-all ${
                                        isFullyFunded
                                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                                          : 'bg-[#007AFF] text-white hover:bg-[#0062CC] shadow-xs active:scale-95'
                                      }`}
                                      title={language === 'ar' ? 'تخصيص رصيد لهذه المرحلة' : 'Allocate funds to this step'}
                                    >
                                      <Plus className="h-3 w-3" />
                                      <span>{language === 'ar' ? 'تخصيص' : 'Allocate'}</span>
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* 1. Schedule / Physical Timeline representation */}
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-[9px] text-[#8E8E93]">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-2.5 w-2.5" />
                                    {step.startDate} ➔ {step.endDate || step.startDate}
                                  </span>
                                  <span className="font-mono">{step.duration}d</span>
                                </div>
                                <div className="relative h-1.5 w-full rounded-full bg-[#E5E5EA] dark:bg-[#38383A] overflow-hidden">
                                  <div
                                    className={`absolute top-0 bottom-0 rounded-full ${
                                      step.isCritical
                                        ? 'bg-rose-500'
                                        : isDone
                                        ? 'bg-[#34C759]'
                                        : isInProgress
                                        ? 'bg-[#007AFF]'
                                        : 'bg-zinc-400'
                                    }`}
                                    style={{
                                      left: `${offsetPercent}%`,
                                      width: `${widthPercent}%`,
                                    }}
                                  />
                                </div>
                              </div>

                              {/* 2. Financial Progress Bar & Metric */}
                              <div className="space-y-1 pt-0.5 border-t border-[#F2F2F7] dark:border-[#38383A]">
                                <div className="flex items-center justify-between text-[10px]">
                                  <div className="flex items-center gap-1 text-[#8E8E93]">
                                    <Wallet className="h-2.5 w-2.5" />
                                    <span className="font-mono font-bold text-[#1C1C1E] dark:text-white">
                                      {formatCurrency(sAlloc)}
                                    </span>
                                    <span>/</span>
                                    <span>{formatCurrency(sTarget)}</span>
                                  </div>
                                  <span
                                    className={`font-mono font-bold ${
                                      isFullyFunded
                                        ? 'text-[#34C759]'
                                        : isInProgress
                                        ? 'text-[#007AFF]'
                                        : 'text-[#8E8E93]'
                                    }`}
                                  >
                                    {sProgress}%
                                  </span>
                                </div>

                                <div className="h-1.5 w-full rounded-full bg-[#E5E5EA] dark:bg-[#38383A] overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-300 ${
                                      isFullyFunded
                                        ? 'bg-[#34C759]'
                                        : isInProgress
                                        ? 'bg-[#007AFF]'
                                        : 'bg-zinc-400'
                                    }`}
                                    style={{ width: `${sProgress}%` }}
                                  />
                                </div>
                              </div>

                              {/* Dependencies Chips */}
                              {step.predecessors.length > 0 && (
                                <div className="flex flex-wrap gap-1 text-[9px] pt-0.5">
                                  {step.predecessors.map((rel, rIdx) => {
                                    const pred = steps.find(s => s.id === rel.predecessorId);
                                    const lagStr = rel.lag !== undefined && rel.lag !== 0 ? `${rel.lag >= 0 ? '+' : ''}${rel.lag}d` : '+0d';
                                    return (
                                      <span
                                        key={rIdx}
                                        className="inline-flex items-center gap-0.5 rounded bg-blue-50 px-1.5 py-0.2 text-[#007AFF] dark:bg-blue-950/60 dark:text-blue-300 font-medium"
                                      >
                                        <Link className="h-2 w-2" />
                                        <span>{pred ? pred.title : 'Step'}</span>
                                        <strong className="font-mono text-[8px]">{rel.type}{lagStr}</strong>
                                      </span>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Drill-down Footer: Manage Details Link */}
                      <div className="flex items-center justify-between pt-1 text-[10px]">
                        <span className="text-[#8E8E93]">
                          {language === 'ar' ? 'إجمالي ميزانية المراحل:' : 'Total Activities Target:'}{' '}
                          <strong className="text-[#1C1C1E] dark:text-white">{formatCurrency(stepSummary.totalBudget)}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => onOpenDetail && onOpenDetail(plan)}
                          className="font-bold text-[#007AFF] hover:underline flex items-center gap-0.5"
                        >
                          <span>{language === 'ar' ? 'تعديل الاعتماديات' : 'Edit Steps & Dependencies'}</span>
                          <ArrowRight className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. View All Schedules Toggle Button */}
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
