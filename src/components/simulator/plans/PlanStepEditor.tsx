import React, { useState } from 'react';
import { PlanStep, DependencyType } from '../../../types/finance';
import { formatAmountInput, parseRawAmount } from '../../../services/currencyFormatter';
import { useI18n } from '../../../context/I18nContext';
import { Link, Trash2 } from 'lucide-react';

export interface PlanStepEditorProps {
  step: PlanStep;
  allSteps: PlanStep[];
  currency?: string;
  onUpdateField: (field: Partial<PlanStep>) => void;
  onAddPredecessor: (predecessorId: string, type: DependencyType, lag: number) => void;
  onRemovePredecessor: (predecessorId: string) => void;
  onDeleteStep: () => void;
}

export const PlanStepEditor: React.FC<PlanStepEditorProps> = ({
  step,
  allSteps,
  currency = 'IQD',
  onUpdateField,
  onAddPredecessor,
  onRemovePredecessor,
  onDeleteStep,
}) => {
  const { language } = useI18n();
  const [newRelPredecessorId, setNewRelPredecessorId] = useState<string>('');
  const [newRelType, setNewRelType] = useState<DependencyType>('FS');
  const [newRelLag, setNewRelLag] = useState<number>(0);

  const handleAddRel = () => {
    if (!newRelPredecessorId) return;
    onAddPredecessor(newRelPredecessorId, newRelType, newRelLag);
    setNewRelPredecessorId('');
    setNewRelLag(0);
  };

  return (
    <div className="border-t border-[#F2F2F7] bg-[#F9F9FB] p-3.5 dark:border-[#38383A] dark:bg-[#1C1C1E] rounded-b-2xl space-y-3 animate-in fade-in duration-150 text-xs">
      {/* Title & Target Amount Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="flex flex-col min-w-0">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
            {language === 'ar' ? 'عنوان المرحلة / النشاط' : 'Activity Title'}
          </label>
          <input
            type="text"
            value={step.title}
            onChange={e => onUpdateField({ title: e.target.value })}
            className="w-full h-11 px-3 bg-white dark:bg-zinc-900/80 border border-[#D1D1D6] dark:border-zinc-700/60 rounded-xl text-sm font-semibold text-[#1C1C1E] dark:text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
            {language === 'ar' ? `ميزانية المرحلة (${currency})` : `Target Budget (${currency})`}
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={formatAmountInput(step.targetAmount.toString())}
            onChange={e =>
              onUpdateField({
                targetAmount: parseRawAmount(e.target.value) || 0,
              })
            }
            className="w-full h-11 px-3 bg-white dark:bg-zinc-900/80 border border-[#D1D1D6] dark:border-zinc-700/60 rounded-xl text-sm font-semibold text-[#1C1C1E] dark:text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Start Date & Duration Container (Stacked on mobile, side-by-side on sm+ with overflow-hidden clipping) */}
      <div className="flex flex-col sm:flex-row gap-3 w-full my-2">
        {/* 1. Start Date Field */}
        <div className="flex-1 min-w-0">
          <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            {language === 'ar' ? 'تاريخ البدء' : 'Start Date'}
          </label>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#D1D1D6] dark:border-zinc-700/70 bg-white dark:bg-zinc-900/90">
            <input
              type="date"
              value={step.startDate || ''}
              onChange={e => onUpdateField({ startDate: e.target.value })}
              className="w-full h-11 px-3 bg-transparent text-sm text-[#1C1C1E] dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 box-border"
            />
          </div>
        </div>

        {/* 2. Duration Field */}
        <div className="w-full sm:w-32 shrink-0">
          <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            {language === 'ar' ? 'المدة (أيام)' : 'Duration (Days)'}
          </label>
          <div className="relative w-full rounded-xl border border-[#D1D1D6] dark:border-zinc-700/70 bg-white dark:bg-zinc-900/90">
            <input
              type="number"
              min="1"
              value={step.duration || ''}
              onChange={e =>
                onUpdateField({
                  duration: Math.max(1, parseInt(e.target.value, 10) || 1),
                })
              }
              placeholder={language === 'ar' ? 'أيام' : 'Days'}
              className="w-full h-11 px-3 bg-transparent text-sm text-[#1C1C1E] dark:text-zinc-100 text-left sm:text-center rtl:text-right sm:rtl:text-center focus:outline-none focus:ring-1 focus:ring-cyan-500 box-border"
            />
          </div>
        </div>
      </div>

      {/* End Date Preview */}
      <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 p-2.5 flex items-center justify-between text-xs">
        <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
          {language === 'ar' ? 'تاريخ الانتهاء المحسوب:' : 'Calculated End Date:'}
        </span>
        <span className="font-mono font-bold text-[#007AFF] dark:text-cyan-400">
          {step.endDate}
        </span>
      </div>

      {/* Predecessors / Primavera P6 Relationships */}
      <div className="space-y-2 pt-2 border-t border-[#E5E5EA] dark:border-[#38383A]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1">
          <Link className="h-3 w-3 text-[#007AFF]" />
          {language === 'ar' ? 'الاعتماديات السابقة (Predecessors)' : 'Predecessor Relationships'}
        </span>

        {/* Existing Predecessor Badges */}
        {step.predecessors.length === 0 ? (
          <p className="text-[11px] text-[#8E8E93] italic">
            {language === 'ar'
              ? 'لا توجد اعتماديات مرتبطة (تبدأ وفق تاريخها المحدد).'
              : 'No predecessor dependencies (starts independently on specified start date).'}
          </p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {step.predecessors.map((rel, rIdx) => {
              const predStep = allSteps.find(s => s.id === rel.predecessorId);
              const lagText =
                rel.lag !== undefined && rel.lag !== 0
                  ? `${rel.lag >= 0 ? '+' : ''}${rel.lag}d`
                  : '+0d';

              return (
                <span
                  key={rIdx}
                  className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-white px-2 py-1 text-[11px] font-semibold text-[#007AFF] dark:border-blue-900 dark:bg-[#2C2C2E] dark:text-blue-300"
                >
                  <span>{predStep ? predStep.title : 'Activity'}</span>
                  <strong className="rounded bg-blue-100 px-1 text-[9px] dark:bg-blue-900">
                    {rel.type}
                    {lagText}
                  </strong>
                  <button
                    type="button"
                    onClick={() => onRemovePredecessor(rel.predecessorId)}
                    className="ml-1 text-[#8E8E93] hover:text-[#FF3B30]"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* Add Relationship Control */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <select
            value={newRelPredecessorId}
            onChange={e => setNewRelPredecessorId(e.target.value)}
            className="rounded-xl border border-[#D1D1D6] bg-white px-2 py-1.5 text-[11px] font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
          >
            <option value="">{language === 'ar' ? '-- اختر مرحلة سابقة --' : '-- Choose Predecessor --'}</option>
            {allSteps
              .filter(s => s.id !== step.id)
              .map(s => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.startDate})
                </option>
              ))}
          </select>

          <select
            value={newRelType}
            onChange={e => setNewRelType(e.target.value as DependencyType)}
            className="rounded-xl border border-[#D1D1D6] bg-white px-2 py-1.5 text-[11px] font-bold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"
            title="FS: Finish to Start, SS: Start to Start, FF: Finish to Finish, SF: Start to Finish"
          >
            <option value="FS">FS (Finish ➔ Start)</option>
            <option value="SS">SS (Start ➔ Start)</option>
            <option value="FF">FF (Finish ➔ Finish)</option>
            <option value="SF">SF (Start ➔ Finish)</option>
          </select>

          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[#8E8E93]">Lag:</span>
            <input
              type="number"
              value={newRelLag}
              onChange={e => setNewRelLag(parseInt(e.target.value, 10) || 0)}
              className="w-14 rounded-xl border border-[#D1D1D6] bg-white px-1.5 py-1.5 text-[11px] font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white text-center"
              placeholder="0d"
            />
            <span className="text-[10px] text-[#8E8E93]">d</span>
          </div>

          <button
            type="button"
            onClick={handleAddRel}
            disabled={!newRelPredecessorId}
            className="rounded-xl bg-[#007AFF] px-2.5 py-1.5 text-[11px] font-bold text-white shadow-xs hover:bg-[#0062CC] disabled:opacity-40 transition-colors"
          >
            + {language === 'ar' ? 'ربط' : 'Link'}
          </button>
        </div>
      </div>

      {/* Footer Actions: Delete Step */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E5E5EA] dark:border-[#38383A]">
        <span className="text-[10px] text-[#8E8E93]">
          {language === 'ar' ? 'إعادة الحساب التلقائي مفعلة لجميع المراحل اللاحقة.' : 'Cascading re-baselining auto-applied.'}
        </span>
        <button
          type="button"
          onClick={onDeleteStep}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#FF3B30] hover:underline"
        >
          <Trash2 className="h-3.5 w-3.5" />
          {language === 'ar' ? 'حذف المرحلة' : 'Delete Step'}
        </button>
      </div>
    </div>
  );
};
