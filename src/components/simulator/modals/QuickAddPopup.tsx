import React, { useState, useEffect, useRef } from 'react';
import { CategoryItem, TransactionItem } from '../../../types/finance';
import { X, Check, ArrowDownCircle, ArrowUpCircle, Delete, Sparkles } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';

interface QuickAddPopupProps {
  isOpen: boolean;
  initialType: 'expense' | 'income';
  categories: CategoryItem[];
  onClose: () => void;
  onSave: (item: Omit<TransactionItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const QuickAddPopup: React.FC<QuickAddPopupProps> = ({
  isOpen,
  initialType,
  categories,
  onClose,
  onSave,
}) => {
  const { language } = useI18n();
  const [type, setType] = useState<'expense' | 'income'>(initialType);
  const [amountStr, setAmountStr] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showKeypad, setShowKeypad] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter categories matching transaction type
  const matchingCategories = categories.filter(c =>
    type === 'expense' ? c.type === 'expense_category' : c.type === 'income_source'
  );

  // Sync state whenever modal opens or initialType changes
  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      setAmountStr('');
      setDescription('');
      const defaultCats = categories.filter(c =>
        initialType === 'expense' ? c.type === 'expense_category' : c.type === 'income_source'
      );
      setSelectedCategory(defaultCats.length > 0 ? defaultCats[0].name : (initialType === 'expense' ? 'Food' : 'Salary'));
      // Pre-focus numeric input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, initialType, categories]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleKeypadPress = (val: string) => {
    if (val === 'DEL') {
      setAmountStr(prev => prev.slice(0, -1));
    } else if (val === '.') {
      if (!amountStr.includes('.')) {
        setAmountStr(prev => (prev === '' ? '0.' : prev + '.'));
      }
    } else if (val === '00') {
      if (amountStr !== '' && amountStr !== '0') {
        setAmountStr(prev => prev + '00');
      }
    } else {
      if (amountStr === '0') {
        setAmountStr(val);
      } else {
        setAmountStr(prev => prev + val);
      }
    }
  };

  const handleQuickAddIncrement = (inc: number) => {
    const current = parseFloat(amountStr) || 0;
    setAmountStr((current + inc).toString());
  };

