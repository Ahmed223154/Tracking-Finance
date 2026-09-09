import React, { useState } from 'react';
import { PlanItem, PlanPriority } from '../../../types/finance';
import { X, Target, Calendar, Flag, Sparkles } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { AmountInput } from '../AmountInput';
import { formatAmountInput, parseRawAmount } from '../../../services/currencyFormatter';

interface CreatePlanSheetProps {
  onClose: () => void;
  onCreate: (
    plan: Omit<PlanItem, 'id' | 'createdAt' | 'updatedAt' | 'completedAt' | 'allocatedAmount' | 'isCompleted'>
  ) => void;
}

export const CreatePlanSheet: React.FC<CreatePlanSheetProps> = ({ onClose, onCreate }) => {
  const { t, language } = useI18n();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [priority, setPriority] = useState<PlanPriority>('medium');
  const [plannedMonthlyAmount, setPlannedMonthlyAmount] = useState('');
  const [hasDeadline, setHasDeadline] = useState(true);
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    return d.toISOString().split('T')[0];
  });
  const [planDescription, setPlanDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-calculate suggested monthly savings when target amount or date changes
  const handleCalculateSuggested = () => {
    const amount = parseRawAmount(targetAmount);
    if (!isNaN(amount) && amount > 0 && hasDeadline) {
      const now = new Date();
      const target = new Date(targetDate);
      const months = Math.max(1, (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth()));
      const suggested = Math.round(amount / months);
      setPlannedMonthlyAmount(formatAmountInput(suggested.toString()));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const amount = parseRawAmount(targetAmount);
    if (!name.trim()) {
      setErrorMsg(language === 'ar' ? 'يرجى كتابة عنوان الخطة المالية.' : 'Please provide a plan name.');
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setErrorMsg(language === 'ar' ? 'يرجى إدخال مبلغ مستهدف صحيح.' : 'Please specify a valid target amount.');
      return;
    }

    const plannedMonthly = parseRawAmount(plannedMonthlyAmount) || 0;

    onCreate({
      name: name.trim(),
      targetAmount: amount,
      currency: 'IQD',
      targetDate: hasDeadline ? new Date(targetDate).toISOString() : null,
      priority,
      plannedMonthlyAmount: plannedMonthly,
      planDescription: planDescription.trim(),
    });

    onClose();
  };

  const priorities: { key: PlanPriority; labelEn: string; labelAr: string; color: string }[] = [
    { key: 'critical', labelEn: 'Critical', labelAr: 'حرجة', color: 'border-rose-500 text-rose-600 dark:text-rose-400' },
    { key: 'high', labelEn: 'High', labelAr: 'عالية', color: 'border-amber-500 text-amber-600 dark:text-amber-400' },
    { key: 'medium', labelEn: 'Medium', labelAr: 'متوسطة', color: 'border-blue-500 text-blue-600 dark:text-blue-400' },
    { key: 'low', labelEn: 'Low', labelAr: 'منخفضة', color: 'border-gray-400 text-gray-600 dark:text-gray-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#007AFF] dark:bg-blue-950/40">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">
                {language === 'ar' ? 'التخطيط المالي' : 'Financial Planning'}
              </span>
              <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white">
                {t.createPlanTitle}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-3 rounded-xl bg-red-50 p-2.5 text-xs font-semibold text-[#FF3B30] dark:bg-red-950/40 border border-red-200 dark:border-red-900">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {t.planNameLabel}
            </label>
            <input
              type="text"
              required
              placeholder={
                language === 'ar'
                  ? 'مثال: صندوق الطوارئ، سيارة جديدة، توسيع العمل، سفر...'
                  : 'e.g. Emergency Reserve, Car Upgrade, Expansion, Travel...'
              }
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1C1E] focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {t.planPriority}
            </label>
            <div className="mt-1.5 grid grid-cols-4 gap-1.5">
              {priorities.map(p => {
                const isSelected = priority === p.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPriority(p.key)}
                    className={`rounded-xl py-2 px-1 text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-sm'
                        : 'bg-[#F2F2F7] text-[#3A3A3C] border-transparent hover:bg-[#E5E5EA] dark:bg-[#1C1C1E] dark:text-[#8E8E93]'
                    }`}
                  >
                    {language === 'ar' ? p.labelAr : p.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {t.planTargetLabel} ({language === 'ar' ? 'د.ع' : 'IQD'})
            </label>
            <div className="relative mt-1">
              <AmountInput
                id="create-plan-target-amount"
                required
                placeholder={language === 'ar' ? 'مثال: 5,000,000' : 'e.g. 5,000,000'}
                value={targetAmount}
                onChangeValue={val => setTargetAmount(val)}
                className="w-full rounded-xl border border-[#D1D1D6] bg-[#F2F2F7] px-3.5 py-3 text-xl font-black text-[#1C1C1E] placeholder:text-[#8E8E93] focus:border-[#007AFF] focus:bg-[#FFFFFF] focus:text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-[#FFFFFF] dark:placeholder:text-[#636366] dark:focus:bg-[#1C1C1E] dark:focus:text-[#FFFFFF] dark:focus:border-[#007AFF]"
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center rtl:right-auto rtl:left-3">
                <span className="text-xs font-bold text-[#8E8E93] dark:text-[#8E8E93]">
                  {language === 'ar' ? 'د.ع' : 'IQD'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
                {t.plannedMonthlyRate} ({language === 'ar' ? 'د.ع/شهرياً' : 'IQD/mo'})
              </label>
              {hasDeadline && targetAmount && (
                <button
                  type="button"
                  onClick={handleCalculateSuggested}
                  className="flex items-center gap-1 text-[10px] font-bold text-[#007AFF] hover:underline"
                >
                  <Sparkles className="h-3 w-3" />
                  {language === 'ar' ? 'حساب تلقائي' : 'Auto-calculate'}
                </button>
              )}
            </div>
            <div className="relative mt-1">
              <AmountInput
                id="create-plan-monthly-amount"
                placeholder={language === 'ar' ? 'المبلغ المستهدف ادخاره كل شهر' : 'Target amount to save each month'}
                value={plannedMonthlyAmount}
                onChangeValue={val => setPlannedMonthlyAmount(val)}
                className="w-full rounded-xl border border-[#D1D1D6] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1C1E] placeholder:text-[#8E8E93] focus:border-[#007AFF] focus:text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-[#FFFFFF] dark:placeholder:text-[#636366] dark:focus:bg-[#1C1C1E] dark:focus:text-[#FFFFFF] dark:focus:border-[#007AFF]"
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center rtl:right-auto rtl:left-3">
                <span className="text-[10px] font-bold text-[#8E8E93] dark:text-[#8E8E93]">
                  {language === 'ar' ? 'د.ع/شهر' : 'IQD/mo'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
                {t.planDateLabel}
              </label>
              <button
                type="button"
                onClick={() => setHasDeadline(!hasDeadline)}
                className="text-[11px] font-semibold text-[#007AFF]"
              >
                {hasDeadline
                  ? (language === 'ar' ? 'إلغاء الموعد النهائي' : 'No Deadline')
                  : (language === 'ar' ? 'تحديد موعد نهائي' : 'Set Deadline')}
              </button>
            </div>

            {hasDeadline && (
              <div className="flex items-center gap-2 rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]">
                <Calendar className="h-4 w-4 text-[#8E8E93]" />
                <input
                  type="date"
                  value={targetDate}
                  onChange={e => setTargetDate(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-[#1C1C1E] focus:outline-none dark:text-white"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {t.planDescLabel}
            </label>
            <textarea
              rows={2}
              placeholder={
                language === 'ar'
                  ? 'أهداف الخطة وملاحظات الاستثمار أو تخصيص رأس المال...'
                  : 'Purpose, notes, and milestones for this plan...'
              }
              value={planDescription}
              onChange={e => setPlanDescription(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
            />
          </div>

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
              className="flex-1 rounded-xl bg-[#007AFF] py-3 text-center text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors"
            >
              {t.savePlanBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Backwards compatibility alias
export const CreateGoalSheet = CreatePlanSheet;
