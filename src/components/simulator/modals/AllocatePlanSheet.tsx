import React, { useState } from 'react';
import { PlanItem } from '../../../types/finance';
import { X, Plus, Minus, AlertTriangle, CheckCircle, Wallet, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useI18n } from '../../../context/I18nContext';

interface AllocatePlanSheetProps {
  plan: PlanItem;
  unallocatedBalance: number;
  onClose: () => void;
  onUpdatePlan: (updatedPlan: PlanItem) => void;
}

export const AllocatePlanSheet: React.FC<AllocatePlanSheetProps> = ({
  plan,
  unallocatedBalance,
  onClose,
  onUpdatePlan,
}) => {
  const { t, language, formatCurrency } = useI18n();
  const [actionType, setActionType] = useState<'allocate' | 'withdraw'>('allocate');
  const [amount, setAmount] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const remaining = Math.max(0, plan.targetAmount - plan.allocatedAmount);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount.replace(/,/g, ''));
    if (isNaN(val) || val <= 0) {
      setErrorMsg(language === 'ar' ? 'يرجى إدخال رقم موجب وصحيح.' : 'Please enter a valid positive number.');
      return;
    }

    if (actionType === 'allocate') {
      if (val > unallocatedBalance) {
        setErrorMsg(
          language === 'ar'
            ? `لا يمكن تخصيص أكثر من الرصيد المتاح غير المخصص (${formatCurrency(unallocatedBalance)}).`
            : `Cannot allocate more than your available cash (${formatCurrency(unallocatedBalance)}).`
        );
        return;
      }
      const newAllocated = plan.allocatedAmount + val;
      const isNowCompleted = newAllocated >= plan.targetAmount;

      onUpdatePlan({
        ...plan,
        allocatedAmount: newAllocated,
        isCompleted: isNowCompleted,
        completedAt: isNowCompleted ? new Date().toISOString() : plan.completedAt,
        updatedAt: new Date().toISOString(),
      });

      if (isNowCompleted) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      // Withdraw
      if (val > plan.allocatedAmount) {
        setErrorMsg(
          language === 'ar'
            ? `لا يمكن سحب أكثر من المبلغ المخصص حالياً (${formatCurrency(plan.allocatedAmount)}).`
            : `Cannot withdraw more than currently allocated (${formatCurrency(plan.allocatedAmount)}).`
        );
        return;
      }
      const newAllocated = Math.max(0, plan.allocatedAmount - val);

      onUpdatePlan({
        ...plan,
        allocatedAmount: newAllocated,
        isCompleted: false,
        completedAt: null,
        updatedAt: new Date().toISOString(),
      });
    }

    onClose();
  };

  const quickAmounts = [250000, 500000, 1000000];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C]">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <div>
            <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">
              {language === 'ar' ? 'تخصيص المبالغ' : 'Plan Capital Allocation'}
            </span>
            <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white">
              {language === 'ar' ? 'إدارة أموال الخطة' : 'Manage Plan Funds'}
            </h3>
            <p className="text-xs text-[#8E8E93]">{plan.name}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current State Info Banner */}
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-[#F2F2F7] p-3 text-xs dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#3A3A3C]">
          <div>
            <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
              {t.availableToAllocate}
            </span>
            <div className="mt-0.5 font-bold text-[#34C759]">
              {formatCurrency(unallocatedBalance)}
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
              {t.currentAllocation}
            </span>
            <div className="mt-0.5 font-bold text-[#007AFF]">
              {formatCurrency(plan.allocatedAmount)} / {formatCurrency(plan.targetAmount)}
            </div>
          </div>
        </div>

        <form onSubmit={handleApply} className="mt-4 space-y-4">
          {/* Toggle Type */}
          <div className="flex rounded-xl bg-[#E5E5EA] p-1 text-xs font-bold dark:bg-[#1C1C1E]">
            <button
              type="button"
              onClick={() => {
                setActionType('allocate');
                setErrorMsg(null);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${
                actionType === 'allocate'
                  ? 'bg-[#007AFF] text-white shadow-sm'
                  : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              <Plus className="h-4 w-4" />
              {language === 'ar' ? 'تخصيص رصيد' : 'Allocate Funds'}
            </button>
            <button
              type="button"
              onClick={() => {
                setActionType('withdraw');
                setErrorMsg(null);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${
                actionType === 'withdraw'
                  ? 'bg-[#FF9500] text-white shadow-sm'
                  : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              <Minus className="h-4 w-4" />
              {language === 'ar' ? 'سحب رصيد' : 'Withdraw Funds'}
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {language === 'ar' ? 'المبلغ' : 'Amount'} ({language === 'ar' ? 'د.ع' : 'IQD'})
            </label>
            <input
              type="number"
              step="any"
              required
              placeholder="0"
              value={amount}
              onChange={e => {
                setAmount(e.target.value);
                setErrorMsg(null);
              }}
              className="mt-1 w-full rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] py-2.5 px-4 text-xl font-black text-[#1C1C1E] focus:border-[#007AFF] focus:bg-white focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white dark:focus:bg-[#1C1C1E]"
            />
          </div>

          {/* Quick Amounts */}
          <div className="flex gap-2">
            {quickAmounts.map(val => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val.toString())}
                className="flex-1 rounded-xl border border-[#E5E5EA] bg-white py-1.5 text-xs font-bold text-[#3A3A3C] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-[#E5E5EA] transition-colors"
              >
                +{val / 1000}k
              </button>
            ))}
            {actionType === 'allocate' && remaining > 0 && remaining <= unallocatedBalance && (
              <button
                type="button"
                onClick={() => setAmount(remaining.toString())}
                className="flex-1 rounded-xl bg-blue-50 py-1.5 text-xs font-bold text-[#007AFF] hover:bg-blue-100 dark:bg-blue-950/40 transition-colors"
              >
                {language === 'ar' ? 'إكمال الخطة' : 'Fill Plan'}
              </button>
            )}
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-xs font-semibold text-[#FF3B30] dark:bg-red-950/40 border border-red-200 dark:border-red-900/50">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-[#E5E5EA] py-3 text-center text-xs font-bold text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#38383A] dark:text-[#8E8E93]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className={`flex-1 rounded-xl py-3 text-center text-xs font-bold text-white shadow-md transition-colors ${
                actionType === 'allocate'
                  ? 'bg-[#007AFF] hover:bg-[#0062CC] shadow-blue-500/25'
                  : 'bg-[#FF9500] hover:bg-[#E08500] shadow-orange-500/25'
              }`}
            >
              {actionType === 'allocate'
                ? (language === 'ar' ? 'تأكيد التخصيص' : 'Confirm Allocation')
                : (language === 'ar' ? 'تأكيد السحب' : 'Confirm Withdrawal')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Backwards compatibility alias
export const AllocateGoalSheet = AllocatePlanSheet;
