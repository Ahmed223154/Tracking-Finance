import React, { useState } from 'react';
import { TransactionItem, CategoryItem, AccountProfile } from '../../../types/finance';
import { X, ArrowDownLeft, ArrowUpRight, Check, Calendar, Tag, FileText, Layers } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';

export interface AddTransactionModalProps {
  categories: CategoryItem[];
  onClose: () => void;
  onSave: (transaction: Omit<TransactionItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onAddCategory: (name: string, type: 'income_source' | 'expense_category') => void;
  initialType?: 'expense' | 'income';
  accounts?: AccountProfile[];
  activeAccountId?: string;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  categories,
  onClose,
  onSave,
  onAddCategory,
  initialType = 'expense',
  accounts = [],
  activeAccountId = 'personal',
}) => {
  const { t, language, translateCat } = useI18n();
  const [selectedAccountId, setSelectedAccountId] = useState<string>(activeAccountId);
  const [type, setType] = useState<'income' | 'expense'>(initialType);

  const selectedAccount = accounts.find(a => a.id === selectedAccountId);
  const accountCurrency = (selectedAccount?.currency as 'IQD' | 'USD') || 'IQD';

  // Dual state for amount: formatted string + raw numeric value
  const [displayAmount, setDisplayAmount] = useState<string>('');
  const [numericAmount, setNumericAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<'IQD' | 'USD'>(accountCurrency);

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<string>('Food');
  const [source, setSource] = useState<string>('Salary');
  const [itemDescription, setItemDescription] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [selectedStepId, setSelectedStepId] = useState<string>('');

  const [newCatInput, setNewCatInput] = useState<string>('');
  const [showNewCatInput, setShowNewCatInput] = useState<boolean>(false);

  // Available steps if business account has plan breakdown steps
  const availableSteps = selectedAccount?.steps || [];

  const handleAccountChange = (accId: string) => {
    setSelectedAccountId(accId);
    const acc = accounts.find(a => a.id === accId);
    if (acc?.currency) {
      setCurrency((acc.currency as 'IQD' | 'USD') || 'IQD');
    }
    setSelectedStepId('');
  };

  // Real-time thousands-separator formatting
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanVal = value.replace(/,/g, '').trim();

    if (cleanVal === '' || /^\d*\.?\d*$/.test(cleanVal)) {
      if (cleanVal === '') {
        setDisplayAmount('');
        setNumericAmount(0);
        return;
      }

      const [integerPart, decimalPart] = cleanVal.split('.');
      const formattedInteger = integerPart ? Number(integerPart).toLocaleString('en-US') : '0';
      const formatted = decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;

      setDisplayAmount(formatted);
      setNumericAmount(parseFloat(cleanVal) || 0);
    }
  };

  const expenseCategories = categories.filter(c => c.type === 'expense_category');
  const incomeSources = categories.filter(c => c.type === 'income_source');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numericAmount <= 0) {
      alert(language === 'ar' ? 'يرجى إدخال مبلغ صحيح أكبر من الصفر.' : 'Please enter a valid amount greater than zero.');
      return;
    }

    onSave({
      accountId: selectedAccountId,
      type,
      amount: numericAmount,
      currency,
      date: new Date(date).toISOString().split('T')[0],
      category: type === 'expense' ? category : 'Income',
      source: type === 'income' ? source : '',
      itemDescription: itemDescription.trim() || (type === 'income' ? source : category),
      notes: notes.trim(),
      stepId: type === 'expense' && selectedStepId ? selectedStepId : undefined,
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[92vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <div>
            <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">
              {language === 'ar' ? 'تسجيل المعاملات' : 'Transaction Entry'}
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
          {/* Target Account Selector */}
          {accounts && accounts.length > 1 && (
            <div>
              <label className="block text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">
                {language === 'ar' ? 'حساب القيد (المحفظة)' : 'Target Account / Ledger'}
              </label>
              <select
                value={selectedAccountId}
                onChange={e => handleAccountChange(e.target.value)}
                className="w-full rounded-xl border border-[#E5E5EA] bg-[#F2F2F7] px-3 py-2.5 text-xs font-bold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white outline-none focus:border-[#007AFF]"
              >
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} ({acc.type === 'personal' ? 'Personal' : 'Business'})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Segmented Control: Expense vs Income */}
          <div className="flex rounded-2xl bg-[#E5E5EA] p-1 text-xs font-bold dark:bg-[#1C1C1E]">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 transition-all ${
                type === 'expense' ? 'bg-[#FF3B30] text-white shadow-sm' : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              <ArrowUpRight className="h-4 w-4" /> {t.expenses}
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 transition-all ${
                type === 'income' ? 'bg-[#34C759] text-white shadow-sm' : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              <ArrowDownLeft className="h-4 w-4" /> {t.income}
            </button>
          </div>

          {/* Amount & Currency */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="block text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider">
              {language === 'ar' ? 'المبلغ والعملة' : 'Amount & Currency'} *
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="decimal"
                  required
                  placeholder="0"
                  value={displayAmount}
                  onChange={handleAmountChange}
                  className="w-full rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] py-3 px-4 text-2xl font-black text-[#1C1C1E] focus:border-[#007AFF] focus:bg-white focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white dark:focus:bg-[#1C1C1E] transition-all box-border"
                />
              </div>

              {/* Currency Segmented Toggle */}
              <div className="flex p-1 rounded-2xl bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#3A3A3C] shrink-0">
                <button
                  type="button"
                  onClick={() => setCurrency('IQD')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                    currency === 'IQD'
                      ? 'bg-[#007AFF] text-white shadow-sm'
                      : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
                  }`}
                >
                  IQD
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-black transition-all ${
                    currency === 'USD'
                      ? 'bg-[#007AFF] text-white shadow-sm'
                      : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
                  }`}
                >
                  $ USD
                </button>
              </div>
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
              <div className="mt-2 flex flex-wrap gap-1.5 max-h-28 overflow-y-auto no-scrollbar">
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
                      className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#007AFF] text-white shadow-sm'
                          : 'bg-[#E5E5EA] text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#38383A] dark:text-[#8E8E93]'
                      }`}
                    >
                      {translateCat(item.name)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Optional Business Plan Step Linkage (if business account has steps) */}
          {selectedAccount?.type === 'business' && availableSteps.length > 0 && type === 'expense' && (
            <div>
              <label className="block text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-indigo-500" />
                {language === 'ar' ? 'ربط بمرحلة في خطة العمل (اختياري)' : 'Assign to Business Plan Step (Optional)'}
              </label>
              <select
                value={selectedStepId}
                onChange={e => setSelectedStepId(e.target.value)}
                className="w-full rounded-xl border border-[#E5E5EA] bg-[#F2F2F7] px-3 py-2 text-xs font-medium text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white outline-none focus:border-[#007AFF]"
              >
                <option value="">{language === 'ar' ? '— مصروف عام للتشغيل (بدون مرحلة محددة) —' : '— General Operating Expense (Unassigned) —'}</option>
                {availableSteps.map((s, idx) => (
                  <option key={s.id} value={s.id}>
                    #{idx + 1}: {s.title} ({s.targetAmount.toLocaleString()} {currency})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {language === 'ar' ? 'الوصف / الجهة' : 'Description / Merchant'}
            </label>
            <input
              type="text"
              placeholder={language === 'ar' ? 'مثال: مشتريات معدات، مستلزمات، عميل...' : 'e.g. Equipment vendor, office supplies, client payment...'}
              value={itemDescription}
              onChange={e => setItemDescription(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2.5 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
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
              className="mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2.5 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {language === 'ar' ? 'ملاحظات إضافية' : 'Optional Notes'}
            </label>
            <textarea
              rows={2}
              placeholder={language === 'ar' ? 'تفاصيل إضافية أو مذكرات...' : 'Additional notes or references...'}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-2xl bg-[#007AFF] py-3.5 text-center text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] active:scale-[0.98] transition-all cursor-pointer"
          >
            {language === 'ar' ? 'حفظ المعاملة' : 'Save Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};
