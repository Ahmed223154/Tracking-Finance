import React, { useState, useEffect, useRef } from 'react';
import { CategoryItem, TransactionItem } from '../types/finance';
import { X, Check, ArrowDownCircle, ArrowUpCircle, Sparkles, Tag } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { exitAppToHome } from '../utils/widgetSync';

export interface QuickAddPopupProps {
  isOpen: boolean;
  initialType: 'expense' | 'income';
  categories: CategoryItem[];
  currentBalance?: number;
  currentUnallocated?: number;
  priorityPlanName?: string;
  priorityPlanProgress?: number;
  onClose: () => void;
  onSave: (item: Omit<TransactionItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

/**
 * Normalizes Eastern Arabic numerals (٠١٢٣٤٥٦٧٨٩) to standard ASCII digits (0123456789)
 */
export const normalizeDigits = (str: string): string => {
  if (!str) return '';
  return str.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
};

const QUICK_EXPENSE_TAGS = [
  '🍽️ Lunch / Food',
  '🚕 Taxi / Fuel',
  '🛒 Groceries',
  '☕ Coffee',
  '⚡ Bills / Utilities',
  '🛍️ Shopping',
  '💊 Pharmacy',
  '📱 Mobile / Net',
];

const QUICK_INCOME_TAGS = [
  '💼 Monthly Salary',
  '💵 Freelance Gig',
  '🎁 Gift / Transfer',
  '📈 Investment Return',
  '🔄 Refund / Cashback',
  '💰 Business Sales',
];

export const QuickAddPopup: React.FC<QuickAddPopupProps> = ({
  isOpen,
  initialType,
  categories,
  currentBalance = 0,
  currentUnallocated = 0,
  priorityPlanName = 'No Active Plan',
  priorityPlanProgress = 0.0,
  onClose,
  onSave,
}) => {
  const { language } = useI18n();
  const [type, setType] = useState<'expense' | 'income'>(initialType);
  const [displayAmount, setDisplayAmount] = useState<string>('');
  const [numericAmount, setNumericAmount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter categories matching transaction type
  const matchingCategories = categories.filter(c =>
    type === 'expense' ? c.type === 'expense_category' : c.type === 'income_source'
  );

  // Sync state whenever modal opens or initialType changes
  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      setDisplayAmount('');
      setNumericAmount(0);
      setSelectedTag(initialType === 'expense' ? QUICK_EXPENSE_TAGS[0] : QUICK_INCOME_TAGS[0]);
      const defaultCats = categories.filter(c =>
        initialType === 'expense' ? c.type === 'expense_category' : c.type === 'income_source'
      );
      setSelectedCategory(defaultCats.length > 0 ? defaultCats[0].name : (initialType === 'expense' ? 'Food' : 'Salary'));
      
      // Auto-focus standard iOS keyboard
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialType, categories]);

  // Handle standard iOS keyboard input with real-time Eastern Arabic normalization and comma formatting
  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Normalize Arabic digits (٠١٢٣٤٥٦٧٨٩) to standard ASCII (0123456789)
    const normalized = normalizeDigits(rawVal);
    // Strip existing commas and any non-numeric characters
    const cleanDigits = normalized.replace(/\D/g, '');

    if (!cleanDigits) {
      setDisplayAmount('');
      setNumericAmount(0);
      return;
    }

    // Limit to 12 digits to prevent overflow
    const cappedDigits = cleanDigits.slice(0, 12);
    const parsed = parseInt(cappedDigits, 10) || 0;
    setNumericAmount(parsed);
    // Format dynamically with thousand separators
    setDisplayAmount(parsed.toLocaleString('en-US'));
  };

  const handleQuickAddIncrement = (inc: number) => {
    const next = numericAmount + inc;
    setNumericAmount(next);
    setDisplayAmount(next.toLocaleString('en-US'));
    inputRef.current?.focus();
  };

  // Exit application to iOS Home Screen on cancel or close button
  const handleCancel = async () => {
    onClose();
    await exitAppToHome();
  };

  // Exit application to iOS Home Screen on save
  const handleSave = async () => {
    if (numericAmount <= 0) return;

    const today = new Date().toISOString().split('T')[0];
    onSave({
      type,
      amount: numericAmount,
      currency: 'IQD',
      category: selectedCategory || (type === 'expense' ? 'General Expense' : 'General Income'),
      source: type === 'income' ? selectedCategory || 'Income' : '',
      itemDescription: selectedTag || (type === 'expense' ? 'Quick Expense' : 'Quick Income'),
      notes: 'Logged via iOS Home Screen Widget Quick Add',
      date: today,
    });

    onClose();
    await exitAppToHome();
  };

  if (!isOpen) return null;

