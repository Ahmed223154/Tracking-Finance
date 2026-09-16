import React, { useState, useMemo } from 'react';
import { PlanItem, PlanStep } from '../../../types/finance';
import {
  X,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle,
  Wallet,
  Sparkles,
  Layers,
  Flame,
  Check,
  ChevronDown,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useI18n } from '../../../context/I18nContext';
import { AmountInput } from '../AmountInput';
import { formatAmountInput, parseRawAmount } from '../../../services/currencyFormatter';
import { financeStore } from '../../../store/useFinanceStore';

export interface AllocateFundsModalProps {
  plan?: PlanItem;
  goal?: PlanItem;
  initialStepId?: string;
  unallocatedBalance?: number;
  onClose: () => void;
  onUpdatePlan?: (updatedPlan: PlanItem) => void;
  onUpdateGoal?: (updatedGoal: PlanItem) => void;
}

export const AllocateFundsModal: React.FC<AllocateFundsModalProps> = ({
  plan,
  goal,
  initialStepId,
  unallocatedBalance = 0,
  onClose,
  onUpdatePlan,
  onUpdateGoal,
}) => {
  const { t, language, formatCurrency } = useI18n();
  const currentPlan = plan || goal;

  if (!currentPlan) {
    return null;
  }

  const steps = currentPlan.steps || [];
  const hasSteps = steps.length > 0;

  // Determine initial selected step
  const defaultStepId = useMemo(() => {
    if (!hasSteps) return null;
    if (initialStepId && steps.some(s => s.id === initialStepId)) {
      return initialStepId;
    }
    // Pick the first incomplete step, or the first step
    const firstIncomplete = steps.find(
      s => s.status !== 'completed' && (s.targetAmount <= 0 || (s.allocatedAmount || 0) < s.targetAmount)
    );
    return firstIncomplete ? firstIncomplete.id : steps[0].id;
  }, [hasSteps, initialStepId, steps]);

  const [selectedStepId, setSelectedStepId] = useState<string | null>(defaultStepId);
  const [actionType, setActionType] = useState<'allocate' | 'withdraw'>('allocate');
  const [amount, setAmount] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Selected Step details
  const selectedStep = useMemo(() => {
    if (!hasSteps || !selectedStepId) return null;
    return steps.find(s => s.id === selectedStepId) || null;
  }, [hasSteps, selectedStepId, steps]);

  const safePlanTarget = currentPlan.targetAmount || 0;
  const safePlanAllocated = currentPlan.allocatedAmount || 0;
  const planRemaining = Math.max(0, safePlanTarget - safePlanAllocated);

  const stepTarget = selectedStep ? Number(selectedStep.targetAmount) || 0 : 0;
  const stepAllocated = selectedStep ? Number(selectedStep.allocatedAmount) || 0 : 0;
  const stepRemaining = Math.max(0, stepTarget - stepAllocated);
  const isStepFullyFunded = stepTarget > 0 && stepAllocated >= stepTarget;
  const stepProgress = selectedStep?.progress !== undefined
    ? selectedStep.progress
    : (stepTarget > 0 ? Math.min(100, Math.round((stepAllocated / stepTarget) * 100)) : (stepAllocated > 0 ? 100 : 0));

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const val = parseRawAmount(amount);
    if (isNaN(val) || val <= 0) {
      setErrorMsg(language === 'ar' ? 'يرجى إدخال مبلغ صحيح أكبر من الصفر.' : 'Please enter a valid amount greater than zero.');
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

      // Step-level allocation validation
      if (selectedStep) {
        if (stepRemaining > 0 && val > stepRemaining) {
          setErrorMsg(
            language === 'ar'
              ? `المبلغ المطلوب (${formatCurrency(val)}) يتجاوز الميزانية المتبقية لهذه المرحلة (${formatCurrency(stepRemaining)}).`
              : `Amount (${formatCurrency(val)}) exceeds the remaining step budget (${formatCurrency(stepRemaining)}).`
          );
          return;
        }

        // Execute step-level fund allocation in store
        financeStore.allocateToPlanStep(currentPlan.id, selectedStep.id, val);

        // Fetch freshly rolled up plan from store to pass to callbacks
        const storedPlans = financeStore.getPlans();
        const updated = storedPlans.find(p => p.id === currentPlan.id);

        if (updated) {
          if (onUpdatePlan) onUpdatePlan(updated);
          if (onUpdateGoal) onUpdateGoal(updated);
        }

        // Celebration if step or plan completed
        const updatedStepAlloc = stepAllocated + val;
        if (updatedStepAlloc >= stepTarget || (updated && updated.isCompleted)) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } else {
        // Plan-level allocation (when plan has no steps)
        const newAllocated = safePlanAllocated + val;
        const isNowCompleted = safePlanTarget > 0 && newAllocated >= safePlanTarget;

        const updated: PlanItem = {
          ...currentPlan,
          allocatedAmount: newAllocated,
          isCompleted: isNowCompleted,
          completedAt: isNowCompleted ? new Date().toISOString() : currentPlan.completedAt,
          updatedAt: new Date().toISOString(),
        };

        if (onUpdatePlan) onUpdatePlan(updated);
        if (onUpdateGoal) onUpdateGoal(updated);

        if (isNowCompleted) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    } else {
      // Withdrawal Action
      if (selectedStep) {
        if (val > stepAllocated) {
          setErrorMsg(
            language === 'ar'
              ? `لا يمكن سحب أكثر من المبلغ المخصص لهذه المرحلة (${formatCurrency(stepAllocated)}).`
              : `Cannot withdraw more than allocated to this step (${formatCurrency(stepAllocated)}).`
          );
          return;
        }

        financeStore.allocateToPlanStep(currentPlan.id, selectedStep.id, -val);
        const storedPlans = financeStore.getPlans();
        const updated = storedPlans.find(p => p.id === currentPlan.id);

        if (updated) {
          if (onUpdatePlan) onUpdatePlan(updated);
          if (onUpdateGoal) onUpdateGoal(updated);
        }
      } else {
        if (val > safePlanAllocated) {
          setErrorMsg(
            language === 'ar'
              ? `لا يمكن سحب أكثر من المبلغ المخصص حالياً (${formatCurrency(safePlanAllocated)}).`
              : `Cannot withdraw more than currently allocated (${formatCurrency(safePlanAllocated)}).`
          );
          return;
        }

        const newAllocated = Math.max(0, safePlanAllocated - val);
        const updated: PlanItem = {
          ...currentPlan,
          allocatedAmount: newAllocated,
          isCompleted: false,
          completedAt: null,
          updatedAt: new Date().toISOString(),
        };

        if (onUpdatePlan) onUpdatePlan(updated);
        if (onUpdateGoal) onUpdateGoal(updated);
      }
    }

    onClose();
  };

  const quickAmounts = [250000, 500000, 1000000];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] bg-white p-5 sm:p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <div>
            <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">
              {hasSteps
                ? (language === 'ar' ? 'تخصيص رصيد المراحل' : 'Step-Level Capital Allocation')
                : (language === 'ar' ? 'تخصيص المبالغ' : 'Plan Capital Allocation')}
            </span>
            <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white">
              {hasSteps
                ? (language === 'ar' ? 'تخصيص الأموال لمراحل الخطة' : 'Allocate Funds to Plan Steps')
                : (language === 'ar' ? 'إدارة أموال الخطة' : 'Manage Plan Funds')}
            </h3>
            <p className="text-xs font-semibold text-[#007AFF] truncate">{currentPlan.name}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Global Financial Context Banner */}
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
              {language === 'ar' ? 'إجمالي مخصصات الخطة' : 'Plan Total Allocated'}
            </span>
            <div className="mt-0.5 font-bold text-[#007AFF]">
              {formatCurrency(safePlanAllocated)} / {formatCurrency(safePlanTarget)}
            </div>
          </div>
        </div>

        {/* STEP PICKER / SELECTOR (When plan has steps) */}
        {hasSteps && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-[#007AFF]" />
                {language === 'ar' ? 'المرحلة المستهدفة للتخصيص' : 'Target Activity Step'}
              </label>
              <span className="text-[10px] font-bold text-[#8E8E93]">
                {steps.length} {language === 'ar' ? 'مراحل' : 'steps'}
              </span>
            </div>

            {/* Select Dropdown */}
            <div className="relative">
              <select
                value={selectedStepId || ''}
                onChange={e => {
                  setSelectedStepId(e.target.value);
                  setErrorMsg(null);
                }}
                className="w-full appearance-none rounded-xl border border-[#D1D1D6] bg-white px-3.5 py-2.5 text-xs font-bold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white focus:border-[#007AFF] focus:outline-none"
              >
                {steps.map((step, idx) => {
                  const sTarget = Number(step.targetAmount) || 0;
                  const sAlloc = Number(step.allocatedAmount) || 0;
                  const sRem = Math.max(0, sTarget - sAlloc);
                  const isDone = sTarget > 0 && sAlloc >= sTarget;
                  return (
                    <option key={step.id} value={step.id}>
                      #{idx + 1} {step.title} {isDone ? '✓ [ممولة]' : `(المتبقي: ${formatCurrency(sRem)})`}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center rtl:right-auto rtl:left-3 text-[#8E8E93]">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Selected Step Information Card */}
            {selectedStep && (
              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-3.5 dark:border-blue-900/50 dark:bg-blue-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-xs font-bold text-[#1C1C1E] dark:text-white truncate">
                      {selectedStep.title}
                    </span>
                    {selectedStep.isCritical && (
                      <span className="inline-flex items-center gap-0.5 rounded bg-rose-100 px-1.5 py-0.2 text-[8px] font-black text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        <Flame className="h-2 w-2" />
                        CPM
                      </span>
                    )}
                  </div>
                  {isStepFullyFunded && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      <Check className="h-2.5 w-2.5" />
                      {language === 'ar' ? 'ممولة بالكامل' : 'Fully Funded'}
                    </span>
                  )}
                </div>

                {/* Progress Bar & Financial Metric */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#8E8E93]">
                      {formatCurrency(stepAllocated)} / {formatCurrency(stepTarget)}
                    </span>
                    <span className="font-bold text-[#007AFF]">{stepProgress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5E5EA] dark:bg-[#38383A]">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isStepFullyFunded ? 'bg-[#34C759]' : 'bg-[#007AFF]'
                      }`}
                      style={{ width: `${stepProgress}%` }}
                    />
                  </div>
                </div>

                {/* Remaining Info */}
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-blue-100 dark:border-blue-900/40 text-[#8E8E93]">
                  <span>
                    {language === 'ar' ? 'المتبقي لاكتمال تمويل المرحلة:' : 'Remaining to complete step:'}
                  </span>
                  <strong className="text-[#1C1C1E] dark:text-white font-mono">
                    {formatCurrency(stepRemaining)}
                  </strong>
                </div>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleApply} className="mt-4 space-y-4">
          {/* Action Type Toggle (Allocate / Withdraw) */}
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

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {language === 'ar' ? 'المبلغ' : 'Amount'} ({language === 'ar' ? 'د.ع' : 'IQD'})
            </label>
            <div className="relative mt-1">
              <AmountInput
                id="allocate-funds-amount-input"
                required
                placeholder="0"
                value={amount}
                onChangeValue={val => {
                  setAmount(val);
                  setErrorMsg(null);
                }}
                className="w-full rounded-xl border border-[#D1D1D6] bg-[#F2F2F7] px-3.5 py-3 text-xl font-black text-[#1C1C1E] placeholder:text-[#8E8E93] focus:border-[#007AFF] focus:bg-[#FFFFFF] focus:text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-[#FFFFFF] dark:placeholder:text-[#636366] dark:focus:bg-[#1C1C1E] dark:focus:text-[#FFFFFF] dark:focus:border-[#007AFF]"
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center rtl:right-auto rtl:left-3">
                <span className="text-xs font-bold text-[#8E8E93]">
                  {language === 'ar' ? 'د.ع' : 'IQD'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Amounts & Fill Step / Fill Plan Button */}
          <div className="flex gap-2 flex-wrap">
            {quickAmounts.map(val => (
              <button
                key={val}
                type="button"
                onClick={() => {
                  setAmount(formatAmountInput(val.toString()));
                  setErrorMsg(null);
                }}
                className="flex-1 min-w-[70px] rounded-xl border border-[#E5E5EA] bg-white py-1.5 text-xs font-bold text-[#3A3A3C] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-[#E5E5EA] transition-colors"
              >
                +{val / 1000}k
              </button>
            ))}

            {/* Fill Step Button */}
            {actionType === 'allocate' && selectedStep && stepRemaining > 0 && stepRemaining <= unallocatedBalance && (
              <button
                type="button"
                onClick={() => {
                  setAmount(formatAmountInput(stepRemaining.toString()));
                  setErrorMsg(null);
                }}
                className="flex-1 min-w-[120px] rounded-xl bg-emerald-50 py-1.5 text-xs font-bold text-[#34C759] hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 transition-colors"
              >
                {language === 'ar' ? 'إكمال تمويل المرحلة' : 'Fill Step'}
              </button>
            )}

            {/* Fill Plan Button (when plan has no steps) */}
            {actionType === 'allocate' && !hasSteps && planRemaining > 0 && planRemaining <= unallocatedBalance && (
              <button
                type="button"
                onClick={() => {
                  setAmount(formatAmountInput(planRemaining.toString()));
                  setErrorMsg(null);
                }}
                className="flex-1 min-w-[120px] rounded-xl bg-blue-50 py-1.5 text-xs font-bold text-[#007AFF] hover:bg-blue-100 dark:bg-blue-950/40 transition-colors"
              >
                {language === 'ar' ? 'إكمال الخطة' : 'Fill Plan'}
              </button>
            )}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-xs font-semibold text-[#FF3B30] dark:bg-red-950/40 border border-red-200 dark:border-red-900/50">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-[#E5E5EA] py-3 text-center text-xs font-bold text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#38383A] dark:text-[#8E8E93] transition-colors"
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
