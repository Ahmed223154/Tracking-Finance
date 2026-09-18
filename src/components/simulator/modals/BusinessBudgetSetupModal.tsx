import React, { useState, useMemo, useEffect } from 'react';
import { AccountProfile, BusinessBudgetMode, PlanStep, StepRelationship, DependencyType } from '../../../types/finance';
import {
  X,
  Building,
  Coins,
  Layers,
  Plus,
  Trash2,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Link as LinkIcon,
  AlertCircle,
} from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { addDays, toDateOnlyString } from '../../../services/cpmEngine';

export interface BusinessBudgetSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: AccountProfile;
  totalSpent?: number;
  onSave: (config: {
    allocatedBudget: number;
    budgetMode: BusinessBudgetMode;
    steps?: PlanStep[];
  }) => void;
}

export const BusinessBudgetSetupModal: React.FC<BusinessBudgetSetupModalProps> = ({
  isOpen,
  onClose,
  account,
  totalSpent = 0,
  onSave,
}) => {
  const { language, formatCurrency } = useI18n();
  const currency = account.currency || 'IQD';

  // Mode state
  const [budgetMode, setBudgetMode] = useState<BusinessBudgetMode>(
    account.budgetMode || 'bulk'
  );

  // Bulk Mode state
  const initialBulk = account.allocatedBudget || 0;
  const [bulkDisplay, setBulkDisplay] = useState<string>(
    initialBulk > 0 ? initialBulk.toLocaleString('en-US') : ''
  );
  const [bulkAmount, setBulkAmount] = useState<number>(initialBulk);

  // Business CPM Plan Steps state
  const defaultSteps: PlanStep[] = useMemo(() => {
    if (account.steps && account.steps.length > 0) {
      return JSON.parse(JSON.stringify(account.steps));
    }
    return [];
  }, [account.steps]);

  const [steps, setSteps] = useState<PlanStep[]>(defaultSteps);

  // Synchronize when account changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setBudgetMode(account.budgetMode || (account.steps && account.steps.length > 0 ? 'plan' : 'bulk'));
      const amt = account.allocatedBudget || 0;
      setBulkAmount(amt);
      setBulkDisplay(amt > 0 ? amt.toLocaleString('en-US') : '');
      if (account.steps && account.steps.length > 0) {
        setSteps(JSON.parse(JSON.stringify(account.steps)));
      } else {
        setSteps([]);
      }
    }
  }, [isOpen, account]);

  // Bulk input formatter
  const handleBulkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const clean = val.replace(/,/g, '').trim();
    if (clean === '' || /^\d*\.?\d*$/.test(clean)) {
      if (clean === '') {
        setBulkDisplay('');
        setBulkAmount(0);
        return;
      }
      const [intPart, decPart] = clean.split('.');
      const formattedInt = intPart ? Number(intPart).toLocaleString('en-US') : '0';
      const formatted = decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
      setBulkDisplay(formatted);
      setBulkAmount(parseFloat(clean) || 0);
    }
  };

  // Step calculations and automatic rollup
  const planRollupTotal = useMemo(() => {
    return steps.reduce((sum, s) => sum + (Number(s.targetAmount) || 0), 0);
  }, [steps]);

  // Timeline summary
  const timelineSummary = useMemo(() => {
    if (steps.length === 0) return { start: null, end: null, days: 0 };
    let minStart = steps[0].startDate;
    let maxEnd = steps[0].endDate || steps[0].startDate;

    steps.forEach(s => {
      if (s.startDate && (!minStart || s.startDate < minStart)) minStart = s.startDate;
      const sEnd = s.endDate || addDays(s.startDate, s.duration || 1);
      if (sEnd && (!maxEnd || sEnd > maxEnd)) maxEnd = sEnd;
    });

    const d1 = new Date(minStart || Date.now());
    const d2 = new Date(maxEnd || Date.now());
    const diff = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));

    return { start: minStart, end: maxEnd, days: diff };
  }, [steps]);

  // Step manipulation handlers
  const handleStepTitleChange = (id: string, title: string) => {
    setSteps(prev => prev.map(s => (s.id === id ? { ...s, title } : s)));
  };

  const handleStepAmountChange = (id: string, rawVal: string) => {
    const clean = rawVal.replace(/,/g, '').trim();
    const num = parseFloat(clean) || 0;
    setSteps(prev => prev.map(s => (s.id === id ? { ...s, targetAmount: num } : s)));
  };

  const handleStepStartDateChange = (id: string, startDate: string) => {
    setSteps(prev =>
      prev.map(s => {
        if (s.id !== id) return s;
        const dur = s.duration || 14;
        return {
          ...s,
          startDate,
          endDate: addDays(startDate, dur),
        };
      })
    );
  };

  const handleStepDurationChange = (id: string, durStr: string) => {
    const dur = Math.max(1, parseInt(durStr, 10) || 1);
    setSteps(prev =>
      prev.map(s => {
        if (s.id !== id) return s;
        return {
          ...s,
          duration: dur,
          endDate: addDays(s.startDate, dur),
        };
      })
    );
  };

  const handleAddPredecessor = (stepId: string, predId: string, type: DependencyType = 'FS') => {
    if (!predId || predId === stepId) return;
    setSteps(prev =>
      prev.map(s => {
        if (s.id !== stepId) return s;
        const filtered = s.predecessors.filter(p => p.predecessorId !== predId);
        return {
          ...s,
          predecessors: [...filtered, { predecessorId: predId, type, lag: 0 }],
        };
      })
    );
  };

  const handleRemovePredecessor = (stepId: string, predId: string) => {
    setSteps(prev =>
      prev.map(s => {
        if (s.id !== stepId) return s;
        return {
          ...s,
          predecessors: s.predecessors.filter(p => p.predecessorId !== predId),
        };
      })
    );
  };

  const handleAddNewStep = () => {
    const nextIdx = steps.length + 1;
    const lastStep = steps[steps.length - 1];
    const newStart = lastStep?.endDate ? lastStep.endDate : new Date().toISOString().split('T')[0];
    const newDur = 14;
    const newStep: PlanStep = {
      id: `biz-step-${Date.now().toString(36)}`,
      title: language === 'ar' ? `المرحلة التشغيلية #${nextIdx}` : `Operational Phase #${nextIdx}`,
      targetAmount: 0,
      allocatedAmount: 0,
      startDate: newStart,
      duration: newDur,
      endDate: addDays(newStart, newDur),
      predecessors: lastStep ? [{ predecessorId: lastStep.id, type: 'FS', lag: 0 }] : [],
      status: 'not_started',
    };
    setSteps(prev => [...prev, newStep]);
  };

  const handleDeleteStep = (id: string) => {
    setSteps(prev => {
      // Remove step and any references to it as a predecessor
      return prev
        .filter(s => s.id !== id)
        .map(s => ({
          ...s,
          predecessors: s.predecessors.filter(p => p.predecessorId !== id),
        }));
    });
  };

  const handleSave = () => {
    if (budgetMode === 'bulk') {
      if (bulkAmount <= 0) {
        alert(language === 'ar' ? 'يرجى إدخال مبلغ ميزانية صالح أكبر من الصفر.' : 'Please enter a valid budget amount.');
        return;
      }
      onSave({
        allocatedBudget: bulkAmount,
        budgetMode: 'bulk',
        steps,
      });
    } else {
      if (planRollupTotal <= 0) {
        alert(language === 'ar' ? 'يرجى إدخال مبالغ للمراحل أكبر من الصفر.' : 'Please configure step target amounts.');
        return;
      }
      onSave({
        allocatedBudget: planRollupTotal,
        budgetMode: 'plan',
        steps,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  const currentEffectiveBudget = budgetMode === 'bulk' ? bulkAmount : planRollupTotal;
  const currentRemaining = Math.max(0, currentEffectiveBudget - totalSpent);
  const currentConsumedPercent =
    currentEffectiveBudget > 0 ? Math.min(100, Math.round((totalSpent / currentEffectiveBudget) * 100)) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-[#2C2C2E] rounded-[28px] p-5 sm:p-6 shadow-2xl border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[92vh] flex flex-col no-scrollbar">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A] shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="h-10 w-10 rounded-2xl flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: account.color || '#FF9500' }}
            >
              <Building className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {language === 'ar' ? 'محرك تخصيص ميزانية الأعمال' : 'Business Budget Engine'}
              </span>
              <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white leading-tight">
                {account.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dual Mode Selector */}
        <div className="pt-4 pb-3 shrink-0">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E8E93] mb-2">
            {language === 'ar' ? 'اختر آلية تخصيص الميزانية' : 'Budget Allocation Mode'}
          </label>
          <div className="grid grid-cols-2 gap-2.5 p-1 rounded-2xl bg-[#F2F2F7] dark:bg-[#1C1C1E]">
            <button
              type="button"
              onClick={() => setBudgetMode('bulk')}
              className={`flex items-center gap-2.5 p-3 rounded-xl transition-all text-left ${
                budgetMode === 'bulk'
                  ? 'bg-white dark:bg-[#2C2C2E] shadow-sm text-[#007AFF] border border-blue-200 dark:border-blue-900/50'
                  : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                  budgetMode === 'bulk' ? 'bg-blue-50 text-[#007AFF] dark:bg-blue-950' : 'bg-[#E5E5EA] dark:bg-[#38383A]'
                }`}
              >
                <Coins className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold leading-tight">
                  {language === 'ar' ? 'تخصيص إجمالي مباشر' : 'Direct Bulk Allocation'}
                </p>
                <p className="text-[10px] text-[#8E8E93] truncate">
                  {language === 'ar' ? 'مبلغ إجمالي موحد ومباشر' : 'Lump-sum quick budget'}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setBudgetMode('plan')}
              className={`flex items-center gap-2.5 p-3 rounded-xl transition-all text-left ${
                budgetMode === 'plan'
                  ? 'bg-white dark:bg-[#2C2C2E] shadow-sm text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50'
                  : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                  budgetMode === 'plan' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950' : 'bg-[#E5E5EA] dark:bg-[#38383A]'
                }`}
              >
                <Layers className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold leading-tight">
                  {language === 'ar' ? 'خطة عمل تفصيلية (CPM)' : 'Business CPM Plan'}
                </p>
                <p className="text-[10px] text-[#8E8E93] truncate">
                  {language === 'ar' ? 'توزيع حسب مراحل العمل' : 'Step-by-step breakdown'}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-1 no-scrollbar space-y-4">
          {budgetMode === 'bulk' ? (
            /* Mode A: Direct Bulk Allocation */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200">
                <p className="font-semibold flex items-center gap-1.5 mb-1">
                  <Coins className="h-4 w-4 text-[#007AFF]" />
                  {language === 'ar' ? 'آلية الميزانية الإجمالية المباشرة' : 'Direct Bulk Budget Overview'}
                </p>
                <p className="text-[11px] text-[#8E8E93] leading-relaxed">
                  {language === 'ar'
                    ? 'أدخل سقف الميزانية التشغيلية كدفعة واحدة. يتم خصم المصروفات من هذا الرصيد مباشرة لتتبع السيولة والمتبقي.'
                    : 'Enter a single operating pool. All business expenses will decrement against this pool in real time.'}
                </p>
              </div>

              {/* Bulk Input */}
              <div className="space-y-1.5 w-full">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8E8E93] dark:text-zinc-400">
                  {language === 'ar' ? 'الميزانية التشغيلية المستهدفة' : 'Allocated Bulk Budget'} ({currency}) *
                </label>
                <div className="relative w-full rounded-2xl bg-[#F2F2F7] dark:bg-zinc-900 border border-[#E5E5EA] dark:border-zinc-700/80 focus-within:border-[#007AFF] dark:focus-within:border-cyan-500 overflow-hidden transition-all">
                  <input
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={bulkDisplay}
                    onChange={handleBulkChange}
                    placeholder="0"
                    className="w-full h-14 py-3.5 px-4 pr-16 bg-transparent text-[#1C1C1E] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-2xl font-black focus:outline-none focus:ring-0 border-0 transition-all box-border"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8E8E93] dark:text-zinc-400 pointer-events-none">
                    {currency}
                  </span>
                </div>

                {/* Quick Presets */}
                <div className="flex gap-1.5 pt-1 overflow-x-auto no-scrollbar">
                  {[10000000, 25000000, 50000000, 75000000, 100000000].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setBulkAmount(val);
                        setBulkDisplay(val.toLocaleString('en-US'));
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#F2F2F7] dark:bg-zinc-900 hover:bg-[#E5E5EA] dark:hover:bg-zinc-800 text-[10px] font-bold text-[#1C1C1E] dark:text-white transition-colors whitespace-nowrap border border-[#E5E5EA] dark:border-zinc-700/80"
                    >
                      {(val / 1000000).toFixed(0)}M {currency}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Impact Card */}
              <div className="p-4 rounded-2xl bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#3A3A3C] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8E8E93] font-medium">
                    {language === 'ar' ? 'إجمالي المصروفات الحالية:' : 'Current Actual Spent:'}
                  </span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">
                    {formatCurrency(totalSpent)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8E8E93] font-medium">
                    {language === 'ar' ? 'الرصيد المتبقي المتوقع:' : 'Projected Remaining Pool:'}
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(currentRemaining)}
                  </span>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-bold text-[#8E8E93]">
                    <span>{language === 'ar' ? 'نسبة الاستهلاك:' : 'Budget Consumption:'}</span>
                    <span>{currentConsumedPercent}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#E5E5EA] dark:bg-[#38383A] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#007AFF] transition-all"
                      style={{ width: `${currentConsumedPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mode B: Business CPM Plan (Step-by-Step Breakdown) */
            <div className="space-y-4">
              {/* Automatic Rollup Summary Banner */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-bold text-indigo-950 dark:text-indigo-200 uppercase tracking-wider">
                      {language === 'ar' ? 'إجمالي ميزانية الخطة المجمعة' : 'Automatic Budget Rollup'}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-200/60 dark:bg-indigo-900/60 text-[10px] font-black text-indigo-800 dark:text-indigo-300">
                    {steps.length} {language === 'ar' ? 'مراحل' : 'Steps'} • {timelineSummary.days} {language === 'ar' ? 'يوم' : 'Days'}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                      {formatCurrency(planRollupTotal)}
                    </span>
                    <p className="text-[10px] text-[#8E8E93]">
                      {language === 'ar'
                        ? 'يتم حساب الميزانية تلقائياً كحاصل جمع جميع المراحل التشغيلية.'
                        : 'Total business budget is locked to sum of configured step budgets.'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#8E8E93] block">
                      {language === 'ar' ? 'المتبقي للخطة:' : 'Plan Remaining:'}
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(currentRemaining)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Steps List Header */}
              <div className="flex items-center justify-between pt-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                  {language === 'ar' ? 'مراحل خطة العمل التشغيلية' : 'Business Operational Steps'}
                </h4>
                <button
                  type="button"
                  onClick={handleAddNewStep}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold shadow-xs transition-all active:scale-95"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {language === 'ar' ? 'إضافة مرحلة' : 'Add Step'}
                </button>
              </div>

              {/* Steps Items */}
              {steps.length === 0 ? (
                <div className="text-center py-8 px-4 rounded-2xl bg-[#F9F9FB] dark:bg-[#1C1C1E] border border-dashed border-[#E5E5EA] dark:border-[#38383A]">
                  <p className="text-xs text-[#8E8E93] mb-2 font-medium">
                    {language === 'ar' ? 'لا توجد مراحل محددة بعد. أضف مرحلة لبدء بناء خطة الميزانية.' : 'No operational steps added yet. Add a step to build your budget plan.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleAddNewStep}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold shadow-xs transition-all active:scale-95"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {language === 'ar' ? 'إضافة أول مرحلة' : 'Add First Step'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {steps.map((step, index) => {
                  const otherSteps = steps.filter(s => s.id !== step.id);
                  const stepEndDate = step.endDate || addDays(step.startDate, step.duration || 14);

                  return (
                    <div
                      key={step.id}
                      className="p-3.5 rounded-2xl bg-[#F9F9FB] dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#38383A] space-y-3 relative group"
                    >
                      {/* Step Title & Index & Delete */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="h-6 w-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-black shrink-0">
                            #{index + 1}
                          </span>
                          <input
                            type="text"
                            value={step.title}
                            onChange={e => handleStepTitleChange(step.id, e.target.value)}
                            placeholder={language === 'ar' ? 'عنوان المرحلة...' : 'Step title...'}
                            className="flex-1 font-bold text-xs bg-transparent border-b border-transparent focus:border-indigo-500 text-[#1C1C1E] dark:text-white outline-none px-1 py-0.5"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteStep(step.id)}
                          className="p-1.5 text-[#8E8E93] hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          title="Delete step"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Step Target Amount & Duration */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[10px] font-bold text-[#8E8E93] uppercase mb-1">
                            {language === 'ar' ? 'ميزانية المرحلة' : 'Step Target Budget'} ({currency})
                          </label>
                          <input
                            type="text"
                            inputMode="decimal"
                            value={step.targetAmount ? step.targetAmount.toLocaleString('en-US') : ''}
                            onChange={e => handleStepAmountChange(step.id, e.target.value)}
                            placeholder="0"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] text-xs font-bold text-[#1C1C1E] dark:text-white outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8E8E93] uppercase mb-1">
                            {language === 'ar' ? 'تاريخ البدء والمدة' : 'Start Date & Duration'}
                          </label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="date"
                              value={step.startDate || ''}
                              onChange={e => handleStepStartDateChange(step.id, e.target.value)}
                              className="flex-1 px-2.5 py-2 rounded-xl bg-white dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] text-xs text-[#1C1C1E] dark:text-white outline-none focus:border-indigo-500"
                            />
                            <div className="flex items-center gap-1 bg-white dark:bg-[#2C2C2E] px-2 py-1.5 rounded-xl border border-[#E5E5EA] dark:border-[#3A3A3C]">
                              <input
                                type="number"
                                min="1"
                                value={step.duration || 14}
                                onChange={e => handleStepDurationChange(step.id, e.target.value)}
                                className="w-10 text-xs font-bold text-[#1C1C1E] dark:text-white text-center outline-none"
                              />
                              <span className="text-[10px] text-[#8E8E93]">{language === 'ar' ? 'ي' : 'd'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Date Range Preview & Predecessor Linkage */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-[#8E8E93] border-t border-[#F2F2F7] dark:border-[#38383A]">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{step.startDate}</span>
                          <ArrowRight className="h-2.5 w-2.5 text-[#8E8E93]" />
                          <span className="font-semibold text-[#1C1C1E] dark:text-white">{stepEndDate}</span>
                        </div>

                        {/* Predecessors */}
                        <div className="flex items-center gap-1.5">
                          <LinkIcon className="h-3 w-3 text-indigo-500" />
                          {otherSteps.length > 0 && (
                            <select
                              value=""
                              onChange={e => {
                                if (e.target.value) {
                                  handleAddPredecessor(step.id, e.target.value, 'FS');
                                }
                              }}
                              className="text-[10px] bg-white dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] rounded-lg px-2 py-0.5 text-[#1C1C1E] dark:text-white outline-none"
                            >
                              <option value="">+ {language === 'ar' ? 'ربط بمرحلة سابقة' : 'Link Predecessor'}</option>
                              {otherSteps.map(o => (
                                <option key={o.id} value={o.id}>
                                  {o.title}
                                </option>
                              ))}
                            </select>
                          )}

                          {step.predecessors && step.predecessors.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {step.predecessors.map(pred => {
                                const predStep = steps.find(s => s.id === pred.predecessorId);
                                if (!predStep) return null;
                                return (
                                  <span
                                    key={pred.predecessorId}
                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[9px] font-bold"
                                  >
                                    {pred.type} {predStep.title.slice(0, 14)}...
                                    <button
                                      type="button"
                                      onClick={() => handleRemovePredecessor(step.id, pred.predecessorId)}
                                      className="hover:text-rose-500"
                                    >
                                      ×
                                    </button>
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#F2F2F7] dark:border-[#38383A] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl border border-[#E5E5EA] dark:border-[#3A3A3C] text-xs font-bold text-[#8E8E93] hover:bg-gray-100 dark:hover:bg-[#1C1C1E] transition-colors"
          >
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className={`flex-1 py-3 rounded-2xl text-white text-xs font-bold shadow-md transition-all active:scale-95 ${
              budgetMode === 'bulk'
                ? 'bg-[#007AFF] hover:bg-[#0062CC] shadow-blue-500/20'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
            }`}
          >
            {language === 'ar'
              ? `حفظ ميزانية (${budgetMode === 'bulk' ? 'الإجمالي' : 'خطة العمل'})`
              : `Apply ${budgetMode === 'bulk' ? 'Bulk Budget' : 'CPM Plan Budget'}`}
          </button>
        </div>
      </div>
    </div>
  );
};
