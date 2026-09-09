import React, { useState } from 'react';
import { TransactionItem, CategoryItem } from '../../../types/finance';
import { X, ArrowDownLeft, ArrowUpRight, Plus, Calendar, Tag, FileText, Check } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { AmountInput } from '../AmountInput';
import { parseRawAmount } from '../../../services/currencyFormatter';

interface AddTransactionSheetProps {
  categories: CategoryItem[];
  onClose: () => void;
  onSave: (transaction: Omit<TransactionItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onAddCategory: (name: string, type: 'income_source' | 'expense_category') => void;
}

export const AddTransactionSheet: React.FC<AddTransactionSheetProps> = ({
  categories,
  onClose,
  onSave,
  onAddCategory,
}) => {
  const { t, language, translateCat } = useI18n();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState<string>('');
  const [currency] = useState<string>(language === 'ar' ? 'د.ع' : 'IQD');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<string>('Food');
  const [source, setSource] = useState<string>('Salary');
  const [itemDescription, setItemDescription] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [newCatInput, setNewCatInput] = useState<string>('');
  const [showNewCatInput, setShowNewCatInput] = useState<boolean>(false);

  const expenseCategories = categories.filter(c => c.type === 'expense_category');
  const incomeSources = categories.filter(c => c.type === 'income_source');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseRawAmount(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert(language === 'ar' ? 'يرجى إدخال مبلغ صحيح.' : 'Please enter a valid amount.');
      return;
    }

    onSave({
      type,
      amount: numericAmount,
      currency: 'IQD',
      date: new Date(date).toISOString(),
      category: type === 'expense' ? category : 'Income',
      source: type === 'income' ? source : '',
      itemDescription: itemDescription.trim() || (type === 'income' ? source : category),
      notes: notes.trim(),
    });

    onClose();
  };

  const handleAddNewCat = () => {
    if (newCatInput.trim()) {
      const targetType = type === 'expense' ? 'expense_category' : 'income_source';
      onAddCategory(newCatInput.trim(), targetType);
      if (type === 'expense') {
        setCategory(newCatInput.trim());
      } else {
        setSource(newCatInput.trim());
      }
      setNewCatInput('');
      setShowNewCatInput(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <div>
            <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">
              {language === 'ar' ? 'إدخال المعاملة' : 'Entry'}
            </span>
            <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white">
              {language === 'ar' ? 'إضافة معاملة جديدة' : 'Add Transaction'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Segmented Control: Expense vs Income */}
          <div className="flex rounded-xl bg-[#E5E5EA] p-1 text-xs font-semibold dark:bg-[#1C1C1E]">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${type === 'expense' ? 'bg-[#FF3B30] text-white shadow-sm' : 'text-[#8E8E93]'}`}
            >
              <ArrowUpRight className="h-4 w-4" /> {t.expenses}
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${type === 'income' ? 'bg-[#34C759] text-white shadow-sm' : 'text-[#8E8E93]'}`}
            >
              <ArrowDownLeft className="h-4 w-4" /> {t.income}
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {language === 'ar' ? 'المبلغ' : 'Amount'} ({currency})
            </label>
            <div className="relative mt-1">
              <AmountInput
                id="add-transaction-amount-input"
                required
                placeholder={language === 'ar' ? 'مثال: 250,000' : 'e.g. 250,000'}
                value={amount}
                onChangeValue={val => setAmount(val)}
                className="w-full rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] py-3 pr-16 pl-4 text-2xl font-black text-[#1C1C1E] focus:border-[#007AFF] focus:bg-white focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white dark:focus:bg-[#1C1C1E]"
              />
              <span className="absolute top-4 right-4 font-bold text-xs text-[#8E8E93] pointer-events-none">
                {currency}
              </span>
            </div>
          </div>

          {/* Category or Source */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              <span>{type === 'expense' ? (language === 'ar' ? 'الفئة' : 'Category') : (language === 'ar' ? 'مصدر الدخل' : 'Income Source')}</span>
              <button
                type="button"
                onClick={() => setShowNewCatInput(!showNewCatInput)}
                className="text-[#007AFF] hover:underline font-semibold"
              >
                {language === 'ar' ? '+ جديد' : '+ new'}
              </button>
            </div>

            {showNewCatInput ? (
              <div className="mt-1.5 flex gap-2">
                <input
                  type="text"
                  placeholder={language === 'ar' ? `اسم ${type === 'expense' ? 'الفئة' : 'المصدر'} الجديد...` : `New ${type === 'expense' ? 'category' : 'source'} name...`}
                  value={newCatInput}
                  onChange={e => setNewCatInput(e.target.value)}
                  className="flex-1 rounded-xl border border-[#E5E5EA] bg-white px-3 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleAddNewCat}
                  className="rounded-xl bg-[#007AFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0062CC]"
                >
                  {t.save}
                </button>
              </div>
            ) : (
              <div className="mt-2 flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                {(type === 'expense' ? expenseCategories : incomeSources).map(item => {
                  const isSelected = (type === 'expense' ? category : source) === item.name;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => {
                        if (type === 'expense') setCategory(item.name);
                        else setSource(item.name);
                      }}
                      className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${isSelected ? 'bg-[#007AFF] text-white shadow-sm' : 'bg-[#E5E5EA] text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#38383A] dark:text-[#8E8E93]'}`}
                    >
                      {translateCat(item.name)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {language === 'ar' ? 'الوصف / الجهة' : 'Description / Merchant'}
            </label>
            <input
              type="text"
              placeholder={language === 'ar' ? 'مثال: أسواق المواد الغذائية، وقود، الراتب الشهري...' : 'e.g. Grocery store, Fuel, Monthly Salary...'}
              value={itemDescription}
              onChange={e => setItemDescription(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {language === 'ar' ? 'تاريخ المعاملة' : 'Transaction Date'}
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {language === 'ar' ? 'ملاحظات إضافية' : 'Optional Notes'}
            </label>
            <textarea
              rows={2}
              placeholder={language === 'ar' ? 'تفاصيل إضافية أو مذكرات...' : 'Additional details, receipts or memos...'}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#007AFF] py-3 text-center text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] active:scale-[0.98] transition-all"
          >
            {language === 'ar' ? 'حفظ المعاملة' : 'Save Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

