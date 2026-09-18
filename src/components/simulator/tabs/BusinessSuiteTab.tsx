import React, { useState, useMemo } from 'react';
import {
  AccountProfile,
  TransactionItem,
  BusinessInvoice,
  BusinessInvoiceStatus,
  BusinessMetrics,
} from '../../../types/finance';
import {
  Receipt,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Check,
  X,
  AlertTriangle,
  Calendar,
  DollarSign,
  Filter,
  Trash2,
  Edit2,
  FileText,
  ChevronDown,
  Building,
} from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { AddInvoiceModal, formatInvoiceCurrency } from '../modals/AddInvoiceModal';

interface BusinessSuiteTabProps {
  account: AccountProfile;
  transactions: TransactionItem[];
  invoices: BusinessInvoice[];
  metrics: BusinessMetrics;
  onAddInvoice: (
    invoice: Omit<BusinessInvoice, 'id' | 'createdAt' | 'updatedAt' | 'taxAmount' | 'totalAmount'> & {
      taxAmount?: number;
      totalAmount?: number;
    }
  ) => void;
  onUpdateInvoice: (invoice: BusinessInvoice) => void;
  onUpdateInvoiceStatus?: (id: string, newStatus: BusinessInvoiceStatus) => void;
  onDeleteInvoice: (id: string) => void;
  onMarkInvoicePaid: (id: string) => void;
  onNavigateTab: (tabIndex: number) => void;
}

