import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Receipt,
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  Percent,
  Plus,
  Minus,
  Sparkles,
  FileText,
  Building,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';
import { BusinessInvoice, BusinessInvoiceStatus, InvoiceType, TaxType } from '../../../types/finance';
import { useI18n } from '../../../context/I18nContext';

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    invoice: Omit<BusinessInvoice, 'id' | 'createdAt' | 'updatedAt' | 'taxAmount' | 'totalAmount'> & {
      taxAmount?: number;
      totalAmount?: number;
    }
  ) => void;
  initialInvoice?: BusinessInvoice | null;
  accountId: string;
  defaultCurrency?: 'IQD' | 'USD';
}

export const formatInvoiceCurrency = (amount: number, currency: 'IQD' | 'USD'): string => {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  return `${Math.round(amount).toLocaleString('en-US')} IQD`;
};

export const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialInvoice,
  accountId,
  defaultCurrency = 'IQD',
}) => {
  const { language } = useI18n();
  const isAr = language === 'ar';

  // Form State
  const [type, setType] = useState<InvoiceType>('incoming');
  const [currency, setCurrency] = useState<'IQD' | 'USD'>(defaultCurrency);
  const [displayAmount, setDisplayAmount] = useState<string>('');
  const [rawAmount, setRawAmount] = useState<number>(0);
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [taxPercentInput, setTaxPercentInput] = useState<string>('0');
  const [taxType, setTaxType] = useState<TaxType>('add');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [estimatedDate, setEstimatedDate] = useState<string>(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [status, setStatus] = useState<BusinessInvoiceStatus>('not_submitted');
  const [description, setDescription] = useState<string>('');

  // Sync state when opening or when initialInvoice changes
  useEffect(() => {
    if (isOpen) {
      if (initialInvoice) {
        setType(initialInvoice.type);
        setCurrency(initialInvoice.currency || defaultCurrency);
        const initialNum = Number(initialInvoice.amount) || 0;
        setRawAmount(initialNum);
        setDisplayAmount(
          initialInvoice.currency === 'USD' && initialNum % 1 !== 0
            ? initialNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : initialNum.toLocaleString('en-US')
        );
        setInvoiceNumber(initialInvoice.invoiceNumber);
        setTitle(initialInvoice.title);
        setTaxPercentInput(String(initialInvoice.taxPercent ?? 0));
        setTaxType(initialInvoice.taxType || 'add');
        setDate(initialInvoice.date || new Date().toISOString().split('T')[0]);
        setEstimatedDate(
          initialInvoice.estimatedDate ||
            new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        );
        setStatus(initialInvoice.status);
        setDescription(initialInvoice.description || '');
      } else {
        // Reset to clean defaults
        setType('incoming');
        setCurrency(defaultCurrency);
        setRawAmount(0);
        setDisplayAmount('');
        setInvoiceNumber(`INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
        setTitle('');
        setTaxPercentInput('0');
        setTaxType('add');
        setDate(new Date().toISOString().split('T')[0]);
        setEstimatedDate(
          new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        );
        setStatus('not_submitted');
        setDescription('');
      }
    }
  }, [isOpen, initialInvoice, defaultCurrency]);

  // Real-time Thousands Separator Input Mask
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Strip non-digits except single decimal point
    const cleaned = val.replace(/[^0-9.]/g, '');

    if (!cleaned) {
      setDisplayAmount('');
      setRawAmount(0);
      return;
    }

    const parts = cleaned.split('.');
    const integerPart = parts[0] || '';
    const decimalPart = parts.length > 1 ? parts.slice(1).join('') : null;

    const formattedInt = integerPart ? Number(integerPart).toLocaleString('en-US') : '0';
    const formattedDisplay = decimalPart !== null ? `${formattedInt}.${decimalPart}` : formattedInt;

    setDisplayAmount(formattedDisplay);
    const parsed = parseFloat(cleaned);
    setRawAmount(isNaN(parsed) ? 0 : parsed);
  };

  // Tax and Total Calculations
  const numericTaxPercent = Math.max(0, parseFloat(taxPercentInput) || 0);
  const calculatedTaxAmount = Math.round((rawAmount * (numericTaxPercent / 100)) * 100) / 100;
  const calculatedTotalAmount =
    taxType === 'deduct'
      ? Math.max(0, Math.round((rawAmount - calculatedTaxAmount) * 100) / 100)
      : Math.round((rawAmount + calculatedTaxAmount) * 100) / 100;

  const handleGenerateInvoiceNumber = () => {
    const prefix = type === 'incoming' ? 'INV' : 'BILL';
    const random = Math.floor(1000 + Math.random() * 9000);
    setInvoiceNumber(`${prefix}-${new Date().getFullYear()}-${random}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || rawAmount <= 0) return;

    onSave({
      accountId,
      type,
      invoiceNumber: invoiceNumber.trim() || `INV-${Date.now()}`,
      title: title.trim(),
      amount: rawAmount,
      currency,
      taxPercent: numericTaxPercent,
      taxType,
      date,
      estimatedDate,
      description: description.trim(),
      status,
      taxAmount: calculatedTaxAmount,
      totalAmount: calculatedTotalAmount,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="invoice-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          id="invoice-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-lg max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-2xl ${
                  type === 'incoming'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                }`}
              >
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  {initialInvoice
                    ? isAr
                      ? 'تعديل الفاتورة'
                      : 'Edit Invoice'
                    : isAr
                    ? 'إعداد فاتورة جديدة'
                    : 'Prepare New Invoice'}
                </h3>
                <p className="text-xs text-slate-400">
                  {type === 'incoming'
                    ? isAr
                      ? 'مستحقات القبض من العملاء'
                      : 'Accounts Receivable (Inflow)'
                    : isAr
                    ? 'التزامات الدفع للموردين'
                    : 'Accounts Payable (Outflow)'}
                </p>
              </div>
            </div>
            <button
              id="invoice-modal-close-btn"
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* 1. Direction Type Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {isAr ? 'نوع الفاتورة' : 'Invoice Direction'}
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
                <button
                  id="invoice-type-incoming-btn"
                  type="button"
                  onClick={() => setType('incoming')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                    type === 'incoming'
                      ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>{isAr ? 'فاتورة عميل (قبض)' : 'To Receive (AR)'}</span>
                </button>
                <button
                  id="invoice-type-outgoing-btn"
                  type="button"
                  onClick={() => setType('outgoing')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                    type === 'outgoing'
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>{isAr ? 'فاتورة مورد (دفع)' : 'To Pay (AP)'}</span>
                </button>
              </div>
            </div>

            {/* 2. Amount Input & Dynamic Currency Switcher */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {isAr ? 'مبلغ الفاتورة الأساسي' : 'Base Invoice Amount'}
                </label>

                {/* Currency Switcher: [ IQD | $ USD ] */}
                <div
                  id="invoice-currency-switcher"
                  className="flex items-center p-0.5 bg-slate-950 rounded-xl border border-slate-700/80"
                >
                  <button
                    id="invoice-currency-iqd-btn"
                    type="button"
                    onClick={() => setCurrency('IQD')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      currency === 'IQD'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    IQD
                  </button>
                  <button
                    id="invoice-currency-usd-btn"
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      currency === 'USD'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    $ USD
                  </button>
                </div>
              </div>

              {/* Real-time formatted Amount Input */}
              <div className="relative">
                <input
                  id="invoice-amount-input"
                  type="text"
                  inputMode="decimal"
                  placeholder={currency === 'USD' ? '1,555.00' : '1,555,000'}
                  value={displayAmount}
                  onChange={handleAmountChange}
                  className="w-full pl-4 pr-16 py-3.5 bg-slate-950/90 border border-slate-700/90 rounded-2xl text-xl font-bold text-white tracking-wide placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 pointer-events-none">
                  {currency}
                </div>
              </div>
            </div>

            {/* 3. Custom Tax Rate & Direction Control [ + Add Tax | - Deduct Withholding ] */}
            <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <Percent className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isAr ? 'الضريبة والخصم الضريبي' : 'Tax & Withholding Rate'}</span>
                </div>

                {/* Free-form percentage input */}
                <div className="flex items-center gap-1.5">
                  <input
                    id="invoice-tax-percent-input"
                    type="number"
                    step="any"
                    min="0"
                    max="100"
                    placeholder="0"
                    value={taxPercentInput}
                    onChange={e => setTaxPercentInput(e.target.value)}
                    className="w-20 px-2.5 py-1 text-right bg-slate-900 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                  <span className="text-xs font-bold text-slate-400">%</span>
                </div>
              </div>

              {/* Tax Application Mode Toggle */}
              <div className="space-y-1">
                <div className="text-[11px] font-medium text-slate-400">
                  {isAr ? 'طريقة احتساب الضريبة' : 'Tax Direction Mode'}
                </div>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
                  <button
                    id="invoice-tax-add-btn"
                    type="button"
                    onClick={() => setTaxType('add')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                      taxType === 'add'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAr ? '+ إضافة للرصيد (ضريبة مبيعات)' : '+ Add Tax'}</span>
                  </button>
                  <button
                    id="invoice-tax-deduct-btn"
                    type="button"
                    onClick={() => setTaxType('deduct')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                      taxType === 'deduct'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Minus className="w-3.5 h-3.5" />
                    <span>{isAr ? '− خصم من الرصيد (استقطاع)' : '− Deduct Withholding'}</span>
                  </button>
                </div>
              </div>

              {/* Live Breakdown Preview */}
              <div
                id="invoice-live-breakdown-card"
                className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs font-mono"
              >
                <div className="flex items-center justify-between text-slate-400">
                  <span>{isAr ? 'المبلغ الأساسي (قبل الضريبة)' : 'Base Subtotal'}:</span>
                  <span className="text-slate-200 font-semibold">
                    {formatInvoiceCurrency(rawAmount, currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>
                    {isAr ? 'الضريبة' : 'Tax'} ({numericTaxPercent}%{' '}
                    {taxType === 'add'
                      ? isAr
                        ? 'مضافة'
                        : 'Added'
                      : isAr
                      ? 'مستقطعة'
                      : 'Deducted'}
                    ):
                  </span>
                  <span
                    className={`font-semibold ${
                      taxType === 'add' ? 'text-blue-400' : 'text-purple-400'
                    }`}
                  >
                    {taxType === 'add' ? '+' : '−'}{' '}
                    {formatInvoiceCurrency(calculatedTaxAmount, currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-white pt-1.5 border-t border-slate-800">
                  <span className="font-sans">
                    {type === 'incoming'
                      ? isAr
                        ? 'إجمالي التحصيل الصافي'
                        : 'Total Receivable'
                      : isAr
                      ? 'إجمالي السداد الصافي'
                      : 'Total Payable'}
                    :
                  </span>
                  <span
                    className={`text-base font-bold ${
                      type === 'incoming' ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {formatInvoiceCurrency(calculatedTotalAmount, currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Invoice Reference & Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    {isAr ? 'رقم الفاتورة' : 'Invoice Number'}
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateInvoiceNumber}
                    className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{isAr ? 'توليد' : 'Auto'}</span>
                  </button>
                </div>
                <input
                  id="invoice-number-input"
                  type="text"
                  placeholder="INV-2026-001"
                  value={invoiceNumber}
                  onChange={e => setInvoiceNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {type === 'incoming'
                    ? isAr
                      ? 'اسم العميل / المشروع'
                      : 'Client / Project'
                    : isAr
                    ? 'اسم المورد / الجهة'
                    : 'Vendor / Beneficiary'}
                </label>
                <input
                  id="invoice-title-input"
                  type="text"
                  placeholder={
                    type === 'incoming'
                      ? isAr
                        ? 'شركة دجلة للطاقة'
                        : 'Client or Company Name'
                      : isAr
                        ? 'مختبرات الأجهزة الدقيقة'
                        : 'Supplier or Vendor Name'
                  }
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* 5. Issue Date & Estimated Due Date */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isAr ? 'تاريخ الإصدار' : 'Issue Date'}</span>
                </label>
                <input
                  id="invoice-date-input"
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAr ? 'تاريخ الاستحقاق المتوقع' : 'Due / Settlement Date'}</span>
                </label>
                <input
                  id="invoice-estimated-date-input"
                  type="date"
                  value={estimatedDate}
                  onChange={e => setEstimatedDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* 6. Lifecycle Status Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                {isAr ? 'حالة الفاتورة' : 'Invoice Lifecycle Status'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  {
                    id: 'not_submitted',
                    label: isAr ? 'مسودة' : 'Draft',
                    color: 'hover:border-slate-500',
                    active: 'bg-slate-800 text-slate-200 border-slate-500 font-semibold',
                  },
                  {
                    id: 'submitted',
                    label: isAr ? 'مرفوعة' : 'Submitted',
                    color: 'hover:border-blue-500',
                    active: 'bg-blue-900/40 text-blue-300 border-blue-500 font-semibold',
                  },
                  {
                    id: 'approved',
                    label: isAr ? 'معتمدة' : 'Approved',
                    color: 'hover:border-indigo-500',
                    active: 'bg-indigo-900/40 text-indigo-300 border-indigo-500 font-semibold',
                  },
                  {
                    id: 'settled',
                    label: isAr ? 'مسددة' : 'Settled',
                    color: 'hover:border-emerald-500',
                    active: 'bg-emerald-900/40 text-emerald-300 border-emerald-500 font-semibold',
                  },
                ].map(opt => (
                  <button
                    key={opt.id}
                    id={`invoice-status-${opt.id}-btn`}
                    type="button"
                    onClick={() => setStatus(opt.id as BusinessInvoiceStatus)}
                    className={`py-2 px-2.5 rounded-xl border text-xs text-center transition-all ${
                      status === opt.id
                        ? opt.active
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 ' + opt.color
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {status === 'settled' && (
                <p className="text-[11px] text-emerald-400/90 flex items-center gap-1.5 pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {isAr
                      ? 'سيتم تسجيل العملية فورياً في سجل المعاملات ورصيد الموازنة التشغيلية.'
                      : 'Settling this invoice directly records a ledger transaction and updates the operating budget.'}
                  </span>
                </p>
              )}
            </div>

            {/* 7. Description / Deliverables Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                {isAr ? 'ملاحظات وتفاصيل التوريد' : 'Notes & Deliverables'}
              </label>
              <textarea
                id="invoice-description-input"
                rows={2}
                placeholder={
                  isAr
                    ? 'تفاصيل العقد، الشروط، أو مخرجات المشروع...'
                    : 'Contract deliverables, milestone details, or payment terms...'
                }
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                id="invoice-modal-cancel-btn"
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                id="invoice-modal-submit-btn"
                type="submit"
                disabled={rawAmount <= 0 || !title.trim()}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg ${
                  type === 'incoming'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {initialInvoice
                  ? isAr
                    ? 'حفظ التعديلات'
                    : 'Save Changes'
                  : isAr
                  ? 'حفظ الفاتورة'
                  : 'Save Invoice'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
