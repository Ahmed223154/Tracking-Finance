import React, { useState } from 'react';
import {
  AccountProfile,
  TransactionItem,
} from '../../../types/finance';
import {
  X,
  ArrowRightLeft,
  ArrowRight,
  ArrowDown,
  Building,
  User,
  AlertCircle,
  CheckCircle2,
  Banknote,
} from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: AccountProfile[];
  activeAccountId: string;
  transactions: TransactionItem[];
  onExecuteTransfer: (params: {
    fromAccountId: string;
    toAccountId: string;
    amount: number;
    note?: string;
    date?: string;
    allTransactions: TransactionItem[];
  }) => { success: boolean; error?: string };
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  accounts,
  activeAccountId,
  transactions,
  onExecuteTransfer,
}) => {
  const { language, formatCurrency } = useI18n();

  // Pickers state
  const defaultSource = activeAccountId;
  const otherAccounts = accounts.filter(a => a.id !== defaultSource);
  const defaultDest = otherAccounts.length > 0 ? otherAccounts[0].id : '';

  const [fromAccountId, setFromAccountId] = useState<string>(defaultSource);
  const [toAccountId, setToAccountId] = useState<string>(defaultDest);
  const [displayAmount, setDisplayAmount] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [noteInput, setNoteInput] = useState<string>('');
  const [transferDate, setTransferDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const getAccountBalance = (accId: string) => {
    const accTxs = transactions.filter(t => (t.accountId || 'personal') === accId);
    let income = 0;
    let expense = 0;
    for (const tx of accTxs) {
      if (tx.type === 'income') income += tx.amount;
      else expense += tx.amount;
    }
    return income - expense;
  };

  const sourceAccount = accounts.find(a => a.id === fromAccountId) || accounts[0];
  const destAccount = accounts.find(a => a.id === toAccountId) || accounts[1] || accounts[0];
  const sourceBalance = getAccountBalance(fromAccountId);
  const destBalance = getAccountBalance(toAccountId);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Strip out all existing commas
    const cleanVal = value.replace(/,/g, '').trim();

    // Guard against invalid non-numeric inputs
    if (cleanVal === '' || /^\d*\.?\d*$/.test(cleanVal)) {
      if (cleanVal === '') {
        setDisplayAmount('');
        setAmount(0);
        return;
      }

      const [integerPart, decimalPart] = cleanVal.split('.');

      // Format the integer part with commas
      const formattedInteger = integerPart ? Number(integerPart).toLocaleString('en-US') : '0';

      // Reconstruct string to preserve active decimals while typing
      const formatted =
        decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;

      setDisplayAmount(formatted);
      setAmount(parseFloat(cleanVal) || 0);
      setErrorMessage(null);
    }
  };

  const quickPresets = [
    { label: '500K', val: 500000 },
    { label: '1M', val: 1000000 },
    { label: '2.5M', val: 2500000 },
    { label: '5M', val: 5000000 },
    { label: '10M', val: 10000000 },
  ];

  const handleSwap = () => {
    const prevFrom = fromAccountId;
    const prevTo = toAccountId;
    setFromAccountId(prevTo);
    setToAccountId(prevFrom);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (fromAccountId === toAccountId) {
      setErrorMessage(
        language === 'ar'
          ? 'يجب اختيار حسابين مختلفين للتحويل.'
          : 'Source and destination accounts must be different.'
      );
      return;
    }

    if (amount <= 0) {
      setErrorMessage(
        language === 'ar'
          ? 'يرجى إدخال مبلغ تحويل صالح.'
          : 'Please enter a valid transfer amount.'
      );
      return;
    }

    if (amount > sourceBalance) {
      setErrorMessage(
        language === 'ar'
          ? `رصيد الحساب المصدر غير كافٍ لإتمام التحويل (المتاح: ${formatCurrency(sourceBalance)}).`
          : `Insufficient funds in source account (Available: ${formatCurrency(sourceBalance)}).`
      );
      return;
    }

    const res = onExecuteTransfer({
      fromAccountId,
      toAccountId,
      amount,
      note: noteInput.trim(),
      date: transferDate,
      allTransactions: transactions,
    });

    if (!res.success) {
      setErrorMessage(res.error || 'Transfer failed');
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setDisplayAmount('');
        setAmount(0);
        onClose();
      }, 1400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[28px] bg-white dark:bg-[#1C1C1E] shadow-2xl border border-[#E5E5EA] dark:border-[#38383A] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F2F2F7] dark:border-[#2C2C2E]">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-[#007AFF] text-white flex items-center justify-center shadow-sm">
              <ArrowRightLeft className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white leading-tight">
                {language === 'ar' ? 'تحويل أموال بين الحسابات' : 'Inter-Account Transfer'}
              </h2>
              <p className="text-[11px] text-[#8E8E93]">
                {language === 'ar'
                  ? 'تسجيل مزدوج فوري ومتزامن بين الدفاتر'
                  : 'Atomic linked transfer across personal & business ledgers'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#F2F2F7] dark:bg-[#2C2C2E] text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Success Splash */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
              {language === 'ar' ? 'تم تحويل الأموال بنجاح!' : 'Transfer Successfully Executed!'}
            </h3>
            <p className="text-xs text-[#8E8E93]">
              {formatCurrency(amount)} {language === 'ar' ? 'من' : 'from'}{' '}
              <span className="font-semibold text-[#1C1C1E] dark:text-white">{sourceAccount.name}</span>{' '}
              {language === 'ar' ? 'إلى' : 'to'}{' '}
              <span className="font-semibold text-[#1C1C1E] dark:text-white">{destAccount.name}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto no-scrollbar">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Account Flow Cards */}
            <div className="space-y-2 relative">
              {/* 1. Source Account */}
              <div className="p-3.5 rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#38383A]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                    {language === 'ar' ? 'من حساب (المصدر)' : 'From Account (Source)'}
                  </span>
                  <span className="text-[11px] font-semibold text-[#8E8E93]">
                    {language === 'ar' ? 'الرصيد:' : 'Avail:'}{' '}
                    <span className={sourceBalance >= 0 ? 'text-[#34C759]' : 'text-rose-500 font-bold'}>
                      {formatCurrency(sourceBalance)}
                    </span>
                  </span>
                </div>
                <select
                  value={fromAccountId}
                  onChange={e => setFromAccountId(e.target.value)}
                  className="w-full bg-white dark:bg-[#1C1C1E] border border-[#D1D1D6] dark:border-[#38383A] rounded-xl px-3 py-2 text-sm font-semibold text-[#1C1C1E] dark:text-white outline-none focus:border-[#007AFF]"
                >
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} ({acc.type === 'personal' ? 'Personal' : 'Business'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-2 relative z-10">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="h-8 w-8 rounded-full bg-white dark:bg-[#1C1C1E] border border-[#D1D1D6] dark:border-[#38383A] shadow-md flex items-center justify-center text-[#007AFF] hover:scale-110 active:scale-95 transition-all"
                  title="Swap source and destination"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>

              {/* 2. Destination Account */}
              <div className="p-3.5 rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#38383A]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                    {language === 'ar' ? 'إلى حساب (المستلم)' : 'To Account (Destination)'}
                  </span>
                  <span className="text-[11px] font-semibold text-[#8E8E93]">
                    {language === 'ar' ? 'الرصيد:' : 'Current:'}{' '}
                    <span className={destBalance >= 0 ? 'text-[#34C759]' : 'text-rose-500 font-bold'}>
                      {formatCurrency(destBalance)}
                    </span>
                  </span>
                </div>
                <select
                  value={toAccountId}
                  onChange={e => setToAccountId(e.target.value)}
                  className="w-full bg-white dark:bg-[#1C1C1E] border border-[#D1D1D6] dark:border-[#38383A] rounded-xl px-3 py-2 text-sm font-semibold text-[#1C1C1E] dark:text-white outline-none focus:border-[#007AFF]"
                >
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id} disabled={acc.id === fromAccountId}>
                      {acc.name} ({acc.type === 'personal' ? 'Personal' : 'Business'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Transfer Amount */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {language === 'ar' ? 'مبلغ التحويل' : 'Transfer Amount'} *
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  inputMode="decimal"
                  value={displayAmount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  className="w-full pl-4 pr-16 py-3 rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E] text-xl font-black text-[#1C1C1E] dark:text-white border border-[#D1D1D6] dark:border-[#38383A] outline-none focus:border-[#007AFF] transition-colors box-border"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8E8E93]">
                  {sourceAccount.currency || 'IQD'}
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex gap-1.5 mt-1 overflow-x-auto no-scrollbar">
                {quickPresets.map(p => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      setDisplayAmount(p.val.toLocaleString('en-US'));
                      setAmount(p.val);
                      setErrorMessage(null);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#F2F2F7] dark:bg-[#2C2C2E] hover:bg-[#E5E5EA] dark:hover:bg-[#38383A] text-[10px] font-bold text-[#1C1C1E] dark:text-white transition-colors whitespace-nowrap"
                  >
                    +{p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Memo / Purpose */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E8E93] mb-1.5">
                {language === 'ar' ? 'بيان أو سبب التحويل' : 'Reference Memo / Purpose'}
              </label>
              <input
                type="text"
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                placeholder="e.g. Owner Draw / Capital Injection / Reimbursement"
                maxLength={80}
                className="w-full px-3 py-2 rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E] text-xs text-[#1C1C1E] dark:text-white border border-[#D1D1D6] dark:border-[#38383A] outline-none focus:border-[#007AFF]"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E8E93] mb-1.5">
                {language === 'ar' ? 'تاريخ المعاملة' : 'Transfer Date'}
              </label>
              <input
                type="date"
                value={transferDate}
                onChange={e => setTransferDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E] text-xs text-[#1C1C1E] dark:text-white border border-[#D1D1D6] dark:border-[#38383A] outline-none focus:border-[#007AFF]"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#007AFF] text-white text-sm font-bold hover:bg-[#0062CC] transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-98"
              >
                <ArrowRightLeft className="h-4 w-4" />
                <span>
                  {language === 'ar'
                    ? `تأكيد تحويل ${amount > 0 ? formatCurrency(amount) : ''}`
                    : `Execute Atomic Transfer ${amount > 0 ? formatCurrency(amount) : ''}`}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
