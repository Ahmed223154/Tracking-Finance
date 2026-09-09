import React from 'react';
import { TransactionItem, GoalItem } from '../../../types/finance';
import { FinancialEngine } from '../../../services/financialEngine';
import { Plus, ArrowDownLeft, ArrowUpRight, Leaf, Target, ChevronRight, Wallet, Banknote } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';

interface DashboardTabProps {
  transactions: TransactionItem[];
  goals: GoalItem[];
  onOpenAdd: () => void;
  onNavigateTab: (tabIndex: number) => void;
  onSelectGoal: (goal: GoalItem) => void;
  onOpenWidgetsHub?: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  transactions,
  goals,
  onOpenAdd,
  onNavigateTab,
  onSelectGoal,
  onOpenWidgetsHub,
}) => {
  const { t, language, formatCurrency, formatSignedCurrency, translateCat } = useI18n();

  const activeGoals = goals.filter(g => !g.isCompleted);
  const actualBalance = FinancialEngine.actualBalance(transactions);
  const unallocatedBalance = FinancialEngine.unallocatedBalance(transactions, goals);
  const totalAllocated = FinancialEngine.totalAllocatedToGoals(goals);

  const monthlyIncome = FinancialEngine.monthlyIncome(transactions);
  const monthlyExpenses = FinancialEngine.monthlyExpenses(transactions);
  const monthlySavings = FinancialEngine.monthlySavings(transactions);
  const avgSavings = FinancialEngine.historicalMonthlyAverageSavings(transactions);

  const now = new Date();
  const monthYearLabel = now.toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', { month: 'long', year: 'numeric' });

  return (
    <div id="dashboard-tab-view" className="space-y-4 px-4 pt-2 pb-24 text-[#1C1C1E] dark:text-[#F2F2F7]">
      {/* Top Balance Card - Professional Polish */}
      <div
        id="top-balance-card"
        className="bg-white dark:bg-[#2C2C2E] p-6 rounded-[24px] shadow-sm border border-[#E5E5EA] dark:border-[#3A3A3C]"
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[#8E8E93] text-xs font-bold uppercase tracking-widest">{t.actualBalance}</h2>
          <span className="flex items-center gap-1 rounded-full bg-[#E5E5EA] dark:bg-[#3A3A3C] px-2.5 py-0.5 text-[10px] font-bold text-[#3A3A3C] dark:text-[#D1D1D6]">
            <Banknote className="h-3 w-3" /> {t.currencyLabel}
          </span>
        </div>

        <p className="text-3xl sm:text-4xl font-black text-[#1C1C1E] dark:text-white mb-4 tracking-tight">
          {formatCurrency(actualBalance)}
        </p>

        <div className="h-[1px] bg-[#F2F2F7] dark:bg-[#38383A] w-full mb-4" />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#8E8E93] text-[10px] uppercase font-bold tracking-wider">{t.unallocatedAvailable}</p>
            <p className="text-base sm:text-lg font-bold text-[#34C759]">
              {formatCurrency(unallocatedBalance)}
            </p>
          </div>
          <button
            onClick={() => onNavigateTab(1)}
            className="text-right group hover:opacity-80 transition-opacity"
            title={t.plansDashboardTab}
          >
            <p className="text-[#8E8E93] text-[10px] uppercase font-bold tracking-wider group-hover:text-[#007AFF] flex items-center justify-end gap-1">
              {t.goalAllocations} <ChevronRight className="h-2.5 w-2.5" />
            </p>
            <p className="text-base sm:text-lg font-bold text-[#FF9500]">
              {formatCurrency(totalAllocated)}
            </p>
          </button>
        </div>
      </div>

      {/* Monthly Performance Card - Professional Polish */}
      <div
        id="monthly-performance-card"
        className="bg-white dark:bg-[#2C2C2E] p-6 rounded-[24px] shadow-sm border border-[#E5E5EA] dark:border-[#3A3A3C]"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#8E8E93] text-xs font-bold uppercase tracking-widest">{t.monthlyPerformance}</h2>
          <span className="text-xs text-[#8E8E93]">{monthYearLabel}</span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-[#F2F2F7] dark:bg-[#1C1C1E]/80 rounded-xl">
            <span className="text-sm font-medium text-[#1C1C1E] dark:text-white flex items-center gap-2">
              <ArrowDownLeft className="h-4 w-4 text-[#34C759]" /> {t.income}
            </span>
            <span className="text-sm font-bold text-[#34C759]">
              +{formatCurrency(monthlyIncome)}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-[#F2F2F7] dark:bg-[#1C1C1E]/80 rounded-xl">
            <span className="text-sm font-medium text-[#1C1C1E] dark:text-white flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-[#FF3B30]" /> {t.expenses}
            </span>
            <span className="text-sm font-bold text-[#FF3B30]">
              -{formatCurrency(monthlyExpenses)}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-[#F2F2F7] dark:bg-[#1C1C1E]/80 rounded-xl">
            <span className="text-sm font-medium text-[#1C1C1E] dark:text-white flex items-center gap-2">
              <Leaf className="h-4 w-4 text-[#007AFF]" /> {t.netSavings}
            </span>
            <span className="text-sm font-bold text-[#007AFF]">
              {monthlySavings >= 0 ? '+' : ''}{formatCurrency(monthlySavings)}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-[#F2F2F7] dark:bg-[#1C1C1E]/80 rounded-xl">
            <span className="text-sm font-medium text-[#8E8E93]">{t.historicalAvgSavings}</span>
            <span className="text-sm font-bold text-[#1C1C1E] dark:text-white">
              {formatCurrency(avgSavings)}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          id="quick-add-transaction-banner"
          onClick={onOpenAdd}
          className="flex items-center justify-between rounded-2xl bg-[#007AFF] px-4 py-3 text-white font-semibold shadow-md shadow-blue-500/20 transition-all hover:bg-[#0062CC] active:scale-[0.98]"
        >
          <div className="flex items-center gap-2 text-xs font-bold">
            <Plus className="h-4 w-4" />
            <span>{t.addTransactionBtn}</span>
          </div>
          <span className="rounded-lg bg-white/20 px-2 py-0.5 text-[10px] font-semibold">
            {language === 'ar' ? 'تسجيل سريع' : 'Quick Log'}
          </span>
        </button>

        {onOpenWidgetsHub && (
          <button
            id="open-ios-widgets-hub-btn"
            onClick={onOpenWidgetsHub}
            className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-950/40 dark:to-blue-950/40 border border-blue-200/70 dark:border-blue-800/50 px-4 py-3 text-[#007AFF] dark:text-blue-300 font-semibold transition-all hover:bg-blue-500/15 active:scale-[0.98]"
          >
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-[#007AFF] text-white text-[10px]">
                ⚡
              </span>
              <span>{language === 'ar' ? 'الويدجت واختصارات 3D' : 'Widgets & 3D Touch'}</span>
            </div>
            <span className="rounded-lg bg-[#007AFF]/10 dark:bg-white/10 px-2 py-0.5 text-[10px] font-bold">
              iOS
            </span>
          </button>
        )}
      </div>

      {/* Active Goals Snapshot - Professional Polish */}
      <div id="active-goals-snapshot" className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">{t.activeGoals}</h3>
          <button
            onClick={() => onNavigateTab(1)}
            className="flex items-center text-xs font-semibold text-[#007AFF] hover:underline gap-1"
          >
            {t.viewAllGoals} <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {activeGoals.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#D1D1D6] p-6 text-center text-xs text-[#8E8E93] dark:border-[#3A3A3C] bg-white dark:bg-[#2C2C2E]">
            {t.noActiveGoals}
          </div>
        ) : (
          activeGoals.slice(0, 3).map(goal => {
            const analysis = FinancialEngine.analyzePlan(goal, unallocatedBalance, avgSavings);
            const progress = goal.targetAmount > 0 ? Math.min(100, Math.round((goal.allocatedAmount / goal.targetAmount) * 100)) : 0;
            const remaining = Math.max(0, goal.targetAmount - goal.allocatedAmount);

            return (
              <div
                key={goal.id}
                onClick={() => onSelectGoal(goal)}
                className="cursor-pointer rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm transition-all hover:border-[#007AFF]/50 dark:border-[#3A3A3C] dark:bg-[#2C2C2E]"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {goal.priority && (
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                        goal.priority === 'critical'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300'
                          : goal.priority === 'high'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300'
                      }`}>
                        {goal.priority}
                      </span>
                    )}
                    <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white">{goal.name}</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${analysis.statusBadgeColor}`}>
                    {analysis.statusTitle}
                  </span>
                </div>

                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#8E8E93]">
                    {formatCurrency(goal.allocatedAmount)} / {formatCurrency(goal.targetAmount)}
                  </span>
                  <span className="font-bold text-[#1C1C1E] dark:text-white">{progress}%</span>
                </div>

                <div className="w-full bg-[#F2F2F7] dark:bg-[#1C1C1E] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#007AFF] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-2 text-right text-[10px] text-[#8E8E93]">
                  {t.remainingAmount}: {formatCurrency(remaining)}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Recent Transactions - Professional Polish */}
      <div id="recent-transactions-snapshot" className="rounded-[24px] border border-[#E5E5EA] bg-white shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-[#F2F2F7] dark:border-[#38383A] flex justify-between items-center">
          <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white">{t.recentTransactions}</h3>
          <button
            onClick={() => onNavigateTab(2)}
            className="text-[#007AFF] text-sm font-semibold hover:underline"
          >
            {t.viewAllTransactions}
          </button>
        </div>

        {transactions.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#8E8E93]">
            {t.noTransactionsYet}
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
                  <div className="flex gap-3 items-center">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold ${isIncome ? 'bg-green-50 text-[#34C759] dark:bg-green-950/40' : 'bg-orange-50 text-[#FF9500] dark:bg-orange-950/40'}`}>
                      {isIncome ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                        {item.itemDescription || translateCat(item.category) || (isIncome ? t.income : t.expenses)}
                      </p>
                      <p className="text-xs text-[#8E8E93]">
                        {isIncome ? t.income : t.expenses} • {isIncome ? (translateCat(item.source) || 'General') : translateCat(item.category)}
                      </p>
                    </div>
                  </div>

                  <p className={`text-sm font-bold ${isIncome ? 'text-[#34C759]' : 'text-[#3A3A3C] dark:text-[#E5E5EA]'}`}>
                    {isIncome ? '+' : '-'}{formatCurrency(item.amount)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