  const isExpense = type === 'expense';
  const memoTags = isExpense ? QUICK_EXPENSE_TAGS : QUICK_INCOME_TAGS;

  return (
    <div
      id="quick-add-backdrop"
      onClick={e => {
        if (e.target === e.currentTarget) {
          handleCancel();
        }
      }}
      className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 transition-opacity animate-in fade-in duration-150"
    >
      <div
        id="quick-add-floating-card"
        className="w-full max-w-sm bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col max-h-[96vh] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="px-5 pt-3.5 pb-2.5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isExpense ? 'bg-red-400' : 'bg-emerald-400'
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isExpense ? 'bg-red-500' : 'bg-emerald-500'
                }`}
              ></span>
            </span>
            <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{language === 'ar' ? 'تسجيل سريع من الويدجت' : 'Widget Quick Add'}</span>
            </div>
          </div>

          <button
            id="quick-add-close-btn"
            type="button"
            onClick={handleCancel}
            aria-label="Close"
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type Switcher Segmented Control */}
        <div className="p-2.5 bg-gray-50 dark:bg-[#141416]">
          <div className="grid grid-cols-2 gap-1.5 bg-gray-200/80 dark:bg-gray-800/80 p-1 rounded-xl">
            <button
              id="quick-add-type-expense"
              type="button"
              onClick={() => {
                setType('expense');
                const expCats = categories.filter(c => c.type === 'expense_category');
                if (expCats.length > 0) setSelectedCategory(expCats[0].name);
                setSelectedTag(QUICK_EXPENSE_TAGS[0]);
                inputRef.current?.focus();
              }}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
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
                setSelectedTag(QUICK_INCOME_TAGS[0]);
                inputRef.current?.focus();
              }}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
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

        {/* Modal Body & Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="p-4 space-y-3 overflow-y-auto"
        >
          {/* Standard HTML Input with inputMode="decimal" and type="text" */}
          <div className="bg-gray-50 dark:bg-[#252528] rounded-2xl p-3 border border-gray-100 dark:border-gray-800 text-center">
            <label
              htmlFor="quick-add-amount-input"
              className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block"
            >
              {language === 'ar' ? 'المبلغ الإجمالي' : 'Total Amount'}
            </label>

            {/* Standard Input Element */}
            <div className="relative flex items-center justify-center mt-1">
              <input
                ref={inputRef}
                id="quick-add-amount-input"
                type="text"
                inputMode="decimal"
                autoFocus
                placeholder="0"
                value={displayAmount}
                onChange={handleAmountInputChange}
                className="w-full text-center text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight font-mono bg-transparent outline-none border-none px-12"
              />
              <span className="absolute right-3 text-xs font-bold text-gray-400 pointer-events-none">
                IQD
              </span>
            </div>

            {/* Quick Increment Chips */}
            <div className="flex items-center justify-center gap-1.5 mt-2">
              {[1000, 5000, 10000, 25000].map(inc => (
                <button
                  key={inc}
                  type="button"
                  onClick={() => handleQuickAddIncrement(inc)}
                  className="px-2 py-1 rounded-lg bg-white dark:bg-gray-800 text-[10px] font-bold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all shadow-2xs"
                >
                  +{inc.toLocaleString('en-US')}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {isExpense ? (language === 'ar' ? 'الفئة' : 'Category') : (language === 'ar' ? 'المصدر' : 'Source')}
              </span>
              <span className="text-[10px] text-gray-400">
                {matchingCategories.length} {language === 'ar' ? 'خيارات' : 'options'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {matchingCategories.map(cat => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      inputRef.current?.focus();
                    }}
                    className={`shrink-0 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
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

          {/* Quick Memo Tags */}
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Tag className="w-3 h-3 text-gray-400" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {language === 'ar' ? 'ملاحظة الفاتورة' : 'Memo / Tag'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {memoTags.map(tag => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSelectedTag(tag);
                      inputRef.current?.focus();
                    }}
                    className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-2xs ring-1 ring-blue-400'
                        : 'bg-gray-100 dark:bg-[#2C2C2E] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </form>

        {/* Modal Footer Actions */}
        <div className="p-3.5 bg-gray-50 dark:bg-[#18181A] border-t border-gray-100 dark:border-gray-800 flex items-center gap-2.5">
          <button
            id="quick-add-cancel-btn"
            type="button"
            onClick={handleCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-98 transition-all"
          >
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>

          <button
            id="quick-add-save-btn"
            type="button"
            disabled={numericAmount <= 0}
            onClick={handleSave}
            className={`flex-2 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md active:scale-98 transition-all ${
              numericAmount > 0
                ? isExpense
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>
              {language === 'ar'
                ? `حفظ (${numericAmount.toLocaleString('en-US')} IQD)`
                : `Save (${numericAmount.toLocaleString('en-US')} IQD)`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddPopup;
