import React, { useState } from 'react';
import { TransactionItem, CategoryItem } from '../../../types/finance';
import { X, ArrowDownLeft, ArrowUpRight, Trash2, Check } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { AmountInput } from '../AmountInput';
import { formatInitialAmount, parseRawAmount } from '../../../services/currencyFormatter';

interface EditTransactionSheetProps {
  transaction: TransactionItem;
  categories: CategoryItem[];
  onClose: () => void;
  onSave: (updated: TransactionItem) => void;
  onDelete: (id: string) => void;
}

export const EditTransactionSheet: React.FC<EditTransactionSheetProps> = ({
  transaction,
  categories,
  onClose,
  onSave,
  onDelete,
}) => {
  const { t, language, translateCat } = useI18n();
  const [type, setType] = useState<'income' | 'expense'>(transaction.type);
  const [amount, setAmount] = useState<string>(formatInitialAmount(transaction.amount));
  const [date, setDate] = useState<string>(new Date(transaction.date).toISOString().split('T')[0]);
  const [category, setCategory] = useState<string>(transaction.category || 'Food');
  const [source, setSource] = useState<string>(transaction.source || 'Salary');
  const [itemDescription, setItemDescription] = useState<string>(transaction.itemDescription || '');
  const [notes, setNotes] = useState<string>(transaction.notes || '');
  const [confirmDelete, setConfirmDelete] = useState(false);

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
      ...transaction,
      type,
      amount: numericAmount,
      date: new Date(date).toISOString(),
      category: type === 'expense' ? category : 'Income',
      source: type === 'income' ? source : '',
      itemDescription: itemDescription.trim() || (type === 'income' ? source : category),
      notes: notes.trim(),
      updatedAt: new Date().toISOString(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <div>
            <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">
              {language === 'ar' ? 'تعديل' : 'Update'}
            </span>
            <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white">
              {language === 'ar' ? 'تعديل المعاملة' : 'Edit Transaction'}
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

          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {language === 'ar' ? 'المبلغ' : 'Amount'} ({language === 'ar' ? 'د.ع' : transaction.currency})
            </label>
            <AmountInput
              id="edit-transaction-amount-input"
              required
              value={amount}
              onChangeValue={val => setAmount(val)}
              className="mt-1 w-full rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] py-2.5 px-4 text-xl font-black text-[#1C1C1E] focus:border-[#007AFF] focus:bg-white focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white dark:focus:bg-[#1C1C1E]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {type === 'expense' ? (language === 'ar' ? 'الفئة' : 'Category') : (language === 'ar' ? 'مصدر الدخل' : 'Income Source')}
            </label>
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
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {language === 'ar' ? 'الوصف' : 'Description'}
            </label>
            <input
              type="text"
              value={itemDescription}
              onChange={e => setItemDescription(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
            />
          </div>

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

          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {language === 'ar' ? 'الملاحظات' : 'Notes'}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
            />
          </div>

          {confirmDelete ? (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-2.5 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50">
              <span className="text-xs font-bold text-[#FF3B30] flex-1">
                {language === 'ar' ? 'تأكيد حذف المعاملة؟' : 'Confirm deletion?'}
              </span>
              <button
                type="button"
                onClick={() => {
                  onDelete(transaction.id);
                  onClose();
                }}
                className="rounded-lg bg-[#FF3B30] px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700"
              >
                {t.delete}
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-lg bg-gray-200 dark:bg-gray-700 px-2.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200"
              >
                {t.cancel}
              </button>
            </div>
          ) : (
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-[#FF3B30] hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 transition-colors"
              >
                <Trash2 className="h-4 w-4" /> {t.delete}
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-[#007AFF] py-3 text-center text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors"
              >
                {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