  const handleSave = () => {
    const numericAmount = parseFloat(amountStr);
    if (!numericAmount || numericAmount <= 0) {
      inputRef.current?.focus();
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    onSave({
      type,
      amount: numericAmount,
      currency: 'IQD',
      category: selectedCategory || (type === 'expense' ? 'General Expense' : 'General Income'),
      source: type === 'income' ? selectedCategory || 'Income' : '',
      itemDescription: description.trim() || (type === 'expense' ? 'Quick Expense' : 'Quick Income'),
      notes: 'Logged via iOS Home Screen Widget Quick Add',
      date: today,
    });

    onClose();
  };

  const isExpense = type === 'expense';
  const numericVal = parseFloat(amountStr) || 0;

  return (
    <div
      id="quick-add-backdrop"
      onClick={e => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 transition-opacity animate-in fade-in duration-150"
    >
      <div
        id="quick-add-floating-card"
        className="w-full max-w-sm bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isExpense ? 'bg-red-400' : 'bg-emerald-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isExpense ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
            </span>
            <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{language === 'ar' ? 'تسجيل سريع من الويدجت' : 'Widget Quick Add'}</span>
            </div>
          </div>

          <button
            id="quick-add-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type Switcher Segmented Control */}
        <div className="p-3 bg-gray-50 dark:bg-[#141416]">
          <div className="grid grid-cols-2 gap-1.5 bg-gray-200/80 dark:bg-gray-800/80 p-1 rounded-xl">
            <button
              id="quick-add-type-expense"
              type="button"
              onClick={() => {
                setType('expense');
                const expCats = categories.filter(c => c.type === 'expense_category');
                if (expCats.length > 0) setSelectedCategory(expCats[0].name);
              }}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isExpense
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>{language === 'ar' ? 'مصروف' : 'Expense'}</span>
            </button>

            <button
              id="quick-add-type-income"
              type="button"
              onClick={() => {
                setType('income');
                const incCats = categories.filter(c => c.type === 'income_source');
                if (incCats.length > 0) setSelectedCategory(incCats[0].name);
              }}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !isExpense
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <ArrowUpCircle className="w-4 h-4" />
              <span>{language === 'ar' ? 'دخل' : 'Income'}</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3.5 overflow-y-auto">
          {/* Prominent Amount Display & Input */}
          <div className="bg-gray-50 dark:bg-[#252528] rounded-2xl p-3 border border-gray-100 dark:border-gray-800 text-center">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {language === 'ar' ? 'المبلغ' : 'Amount'}
            </span>
            <div className="flex items-center justify-center gap-1 mt-1">
              <input
                ref={inputRef}
                id="quick-add-amount-input"
                type="number"
                inputMode="decimal"
                value={amountStr}
                onChange={e => setAmountStr(e.target.value)}
                placeholder="0"
                className="w-full text-center text-3xl font-black bg-transparent text-gray-900 dark:text-white focus:outline-none placeholder-gray-300 dark:placeholder-gray-600"
              />
              <span className="text-sm font-bold text-gray-400">IQD</span>
            </div>

            {/* Quick Increment Chips */}
            <div className="flex items-center justify-center gap-1.5 mt-2.5">
              {[1000, 5000, 10000, 25000].map(inc => (
                <button
                  key={inc}
                  type="button"
                  onClick={() => handleQuickAddIncrement(inc)}
                  className="px-2 py-0.5 rounded-lg bg-white dark:bg-gray-800 text-[11px] font-bold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all shadow-2xs"
                >
                  +{inc.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {isExpense ? (language === 'ar' ? 'الفئة' : 'Category') : (language === 'ar' ? 'المصدر' : 'Source')}
              </label>
              <span className="text-[10px] text-gray-400">
                {matchingCategories.length} {language === 'ar' ? 'خيارات' : 'options'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
              {matchingCategories.map(cat => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? isExpense
                          ? 'bg-red-500 text-white shadow-sm ring-2 ring-red-300 dark:ring-red-900'
                          : 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300 dark:ring-emerald-900'
                        : 'bg-gray-100 dark:bg-[#2C2C2E] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              {language === 'ar' ? 'الوصف / ملاحظة' : 'Description / Note'}
            </label>
            <input
              id="quick-add-desc-input"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={isExpense ? 'e.g. Lunch, Coffee, Taxi' : 'e.g. Freelance bonus, Salary'}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-[#252528] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Fast Numeric Keypad (optional toggle / direct convenience on touch) */}
          <div className="pt-1">
            <div className="flex items-center justify-between pb-1.5">
              <span className="text-[10px] font-semibold text-gray-400">
                {language === 'ar' ? 'لوحة أرقام سريعة' : 'Numeric Keypad'}
              </span>
              <button
                type="button"
                onClick={() => setShowKeypad(!showKeypad)}
                className="text-[10px] text-blue-500 font-bold hover:underline"
              >
                {showKeypad ? (language === 'ar' ? 'إخفاء' : 'Hide') : (language === 'ar' ? 'إظهار' : 'Show')}
              </button>
            </div>

            {showKeypad && (
              <div className="grid grid-cols-3 gap-1.5">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'DEL'].map(k => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => handleKeypadPress(k)}
                    className="h-9 rounded-xl bg-gray-100 dark:bg-[#2A2A2D] text-sm font-bold text-gray-800 dark:text-gray-100 active:scale-95 transition-all flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 shadow-2xs"
                  >
                    {k === 'DEL' ? <Delete className="w-4 h-4 text-red-500" /> : k}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-gray-50 dark:bg-[#18181A] border-t border-gray-100 dark:border-gray-800 flex items-center gap-2.5">
          <button
            id="quick-add-cancel-btn"
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-98 transition-all"
          >
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>

          <button
            id="quick-add-save-btn"
            type="button"
            disabled={numericVal <= 0}
            onClick={handleSave}
            className={`flex-2 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md active:scale-98 transition-all ${
              numericVal > 0
                ? isExpense
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>
              {language === 'ar'
                ? `حفظ (${numericVal.toLocaleString()} IQD)`
                : `Save ${isExpense ? 'Expense' : 'Income'}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
