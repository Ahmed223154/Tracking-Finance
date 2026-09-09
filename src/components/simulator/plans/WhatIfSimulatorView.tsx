import React, { useState, useMemo, useEffect } from 'react';
import { PlanItem, TransactionItem } from '../../../types/finance';
import { FinancialEngine } from '../../../services/financialEngine';
import { HybridPresetInput, PresetOption } from './HybridPresetInput';
import {
  SlidersHorizontal,
  Sparkles,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Coins,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  ChevronRight,
  Wallet,
  CalendarDays,
} from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';

interface WhatIfSimulatorViewProps {
  plans: PlanItem[];
  transactions: TransactionItem[];
  unallocatedBalance: number;
  avgSavings: number;
  monthlyCapacity: number;
  onOpenAllocate?: (plan: PlanItem) => void;
  onOpenDetail?: (plan: PlanItem) => void;
}

export const WhatIfSimulatorView: React.FC<WhatIfSimulatorViewProps> = ({
  plans,
  transactions,
  unallocatedBalance,
  avgSavings,
  monthlyCapacity,
  onOpenAllocate,
  onOpenDetail,
}) => {
  const { t, language, formatCurrency } = useI18n();

  const activePlans = useMemo(() => plans.filter(p => !p.isCompleted), [plans]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(activePlans[0]?.id || '');

  // Keep selected plan valid if plans change
  const currentPlan = useMemo(() => {
    return activePlans.find(p => p.id === selectedPlanId) || activePlans[0] || null;
  }, [activePlans, selectedPlanId]);

  // Baseline timeline duration in months calculated from plan targetDate or current savings rate
  const baseTargetMonths = useMemo(() => {
    if (!currentPlan) return 12;
    if (currentPlan.targetDate) {
      const now = new Date();
      const target = new Date(currentPlan.targetDate);
      const diff = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
      return Math.max(1, diff);
    }
    const remaining = Math.max(0, currentPlan.targetAmount - (currentPlan.allocatedAmount || 0));
    const rate = Math.max(1, currentPlan.plannedMonthlyAmount || monthlyCapacity || 100000);
    return Math.max(1, Math.ceil(remaining / rate));
  }, [currentPlan, monthlyCapacity]);

  // Plan's baseline monthly rate
  const planBaseMonthly = currentPlan?.plannedMonthlyAmount || 50000;

  // Hybrid Input State: Instantaneous 60fps single-state updates without touch-drag lag
  const [monthlyAllocation, setMonthlyAllocation] = useState<number>(planBaseMonthly);
  const [expenseSavings, setExpenseSavings] = useState<number>(0);
  const [timelineMonths, setTimelineMonths] = useState<number>(baseTargetMonths);
  const [lumpSum, setLumpSum] = useState<number>(0);

  // Synchronize values when selected plan changes
  useEffect(() => {
    if (currentPlan) {
      setMonthlyAllocation(currentPlan.plannedMonthlyAmount || 50000);
      setExpenseSavings(0);
      setTimelineMonths(baseTargetMonths);
      setLumpSum(0);
    }
  }, [currentPlan?.id, baseTargetMonths]);

  // Reset controls to plan base
  const handleReset = () => {
    if (currentPlan) {
      setMonthlyAllocation(currentPlan.plannedMonthlyAmount || 50000);
      setExpenseSavings(0);
      setTimelineMonths(baseTargetMonths);
      setLumpSum(0);
    }
  };

  // Compute simulation directly on tap event
  const simResult = useMemo(() => {
    if (!currentPlan) return null;
    const simTarget = Math.max(currentPlan.allocatedAmount, currentPlan.targetAmount - lumpSum);
    const simDate = new Date();
    simDate.setMonth(simDate.getMonth() + timelineMonths);
    const simTargetDateIso = simDate.toISOString();

    return FinancialEngine.calculateIndividualPlanWhatIf(
      currentPlan,
      simTarget,
      monthlyAllocation,
      expenseSavings,
      simTargetDateIso,
      monthlyCapacity
    );
  }, [currentPlan, lumpSum, monthlyAllocation, expenseSavings, timelineMonths, monthlyCapacity]);

  // Calculate projected milestones (25%, 50%, 75%, 100%)
  const milestones = useMemo(() => {
    if (!simResult || !currentPlan) return [];
    const targetNet = Math.max(currentPlan.allocatedAmount, currentPlan.targetAmount - lumpSum);
    return [25, 50, 75, 100].map(pct => {
      const milestoneAmount = (targetNet * pct) / 100;
      const needed = Math.max(0, milestoneAmount - currentPlan.allocatedAmount);
      const months = Math.ceil(needed / Math.max(1, simResult.totalSimulatedMonthlyRate));
      const targetDate = new Date();
      targetDate.setMonth(targetDate.getMonth() + months);
      return {
        percentage: pct,
        amount: milestoneAmount,
        targetDate: targetDate.toISOString(),
      };
    });
  }, [simResult, currentPlan, lumpSum]);

  if (activePlans.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-[#D1D1D6] p-8 text-center text-[#8E8E93] dark:border-[#3A3A3C] bg-white dark:bg-[#2C2C2E] space-y-3">
        <Target className="mx-auto h-10 w-10 text-[#8E8E93]" />
        <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white">
          {language === 'ar' ? 'لا توجد خطط نشطة للمحاكاة' : 'No Active Plans to Simulate'}
        </h3>
        <p className="text-xs text-[#8E8E93]">
          {language === 'ar'
            ? 'أنشئ خطة مالية أولاً لاختبار سيناريوهات تسريع إنجازها.'
            : 'Create a financial plan first to test acceleration scenarios.'}
        </p>
      </div>
    );
  }

  // Presets configuration for Monthly Allocation
  const allocationPresets: PresetOption[] = [
    { label: '+50,000', delta: 50000 },
    { label: '+100,000', delta: 100000 },
    { label: '+250,000', delta: 250000 },
    {
      label: language === 'ar' ? 'الأساس / الخطة' : 'Reset / Plan Base',
      absolute: planBaseMonthly,
      isReset: true,
    },
  ];

  // Presets configuration for Expense Reduction Savings
  const expensePresets: PresetOption[] = [
    { label: '+50,000', delta: 50000 },
    { label: '+100,000', delta: 100000 },
    { label: '+250,000', delta: 250000 },
    {
      label: language === 'ar' ? 'إعادة ضبط' : 'Reset to 0',
      absolute: 0,
      isReset: true,
    },
  ];

  // Presets configuration for Timeline / Target Duration
  const timelinePresets: PresetOption[] = [
    { label: language === 'ar' ? '+1 شهر' : '+1 Month', delta: 1 },
    { label: language === 'ar' ? '+3 أشهر' : '+3 Months', delta: 3 },
    { label: language === 'ar' ? '+6 أشهر' : '+6 Months', delta: 6 },
    {
      label: language === 'ar' ? 'إعادة ضبط' : 'Reset Base',
      absolute: baseTargetMonths,
      isReset: true,
    },
  ];

  // Optional Lump-Sum cash injection presets
  const lumpSumPresets: PresetOption[] = [
    { label: '+100,000', delta: 100000 },
    { label: '+250,000', delta: 250000 },
    { label: '+500,000', delta: 500000 },
    ...(unallocatedBalance > 0
      ? [
          {
            label: language === 'ar' ? 'كامل الفائض' : 'All Cash',
            absolute: unallocatedBalance,
          },
        ]
      : []),
    {
      label: language === 'ar' ? 'إعادة ضبط' : 'Reset',
      absolute: 0,
      isReset: true,
    },
  ];

  // Calculated date for timeline sub-label
  const computedTargetDate = new Date();
  computedTargetDate.setMonth(computedTargetDate.getMonth() + timelineMonths);
  const formattedSimTargetDate = computedTargetDate.toLocaleDateString(
    language === 'ar' ? 'ar-IQ' : 'en-US',
    { month: 'short', year: 'numeric' }
  );

  // Financial capacity buffer calculation
  const totalSimulatedAllocation = simResult?.totalSimulatedMonthlyRate || monthlyAllocation;
  const remainingMonthlyCapacityBuffer = monthlyCapacity - totalSimulatedAllocation;

  return (
    <div id="what-if-planning-simulator" className="space-y-4 animate-in fade-in duration-200">
      {/* Plan Selector & Header Card */}
      <div className="rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
              {language === 'ar' ? 'محاكي الخطط الفردي' : 'Individual Plan Simulator'}
            </span>
            <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4 text-[#007AFF]" />
              {language === 'ar' ? 'محاكاة تسريع الخطة (What-If)' : 'What-If Plan Acceleration'}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-[#007AFF] hover:underline"
          >
            {language === 'ar' ? 'إعادة ضبط' : 'Reset All'}
          </button>
        </div>

        {/* Plan Select Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-[#8E8E93] mb-1.5">
            {language === 'ar' ? 'اختر الخطة المراد محاكاتها:' : 'Select Plan to Simulate:'}
          </label>
          <select
            value={currentPlan?.id || ''}
            onChange={e => setSelectedPlanId(e.target.value)}
            className="w-full rounded-xl border border-[#D1D1D6] bg-[#F2F2F7] px-3.5 py-2.5 text-sm font-bold text-[#1C1C1E] focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
          >
            {activePlans.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} — {formatCurrency(p.allocatedAmount)} / {formatCurrency(p.targetAmount)}
              </option>
            ))}
          </select>
        </div>

        {/* Current Plan Summary Pill */}
        {currentPlan && (
          <div className="flex items-center justify-between rounded-2xl bg-[#F2F2F7] p-3 text-xs dark:bg-[#1C1C1E]">
            <div>
              <span className="text-[#8E8E93] block text-[10px] uppercase font-bold">
                {language === 'ar' ? 'المتبقي لتحقيق الهدف' : 'Remaining Target'}
              </span>
              <span className="font-bold text-[#1C1C1E] dark:text-white text-sm">
                {formatCurrency(Math.max(0, currentPlan.targetAmount - currentPlan.allocatedAmount))}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[#8E8E93] block text-[10px] uppercase font-bold">
                {language === 'ar' ? 'الادخار المخطط الحالي' : 'Baseline Monthly Rate'}
              </span>
              <span className="font-bold text-[#007AFF] text-sm">
                {formatCurrency(currentPlan.plannedMonthlyAmount || 0)}/mo
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Hybrid Input + Quick-Pill Preset Controls */}
      <div className="rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#8E8E93]">
            {language === 'ar' ? 'مدخلات المحاكاة السريعة' : 'What-If Simulation Controls'}
          </h4>
          <span className="text-[10px] font-semibold text-[#8E8E93]">
            {language === 'ar' ? 'تحكم فوري بدون سحب' : 'Tap & Stepper Precision'}
          </span>
        </div>

        {/* Control 1: Monthly Allocation Adjustment */}
        <HybridPresetInput
          id="whatif-monthly-allocation"
          label={language === 'ar' ? 'تعديل المخصص الشهري' : 'Monthly Allocation Adjustment'}
          subLabel={
            language === 'ar'
              ? `المخصص الأساسي في الخطة: ${formatCurrency(planBaseMonthly)}/شهرياً`
              : `Baseline plan allocation: ${formatCurrency(planBaseMonthly)}/mo`
          }
          value={monthlyAllocation}
          unit={language === 'ar' ? 'د.ع/شهر' : 'IQD/mo'}
          step={50000}
          min={0}
          max={100000000}
          presets={allocationPresets}
          isCurrency={true}
          onChange={setMonthlyAllocation}
          accentColor="blue"
        />

        {/* Control 2: Expense Adjustments */}
        <HybridPresetInput
          id="whatif-expense-adjustments"
          label={language === 'ar' ? 'وفورات خفض المصاريف' : 'Expense Reduction Savings'}
          subLabel={
            language === 'ar'
              ? 'إعادة توجيه وفورات تقليص النفقات لتسريع الخطة'
              : 'Redirect discretionary spending savings into this plan'
          }
          value={expenseSavings}
          unit={language === 'ar' ? 'د.ع/شهر' : 'IQD/mo'}
          step={25000}
          min={0}
          max={50000000}
          presets={expensePresets}
          isCurrency={true}
          onChange={setExpenseSavings}
          accentColor="amber"
        />

        {/* Control 3: Target Timeline (Target Duration) */}
        <HybridPresetInput
          id="whatif-target-timeline"
          label={language === 'ar' ? 'الجدول الزمني للهدف (المدة)' : 'Target Timeline (Target Duration)'}
          subLabel={
            language === 'ar'
              ? `الموعد المقابل للهدف: ${formattedSimTargetDate}`
              : `Corresponding target deadline: ${formattedSimTargetDate}`
          }
          value={timelineMonths}
          unit={language === 'ar' ? 'شهر' : 'Months'}
          step={1}
          min={1}
          max={360}
          presets={timelinePresets}
          isCurrency={false}
          onChange={setTimelineMonths}
          accentColor="purple"
        />

        {/* Optional Control 4: Lump-Sum Cash Injection */}
        <HybridPresetInput
          id="whatif-lump-sum"
          label={language === 'ar' ? 'دفعة نقدية فورية من الفائض' : 'Lump-Sum Cash Injection'}
          subLabel={
            language === 'ar'
              ? `الفائض النقدي المتاح غير المخصص: ${formatCurrency(unallocatedBalance)}`
              : `Available unallocated cash buffer: ${formatCurrency(unallocatedBalance)}`
          }
          value={lumpSum}
          unit={language === 'ar' ? 'د.ع' : 'IQD'}
          step={50000}
          min={0}
          max={500000000}
          presets={lumpSumPresets}
          isCurrency={true}
          onChange={setLumpSum}
          accentColor="green"
        />
      </div>

      {/* Real-Time Result Cards */}
      {simResult && (
        <div className="rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-[#F2F2F7] dark:border-[#38383A]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
              {language === 'ar' ? 'نتائج المحاكاة والمقارنة الفورية' : 'Simulation Comparison Results'}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#007AFF]">
              <Sparkles className="h-3.5 w-3.5" />
              {language === 'ar' ? 'تحديث فوري 60fps' : 'Real-Time Sync'}
            </span>
          </div>

          {/* Card 1: Target Date vs. Simulated Completion Date */}
          <div className="rounded-2xl border border-[#E5E5EA] bg-[#F9F9FB] p-4 dark:bg-[#1C1C1E] dark:border-[#3A3A3C] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1C1C1E] dark:text-white flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#007AFF]" />
                {language === 'ar'
                  ? 'المقارنة: تاريخ الهدف vs. موعد الإنجاز المتوقع'
                  : 'Target Date vs. Simulated Completion Date'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Target Date Box */}
              <div className="rounded-xl bg-white p-3 shadow-xs border border-[#E5E5EA] dark:bg-[#2C2C2E] dark:border-[#48484A]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block">
                  {language === 'ar' ? 'تاريخ الهدف المطلوب' : 'Target Deadline'}
                </span>
                <p className="mt-1 text-base font-black text-[#1C1C1E] dark:text-white">
                  {formattedSimTargetDate}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold text-[#8E8E93]">
                  {timelineMonths} {language === 'ar' ? 'شهر مدة مستهدفة' : 'months duration'}
                </p>
              </div>

              {/* Simulated Completion Date Box */}
              <div className="rounded-xl bg-blue-50/80 p-3 shadow-xs border border-blue-200 dark:bg-blue-950/40 dark:border-blue-900/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#007AFF] block">
                  {language === 'ar' ? 'موعد الإنجاز بالمحاكاة' : 'Simulated Completion'}
                </span>
                <p className="mt-1 text-base font-black text-[#007AFF]">
                  {simResult.simulatedForecastDate
                    ? new Date(simResult.simulatedForecastDate).toLocaleDateString(
                        language === 'ar' ? 'ar-IQ' : 'en-US',
                        { month: 'short', year: 'numeric' }
                      )
                    : '—'}
                </p>
                <p className="mt-0.5 text-[11px] font-black text-[#1C1C1E] dark:text-white">
                  {simResult.simulatedMonths === Infinity
                    ? (language === 'ar' ? 'غير محدد' : 'Indefinite')
                    : `${simResult.simulatedMonths} ${language === 'ar' ? 'أشهر مطلوبة' : 'months required'}`}
                </p>
              </div>
            </div>

            {/* Comparison Pacing Verdict */}
            <div className="text-[11px] font-semibold text-[#3A3A3C] dark:text-[#E5E5EA] flex items-center justify-between pt-1">
              <span>{language === 'ar' ? 'مقارنة الوتيرة بالموعد المستهدف:' : 'Pacing relative to target:'}</span>
              {simResult.simulatedMonths < timelineMonths ? (
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {language === 'ar'
                    ? `إنجاز مبكر بـ ${timelineMonths - simResult.simulatedMonths} أشهر!`
                    : `Achieved ${timelineMonths - simResult.simulatedMonths} months early!`}
                </span>
              ) : simResult.simulatedMonths === timelineMonths ? (
                <span className="font-bold text-[#007AFF]">
                  {language === 'ar' ? 'مطابق لموعد الهدف تماماً' : 'Finishes exactly on target date'}
                </span>
              ) : (
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {language === 'ar'
                    ? `يتطلب ${simResult.simulatedMonths - timelineMonths} أشهر إضافية`
                    : `Needs ${simResult.simulatedMonths - timelineMonths} more months`}
                </span>
              )}
            </div>
          </div>

          {/* Card 2: Months Gained / Delayed */}
          <div
            className={`rounded-2xl border p-4 transition-all ${
              simResult.monthsGained > 0
                ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200'
                : simResult.monthsDelayed > 0
                ? 'border-amber-200 bg-amber-50/70 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200'
                : 'border-blue-200 bg-blue-50/70 text-blue-950 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                {language === 'ar' ? 'فارق الأشهر (تسريع / تأخير)' : 'Months Gained / Delayed'}
              </span>

              {/* Color-coded Tag */}
              {simResult.monthsGained > 0 ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white shadow-xs">
                  <Zap className="h-3.5 w-3.5 fill-current" />
                  {language === 'ar'
                    ? `تسريع ${simResult.monthsGained} أشهر`
                    : `+${simResult.monthsGained} Months Gained`}
                </span>
              ) : simResult.monthsDelayed > 0 ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-black text-white shadow-xs">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {language === 'ar'
                    ? `تأخير ${simResult.monthsDelayed} أشهر`
                    : `-${simResult.monthsDelayed} Months Delayed`}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#007AFF] px-3 py-1 text-xs font-black text-white shadow-xs">
                  <Clock className="h-3.5 w-3.5" />
                  {language === 'ar' ? 'وفق الخطة الأصلية' : 'On Schedule'}
                </span>
              )}
            </div>

            <p className="mt-2 text-xs leading-relaxed opacity-90 font-medium">
              {simResult.monthsGained > 0
                ? language === 'ar'
                  ? `بفضل هذه التعديلات، تنجز خطتك قبل موعدها الأصلي بـ ${simResult.monthsGained} أشهر (من ${simResult.originalMonths} شهر ➔ إلى ${simResult.simulatedMonths} شهر فقط).`
                  : `By applying these adjustments, your plan completes ${simResult.monthsGained} months ahead of baseline (${simResult.originalMonths} mos ➔ ${simResult.simulatedMonths} mos).`
                : simResult.monthsDelayed > 0
                ? language === 'ar'
                  ? `هذه الوتيرة تحتاج إلى ${simResult.monthsDelayed} أشهر إضافية مقارنة بالجدول الأصلي.`
                  : `This pace extends your timeline by ${simResult.monthsDelayed} months compared to the baseline forecast.`
                : language === 'ar'
                ? 'الوتيرة المحاكاة مطابقة للجدول الأساسي للخطة دون زيادة أو تأخير.'
                : 'Simulated parameters match your plan baseline duration without variance.'}
            </p>
          </div>

          {/* Card 3: Impact on Monthly Financial Capacity */}
          <div className="rounded-2xl border border-[#E5E5EA] bg-[#F9F9FB] p-4 dark:bg-[#1C1C1E] dark:border-[#3A3A3C] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1C1C1E] dark:text-white flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-[#007AFF]" />
                {language === 'ar'
                  ? 'التأثير على الطاقة المالية الشهرية'
                  : 'Impact on Monthly Financial Capacity'}
              </span>
              <span className="text-xs font-black text-[#007AFF]">
                {formatCurrency(totalSimulatedAllocation)}/mo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-white p-3 shadow-xs border border-[#E5E5EA] dark:bg-[#2C2C2E] dark:border-[#48484A]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block">
                  {language === 'ar' ? 'صافي طاقتك الشهرية' : 'Monthly Cash Capacity'}
                </span>
                <p className="mt-1 font-black text-sm text-[#1C1C1E] dark:text-white">
                  {formatCurrency(monthlyCapacity)}/mo
                </p>
              </div>

              <div className="rounded-xl bg-white p-3 shadow-xs border border-[#E5E5EA] dark:bg-[#2C2C2E] dark:border-[#48484A]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block">
                  {language === 'ar' ? 'هامش الفائض المتبقي' : 'Remaining Cash Buffer'}
                </span>
                <p
                  className={`mt-1 font-black text-sm ${
                    remainingMonthlyCapacityBuffer >= 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'
                  }`}
                >
                  {remainingMonthlyCapacityBuffer >= 0 ? '+' : ''}
                  {formatCurrency(remainingMonthlyCapacityBuffer)}/mo
                </p>
              </div>
            </div>

            {/* Capacity Status Badge & Explanation */}
            <div
              className={`rounded-xl border p-3 flex items-start gap-2.5 text-xs ${simResult.feasibilityBadgeColor}`}
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">{simResult.feasibilityTitle}</div>
                <div className="mt-0.5 opacity-90 leading-relaxed font-medium">
                  {simResult.feasibilityExplanation}
                </div>
              </div>
            </div>
          </div>

          {/* Milestone Projections Breakdown */}
          <div className="space-y-2 pt-2 border-t border-[#F2F2F7] dark:border-[#38383A]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
              {language === 'ar' ? 'المحطات المرحلية المتوقعة بالمحاكاة' : 'Projected Milestones Pacing'}
            </span>

            <div className="grid grid-cols-4 gap-1.5 text-center">
              {milestones.map(m => (
                <div key={m.percentage} className="rounded-xl bg-[#F2F2F7] p-2 dark:bg-[#1C1C1E]">
                  <span className="text-[10px] font-bold text-[#007AFF]">{m.percentage}%</span>
                  <div className="mt-1 font-extrabold text-[11px] text-[#1C1C1E] dark:text-white">
                    {new Date(m.targetDate).toLocaleDateString(
                      language === 'ar' ? 'ar-IQ' : 'en-US',
                      { month: 'short', year: '2-digit' }
                    )}
                  </div>
                  <div className="text-[9px] text-[#8E8E93] mt-0.5">
                    {formatCurrency(m.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button Links */}
          <div className="flex gap-2 pt-2">
            {onOpenAllocate && currentPlan && (
              <button
                type="button"
                onClick={() => onOpenAllocate(currentPlan)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#007AFF] py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#0062CC] active:scale-98 transition-all"
              >
                <Coins className="h-4 w-4" />
                {language === 'ar' ? 'تخصيص رصيد للخطة الآن' : 'Allocate to Plan Now'}
              </button>
            )}
            {onOpenDetail && currentPlan && (
              <button
                type="button"
                onClick={() => onOpenDetail(currentPlan)}
                className="rounded-xl border border-[#E5E5EA] bg-white px-3 py-2.5 text-xs font-bold text-[#3A3A3C] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-[#E5E5EA] active:scale-98 transition-all"
              >
                {language === 'ar' ? 'تفاصيل الخطة' : 'Plan Details'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Non-Destructive Simulation Guarantee */}
      <div className="rounded-2xl border border-[#E5E5EA] bg-white p-4 text-xs dark:border-[#3A3A3C] dark:bg-[#2C2C2E] flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#007AFF] dark:bg-blue-950/40">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div className="text-[11px] text-[#8E8E93] leading-tight">
          <strong className="font-semibold text-[#1C1C1E] dark:text-white block mb-0.5">
            {language === 'ar' ? 'محاكاة استكشافية آمنة' : 'Safe Non-Destructive Simulation'}
          </strong>
          {language === 'ar'
            ? 'تعديل المعاملات هنا هو تجربة افتراضية لا تؤثر على أرصدتك أو حساباتك المحفوظة.'
            : 'Simulating scenarios here is strictly hypothetical and does not alter your saved balances or plan parameters.'}
        </div>
      </div>
    </div>
  );
};
