import React, { useState, useEffect } from 'react';
import { CategoryItem, TransactionItem } from '../../../types/finance';
import { X, Check, ArrowDownCircle, ArrowUpCircle, Delete, Sparkles } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { minimizeApp } from '../../../services/widgetBridge';

interface QuickAddPopupProps {
  isOpen: boolean;
  initialType: 'expense' | 'income';
  categories: CategoryItem[];
  onClose: () => void;
  onSave: (item: Omit<TransactionItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

/**
 * Normalizes Arabic numerals (٠١٢٣٤٥٦٧٨٩) into standard digits (0123456789)
 */
export const normalizeArabicNumerals = (input: string): string => {
  if (!input) return '';
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return input.replace(/[٠-٩]/g, match => {
    const idx = arabicDigits.indexOf(match);
    return idx > -1 ? idx.toString() : match;
  });
};

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
  const [description, setDescription] = useState<string>('');

  // Filter categories matching transaction type
  const matchingCategories = categories.filter(c =>
    type === 'expense' ? c.type === 'expense_category' : c.type === 'income_source'
  );

  // Sync state whenever modal opens or initialType changes
  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      setRawDigits('');
      setDescription('');
      const defaultCats = categories.filter(c =>
        initialType === 'expense' ? c.type === 'expense_category' : c.type === 'income_source'
      );
      setSelectedCategory(defaultCats.length > 0 ? defaultCats[0].name : (initialType === 'expense' ? 'Food' : 'Salary'));
    }
  }, [isOpen, initialType, categories]);

  // Thousand Separator and Numeric Calculation
  const sanitizedDigits = normalizeArabicNumerals(rawDigits);
  const numericAmount = sanitizedDigits ? parseInt(sanitizedDigits, 10) || 0 : 0;
  const formattedDisplayAmount = numericAmount > 0 ? numericAmount.toLocaleString('en-US') : '0';

  // Return to Home / Dismiss
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
      itemDescription: description.trim() || (type === 'expense' ? 'Quick Expense' : 'Quick Income'),
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
      // Do not capture if focused on text input
      if ((e.target as HTMLElement)?.tagName === 'INPUT') {
        return;
      }

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
      if (e.key === 'Backspace' || e.key === 'Delete') {
        setRawDigits(prev => prev.slice(0, -1));
        return;
      }

      const normalized = normalizeArabicNumerals(e.key);
      if (/^[0-9]$/.test(normalized)) {
        setRawDigits(prev => {
          const clean = normalizeArabicNumerals(prev);
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

  // Keypad press handler
  const handleKeypadPress = (val: string) => {
    if (val === 'DEL') {
      setRawDigits(prev => prev.slice(0, -1));
    } else if (val === '000') {
      setRawDigits(prev => {
        const clean = normalizeArabicNumerals(prev);
        if (!clean || clean === '0' || clean.length > 9) return prev;
        return clean + '000';
      });
    } else if (val === '0') {
      setRawDigits(prev => {
        const clean = normalizeArabicNumerals(prev);
        if (!clean || clean === '0' || clean.length > 11) return prev;
        return clean + '0';
      });
    } else {
      // Keys 1 through 9
      const normalizedKey = normalizeArabicNumerals(val);
      setRawDigits(prev => {
        const clean = normalizeArabicNumerals(prev);
        if (!clean || clean === '0') return normalizedKey;
        if (clean.length >= 12) return clean;
        return clean + normalizedKey;
      });
    }
  };

  const handleQuickAddIncrement = (inc: number) => {
    const current = parseInt(normalizeArabicNumerals(rawDigits), 10) || 0;
    const next = current + inc;
    setRawDigits(next.toString());
  };

  const isExpense = type === 'expense';

  return (
    <div
      id="quick-add-backdrop"
      onClick={e => {
        if (e.target === e.currentTarget) {
          handleCancel();
        }
      }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 transition-opacity animate-in fade-in duration-150"
    >
      <div
        id="quick-add-floating-card"
        className="w-full max-w-sm bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="px-5 pt-4 pb-2.5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
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
            onClick={handleCancel}
            aria-label="Close"
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

        {/* Content Body */}
        <div className="p-4 space-y-3 overflow-y-auto">
          {/* Prominent Formatted Amount Display (No virtual keyboard input) */}
          <div
            id="quick-add-amount-display"
            className="bg-gray-50 dark:bg-[#252528] rounded-2xl p-3.5 border border-gray-100 dark:border-gray-800 text-center select-none"
          >
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {language === 'ar' ? 'المبلغ المطلوب' : 'Amount'}
            </span>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight font-mono">
                {formattedDisplayAmount}
              </span>
              <span className="text-sm font-bold text-gray-400">IQD</span>
            </div>

            {/* Quick Increment Chips */}
            <div className="flex items-center justify-center gap-1.5 mt-2.5">
              {[1000, 5000, 10000, 25000].map(inc => (
                <button
                  key={inc}
                  type="button"
                  onClick={() => handleQuickAddIncrement(inc)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 text-[11px] font-bold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all shadow-2xs"
                >
                  +{inc.toLocaleString('en-US')}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
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

          {/* Built-in On-Screen Keypad (Keys 1-9, 0, 000, and ⌫ Delete) */}
          <div className="pt-1 select-none">
            <div className="grid grid-cols-3 gap-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '0', 'DEL'].map(k => (
                <button
                  key={k}
                  id={`quick-numpad-${k}`}
                  type="button"
                  onClick={() => handleKeypadPress(k)}
                  className="h-11 rounded-2xl bg-gray-100 dark:bg-[#2C2C2E] text-base font-bold text-gray-900 dark:text-gray-100 active:scale-95 active:bg-gray-300 dark:active:bg-gray-600 transition-all flex items-center justify-center shadow-2xs hover:bg-gray-200 dark:hover:bg-[#38383A]"
                >
                  {k === 'DEL' ? (
                    <div className="flex items-center gap-1 text-red-500 font-bold">
                      <Delete className="w-5 h-5" />
                    </div>
                  ) : (
                    <span>{k}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Note */}
          <div>
            <input
              id="quick-add-desc-input"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={language === 'ar' ? 'ملاحظة اختيارية (مثل: غداء، تاكسي)' : 'Optional memo (e.g. Lunch, Taxi)'}
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-gray-50 dark:bg-[#252528] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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
                : `Save ${isExpense ? 'Expense' : 'Income'}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
