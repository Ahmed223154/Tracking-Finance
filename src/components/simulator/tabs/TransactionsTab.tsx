import React, { useState, useMemo } from 'react';
import { TransactionItem } from '../../../types/finance';
import {
  Search,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowUpDown,
  Trash2,
  Edit3,
  X,
  Filter,
  Check,
  CheckSquare,
  Square,
} from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { useLongPress } from '../../../hooks/useLongPress';

interface TransactionsTabProps {
  transactions: TransactionItem[];
  onOpenAdd: () => void;
  onEditTransaction: (item: TransactionItem) => void;
  onDeleteTransaction: (id: string) => void;
  onDeleteTransactionsBatch?: (ids: string[]) => void;
}

interface TransactionRowProps {
  item: TransactionItem;
  isIncome: boolean;
  isSelectMode: boolean;
  isSelected: boolean;
  onToggleSelect: () => void;
  onLongPressTrigger: () => void;
  onEdit: () => void;
  onRequestDelete: () => void;
  formatCurrency: (n: number) => string;
  translateCat: (s?: string) => string;
  language: string;
  t: any;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  item,
  isIncome,
  isSelectMode,
  isSelected,
  onToggleSelect,
  onLongPressTrigger,
  onEdit,
  onRequestDelete,
  formatCurrency,
  translateCat,
  language,
  t,
}) => {
  const longPressProps = useLongPress(
    () => {
      onLongPressTrigger();
    },
    () => {
      if (isSelectMode) {
        onToggleSelect();
      } else {
        onEdit();
      }
    },
    { delay: 500 }
  );

  return (
    <div
      {...longPressProps}
      className={`group flex items-center justify-between p-3.5 transition-colors select-none cursor-pointer active:scale-[0.99] ${
        isSelected
          ? 'bg-blue-50/70 dark:bg-blue-950/30'
          : 'hover:bg-[#F9F9F9] dark:hover:bg-[#38383A]/40'
      }`}
    >
      {/* Left info & Icon */}
      <div className="flex flex-1 items-center gap-3 min-w-0">
        {isSelectMode && (
          <div
            onClick={e => {
              e.stopPropagation();
              onToggleSelect();
            }}
            className="shrink-0 cursor-pointer p-0.5"
          >
            {isSelected ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#007AFF] text-white shadow-sm">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
            ) : (
              <div className="h-5 w-5 rounded-full border-2 border-[#C7C7CC] dark:border-[#545458]" />
            )}
          </div>
        )}

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            isIncome
              ? 'bg-green-50 text-[#34C759] dark:bg-green-950/40'
              : 'bg-orange-50 text-[#FF9500] dark:bg-orange-950/40'
          }`}
        >
          {isIncome ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate font-bold text-xs text-[#1C1C1E] dark:text-white">
            {item.itemDescription || translateCat(item.category) || (isIncome ? t.income : t.expenses)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#8E8E93]">
            <span>{isIncome ? (translateCat(item.source) || 'General') : translateCat(item.category)}</span>
            {item.notes && (
              <>
                <span>•</span>
                <span className="truncate italic">{item.notes}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right amount & Action Buttons */}
      <div className="flex items-center gap-2">
        <div className="text-right">
          <div
            className={`font-bold text-xs ${
              isIncome ? 'text-[#34C759]' : 'text-[#3A3A3C] dark:text-[#E5E5EA]'
            }`}
          >
            {isIncome ? '+' : '-'}
            {formatCurrency(item.amount)}
          </div>
          <div className="text-[10px] text-[#8E8E93]">
            {isSelectMode
              ? (isSelected ? (language === 'ar' ? 'محدد' : 'Selected') : '')
              : (language === 'ar' ? 'اضغط مطولاً للتحديد' : 'Hold to select')}
          </div>
        </div>

        {!isSelectMode && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRequestDelete();
            }}
            className="rounded-lg p-1.5 text-[#C7C7CC] transition-colors hover:bg-red-50 hover:text-[#FF3B30] dark:text-[#8E8E93] dark:hover:bg-red-950/40 dark:hover:text-[#FF3B30]"
            title={t.delete}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export const TransactionsTab: React.FC<TransactionsTabProps> = ({
  transactions,
  onOpenAdd,
  onEditTransaction,
  onDeleteTransaction,
  onDeleteTransactionsBatch,
}) => {
  const { t, language, formatCurrency, translateCat } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortAscending, setSortAscending] = useState<boolean>(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Multi-select state
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);

  // All unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    transactions.forEach(t => {
      if (t.category) set.add(t.category);
    });
    return Array.from(set).sort();
  }, [transactions]);

  // Filtered & Sorted
  const filteredTransactions = useMemo(() => {
    return transactions.filter(item => {
      // Type
      if (typeFilter !== 'all' && item.type.toLowerCase() !== typeFilter) {
        return false;
      }
      // Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesCategory = item.category?.toLowerCase().includes(q);
        const matchesSource = item.source?.toLowerCase().includes(q);
        const matchesDesc = item.itemDescription?.toLowerCase().includes(q);
        const matchesNotes = item.notes?.toLowerCase().includes(q);
        if (!matchesCategory && !matchesSource && !matchesDesc && !matchesNotes) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortAscending ? dateA - dateB : dateB - dateA;
    });
  }, [transactions, typeFilter, selectedCategory, searchQuery, sortAscending]);

  // Toggle selection
  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Long press: automatically activate select mode and select item
  const handleLongPressTrigger = (id: string) => {
    if (!isSelectMode) {
      setIsSelectMode(true);
      setSelectedIds(new Set([id]));
    } else {
      handleToggleSelect(id);
    }
  };

  // Select all or Deselect all
  const areAllFilteredSelected = filteredTransactions.length > 0 && filteredTransactions.every(t => selectedIds.has(t.id));
  const handleToggleSelectAll = () => {
    if (areAllFilteredSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredTransactions.map(t => t.id)));
    }
  };

  // Exit select mode
  const handleExitSelectMode = () => {
    setIsSelectMode(false);
    setSelectedIds(new Set());
  };

  // Execute bulk deletion
  const handleExecuteBulkDelete = () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    if (onDeleteTransactionsBatch) {
      onDeleteTransactionsBatch(ids);
    } else {
      ids.forEach(id => onDeleteTransaction(id));
    }

    setConfirmBulkDelete(false);
    handleExitSelectMode();
  };

  // Group by formatted date
  const groupedTransactions = useMemo<Record<string, TransactionItem[]>>(() => {
    const groups: Record<string, TransactionItem[]> = {};
    filteredTransactions.forEach(item => {
      const dateKey = new Date(item.date).toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });
    return groups;
  }, [filteredTransactions, language]);

  return (
    <div id="transactions-tab-view" className="space-y-3 px-4 pt-2 pb-24 text-[#1C1C1E] dark:text-[#F2F2F7]">
      {/* Top Header & Search */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">{t.historyHeading}</span>
            <h2 className="text-xl font-bold tracking-tight text-[#1C1C1E] dark:text-white">{t.transactionsTitle}</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Select Mode Toggle */}
            <button
              onClick={() => {
                if (isSelectMode) {
                  handleExitSelectMode();
                } else {
                  setIsSelectMode(true);
                }
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-sm transition-all ${
                isSelectMode
                  ? 'bg-[#007AFF] text-white hover:bg-[#0062CC]'
                  : 'border border-[#E5E5EA] bg-white text-[#3A3A3C] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white'
              }`}
            >
              <CheckSquare className="h-3.5 w-3.5" />
              <span>
                {isSelectMode
                  ? (language === 'ar' ? 'إلغاء' : 'Done')
                  : (language === 'ar' ? 'تحديد' : 'Select')}
              </span>
            </button>

            <button
              onClick={() => setSortAscending(!sortAscending)}
              className="flex items-center gap-1.5 rounded-xl border border-[#E5E5EA] bg-white px-3 py-1.5 text-xs font-semibold text-[#3A3A3C] shadow-sm transition-all hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
              title="Toggle Sort Order"
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-[#007AFF]" />
              <span>{language === 'ar' ? (sortAscending ? 'الأقدم' : 'الأحدث') : (sortAscending ? 'Oldest' : 'Newest')}</span>
            </button>

            {!isSelectMode && (
              <button
                onClick={onOpenAdd}
                className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-[#007AFF] text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Multi-Select Action Bar (Active in Select Mode) */}
        {isSelectMode && (
          <div className="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50/80 px-3.5 py-2.5 dark:border-blue-900/60 dark:bg-blue-950/40 shadow-sm animate-in fade-in duration-150">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleToggleSelectAll}
                className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-[#007AFF] shadow-sm hover:bg-blue-50 dark:bg-[#1C1C1E] dark:text-blue-300"
              >
                {areAllFilteredSelected ? (
                  <>
                    <CheckSquare className="h-3.5 w-3.5" />
                    {language === 'ar' ? 'إلغاء تحديد الكل' : 'Deselect All'}
                  </>
                ) : (
                  <>
                    <Square className="h-3.5 w-3.5" />
                    {language === 'ar' ? 'تحديد الكل' : 'Select All'}
                  </>
                )}
              </button>
              <span className="text-xs font-bold text-[#1C1C1E] dark:text-white">
                {selectedIds.size} {language === 'ar' ? 'محدد' : 'selected'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={selectedIds.size === 0}
                onClick={() => setConfirmBulkDelete(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#FF3B30] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>
                  {language === 'ar' ? 'حذف المحدد' : 'Delete Selected'}
                  {selectedIds.size > 0 && ` (${selectedIds.size})`}
                </span>
              </button>

              <button
                type="button"
                onClick={handleExitSelectMode}
                className="rounded-full p-1 text-[#8E8E93] hover:bg-white/50 dark:hover:bg-[#1C1C1E] transition-colors"
                title={t.cancel}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute top-2.5 left-3.5 h-4 w-4 text-[#8E8E93]" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#E5E5EA] bg-white py-2 pr-8 pl-10 text-xs placeholder:text-[#8E8E93] focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute top-2.5 right-3 text-[#8E8E93] hover:text-[#1C1C1E]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Type Segmented Filter */}
        <div className="flex rounded-xl bg-[#E5E5EA] p-1 text-xs font-semibold dark:bg-[#2C2C2E]">
          <button
            onClick={() => setTypeFilter('all')}
            className={`flex-1 rounded-lg py-1.5 text-center transition-all ${typeFilter === 'all' ? 'bg-white text-[#1C1C1E] shadow-sm dark:bg-[#1C1C1E] dark:text-white' : 'text-[#8E8E93]'}`}
          >
            {t.allFilter}
          </button>
          <button
            onClick={() => setTypeFilter('income')}
            className={`flex-1 rounded-lg py-1.5 text-center transition-all ${typeFilter === 'income' ? 'bg-white text-[#34C759] shadow-sm dark:bg-[#1C1C1E]' : 'text-[#8E8E93]'}`}
          >
            {t.incomeFilter}
          </button>
          <button
            onClick={() => setTypeFilter('expense')}
            className={`flex-1 rounded-lg py-1.5 text-center transition-all ${typeFilter === 'expense' ? 'bg-white text-[#FF3B30] shadow-sm dark:bg-[#1C1C1E]' : 'text-[#8E8E93]'}`}
          >
            {t.expensesFilter}
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`rounded-full px-3.5 py-1 font-semibold transition-all ${selectedCategory === 'All' ? 'bg-[#007AFF] text-white shadow-sm' : 'bg-[#E5E5EA] text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#2C2C2E] dark:text-[#8E8E93]'}`}
          >
            {t.allFilter}
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3.5 py-1 font-semibold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-[#007AFF] text-white shadow-sm' : 'bg-[#E5E5EA] text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#2C2C2E] dark:text-[#8E8E93]'}`}
            >
              {translateCat(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-[#D1D1D6] p-8 text-center text-xs text-[#8E8E93] dark:border-[#3A3A3C] bg-white dark:bg-[#2C2C2E]">
          <Search className="mx-auto mb-2 h-6 w-6 text-[#8E8E93]" />
          <p className="font-bold text-[#1C1C1E] dark:text-white">{t.noTransactionsFound}</p>
          <p className="mt-1 text-[#8E8E93]">{t.noTransactionsHint}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedTransactions).map(([dateKey, items]) => (
            <div key={dateKey} className="space-y-1.5">
              <div className="px-1 text-[11px] font-bold tracking-wider text-[#8E8E93] uppercase">
                {dateKey}
              </div>

              <div className="divide-y divide-[#F2F2F7] overflow-hidden rounded-[24px] border border-[#E5E5EA] bg-white shadow-sm dark:divide-[#38383A] dark:border-[#3A3A3C] dark:bg-[#2C2C2E]">
                {(items as TransactionItem[]).map(item => {
                  const isIncome = item.type.toLowerCase() === 'income';
                  const isSelected = selectedIds.has(item.id);
                  return (
                    <TransactionRow
                      key={item.id}
                      item={item}
                      isIncome={isIncome}
                      isSelectMode={isSelectMode}
                      isSelected={isSelected}
                      onToggleSelect={() => handleToggleSelect(item.id)}
                      onLongPressTrigger={() => handleLongPressTrigger(item.id)}
                      onEdit={() => onEditTransaction(item)}
                      onRequestDelete={() => setConfirmDeleteId(item.id)}
                      formatCurrency={formatCurrency}
                      translateCat={translateCat}
                      language={language}
                      t={t}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bulk Delete Confirmation Prompt */}
      {confirmBulkDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xs rounded-[24px] bg-white p-6 text-center shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C]">
            <Trash2 className="mx-auto mb-2 h-8 w-8 text-[#FF3B30]" />
            <h4 className="font-bold text-sm text-[#1C1C1E] dark:text-white">
              {language === 'ar' ? 'حذف المعاملات المحددة؟' : 'Delete Selected Transactions?'}
            </h4>
            <p className="mt-2 text-xs text-[#8E8E93]">
              {language === 'ar'
                ? `هل أنت متأكد من رغبتك في حذف ${selectedIds.size} معاملات؟ سيتم تحديث الرصيد والتحليلات فوراً.`
                : `Are you sure you want to delete ${selectedIds.size} transactions? Total balance, analytics, and capacity will update immediately.`}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmBulkDelete(false)}
                className="flex-1 rounded-xl bg-[#E5E5EA] py-2.5 text-xs font-semibold text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#3A3A3C] dark:text-white transition-colors"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleExecuteBulkDelete}
                className="flex-1 rounded-xl bg-[#FF3B30] py-2.5 text-xs font-bold text-white hover:bg-red-700 transition-colors shadow-md shadow-red-500/20"
              >
                {language === 'ar' ? `حذف (${selectedIds.size})` : `Delete (${selectedIds.size})`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single Delete Confirmation Alert */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xs rounded-[24px] bg-white p-6 text-center shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C]">
            <Trash2 className="mx-auto mb-2 h-8 w-8 text-[#FF3B30]" />
            <h4 className="font-bold text-sm text-[#1C1C1E] dark:text-white">
              {language === 'ar' ? 'حذف المعاملة؟' : 'Delete Transaction?'}
            </h4>
            <p className="mt-1 text-xs text-[#8E8E93]">
              {language === 'ar'
                ? 'سيتم حذف المعاملة وتحديث الرصيد والإحصائيات فوراً.'
                : 'This will permanently recalculate your current balance and stats.'}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 rounded-xl bg-[#E5E5EA] py-2 text-xs font-semibold text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#3A3A3C] dark:text-white"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => {
                  onDeleteTransaction(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="flex-1 rounded-xl bg-[#FF3B30] py-2 text-xs font-semibold text-white hover:bg-red-700"
              >
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