export const BusinessSuiteTab: React.FC<BusinessSuiteTabProps> = ({
  account,
  transactions,
  invoices,
  metrics,
  onAddInvoice,
  onUpdateInvoice,
  onUpdateInvoiceStatus,
  onDeleteInvoice,
  onMarkInvoicePaid,
  onNavigateTab,
}) => {
  const { language, formatCurrency } = useI18n();
  const defaultCurrency = (account.currency as 'IQD' | 'USD') || 'IQD';

  // Filters & State
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'incoming' | 'outgoing'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | BusinessInvoiceStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<BusinessInvoice | null>(null);

  // Filter invoices for current business account
  const accountInvoices = useMemo(() => {
    return invoices.filter(inv => inv.accountId === account.id);
  }, [invoices, account.id]);

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    return accountInvoices.filter(inv => {
      if (categoryFilter !== 'all' && inv.type !== categoryFilter) return false;
      if (statusFilter !== 'all' && inv.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = (inv.title || '').toLowerCase().includes(query);
        const matchNum = (inv.invoiceNumber || '').toLowerCase().includes(query);
        const matchDesc = (inv.description || '').toLowerCase().includes(query);
        if (!matchTitle && !matchNum && !matchDesc) return false;
      }
      return true;
    });
  }, [accountInvoices, categoryFilter, statusFilter, searchQuery]);

  const openCreateModal = () => {
    setEditingInvoice(null);
    setIsModalOpen(true);
  };

  const openEditModal = (invoice: BusinessInvoice) => {
    setEditingInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleQuickStatusChange = (inv: BusinessInvoice, nextStatus: BusinessInvoiceStatus) => {
    if (onUpdateInvoiceStatus) {
      onUpdateInvoiceStatus(inv.id, nextStatus);
    } else {
      onUpdateInvoice({ ...inv, status: nextStatus });
    }
  };

  const getStatusBadge = (status: BusinessInvoiceStatus, type: 'incoming' | 'outgoing') => {
    switch (status) {
      case 'not_submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-[#3A3A3C] text-[#8E8E93]">
            <Clock className="h-3 w-3" />
            {language === 'ar' ? 'مسودة' : 'Not Submitted'}
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950/60 text-[#007AFF]">
            <Send className="h-3 w-3" />
            {language === 'ar' ? 'تم التقديم' : 'Submitted'}
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            <Check className="h-3 w-3" />
            {language === 'ar' ? 'معتمدة' : 'Approved'}
          </span>
        );
      case 'settled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="h-3 w-3" />
            {type === 'incoming'
              ? language === 'ar' ? 'تم الاستلام' : 'Received'
              : language === 'ar' ? 'تم السداد' : 'Paid'}
          </span>
        );
    }
  };

  // Stats summaries for header
  const totalReceivable = accountInvoices
    .filter(i => i.type === 'incoming' && i.status !== 'settled')
    .reduce((sum, i) => sum + (i.totalAmount || i.amount), 0);

  const totalPayable = accountInvoices
    .filter(i => i.type === 'outgoing' && i.status !== 'settled')
    .reduce((sum, i) => sum + (i.totalAmount || i.amount), 0);

  return (
    <div id="business-invoices-manager-view" className="space-y-4 px-4 pt-2 pb-24 text-[#1C1C1E] dark:text-[#F2F2F7]">
      {/* 1. Header Banner & Quick Action */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#1C1C1E] dark:text-white flex items-center gap-2">
            <Receipt className="h-5 w-5 text-[#007AFF]" />
            {language === 'ar' ? 'إدارة الفواتير' : 'Invoices & Bills'}
          </h2>
          <p className="text-xs text-[#8E8E93]">
            {language === 'ar'
              ? 'متابعة التحصيلات ومستحقات الموردين وتأثيرها على السيولة'
              : 'Track receivables, vendor payments, and cash impact'}
          </p>
        </div>

        <button
          onClick={() => openCreateModal()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>{language === 'ar' ? 'فاتورة جديدة' : 'New Invoice'}</span>
        </button>
      </div>

      {/* 2. Top Dual Balance Summary: To Receive vs To Pay */}
      <div className="grid grid-cols-2 gap-3">
        {/* To Receive (AR) */}
        <div
          onClick={() => setCategoryFilter(categoryFilter === 'incoming' ? 'all' : 'incoming')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            categoryFilter === 'incoming'
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30'
              : 'border-[#E5E5EA] dark:border-[#3A3A3C] bg-white dark:bg-[#2C2C2E] hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
              <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-600" />
              {language === 'ar' ? 'مستحقات للتحصيل' : 'To Receive (AR)'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 font-bold">
              {accountInvoices.filter(i => i.type === 'incoming' && i.status !== 'settled').length}
            </span>
          </div>
          <p className="text-lg font-black text-emerald-700 dark:text-emerald-300">
            {formatCurrency(totalReceivable)}
          </p>
          <p className="text-[10px] text-[#8E8E93] mt-0.5">
            {language === 'ar' ? 'فواتير عملاء غير مسددة' : 'Unsettled client invoices'}
          </p>
        </div>

        {/* To Pay (AP) */}
        <div
          onClick={() => setCategoryFilter(categoryFilter === 'outgoing' ? 'all' : 'outgoing')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            categoryFilter === 'outgoing'
              ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 ring-2 ring-amber-500/30'
              : 'border-[#E5E5EA] dark:border-[#3A3A3C] bg-white dark:bg-[#2C2C2E] hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1">
              <ArrowUpRight className="h-3.5 w-3.5 text-amber-600" />
              {language === 'ar' ? 'مستحقات للدفع' : 'To Pay (AP)'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 font-bold">
              {accountInvoices.filter(i => i.type === 'outgoing' && i.status !== 'settled').length}
            </span>
          </div>
          <p className="text-lg font-black text-amber-700 dark:text-amber-300">
            {formatCurrency(totalPayable)}
          </p>
          <p className="text-[10px] text-[#8E8E93] mt-0.5">
            {language === 'ar' ? 'فواتير موردين غير مسددة' : 'Unsettled vendor bills'}
          </p>
        </div>
      </div>

      {/* 3. Dual Category Split Segmented Control */}
      <div className="flex rounded-2xl bg-[#E5E5EA] dark:bg-[#2C2C2E] p-1 text-xs font-bold">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`flex-1 py-1.5 rounded-xl transition-all ${
            categoryFilter === 'all'
              ? 'bg-white text-[#1C1C1E] shadow-sm dark:bg-[#1C1C1E] dark:text-white'
              : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
          }`}
        >
          {language === 'ar' ? 'جميع الفواتير' : 'All Invoices'}
        </button>
        <button
          onClick={() => setCategoryFilter('incoming')}
          className={`flex-1 py-1.5 rounded-xl flex items-center justify-center gap-1 transition-all ${
            categoryFilter === 'incoming'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
          }`}
        >
          <ArrowDownLeft className="h-3.5 w-3.5" />
          <span>{language === 'ar' ? 'للتحصيل (عملاء)' : 'To Receive'}</span>
        </button>
        <button
          onClick={() => setCategoryFilter('outgoing')}
          className={`flex-1 py-1.5 rounded-xl flex items-center justify-center gap-1 transition-all ${
            categoryFilter === 'outgoing'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
          }`}
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span>{language === 'ar' ? 'للدفع (موردين)' : 'To Pay'}</span>
        </button>
      </div>

      {/* 4. Search & Status Filter Pills */}
      <div className="space-y-2">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8E8E93]" />
          <input
            type="text"
            placeholder={language === 'ar' ? 'بحث برقم الفاتورة أو الاسم أو الوصف...' : 'Search invoice #, title, or note...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] rounded-xl text-xs text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#007AFF]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-[#1C1C1E]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px] font-bold">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              statusFilter === 'all'
                ? 'bg-[#1C1C1E] text-white dark:bg-white dark:text-[#1C1C1E]'
                : 'bg-white dark:bg-[#2C2C2E] text-[#8E8E93] border border-[#E5E5EA] dark:border-[#3A3A3C]'
            }`}
          >
            {language === 'ar' ? 'الكل' : 'All'}
          </button>
          <button
            onClick={() => setStatusFilter('not_submitted')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              statusFilter === 'not_submitted'
                ? 'bg-gray-600 text-white'
                : 'bg-white dark:bg-[#2C2C2E] text-[#8E8E93] border border-[#E5E5EA] dark:border-[#3A3A3C]'
            }`}
          >
            {language === 'ar' ? 'مسودة' : 'Not Submitted'}
          </button>
          <button
            onClick={() => setStatusFilter('submitted')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              statusFilter === 'submitted'
                ? 'bg-[#007AFF] text-white'
                : 'bg-white dark:bg-[#2C2C2E] text-[#8E8E93] border border-[#E5E5EA] dark:border-[#3A3A3C]'
            }`}
          >
            {language === 'ar' ? 'تم التقديم' : 'Submitted'}
          </button>
          <button
            onClick={() => setStatusFilter('approved')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              statusFilter === 'approved'
                ? 'bg-amber-600 text-white'
                : 'bg-white dark:bg-[#2C2C2E] text-[#8E8E93] border border-[#E5E5EA] dark:border-[#3A3A3C]'
            }`}
          >
            {language === 'ar' ? 'معتمدة' : 'Approved'}
          </button>
          <button
            onClick={() => setStatusFilter('settled')}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              statusFilter === 'settled'
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-[#2C2C2E] text-[#8E8E93] border border-[#E5E5EA] dark:border-[#3A3A3C]'
            }`}
          >
            {language === 'ar' ? 'مسددة' : 'Settled'}
          </button>
        </div>
      </div>

      {/* 5. Invoices List */}
      <div className="space-y-3">
        {filteredInvoices.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-[#2C2C2E] rounded-2xl border border-[#E5E5EA] dark:border-[#3A3A3C]">
            <Receipt className="h-8 w-8 text-[#8E8E93] mx-auto mb-2 opacity-50" />
            <p className="text-sm font-bold text-[#1C1C1E] dark:text-white mb-1">
              {language === 'ar' ? 'لا توجد فواتير مطابقة' : 'No invoices found'}
            </p>
            <p className="text-xs text-[#8E8E93] mb-4">
              {language === 'ar'
                ? 'يمكنك إضافة فاتورة جديدة لتسجيل مستحقات العملاء أو فواتير الموردين.'
                : 'Create a new invoice to track client receivables or vendor payments.'}
            </p>
            <button
              onClick={() => openCreateModal()}
              className="inline-flex items-center gap-1 px-3.5 py-2 bg-[#007AFF] text-white text-xs font-bold rounded-xl"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{language === 'ar' ? 'إضافة فاتورة' : 'Add Invoice'}</span>
            </button>
          </div>
        ) : (
          filteredInvoices.map(invoice => {
            const isIncoming = invoice.type === 'incoming';
            const isSettled = invoice.status === 'settled';
            const today = new Date().toISOString().split('T')[0];
            const isOverdue = !isSettled && invoice.estimatedDate && invoice.estimatedDate < today;

            return (
              <div
                key={invoice.id}
                className={`p-4 rounded-2xl bg-white dark:bg-[#2C2C2E] border shadow-xs transition-all ${
                  isSettled
                    ? 'border-[#E5E5EA] dark:border-[#3A3A3C] opacity-90'
                    : isOverdue
                    ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/20'
                    : isIncoming
                    ? 'border-emerald-200 dark:border-emerald-950/60'
                    : 'border-amber-200 dark:border-amber-950/60'
                }`}
              >
                {/* Header: Direction Tag, Invoice Number, Status Badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isIncoming
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {isIncoming ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                      {isIncoming
                        ? language === 'ar' ? 'تحصيل' : 'To Receive'
                        : language === 'ar' ? 'سداد' : 'To Pay'}
                    </span>
                    <span className="text-xs font-bold text-[#8E8E93]">
                      #{invoice.invoiceNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {getStatusBadge(invoice.status, invoice.type)}
                  </div>
                </div>

                {/* Title and Amount */}
                <div className="flex justify-between items-start mb-2">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white truncate">
                      {invoice.title}
                    </h3>
                    {invoice.description && (
                      <p className="text-xs text-[#8E8E93] line-clamp-1 mt-0.5">
                        {invoice.description}
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <p
                      className={`text-base font-black ${
                        isIncoming ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#1C1C1E] dark:text-white'
                      }`}
                    >
                      {formatInvoiceCurrency(invoice.totalAmount || invoice.amount, invoice.currency || defaultCurrency)}
                    </p>
                    {invoice.taxAmount && invoice.taxAmount > 0 ? (
                      <div className="flex items-center justify-end gap-1.5 mt-0.5 flex-wrap">
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold tracking-tight ${
                            invoice.taxType === 'deduct'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          }`}
                        >
                          {invoice.taxType === 'deduct' ? '−' : '+'}
                          {invoice.taxPercent}% {invoice.taxType === 'deduct' ? (language === 'ar' ? 'استقطاع' : 'Withholding') : (language === 'ar' ? 'ضريبة' : 'Tax')}
                        </span>
                        <span className="text-[10px] text-[#8E8E93]">
                          ({language === 'ar' ? 'الأساسي:' : 'Base:'} {formatInvoiceCurrency(invoice.amount, invoice.currency || defaultCurrency)})
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Dates: Issue date & Estimated Due date */}
                <div className="flex items-center justify-between text-[11px] text-[#8E8E93] pt-2 border-t border-[#F2F2F7] dark:border-[#38383A] mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {language === 'ar' ? 'تاريخ الإصدار:' : 'Issued:'} {invoice.date}
                  </span>

                  <span
                    className={`flex items-center gap-1 font-semibold ${
                      isOverdue ? 'text-rose-600 dark:text-rose-400 font-bold' : ''
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    {language === 'ar' ? 'الاستحقاق:' : 'Due:'} {invoice.estimatedDate}
                    {isOverdue && (
                      <span className="text-[9px] px-1 py-0.2 bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 rounded font-bold">
                        {language === 'ar' ? 'متأخرة' : 'Overdue'}
                      </span>
                    )}
                  </span>
                </div>

                {/* Actions Row */}
                <div className="flex items-center justify-between pt-1">
                  {/* Status Lifecycle Dropdown */}
                  <div className="flex items-center gap-1">
                    <select
                      value={invoice.status}
                      onChange={e => handleQuickStatusChange(invoice, e.target.value as BusinessInvoiceStatus)}
                      className="text-[11px] font-semibold bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#3A3A3C] rounded-lg px-2 py-1 text-[#1C1C1E] dark:text-white focus:outline-none"
                    >
                      <option value="not_submitted">{language === 'ar' ? 'مسودة' : 'Not Submitted'}</option>
                      <option value="submitted">{language === 'ar' ? 'تم التقديم' : 'Submitted'}</option>
                      <option value="approved">{language === 'ar' ? 'معتمدة' : 'Approved'}</option>
                      <option value="settled">
                        {isIncoming
                          ? language === 'ar' ? 'تم الاستلام (مسددة)' : 'Settled (Received)'
                          : language === 'ar' ? 'تم الدفع (مسددة)' : 'Settled (Paid)'}
                      </option>
                    </select>

                    {invoice.linkedTransactionId && (
                      <span
                        className="text-[9px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-bold"
                        title="Ledger transaction linked"
                      >
                        Ledger Synced
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* One-click Settle Button if not settled */}
                    {!isSettled ? (
                      <button
                        onClick={() => handleQuickStatusChange(invoice, 'settled')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-white transition-all active:scale-95 ${
                          isIncoming ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>
                          {isIncoming
                            ? language === 'ar' ? 'تسجيل كـ مستلم' : 'Mark Received'
                            : language === 'ar' ? 'تسجيل كـ مدفوع' : 'Mark Paid'}
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleQuickStatusChange(invoice, 'approved')}
                        className="px-2 py-1 text-[10px] font-semibold text-[#8E8E93] hover:text-amber-600 dark:hover:text-amber-400"
                        title="Revert back to Approved"
                      >
                        {language === 'ar' ? 'إلغاء السداد' : 'Revert'}
                      </button>
                    )}

                    {/* Edit button */}
                    <button
                      onClick={() => openEditModal(invoice)}
                      className="p-1.5 text-[#8E8E93] hover:text-[#007AFF] rounded-lg hover:bg-gray-100 dark:hover:bg-[#38383A]"
                      title="Edit Invoice"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => {
                        if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه الفاتورة؟' : 'Delete this invoice?')) {
                          onDeleteInvoice(invoice.id);
                        }
                      }}
                      className="p-1.5 text-[#8E8E93] hover:text-rose-500 rounded-lg hover:bg-gray-100 dark:hover:bg-[#38383A]"
                      title="Delete Invoice"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 6. Add / Edit Invoice Modal */}
      <AddInvoiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingInvoice(null);
        }}
        initialInvoice={editingInvoice}
        accountId={account.id}
        defaultCurrency={defaultCurrency}
        onSave={invoiceData => {
          if (editingInvoice) {
            onUpdateInvoice({
              ...editingInvoice,
              ...invoiceData,
            });
          } else {
            onAddInvoice(invoiceData);
          }
          setIsModalOpen(false);
          setEditingInvoice(null);
        }}
      />
    </div>
  );
};
