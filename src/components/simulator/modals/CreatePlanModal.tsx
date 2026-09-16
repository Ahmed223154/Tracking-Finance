import React, { useState, useMemo } from 'react';
import { PlanItem, PlanPriority, PlanStep } from '../../../types/finance';
import { X, Target, Calendar, Sparkles, Layers, Lock, Plus, ArrowUpDown } from 'lucide-react';
import { useI18n } from '../../../context/I18nContext';
import { AmountInput } from '../AmountInput';
import { formatAmountInput, parseRawAmount } from '../../../services/currencyFormatter';
import { PlanStepsManager } from '../plans/PlanStepsManager';
import { CPMEngine, addDays, toDateOnlyString, parseDate } from '../../../services/cpmEngine';

export interface CreatePlanModalProps {
  onClose: () => void;
  onCreate: (
    plan: Omit<PlanItem, 'id' | 'createdAt' | 'updatedAt' | 'completedAt' | 'allocatedAmount' | 'isCompleted'> & {
      steps?: PlanStep[];
    }
  ) => void;
  initialSteps?: PlanStep[];
}

export const CreatePlanModal: React.FC<CreatePlanModalProps> = ({
  onClose,
  onCreate,
  initialSteps = [],
}) => {
  const { t, language, formatCurrency } = useI18n();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [priority, setPriority] = useState<PlanPriority>('medium');
  const [plannedMonthlyAmount, setPlannedMonthlyAmount] = useState('');
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [hasDeadline, setHasDeadline] = useState(true);
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    return d.toISOString().split('T')[0];
  });
  const [planDescription, setPlanDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Inline Plan Steps state (WBS & CPM network)
  const [steps, setSteps] = useState<PlanStep[]>(initialSteps);
  const [showStepsSection, setShowStepsSection] = useState(initialSteps.length > 0);

  // Compute total target amount dynamically from steps
  const hasSteps = steps.length > 0;
  const stepsTotal = useMemo(() => {
    return steps.reduce((sum, s) => sum + (Number(s.targetAmount) || 0), 0);
  }, [steps]);

  // Current effective target amount:
  // When steps exist, strictly roll up from steps; otherwise manual input
  const effectiveTargetAmount = hasSteps ? stepsTotal : (parseRawAmount(targetAmount) || 0);

  // Handle steps modification from the embedded PlanStepsManager
  const handleUpdateSteps = (newSteps: PlanStep[]) => {
    setSteps(newSteps);
    if (newSteps.length > 0) {
      const sum = newSteps.reduce((acc, s) => acc + (Number(s.targetAmount) || 0), 0);
      setTargetAmount(formatAmountInput(sum.toString()));
    }
  };

  // Add first step if user clicks "+ Add Initial Step"
  const handleAddFirstStep = () => {
    const newStep = CPMEngine.createDefaultStep(
      steps.length,
      startDate || toDateOnlyString(new Date()),
      undefined
    );
    const updated = CPMEngine.rebaselineStepNetwork([...steps, newStep], startDate);
    handleUpdateSteps(updated);
    setShowStepsSection(true);
  };

  // Sync dates with CPM Activity Steps network bounds
  const handleSyncDatesWithSteps = (earliest: string, latest: string) => {
    setStartDate(earliest);
    setTargetDate(latest);
    setHasDeadline(true);

    const s = parseDate(earliest);
    const t = parseDate(latest);
    const months = Math.max(1, (t.getFullYear() - s.getFullYear()) * 12 + (t.getMonth() - s.getMonth()));
    if (effectiveTargetAmount > 0) {
      const suggested = Math.round(effectiveTargetAmount / months);
      setPlannedMonthlyAmount(formatAmountInput(suggested.toString()));
    }
  };

  // Auto-calculate suggested monthly savings pace
  const handleCalculateSuggested = () => {
    const amount = effectiveTargetAmount;
    if (!isNaN(amount) && amount > 0 && hasDeadline && targetDate) {
      const start = parseDate(startDate);
      const target = parseDate(targetDate);
      const months = Math.max(
        1,
        (target.getFullYear() - start.getFullYear()) * 12 + (target.getMonth() - start.getMonth())
      );
      const suggested = Math.round(amount / months);
      setPlannedMonthlyAmount(formatAmountInput(suggested.toString()));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const finalAmount = effectiveTargetAmount;

    if (!name.trim()) {
      setErrorMsg(language === 'ar' ? 'يرجى كتابة عنوان الخطة المالية.' : 'Please provide a plan name.');
      return;
    }
    if (isNaN(finalAmount) || finalAmount <= 0) {
      setErrorMsg(
        hasSteps
          ? (language === 'ar'
              ? 'مجموع ميزانيات المراحل يساوي صفراً. يرجى تحديد ميزانية لمراحل العمل.'
              : 'The sum of step budgets is zero. Please specify budgets for your steps.')
          : (language === 'ar'
              ? 'يرجى إدخال مبلغ مستهدف صحيح.'
              : 'Please specify a valid target amount.')
      );
      return;
    }

    const plannedMonthly = parseRawAmount(plannedMonthlyAmount) || 0;

    onCreate({
      name: name.trim(),
      targetAmount: finalAmount,
      currency: 'IQD',
      startDate: parseDate(startDate).toISOString(),
      targetDate: hasDeadline && targetDate ? parseDate(targetDate).toISOString() : null,
      priority,
      plannedMonthlyAmount: plannedMonthly,
      planDescription: planDescription.trim(),
      steps: hasSteps ? steps : undefined,
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
      <div className="w-full max-w-2xl rounded-t-[32px] sm:rounded-[32px] bg-white p-5 sm:p-7 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F2F2F7] dark:border-[#38383A]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#007AFF] dark:bg-blue-950/40">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest">
                {language === 'ar' ? 'التخطيط المالي والمراحل' : 'Financial Planning & WBS'}
              </span>
              <h3 className="font-bold text-lg text-[#1C1C1E] dark:text-white">
                {t.createPlanTitle}
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

        {errorMsg && (
          <div className="mt-3.5 rounded-xl bg-red-50 p-3 text-xs font-semibold text-[#FF3B30] dark:bg-red-950/40 border border-red-200 dark:border-red-900">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 sm:space-y-5">
          {/* Plan Name */}
          <div>
            <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              {t.planNameLabel}
            </label>
            <input
              type="text"
              required
              placeholder={
                language === 'ar'
                  ? 'مثال: صندوق الطوارئ، تأسيس شركة، بناء منزل، استثمار...'
                  : 'e.g. Emergency Reserve, Company Setup, Home Construction, Investment...'
              }
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1C1E] focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
            />
          </div>

          {/* Plan Priority */}
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

          {/* Target Amount Input & Rollup Indicator */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
                {t.planTargetLabel} ({language === 'ar' ? 'د.ع' : 'IQD'})
              </label>
              {hasSteps && (
                <span className="flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#007AFF] dark:bg-blue-950/60 dark:text-blue-300">
                  <Lock className="h-3 w-3" />
                  {language === 'ar' ? 'مُجمّع تلقائياً من المراحل' : 'Auto Rollup from Steps'}
                </span>
              )}
            </div>

            <div className="relative mt-1.5">
              {hasSteps ? (
                /* Disabled / Locked input when steps exist */
                <div className="w-full rounded-xl border border-blue-200 bg-blue-50/50 px-3.5 py-3 text-xl font-black text-[#007AFF] dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-300 flex items-center justify-between">
                  <span>{formatAmountInput(stepsTotal.toString())}</span>
                  <span className="text-xs font-bold text-[#007AFF] dark:text-blue-300">
                    {language === 'ar' ? 'د.ع' : 'IQD'}
                  </span>
                </div>
              ) : (
                /* Editable AmountInput when no steps exist */
                <>
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
                </>
              )}
            </div>

            {hasSteps ? (
              <p className="mt-1.5 text-[11px] font-semibold text-[#007AFF] dark:text-blue-300 flex items-center gap-1">
                <Sparkles className="h-3 w-3 shrink-0" />
                {language === 'ar'
                  ? `الميزانية مستمدة بالكامل وتُحدّث فورياً من مجموع ميزانيات المراحل (${steps.length} مرحلة).`
                  : `Total target budget is automatically synchronized in real-time from the sum of all ${steps.length} steps.`}
              </p>
            ) : (
              <p className="mt-1 text-[10px] text-[#8E8E93]">
                {language === 'ar'
                  ? 'يمكنك إدخال ميزانية تقديرية مباشرة، أو تفصيل الخطة إلى مراحل عمل بالأسفل لحسابها تلقائياً.'
                  : 'Enter a high-level budget, or break down the plan into activity steps below to roll it up automatically.'}
              </p>
            )}
          </div>

          {/* Monthly Savings Target Rate */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
                {t.plannedMonthlyRate} ({language === 'ar' ? 'د.ع/شهرياً' : 'IQD/mo'})
              </label>
              {hasDeadline && effectiveTargetAmount > 0 && (
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

          {/* Start Date & Target Date Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
                {language === 'ar' ? 'تاريخ البدء' : 'Start Date'}
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]">
                <Calendar className="h-4 w-4 text-[#007AFF]" />
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-[#1C1C1E] focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div>
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
                    ? (language === 'ar' ? 'بدون موعد نهائي' : 'No Deadline')
                    : (language === 'ar' ? 'تحديد موعد نهائي' : 'Set Deadline')}
                </button>
              </div>

              {hasDeadline ? (
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]">
                  <Calendar className="h-4 w-4 text-[#8E8E93]" />
                  <input
                    type="date"
                    value={targetDate}
                    onChange={e => setTargetDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-[#1C1C1E] focus:outline-none dark:text-white"
                  />
                </div>
              ) : (
                <div className="mt-1 flex items-center justify-center rounded-xl border border-dashed border-[#E5E5EA] py-2 text-[11px] text-[#8E8E93] dark:border-[#3A3A3C]">
                  {language === 'ar' ? 'خطة مفتوحة الأفق بدون موعد نهائي' : 'Open-ended horizon without deadline'}
                </div>
              )}
            </div>
          </div>

          {/* INLINE PLAN STEPS BUILDER (CPM & WBS ENGINE) */}
          <div className="rounded-2xl border border-[#E5E5EA] bg-[#F9F9FB] p-3.5 sm:p-4 dark:border-[#3A3A3C] dark:bg-[#202124] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-[#007AFF] dark:bg-blue-950/60 dark:text-blue-300">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1C1C1E] dark:text-white flex items-center gap-1.5">
                    {language === 'ar' ? 'مراحل العمل ومسار CPM' : 'Plan Activity Steps (CPM & WBS)'}
                    {hasSteps && (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-extrabold text-[#007AFF] dark:bg-blue-950 dark:text-blue-300">
                        {steps.length}
                      </span>
                    )}
                  </h4>
                  <p className="text-[10px] text-[#8E8E93]">
                    {language === 'ar'
                      ? 'إضافة وترتيب المراحل، تحديد ميزانياتها والربط بالاعتماديات قبل حفظ الخطة'
                      : 'Build, configure, and reorder steps before saving. Target amount rolls up automatically.'}
                  </p>
                </div>
              </div>

              {!showStepsSection && !hasSteps && (
                <button
                  type="button"
                  onClick={handleAddFirstStep}
                  className="flex items-center gap-1 rounded-xl bg-[#007AFF] px-2.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#0062CC] transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {language === 'ar' ? 'إضافة مرحلة' : 'Add Step'}
                </button>
              )}
            </div>

            {/* If steps exist or section is open, show the PlanStepsManager */}
            {hasSteps || showStepsSection ? (
              <div className="pt-2 border-t border-[#E5E5EA] dark:border-[#38383A]">
                <PlanStepsManager
                  steps={steps}
                  planStartDate={startDate}
                  planTargetAmount={effectiveTargetAmount}
                  isRollupMode={true}
                  currency="IQD"
                  onUpdateSteps={handleUpdateSteps}
                  onSyncDatesWithPlan={handleSyncDatesWithSteps}
                />
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#D1D1D6] p-4 text-center dark:border-[#3A3A3C]">
                <p className="text-xs text-[#8E8E93] font-medium">
                  {language === 'ar'
                    ? 'لم يتم إضافة مراحل عمل بعد. يمكنك إنشاء خطة بسيطة، أو تقسيمها الآن لمراحل مترابطة مع حساب تلقائي للميزانية والجدول الزمني.'
                    : 'No steps added yet. Keep this as a high-level plan, or add steps to calculate budget and timeline milestones automatically.'}
                </p>
                <button
                  type="button"
                  onClick={handleAddFirstStep}
                  className="mt-2.5 inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#007AFF] hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {language === 'ar' ? 'إضافة أول مرحلة عمل (WBS)' : 'Add First Activity Step (CPM)'}
                </button>
              </div>
            )}
          </div>

          {/* Description & Milestones Notes */}
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
              className="mt-1.5 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-3 border-t border-[#F2F2F7] dark:border-[#38383A]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-[#E5E5EA] py-3 text-center text-xs font-bold text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#38383A] dark:text-[#8E8E93] transition-colors"
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

export const AddPlanModal = CreatePlanModal;
export const CreateGoalSheet = CreatePlanModal;
