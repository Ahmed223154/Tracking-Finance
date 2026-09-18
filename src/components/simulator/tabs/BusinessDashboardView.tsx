import React, { useState } from 'react';
import {
  AccountProfile,
  TransactionItem,
  BusinessInvoice,
  BusinessMetrics,
  BusinessBudgetMode,
  PlanStep,
} from '../../../types/finance';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Receipt,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeftRight,
  Building,
  Settings,
  Layers,
  Coins,
  Calendar,
  Sparkles,
  Plus,
} from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { BusinessBudgetSetupModal } from '../modals/BusinessBudgetSetupModal';

export interface BusinessDashboardViewProps {
  account: AccountProfile;
  transactions: TransactionItem[];
  invoices: BusinessInvoice[];
  metrics: BusinessMetrics;
  onOpenAdd: (initialType: 'expense' | 'income') => void;
  onOpenTransfer: () => void;
  onNavigateTab: (tabIndex: number) => void;
  onOpenInvoices: () => void;
  onUpdateAllocatedBudget?: (
    newBudget: number,
    mode?: BusinessBudgetMode,
    steps?: PlanStep[]
  ) => void;
}

export const BusinessDashboardView: React.FC<BusinessDashboardViewProps> = ({
  account,
  transactions,
  invoices,
  metrics,
  onOpenAdd,
  onOpenTransfer,
  onNavigateTab,
  onOpenInvoices,
  onUpdateAllocatedBudget,
}) => {
  const { t, language, formatCurrency, translateCat } = useI18n();
  const [isBudgetSetupOpen, setIsBudgetSetupOpen] = useState(false);
  const [isStepsExpanded, setIsStepsExpanded] = useState(true);

  const budgetMode: BusinessBudgetMode = account.budgetMode || (account.steps && account.steps.length > 0 ? 'plan' : 'bulk');
  const planSteps: PlanStep[] = account.steps || [];
  const hasSteps = planSteps.length > 0;

  // Calculate step-level financial metrics
  const stepMetrics = planSteps.map(step => {
    // Sum transactions tagged with this stepId
    const stepTxs = transactions.filter(t => t.type === 'expense' && t.stepId === step.id);
    const txSpent = stepTxs.reduce((acc, t) => acc + t.amount, 0);
    const directAllocated = Number(step.allocatedAmount) || 0;
    const totalStepSpent = txSpent > 0 ? txSpent : directAllocated;
    const target = Number(step.targetAmount) || 1;
    const progressPercent = Math.min(100, Math.round((totalStepSpent / target) * 100));
    const remaining = Math.max(0, target - totalStepSpent);

    return {
      ...step,
      spent: totalStepSpent,
      progressPercent,
      remaining,
    };
  });

  const isProfitable = metrics.netProfit >= 0;

  return (
    <div className="space-y-4 sm:space-y-6 pb-20">
      {/* 1. Operating Budget Health Card */}
      <div
        id="operating-budget-card"
        className="relative overflow-hidden rounded-[26px] bg-white p-5 sm:p-6 shadow-sm border border-[#E5E5EA] dark:border-[#3A3A3C] dark:bg-[#2C2C2E]"
      >
        {/* Card Header & Budget Mode Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-xl flex items-center justify-center text-white shadow-xs shrink-0"
              style={{ backgroundColor: account.color || '#FF9500' }}
            >
              <Building className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                {language === 'ar' ? 'صحة الميزانية التشغيلية' : 'Operating Budget Health'}
              </h3>
              <p className="text-[10px] text-[#8E8E93] font-medium">{account.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Subtle Mode Badge */}
            {budgetMode === 'plan' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold border border-indigo-200/60 dark:border-indigo-800/60">
                <Layers className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>
                  {language === 'ar'
                    ? `خطة عمل: ${planSteps.length} مراحل`
                    : `Plan Breakdown: ${planSteps.length} Steps`}
                </span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#007AFF] text-[11px] font-bold border border-blue-200/60 dark:border-blue-800/60">
                <Coins className="h-3.5 w-3.5" />
                <span>{language === 'ar' ? 'تخصيص إجمالي مباشر' : 'Bulk Allocation'}</span>
              </span>
            )}

            {/* Configure Budget Button */}
            <button
              id="btn-configure-budget"
              type="button"
              onClick={() => setIsBudgetSetupOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold text-[#8E8E93] hover:text-[#007AFF] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
            >
              <Settings className="h-3.5 w-3.5" />
              <span>{language === 'ar' ? 'تعديل' : 'Configure'}</span>
            </button>
          </div>
        </div>

        {/* Operating Budget Health Metrics - Stacked Ladder Layout */}
        <div className="flex flex-col gap-2.5 w-full my-3 pt-2">
          {/* 1. Total Budget Card */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F9F9FB] dark:bg-zinc-900/80 border border-[#E5E5EA] dark:border-zinc-800/80">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold tracking-wider text-[#8E8E93] dark:text-zinc-400 uppercase">
                {budgetMode === 'plan'
                  ? (language === 'ar' ? 'إجمالي ميزانية الخطة' : 'Total Budget')
                  : (language === 'ar' ? 'الميزانية التشغيلية' : 'Total Budget')}
              </span>
              <span className="text-[12px] text-[#8E8E93] dark:text-zinc-500">
                {budgetMode === 'plan'
                  ? (language === 'ar' ? 'حاصل جمع مراحل الخطة' : 'Sum of step budgets')
                  : (language === 'ar' ? 'رصيد التمويل الإجمالي' : 'Allocated lump-sum')}
              </span>
            </div>
            <div className="text-right">
              <span className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-white tracking-tight">
                {formatCurrency(metrics.allocatedBudget)}
              </span>
            </div>
          </div>

          {/* 2. Actual Spent Card */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F9F9FB] dark:bg-zinc-900/80 border border-[#E5E5EA] dark:border-zinc-800/80">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold tracking-wider text-[#8E8E93] dark:text-zinc-400 uppercase">
                {language === 'ar' ? 'إجمالي المصروف الفعلي' : 'Actual Spent'}
              </span>
              <span className="text-[12px] text-[#8E8E93] dark:text-zinc-500">
                {metrics.budgetProgressPercent}% {language === 'ar' ? 'من السقف الكلي' : 'of total budget'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-lg sm:text-xl font-bold text-rose-600 dark:text-rose-500 tracking-tight">
                {formatCurrency(metrics.budgetSpent)}
              </span>
            </div>
          </div>

          {/* 3. Remaining Pool Card */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F9F9FB] dark:bg-zinc-900/80 border border-[#E5E5EA] dark:border-zinc-800/80">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold tracking-wider text-[#8E8E93] dark:text-zinc-400 uppercase">
                {language === 'ar' ? 'الرصيد التشغيلي المتبقي' : 'Remaining Pool'}
              </span>
              <span className="text-[12px] text-[#8E8E93] dark:text-zinc-500">
                {language === 'ar' ? 'سيولة متاحة للتنفيذ' : 'Available liquidity'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                {formatCurrency(metrics.budgetRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-[#8E8E93] text-[11px] uppercase tracking-wider">
              {language === 'ar' ? 'استهلاك الميزانية الإجمالية' : 'Budget Utilization'}
            </span>
            <span
              className={
                metrics.budgetProgressPercent >= 90
                  ? 'text-rose-600'
                  : metrics.budgetProgressPercent >= 75
                  ? 'text-amber-500'
                  : 'text-[#007AFF]'
              }
            >
              {metrics.budgetProgressPercent}%
            </span>
          </div>

          <div className="h-2.5 w-full rounded-full bg-[#E5E5EA] dark:bg-[#38383A] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                metrics.budgetProgressPercent >= 90
                  ? 'bg-rose-500'
                  : metrics.budgetProgressPercent >= 75
                  ? 'bg-amber-500'
                  : 'bg-[#007AFF]'
              }`}
              style={{ width: `${metrics.budgetProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Plan Mode Expandable Step Breakdown */}
        {budgetMode === 'plan' && (
          <div className="mt-5 pt-4 border-t border-[#F2F2F7] dark:border-[#38383A] space-y-3">
            {/* Accordion Toggle Header */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsStepsExpanded(!isStepsExpanded)}
                className="flex items-center gap-2 text-left cursor-pointer group"
              >
                <div className="h-6 w-6 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                  {isStepsExpanded ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1C1C1E] dark:text-white flex items-center gap-1.5">
                    <span>
                      {language === 'ar'
                        ? `تفاصيل مراحل خطة العمل (${planSteps.length})`
                        : `Step-by-Step Business Plan (${planSteps.length} Phases)`}
                    </span>
                  </h4>
                  <p className="text-[10px] text-[#8E8E93]">
                    {language === 'ar'
                      ? 'انقر لطي أو عرض مراحل الإنجاز والميزانية لكل مرحلة'
                      : 'Click to expand or collapse operational milestones'}
                  </p>
                </div>
              </button>

              <button
                id="btn-edit-business-steps"
                type="button"
                onClick={() => setIsBudgetSetupOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 text-xs font-bold transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>{language === 'ar' ? 'تعديل المراحل' : 'Edit Steps'}</span>
              </button>
            </div>

            {/* Expandable Step List */}
            {isStepsExpanded && (
              <div className="space-y-2.5 pt-1 animate-in fade-in duration-200">
                {stepMetrics.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 text-center text-xs text-[#8E8E93]">
                    {language === 'ar'
                      ? 'لم يتم تحديد أي مرحلة بعد. انقر على "تعديل المراحل" لبناء خطة العمل.'
                      : 'No plan steps configured yet. Click "Edit Steps" to construct your business plan.'}
                  </div>
                ) : (
                  stepMetrics.map((step, idx) => (
                    <div
                      key={step.id}
                      className="p-3.5 rounded-2xl bg-[#F9F9FB] dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#38383A] space-y-2 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                    >
                      {/* Step Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="h-5 w-5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-black flex items-center justify-center shrink-0">
                            #{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-[#1C1C1E] dark:text-white truncate">
                            {step.title}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                            step.progressPercent >= 100
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : step.progressPercent > 0
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                              : 'bg-gray-100 text-gray-700 dark:bg-[#38383A] dark:text-[#8E8E93]'
                          }`}
                        >
                          {step.progressPercent >= 100
                            ? (language === 'ar' ? 'مكتمل' : 'Completed')
                            : step.progressPercent > 0
                            ? (language === 'ar' ? 'قيد التنفيذ' : 'In Progress')
                            : (language === 'ar' ? 'لم تبدأ' : 'Not Started')}
                        </span>
                      </div>

                      {/* Step Numbers & Timeline */}
                      <div className="flex flex-wrap items-center justify-between text-[11px] gap-2">
                        <div className="flex items-center gap-1.5 text-[#8E8E93]">
                          <Calendar className="h-3 w-3" />
                          <span>{step.startDate}</span>
                          <span>→</span>
                          <span>{step.endDate || step.startDate}</span>
                          <span>({step.duration || 14} {language === 'ar' ? 'ي' : 'd'})</span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-[#8E8E93]">
                            {language === 'ar' ? 'المصروف:' : 'Spent:'}{' '}
                            <strong className="text-rose-600 dark:text-rose-400">
                              {formatCurrency(step.spent)}
                            </strong>
                          </span>
                          <span className="text-[#8E8E93]">/</span>
                          <span className="text-[#1C1C1E] dark:text-white font-bold">
                            {formatCurrency(step.targetAmount)}
                          </span>
                        </div>
                      </div>

                      {/* Step Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-[#8E8E93] font-medium">
                          <span>{language === 'ar' ? 'إنجاز الميزانية' : 'Financial Progress'}</span>
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">
                            {step.progressPercent}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-[#E5E5EA] dark:bg-[#38383A] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                            style={{ width: `${step.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Quick Business Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          id="btn-biz-add-income"
          type="button"
          onClick={() => onOpenAdd('income')}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-bold text-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <ArrowDownLeft className="h-4 w-4" />
          <span>{language === 'ar' ? '+ تسجيل إيراد' : '+ Add Income'}</span>
        </button>

        <button
          id="btn-biz-add-expense"
          type="button"
          onClick={() => onOpenAdd('expense')}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/20 font-bold text-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <ArrowUpRight className="h-4 w-4" />
          <span>{language === 'ar' ? '- تسجيل مصروف' : '- Add Expense'}</span>
        </button>

        <button
          id="btn-biz-transfer"
          type="button"
          onClick={onOpenTransfer}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 text-[#007AFF] border border-blue-500/20 font-bold text-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <ArrowLeftRight className="h-4 w-4" />
          <span>{language === 'ar' ? 'تحويل أرصدة' : 'Transfer'}</span>
        </button>

        <button
          id="btn-biz-invoices"
          type="button"
          onClick={onOpenInvoices}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-bold text-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Receipt className="h-4 w-4" />
          <span>{language === 'ar' ? 'إدارة الفواتير' : 'Invoices'}</span>
        </button>
      </div>

      {/* 3. Overall Cash In & Out / Net Profit */}
      <div className="rounded-[24px] bg-white dark:bg-[#2C2C2E] p-5 shadow-sm border border-[#E5E5EA] dark:border-[#3A3A3C] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
            {language === 'ar' ? 'حركة الأموال وصافي الأرباح' : 'Overall Cash In & Out'}
          </h3>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-black ${
              isProfitable
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
            }`}
          >
            <TrendingUp className="h-3 w-3" />
            {isProfitable
              ? (language === 'ar' ? 'أرباح إيجابية' : 'Profitable')
              : (language === 'ar' ? 'عجز مؤقت' : 'Deficit')}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {/* Total Income */}
          <div className="flex justify-between items-center p-3 bg-[#F2F2F7] dark:bg-[#1C1C1E]/80 rounded-xl">
            <span className="font-medium text-[#1C1C1E] dark:text-white flex items-center gap-2">
              <ArrowDownLeft className="h-4 w-4 text-[#34C759]" />
              {language === 'ar' ? 'إجمالي الإيرادات والتحصيلات' : 'Total Income'}
            </span>
            <span className="font-bold text-sm text-[#34C759]">
              +{formatCurrency(metrics.totalIncome)}
            </span>
          </div>

          {/* Total Expenses */}
          <div className="flex justify-between items-center p-3 bg-[#F2F2F7] dark:bg-[#1C1C1E]/80 rounded-xl">
            <span className="font-medium text-[#1C1C1E] dark:text-white flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-[#FF3B30]" />
              {language === 'ar' ? 'إجمالي المصروفات والمدفوعات' : 'Total Expenses'}
            </span>
            <span className="font-bold text-sm text-[#FF3B30]">
              -{formatCurrency(metrics.totalExpenses)}
            </span>
          </div>

          {/* Net Profit Bottom Line */}
          <div className="flex justify-between items-center p-3.5 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/40">
            <span className="font-bold text-sm text-[#1C1C1E] dark:text-white">
              {language === 'ar' ? 'صافي الربح الفعلي' : 'Net Profit (Bottom Line)'}
            </span>
            <span className={`font-black text-base ${isProfitable ? 'text-[#34C759]' : 'text-rose-600'}`}>
              {isProfitable ? '+' : ''}{formatCurrency(metrics.netProfit)}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Smart Business Health Highlights: Pending Cash & Upcoming Due Dates */}
      <div className="rounded-[24px] bg-white dark:bg-[#2C2C2E] p-5 shadow-sm border border-[#E5E5EA] dark:border-[#3A3A3C] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-[#007AFF]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
              {language === 'ar' ? 'مؤشرات الفواتير والسيولة القادمة' : 'Pending Inflows & Outflows'}
            </h3>
          </div>
          <button
            onClick={onOpenInvoices}
            className="text-xs font-semibold text-[#007AFF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            {language === 'ar' ? 'مدير الفواتير' : 'Invoices'} <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Pending Inflow (To Receive) */}
          <div
            onClick={onOpenInvoices}
            className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase block">
              {language === 'ar' ? 'تدفقات قادمة (تحصيل)' : 'Pending Inflow'}
            </span>
            <p className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-300 mt-1">
              +{formatCurrency(metrics.pendingInflow)}
            </p>
            <p className="text-[10px] text-emerald-700/80 dark:text-emerald-400 mt-0.5">
              {language === 'ar' ? 'فواتير عملاء معتمدة' : 'Approved client billings'}
            </p>
          </div>

          {/* Pending Outflow (To Pay) */}
          <div
            onClick={onOpenInvoices}
            className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase block">
              {language === 'ar' ? 'مستحقات قادمة (للدفع)' : 'Pending Outflow'}
            </span>
            <p className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-300 mt-1">
              -{formatCurrency(metrics.pendingOutflow)}
            </p>
            <p className="text-[10px] text-amber-700/80 dark:text-amber-400 mt-0.5">
              {language === 'ar' ? 'فواتير موردين قيد السداد' : 'Pending vendor bills'}
            </p>
          </div>
        </div>

        {/* Upcoming Due Dates Alert Banner */}
        {metrics.upcomingDueCount > 0 ? (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  {metrics.upcomingDueCount}{' '}
                  {language === 'ar' ? 'فواتير مستحقة خلال 14 يوماً' : 'Invoices due within 14 days'}
                </p>
                <p className="text-[10px] text-amber-700 dark:text-amber-400">
                  {language === 'ar' ? 'راجع جدول السداد لتفادي التأخير' : 'Review scheduled settlements'}
                </p>
              </div>
            </div>
            <button
              onClick={onOpenInvoices}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'عرض' : 'View'}
            </button>
          </div>
        ) : (
          <div className="p-2.5 bg-gray-50 dark:bg-[#1C1C1E]/50 rounded-xl text-center text-xs text-[#8E8E93] flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>{language === 'ar' ? 'لا توجد فواتير عاجلة أو متأخرة' : 'No urgent or overdue invoices'}</span>
          </div>
        )}
      </div>

      {/* 5. Recent Business Transactions */}
      <div className="rounded-[24px] bg-white dark:bg-[#2C2C2E] shadow-sm border border-[#E5E5EA] dark:border-[#3A3A3C] overflow-hidden">
        <div className="p-4 border-b border-[#F2F2F7] dark:border-[#38383A] flex justify-between items-center">
          <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white">
            {language === 'ar' ? 'سجل العمليات التجارية' : 'Recent Business Transactions'}
          </h3>
          <button
            onClick={() => onNavigateTab(2)}
            className="text-[#007AFF] text-xs font-semibold hover:underline cursor-pointer"
          >
            {t.viewAllTransactions}
          </button>
        </div>

        {transactions.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#8E8E93]">
            {language === 'ar'
              ? 'لا توجد معاملات مسجلة في هذا الحساب التجاري'
              : 'No transactions recorded for this business entity yet.'}
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {transactions.slice(0, 5).map(item => {
              const isIncome = item.type.toLowerCase() === 'income';

              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 hover:bg-[#F9F9F9] dark:hover:bg-[#38383A]/40 rounded-xl transition-colors"
                >
                  <div className="flex gap-3 items-center min-w-0">
                    <div
                      className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold shrink-0 ${
                        isIncome
                          ? 'bg-green-50 text-[#34C759] dark:bg-green-950/40'
                          : 'bg-orange-50 text-[#FF9500] dark:bg-orange-950/40'
                      }`}
                    >
                      {isIncome ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#1C1C1E] dark:text-white truncate">
                        {item.itemDescription || translateCat(item.category)}
                      </p>
                      <p className="text-[10px] text-[#8E8E93] truncate">
                        {translateCat(item.category)} • {item.date}
                        {item.stepId && (
                          <span className="ml-1.5 px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold">
                            Step #{planSteps.findIndex(s => s.id === item.stepId) + 1}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`text-xs font-bold shrink-0 ml-2 ${
                      isIncome ? 'text-[#34C759]' : 'text-[#1C1C1E] dark:text-[#E5E5EA]'
                    }`}
                  >
                    {isIncome ? '+' : '-'}{formatCurrency(item.amount)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Business Budget Setup Modal */}
      <BusinessBudgetSetupModal
        isOpen={isBudgetSetupOpen}
        onClose={() => setIsBudgetSetupOpen(false)}
        account={account}
        totalSpent={metrics.budgetSpent}
        onSave={config => {
          if (onUpdateAllocatedBudget) {
            onUpdateAllocatedBudget(config.allocatedBudget, config.budgetMode, config.steps);
          }
        }}
      />
    </div>
  );
};
