import React, { useState } from 'react';
import { BudgetItem, TransactionItem, CategoryItem } from '../../../types/finance';
import { X, Plus, Trash2, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { AmountInput } from '../AmountInput';
import { parseRawAmount } from '../../../services/currencyFormatter';

interface BudgetsModalProps {
  budgets: BudgetItem[];
  transactions: TransactionItem[];
  categories: CategoryItem[];
  onClose: () => void;
  onSaveBudget: (category: string, monthlyLimit: number) => void;
  onDeleteBudget: (id: string) => void;
}

export const BudgetsModal: React.FC<BudgetsModalProps> = ({
  budgets,
  transactions,
  categories,
  onClose,
  onSaveBudget,
  onDeleteBudget,
}) => {
  const { t, language, formatCurrency, translateCat } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>('Food');
  const [limitInput, setLimitInput] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const now = new Date();
  const currentMonthExpenses = transactions.filter(t => {
    const d = new Date(t.date);
    return t.type.toLowerCase() === 'expense' &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();
  });

  const expenseCategories = categories.filter(c => c.type === 'expense_category');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const limit = parseRawAmount(limitInput);
    if (isNaN(limit) || limit <= 0) {
      alert(language === 'ar' ? 'يرجى إدخال حد شهري صحيح.' : 'Please enter a valid monthly limit.');
      return;
    }
    onSaveBudget(selectedCategory, limit);
    setLimitInput('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <div>
            <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">
              {language === 'ar' ? 'التخطيط المالي' : 'Planning'}
            </span>
            <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white">
              {language === 'ar' ? 'الميزانيات الشهرية' : 'Monthly Budgets'}
            </h3>
            <p className="text-xs text-[#8E8E93]">
              {now.toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Add budget toggle */}
        <div className="mt-4">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-50 py-2.5 text-xs font-bold text-[#007AFF] hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 transition-colors"
            >
              <Plus className="h-4 w-4" /> {language === 'ar' ? 'تحديد سقف لفئة جديدة' : 'Set Limit for Category'}
            </button>
          ) : (
            <form onSubmit={handleAddSubmit} className="space-y-3 rounded-2xl bg-[#F2F2F7] p-4 dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#3A3A3C]">
              <div className="flex items-center justify-between text-xs font-bold text-[#1C1C1E] dark:text-white">
                <span>{language === 'ar' ? 'تحديد ميزانية الفئة' : 'Set Budget Limit'}</span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-[#8E8E93] hover:text-[#1C1C1E]"
                >
                  {t.cancel}
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider">
                  {language === 'ar' ? 'الفئة' : 'Category'}
                </label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white p-2.5 text-xs font-semibold focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                >
                  {expenseCategories.map(c => (
                    <option key={c.name} value={c.name}>{translateCat(c.name)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider">
                  {language === 'ar' ? 'الحد الأقصى الشهري' : 'Monthly Limit'} ({language === 'ar' ? 'د.ع' : 'IQD'})
                </label>
                <AmountInput
                  id="budget-modal-limit-input"
                  required
                  placeholder={language === 'ar' ? 'مثال: 500,000' : 'e.g. 500,000'}
                  value={limitInput}
                  onChangeValue={val => setLimitInput(val)}
                  className="mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white p-2.5 text-xs font-black focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#007AFF] py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors"
              >
                {language === 'ar' ? 'حفظ الميزانية' : 'Save Budget'}
              </button>
            </form>
          )}
        </div>

        {/* Budget list */}
        <div className="mt-4 space-y-3">
          {budgets.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E5E5EA] p-6 text-center text-xs text-[#8E8E93] dark:border-[#3A3A3C]">
              {language === 'ar' ? 'لم تقم بتعيين ميزانيات لأي فئة بعد.' : 'No category budgets configured yet.'}
            </div>
          ) : (
            budgets.map(b => {
              const spent = currentMonthExpenses
                .filter(t => t.category === b.category)
                .reduce((acc, t) => acc + t.amount, 0);

              const percentage = b.monthlyLimit > 0 ? Math.round((spent / b.monthlyLimit) * 100) : 0;
              const isOver = spent > b.monthlyLimit;
              const isNear = spent >= b.monthlyLimit * 0.8 && !isOver;

              let barColor = 'bg-[#007AFF]';
              let badgeColor = 'bg-blue-50 text-[#007AFF] dark:bg-blue-950/40 dark:text-blue-300';
              let statusLabel = language === 'ar' ? 'ضمن الحد' : 'On Track';

              if (isOver) {
                barColor = 'bg-[#FF3B30]';
                badgeColor = 'bg-red-50 text-[#FF3B30] dark:bg-red-950/40 dark:text-red-300';
                statusLabel = language === 'ar' ? 'تجاوز الميزانية' : 'Over Budget';
              } else if (isNear) {
                barColor = 'bg-[#FF9500]';
                badgeColor = 'bg-amber-50 text-[#FF9500] dark:bg-amber-950/40 dark:text-amber-300';
                statusLabel = language === 'ar' ? 'قريب من السقف' : 'Near Limit';
              }

              return (
                <div
                  key={b.id}
                  className="rounded-2xl border border-[#E5E5EA] bg-white p-4 shadow-sm dark:border-[#3A3A3C] dark:bg-[#1C1C1E]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-[#1C1C1E] dark:text-white">{translateCat(b.category)}</span>
                      <span className="ml-2 text-[10px] font-semibold text-[#8E8E93]">
                        {percentage}% {language === 'ar' ? 'مستهلك' : 'used'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${badgeColor}`}>
                        {statusLabel}
                      </span>
                      <button
                        onClick={() => onDeleteBudget(b.id)}
                        className="text-[#8E8E93] hover:text-[#FF3B30] transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#F2F2F7] dark:bg-[#38383A]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${Math.min(100, percentage)}%` }}
                    />
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px]">
                    <span className="text-[#8E8E93]">
                      {language === 'ar' ? 'المصروف:' : 'Spent:'} <strong className="font-semibold text-[#1C1C1E] dark:text-[#F2F2F7]">{formatCurrency(spent)}</strong>
                    </span>
                    <span className="text-[#8E8E93]">
                      {language === 'ar' ? 'السقف:' : 'Limit:'} <strong className="font-semibold text-[#1C1C1E] dark:text-[#F2F2F7]">{formatCurrency(b.monthlyLimit)}</strong>
                    </span>
                  </div>

                  {isOver && (
                    <div className="mt-2.5 flex items-center gap-1.5 rounded-xl bg-red-50 px-2.5 py-1 text-[10px] font-bold text-[#FF3B30] dark:bg-red-950/40 dark:text-red-400">
                      <AlertTriangle className="h-3 w-3" />
                      {language === 'ar' 
                        ? `تجاوز السقف بمقدار ${formatCurrency(spent - b.monthlyLimit)}`
                        : `Exceeded limit by ${formatCurrency(spent - b.monthlyLimit)}`}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

