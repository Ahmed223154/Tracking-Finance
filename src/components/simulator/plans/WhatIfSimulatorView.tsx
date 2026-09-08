import React, { useState, useMemo } from 'react';
import { PlanItem, TransactionItem } from '../../../types/finance';
import { FinancialEngine } from '../../../services/financialEngine';
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

  // Simulation parameters
  const [extraMonthly, setExtraMonthly] = useState<number>(50000);
  const [lumpSum, setLumpSum] = useState<number>(0);
  const [expenseCut, setExpenseCut] = useState<number>(0);

  // Compute simulation
  const simResult = useMemo(() => {
    if (!currentPlan) return null;
    const simTarget = Math.max(currentPlan.allocatedAmount, currentPlan.targetAmount - lumpSum);
    const simMonthly = (currentPlan.plannedMonthlyAmount || 0) + extraMonthly;
    return FinancialEngine.calculateIndividualPlanWhatIf(
      currentPlan,
      simTarget,
      simMonthly,
      expenseCut,
      currentPlan.targetDate,
      monthlyCapacity
    );
  }, [currentPlan, extraMonthly, lumpSum, expenseCut, monthlyCapacity]);

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

  const resetSliders = () => {
    setExtraMonthly(0);
    setLumpSum(0);
    setExpenseCut(0);
  };

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

  return (
    <div id="individual-what-if-simulator" className="space-y-4 animate-in fade-in duration-200">
      {/* Plan Selector & Header Card */}
      <div className="rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
              {language === 'ar' ? 'محاكي الخطط الفردي' : 'Individual Plan Simulator'}
            </span>
            <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4 text-[#007AFF]" />
              {language === 'ar' ? 'محاكاة تسريع الخطة' : 'Scenario Acceleration'}
            </h3>
          </div>

          <button
            type="button"
            onClick={resetSliders}
            className="text-xs font-semibold text-[#007AFF] hover:underline"
          >
            {language === 'ar' ? 'إعادة ضبط' : 'Reset'}
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
                {language === 'ar' ? 'الادخار المخطط الحالي' : 'Current Monthly Rate'}
              </span>
              <span className="font-bold text-[#007AFF] text-sm">
                {formatCurrency(currentPlan.plannedMonthlyAmount || 0)}/mo
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Simulation Controls */}
      <div className="rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-4">
        <h4 className="font-bold text-xs uppercase tracking-wider text-[#8E8E93]">
          {language === 'ar' ? 'متغيرات المحاكاة (What-If)' : 'Simulation Controls'}
        </h4>

        {/* Control 1: Extra Monthly Contribution */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#1C1C1E] dark:text-[#E5E5EA]">
              {language === 'ar' ? 'مساهمة شهرية إضافية للخطة' : 'Extra Monthly Contribution'}
            </span>
            <span className="font-black text-[#007AFF]">+{formatCurrency(extraMonthly)}/mo</span>
          </div>
          <input
            type="range"
            min="0"
            max="500000"
            step="25000"
            value={extraMonthly}
            onChange={e => setExtraMonthly(Number(e.target.value))}
            className="w-full accent-[#007AFF] h-2 bg-[#E5E5EA] dark:bg-[#38383A] rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#8E8E93]">
            <span>+0</span>
            <span>+250,000</span>
            <span>+500,000 IQD</span>
          </div>
        </div>

        {/* Control 2: Lump-Sum Injection */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#1C1C1E] dark:text-[#E5E5EA]">
              {language === 'ar' ? 'دفعة نقدية فورية من الفائض' : 'Lump-Sum Cash Injection'}
            </span>
            <span className="font-black text-[#34C759]">+{formatCurrency(lumpSum)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2000000"
            step="50000"
            value={lumpSum}
            onChange={e => setLumpSum(Number(e.target.value))}
            className="w-full accent-[#34C759] h-2 bg-[#E5E5EA] dark:bg-[#38383A] rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#8E8E93]">
            <span>0</span>
            <span>{language === 'ar' ? 'الفائض الحالي:' : 'Available:'} {formatCurrency(unallocatedBalance)}</span>
            <span>+2,000,000 IQD</span>
          </div>
        </div>

        {/* Control 3: Expense Reduction Savings */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#1C1C1E] dark:text-[#E5E5EA]">
              {language === 'ar' ? 'تحويل وفورات خفض المصاريف' : 'Expense Reduction Savings'}
            </span>
            <span className="font-black text-[#FF9500]">+{formatCurrency(expenseCut)}/mo</span>
          </div>
          <input
            type="range"
            min="0"
            max="200000"
            step="10000"
            value={expenseCut}
            onChange={e => setExpenseCut(Number(e.target.value))}
            className="w-full accent-[#FF9500] h-2 bg-[#E5E5EA] dark:bg-[#38383A] rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#8E8E93]">
            <span>+0</span>
            <span>+100,000</span>
            <span>+200,000 IQD</span>
          </div>
        </div>
      </div>

      {/* Real-time Dynamic Results Card */}
      {simResult && (
        <div className="rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
              {language === 'ar' ? 'نتائج المحاكاة الفورية' : 'Dynamic Simulation Results'}
            </span>
            {simResult.monthsGained > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                <Zap className="h-3 w-3 fill-current" />
                {language === 'ar' ? `تسريع ${simResult.monthsGained} أشهر` : `${simResult.monthsGained} Mos Faster`}
              </span>
            )}
          </div>

          {/* Current vs Simulated Velocity Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#F2F2F7] p-3.5 dark:bg-[#1C1C1E]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {language === 'ar' ? 'الوتيرة الحالية' : 'Current Pace'}
              </span>
              <p className="mt-1 font-bold text-xs text-[#8E8E93]">
                {simResult.originalMonths === Infinity
                  ? (language === 'ar' ? 'غير محدد' : 'Indefinite')
                  : `${simResult.originalMonths} ${language === 'ar' ? 'شهر' : 'mos'}`}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-[#1C1C1E] dark:text-white">
                {simResult.originalForecastDate
                  ? new Date(simResult.originalForecastDate).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', { month: 'short', year: 'numeric' })
                  : '—'}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-3.5 dark:border-blue-900/50 dark:bg-blue-950/30">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#007AFF]">
                {language === 'ar' ? 'الوتيرة بعد المحاكاة' : 'Simulated Pace'}
              </span>
              <p className="mt-1 font-black text-sm text-[#007AFF]">
                {simResult.simulatedMonths === Infinity
                  ? (language === 'ar' ? 'غير محدد' : 'Indefinite')
                  : `${simResult.simulatedMonths} ${language === 'ar' ? 'شهر' : 'mos'}`}
              </p>
              <p className="mt-0.5 text-xs font-black text-[#1C1C1E] dark:text-white">
                {simResult.simulatedForecastDate
                  ? new Date(simResult.simulatedForecastDate).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', { month: 'short', year: 'numeric' })
                  : '—'}
              </p>
            </div>
          </div>

          {/* Total Monthly Velocity */}
          <div className="flex items-center justify-between rounded-xl bg-[#F2F2F7] px-4 py-3 dark:bg-[#1C1C1E]">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#007AFF]" />
              <span className="text-xs font-semibold text-[#1C1C1E] dark:text-white">
                {language === 'ar' ? 'إجمالي التدفق الشهري للخطة:' : 'Revised Plan Monthly Velocity:'}
              </span>
            </div>
            <span className="text-sm font-black text-[#007AFF]">
              {formatCurrency(simResult.totalSimulatedMonthlyRate)}/mo
            </span>
          </div>

          {/* Feasibility Check Card */}
          <div className={`rounded-2xl border p-3.5 flex items-start gap-2.5 ${simResult.feasibilityBadgeColor}`}>
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="text-xs">
              <div className="font-bold">{simResult.feasibilityTitle}</div>
              <div className="mt-0.5 opacity-90 leading-relaxed">
                {simResult.feasibilityExplanation}
              </div>
            </div>
          </div>

          {/* Milestone Projections Breakdown */}
          <div className="space-y-2 pt-2 border-t border-[#F2F2F7] dark:border-[#38383A]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
              {language === 'ar' ? 'المحطات المرحلية المتوقعة' : 'Projected Milestones'}
            </span>

            <div className="grid grid-cols-4 gap-1.5 text-center">
              {milestones.map(m => (
                <div key={m.percentage} className="rounded-xl bg-[#F2F2F7] p-2 dark:bg-[#1C1C1E]">
                  <span className="text-[10px] font-bold text-[#007AFF]">{m.percentage}%</span>
                  <div className="mt-1 font-extrabold text-[11px] text-[#1C1C1E] dark:text-white">
                    {new Date(m.targetDate).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', { month: 'short', year: '2-digit' })}
                  </div>
                  <div className="text-[9px] text-[#8E8E93] mt-0.5">
                    {formatCurrency(m.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Safe Simulation Disclaimer */}
      <div className="rounded-2xl border border-[#E5E5EA] bg-white p-4 text-xs dark:border-[#3A3A3C] dark:bg-[#2C2C2E] flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#007AFF] dark:bg-blue-950/40">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div className="text-[11px] text-[#8E8E93] leading-tight">
          <strong className="font-semibold text-[#1C1C1E] dark:text-white block mb-0.5">
            {language === 'ar' ? 'محاكاة آمنة دون تعديل للبيانات' : 'Safe Non-Destructive Simulation'}
          </strong>
          {language === 'ar'
            ? 'تغيير المتغيرات هنا هو استكشاف افتراضي بحت ولا يعدل أرصدتك أو خططك المحفوظة.'
            : 'Simulating scenarios here is strictly hypothetical and does not modify your stored plans or balances.'}
        </div>
      </div>
    </div>
  );
};
