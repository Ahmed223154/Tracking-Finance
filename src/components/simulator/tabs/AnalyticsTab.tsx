import React, { useState, useMemo } from 'react';
import { TransactionItem, TimeRange } from '../../../types/finance';
import { BarChart3, PieChart, TrendingUp, DollarSign, ArrowDownLeft, ArrowUpRight, Award } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';

interface AnalyticsTabProps {
  transactions: TransactionItem[];
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ transactions }) => {
  const { t, language, formatCurrency, translateCat } = useI18n();
  const [selectedRange, setSelectedRange] = useState<TimeRange>('thisMonth');

  // Filter transactions according to selected range
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter(item => {
      const d = new Date(item.date);
      switch (selectedRange) {
        case 'thisWeek': {
          const firstDayOfWeek = new Date(now);
          firstDayOfWeek.setDate(now.getDate() - now.getDay());
          firstDayOfWeek.setHours(0, 0, 0, 0);
          return d >= firstDayOfWeek;
        }
        case 'thisMonth':
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        case 'lastMonth': {
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          return d.getMonth() === lastMonth.getMonth() && d.getFullYear() === lastMonth.getFullYear();
        }
        case 'last3Months': {
          const cutoff = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
          return d >= cutoff;
        }
        case 'last6Months': {
          const cutoff = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
          return d >= cutoff;
        }
        case 'thisYear':
          return d.getFullYear() === now.getFullYear();
        case 'allTime':
        default:
          return true;
      }
    });
  }, [transactions, selectedRange]);

  // Metrics
  const periodIncome = useMemo(() => {
    return filteredTransactions
      .filter(t => t.type.toLowerCase() === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [filteredTransactions]);

  const periodExpenses = useMemo(() => {
    return filteredTransactions
      .filter(t => t.type.toLowerCase() === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [filteredTransactions]);

  const savingsRate = useMemo(() => {
    if (periodIncome <= 0) return 0;
    const net = periodIncome - periodExpenses;
    return Math.max(0, Math.round((net / periodIncome) * 100));
  }, [periodIncome, periodExpenses]);

  const largestExpense = useMemo(() => {
    const expenses = filteredTransactions.filter(t => t.type.toLowerCase() === 'expense');
    if (expenses.length === 0) return null;
    return expenses.reduce((max, t) => (t.amount > max.amount ? t : max), expenses[0]);
  }, [filteredTransactions]);

  const categoryBreakdown = useMemo(() => {
    const dict: { [cat: string]: number } = {};
    filteredTransactions.forEach(t => {
      if (t.type.toLowerCase() === 'expense') {
        const cat = t.category || 'Other';
        dict[cat] = (dict[cat] || 0) + t.amount;
      }
    });
    const totalExp = Object.values(dict).reduce((a, b) => a + b, 0);
    return Object.entries(dict)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: totalExp > 0 ? Math.round((amount / totalExp) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [filteredTransactions]);

  const highestCategory = categoryBreakdown[0] || null;

  // Monthly Trend Data for Line Chart
  const trendPoints = useMemo(() => {
    const monthsMap: { [key: string]: { label: string; date: Date; net: number } } = {};
    transactions.forEach(t => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!monthsMap[key]) {
        monthsMap[key] = {
          label: d.toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', { month: 'short' }),
          date: new Date(d.getFullYear(), d.getMonth(), 1),
          net: 0,
        };
      }
      if (t.type.toLowerCase() === 'income') {
        monthsMap[key].net += t.amount;
      } else {
        monthsMap[key].net -= t.amount;
      }
    });
    return Object.values(monthsMap)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(-6);
  }, [transactions, language]);

  const timeRangeTabs: { id: TimeRange; label: string }[] = [
    { id: 'thisWeek', label: t.timeRangeThisWeek },
    { id: 'thisMonth', label: t.timeRangeThisMonth },
    { id: 'lastMonth', label: t.timeRangeLastMonth },
    { id: 'last3Months', label: t.timeRangeLast3M },
    { id: 'last6Months', label: t.timeRangeLast6M },
    { id: 'thisYear', label: t.timeRangeThisYear },
    { id: 'allTime', label: t.timeRangeAllTime },
  ];

  const maxCompareAmount = Math.max(periodIncome, periodExpenses, 1);
  const incomeBarHeight = Math.round((periodIncome / maxCompareAmount) * 120);
  const expenseBarHeight = Math.round((periodExpenses / maxCompareAmount) * 120);

  return (
    <div id="analytics-tab-view" className="space-y-4 px-4 pt-2 pb-24 text-[#1C1C1E] dark:text-[#F2F2F7]">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">{t.insightsHeading}</span>
          <h2 className="text-xl font-bold tracking-tight text-[#1C1C1E] dark:text-white">{t.analyticsTitle}</h2>
        </div>
        <span className="rounded-lg bg-[#E5E5EA] px-2.5 py-1 text-[10px] font-bold text-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-[#D1D1D6]">
          Swift Charts
        </span>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {timeRangeTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedRange(tab.id)}
            className={`rounded-full px-3.5 py-1 font-semibold whitespace-nowrap transition-all ${selectedRange === tab.id ? 'bg-[#007AFF] text-white shadow-sm' : 'bg-[#E5E5EA] text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#2C2C2E] dark:text-[#8E8E93]'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4 Summary Metrics Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Savings Rate */}
        <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-4 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">{t.savingsRate}</div>
          <div className="mt-1 font-black text-xl text-[#007AFF]">
            {savingsRate}%
          </div>
          <div className="text-[10px] text-[#8E8E93]">{language === 'ar' ? 'من إجمالي الدخل' : 'of period income'}</div>
        </div>

        {/* Net Savings */}
        <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-4 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">{t.netSavings}</div>
          <div className={`mt-1 font-black text-xl truncate ${periodIncome >= periodExpenses ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
            {formatCurrency(periodIncome - periodExpenses)}
          </div>
          <div className="text-[10px] text-[#8E8E93]">{language === 'ar' ? 'الدخل ناقص المصاريف' : 'Income minus expenses'}</div>
        </div>

        {/* Largest Expense */}
        <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-4 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">{t.largestExpense}</div>
          <div className="mt-1 font-bold text-sm text-[#1C1C1E] dark:text-white truncate">
            {largestExpense ? formatCurrency(largestExpense.amount) : formatCurrency(0)}
          </div>
          <div className="truncate text-[10px] text-[#8E8E93]">
            {largestExpense?.itemDescription || translateCat(largestExpense?.category) || (language === 'ar' ? 'لا يوجد' : 'None')}
          </div>
        </div>

        {/* Top Category */}
        <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-4 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">{t.topCategory}</div>
          <div className="mt-1 font-bold text-sm text-[#1C1C1E] dark:text-white truncate">
            {highestCategory ? translateCat(highestCategory.name) : (language === 'ar' ? 'لا يوجد' : 'None')}
          </div>
          <div className="text-[10px] text-[#8E8E93]">
            {highestCategory ? `${formatCurrency(highestCategory.amount)} (${highestCategory.percentage}%)` : formatCurrency(0)}
          </div>
        </div>
      </div>

      {/* Visual Chart 1: Income vs Expenses Bar Chart */}
      <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#8E8E93]">{t.incomeVsExpenses} (BarMark)</h3>
          <span className="text-[10px] text-[#8E8E93]">Native Swift Charts</span>
        </div>

        <div className="mt-4 flex h-36 items-end justify-center gap-12 border-b border-[#F2F2F7] pb-2 dark:border-[#38383A]">
          {/* Income bar */}
          <div className="flex flex-col items-center">
            <span className="mb-1 font-bold text-[10px] text-[#34C759]">
              {formatCurrency(periodIncome)}
            </span>
            <div
              className="w-14 rounded-t-xl bg-[#34C759] shadow-sm transition-all duration-500"
              style={{ height: `${Math.max(12, incomeBarHeight)}px` }}
            />
            <span className="mt-2 text-xs font-semibold text-[#1C1C1E] dark:text-white">{t.income}</span>
          </div>

          {/* Expenses bar */}
          <div className="flex flex-col items-center">
            <span className="mb-1 font-bold text-[10px] text-[#FF3B30]">
              {formatCurrency(periodExpenses)}
            </span>
            <div
              className="w-14 rounded-t-xl bg-[#FF3B30] shadow-sm transition-all duration-500"
              style={{ height: `${Math.max(12, expenseBarHeight)}px` }}
            />
            <span className="mt-2 text-xs font-semibold text-[#1C1C1E] dark:text-white">{t.expenses}</span>
          </div>
        </div>
      </div>

      {/* Visual Chart 2: Spending by Category Ranked Bars */}
      <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
        <h3 className="font-bold text-xs uppercase tracking-wider text-[#8E8E93]">{t.categoryBreakdown}</h3>
        <p className="text-[11px] text-[#8E8E93] mb-3">
          {language === 'ar' ? 'توزيع المصاريف حسب الفئات تصاعدياً' : 'Ranked horizontal distribution'}
        </p>

        {categoryBreakdown.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#8E8E93]">
            {language === 'ar' ? 'لا توجد مصاريف مسجلة في هذه الفترة.' : 'No expense transactions in this period.'}
          </div>
        ) : (
          <div className="space-y-3">
            {categoryBreakdown.slice(0, 5).map((cat, idx) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1C1C1E] dark:text-white">
                    {idx + 1}. {translateCat(cat.name)}
                  </span>
                  <span className="font-bold text-[#1C1C1E] dark:text-white">
                    {formatCurrency(cat.amount)} ({cat.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#F2F2F7] dark:bg-[#1C1C1E]">
                  <div
                    className="h-full rounded-full bg-[#007AFF] transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Visual Chart 3: Net Savings Trend Line Chart */}
      <div className="rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#8E8E93]">{t.monthlyTrend} (LineMark)</h3>
          <span className="text-[11px] text-[#8E8E93]">
            {language === 'ar' ? 'الأشهر السابقة' : 'Past Months'}
          </span>
        </div>

        {trendPoints.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#8E8E93]">
            {language === 'ar' ? 'يتطلب وجود معاملات سابقة لعرض المنحنى.' : 'Need more transaction history.'}
          </div>
        ) : (
          <div className="mt-3">
            <div className="flex h-28 items-end justify-between gap-2 border-b border-[#F2F2F7] px-2 pb-1 dark:border-[#38383A]">
              {trendPoints.map((pt, i) => {
                const maxVal = Math.max(...trendPoints.map(p => Math.abs(p.net)), 1);
                const heightPercent = Math.min(100, Math.max(15, Math.round((Math.abs(pt.net) / maxVal) * 90)));
                const isPositive = pt.net >= 0;

                return (
                  <div key={i} className="flex flex-1 flex-col items-center">
                    <div
                      className={`w-3 rounded-full transition-all duration-500 ${isPositive ? 'bg-[#007AFF]' : 'bg-[#FF3B30]'}`}
                      style={{ height: `${heightPercent}%` }}
                      title={`${pt.label}: ${formatCurrency(pt.net)}`}
                    />
                    <span className="mt-1 text-[10px] font-medium text-[#8E8E93]">
                      {pt.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 text-center text-[10px] text-[#8E8E93]">
              {language === 'ar'
                ? 'يمثل ارتفاع العمود صافي التوفير لكل شهر'
                : 'Bar height represents net savings intensity per month'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

