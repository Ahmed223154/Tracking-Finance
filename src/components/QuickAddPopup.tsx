import React, { useState, useEffect } from 'react';
import { CategoryItem, TransactionItem } from '../types/finance';
import { X, Check, ArrowDownCircle, ArrowUpCircle, Delete, Sparkles, Tag } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { minimizeApp } from '../services/widgetBridge';

export interface QuickAddPopupProps {
  isOpen: boolean;
  initialType: 'expense' | 'income';
  categories: CategoryItem[];
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

// Common fast-tap memo tags to completely eliminate any need for native text input fields
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
  onClose,
  onSave,
}) => {
  const { language } = useI18n();
  const [type, setType] = useState<'expense' | 'income'>(initialType);
  const [rawDigits, setRawDigits] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Filter categories matching transaction type
  const matchingCategories = categories.filter(c =>
    type === 'expense' ? c.type === 'expense_category' : c.type === 'income_source'
  );

  // Sync state whenever modal opens or initialType changes
  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      setRawDigits('');
      setSelectedTag(initialType === 'expense' ? QUICK_EXPENSE_TAGS[0] : QUICK_INCOME_TAGS[0]);
      const defaultCats = categories.filter(c =>
        initialType === 'expense' ? c.type === 'expense_category' : c.type === 'income_source'
      );
      setSelectedCategory(defaultCats.length > 0 ? defaultCats[0].name : (initialType === 'expense' ? 'Food' : 'Salary'));
    }
  }, [isOpen, initialType, categories]);

  // Real-time normalization and thousands separator formatting
  const sanitizedDigits = normalizeDigits(rawDigits);
  const numericAmount = sanitizedDigits ? parseInt(sanitizedDigits, 10) || 0 : 0;
  const formattedDisplayAmount = numericAmount > 0 ? numericAmount.toLocaleString('en-US') : '0';

  // Dismiss and suspend to iOS Home Screen
  const handleCancel = async () => {
    onClose();
    await minimizeApp();
  };

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
    await minimizeApp();
  };

  // Keyboard shortcut listener for desktop testing and Arabic numeral normalization
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
        return;
      }
      if (e.key === 'Enter') {
        if (numericAmount > 0) {
          handleSave();
        }
        return;
      }
      if (e.key === 'c' || e.key === 'C') {
        setRawDigits('');
        return;
      }
      if (e.key === 'Backspace' || e.key === 'Delete') {
        setRawDigits(prev => prev.slice(0, -1));
        return;
      }

      const normalized = normalizeDigits(e.key);
      if (/^[0-9]$/.test(normalized)) {
        setRawDigits(prev => {
          const clean = normalizeDigits(prev);
          if (clean === '0' || !clean) return normalized;
          if (clean.length >= 12) return clean;
          return clean + normalized;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, numericAmount, rawDigits]);

  if (!isOpen) return null;

  // Keypad actions: 1-9, 0, 000, ⌫ (DEL), and C (Clear)
  const handleKeypadPress = (val: string) => {
    if (val === 'C') {
      // Clear
      setRawDigits('');
    } else if (val === 'DEL' || val === '⌫') {
      // Backspace
      setRawDigits(prev => prev.slice(0, -1));
    } else if (val === '000') {
      // 000 Shortcut
      setRawDigits(prev => {
        const clean = normalizeDigits(prev);
        if (!clean || clean === '0' || clean.length > 9) return prev;
        return clean + '000';
      });
    } else if (val === '0') {
      // 0
      setRawDigits(prev => {
        const clean = normalizeDigits(prev);
        if (!clean || clean === '0' || clean.length > 11) return prev;
        return clean + '0';
      });
    } else {
      // Numbers 1-9
      const normalizedKey = normalizeDigits(val);
      setRawDigits(prev => {
        const clean = normalizeDigits(prev);
        if (!clean || clean === '0') return normalizedKey;
        if (clean.length >= 12) return clean;
        return clean + normalizedKey;
      });
    }
  };

  const handleQuickAddIncrement = (inc: number) => {
    const current = parseInt(normalizeDigits(rawDigits), 10) || 0;
    const next = current + inc;
    setRawDigits(next.toString());
  };

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
      className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 transition-opacity animate-in fade-in duration-150 select-none"
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

        {/* Modal Scrollable Body */}
        <div className="p-4 space-y-3 overflow-y-auto">
          {/* ELIMINATE SYSTEM KEYBOARD: Replaced native input with <div> display element */}
          <div
            id="quick-add-amount-display"
            className="bg-gray-50 dark:bg-[#252528] rounded-2xl p-3 border border-gray-100 dark:border-gray-800 text-center select-none"
          >
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {language === 'ar' ? 'المبلغ الإجمالي' : 'Total Amount'}
            </span>

            {/* Formatted Display Value */}
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight font-mono">
                {formattedDisplayAmount}
              </span>
              <span className="text-xs font-bold text-gray-400">IQD</span>
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
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {isExpense ? (language === 'ar' ? 'الفئة' : 'Category') : (language === 'ar' ? 'المصدر' : 'Source')}
              </label>
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
                    onClick={() => setSelectedCategory(cat.name)}
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

          {/* Quick Memo Tags (Replacing native text input with interactive <div> selector) */}
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Tag className="w-3 h-3 text-gray-400" />
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {language === 'ar' ? 'ملاحظة الفاتورة' : 'Memo / Tag'}
              </label>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {memoTags.map(tag => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
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

          {/* CUSTOM ON-SCREEN KEYPAD (Numbers 1-9, 0, 000, ⌫ backspace, and C clear) */}
          <div className="pt-1 select-none space-y-1.5">
            {/* Rows 1 to 3: 1 to 9 */}
            <div className="grid grid-cols-3 gap-1.5">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(k => (
                <button
                  key={k}
                  id={`quick-numpad-${k}`}
                  type="button"
                  onClick={() => handleKeypadPress(k)}
                  className="h-11 rounded-2xl bg-gray-100 dark:bg-[#2C2C2E] text-lg font-bold text-gray-900 dark:text-gray-100 active:scale-95 active:bg-gray-300 dark:active:bg-gray-600 transition-all flex items-center justify-center shadow-2xs hover:bg-gray-200 dark:hover:bg-[#38383A]"
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Row 4: C (Clear), 0, 000 (Shortcut), and ⌫ (Backspace) */}
            <div className="grid grid-cols-4 gap-1.5">
              <button
                id="quick-numpad-C"
                type="button"
                onClick={() => handleKeypadPress('C')}
                className="h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-bold active:scale-95 active:bg-amber-200 transition-all flex items-center justify-center shadow-2xs hover:bg-amber-200/80"
                title="Clear"
              >
                C
              </button>

              <button
                id="quick-numpad-0"
                type="button"
                onClick={() => handleKeypadPress('0')}
                className="h-11 rounded-2xl bg-gray-100 dark:bg-[#2C2C2E] text-lg font-bold text-gray-900 dark:text-gray-100 active:scale-95 active:bg-gray-300 dark:active:bg-gray-600 transition-all flex items-center justify-center shadow-2xs hover:bg-gray-200 dark:hover:bg-[#38383A]"
              >
                0
              </button>

              <button
                id="quick-numpad-000"
                type="button"
                onClick={() => handleKeypadPress('000')}
                className="h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 text-xs font-bold active:scale-95 active:bg-blue-100 transition-all flex items-center justify-center shadow-2xs hover:bg-blue-100/70"
                title="000 Shortcut"
              >
                000
              </button>

              <button
                id="quick-numpad-DEL"
                type="button"
                onClick={() => handleKeypadPress('DEL')}
                className="h-11 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 font-bold active:scale-95 active:bg-red-200 transition-all flex items-center justify-center shadow-2xs hover:bg-red-200/80"
                title="Backspace"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

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
