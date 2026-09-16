import React from 'react';
import { PlanStep, PlanItem } from '../../../types/finance';
import { useI18n } from '../../../context/I18nContext';
import { PlanStepCard, PlanStepCardProps } from './PlanStepCard';

export { PlanStepCard };
export type { PlanStepCardProps };

export interface PlanStepsListProps {
  steps: PlanStep[];
  plan?: PlanItem;
  planId?: string;
  currency?: string;
  onOpenAllocate?: (stepId: string) => void;
  onToggleStatus?: (stepId: string) => void;
  onStopStep?: (stepId: string) => void;
  onResumeStep?: (stepId: string) => void;
  onSuspendStep?: (stepId: string, durationDaysOrDate: number | string) => void;
  onRescheduleStep?: (
    stepId: string,
    newStartDate: string,
    newDuration: number,
    reason?: string
  ) => void;
  onEditStep?: (stepId: string) => void;
  onDeleteStep?: (stepId: string) => void;
  onMoveStep?: (index: number, direction: 'up' | 'down') => void;
  allowReorder?: boolean;
  readOnly?: boolean;
  className?: string;
}

export const PlanStepsList: React.FC<PlanStepsListProps> = ({
  steps,
  plan,
  planId,
  currency = 'IQD',
  onOpenAllocate,
  onToggleStatus,
  onStopStep,
  onResumeStep,
  onSuspendStep,
  onRescheduleStep,
  onEditStep,
  onDeleteStep,
  onMoveStep,
  allowReorder = false,
  readOnly = false,
  className = '',
}) => {
  const { language, formatCurrency } = useI18n();

  if (!steps || steps.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#D1D1D6] p-5 text-center text-xs text-[#8E8E93] dark:border-[#3A3A3C]">
        {language === 'ar'
          ? 'لا توجد مراحل مسجلة لهذه الخطة بعد.'
          : 'No activity steps registered for this plan yet.'}
      </div>
    );
  }

  const effectivePlanId = planId || plan?.id;

  // Calculate totals
  const totalTarget = steps.reduce((sum, s) => sum + (Number(s.targetAmount) || 0), 0);
  const totalAllocated = steps.reduce((sum, s) => sum + (Number(s.allocatedAmount) || 0), 0);
  const completedCount = steps.filter(
    s => s.status === 'completed' || (s.targetAmount > 0 && (s.allocatedAmount || 0) >= s.targetAmount)
  ).length;
  const overallProgress = totalTarget > 0 ? Math.min(100, Math.round((totalAllocated / totalTarget) * 100)) : 0;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Steps Aggregate Summary Header */}
      <div className="flex items-center justify-between rounded-xl bg-[#F2F2F7] px-3.5 py-2.5 text-xs dark:bg-[#1C1C1E]">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#1C1C1E] dark:text-white">
            {completedCount} / {steps.length}
          </span>
          <span className="text-[#8E8E93]">
            {language === 'ar' ? 'مراحل مكتملة' : 'steps completed'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[#007AFF]">
            {formatCurrency(totalAllocated)} / {formatCurrency(totalTarget)}
          </span>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-black text-[#007AFF] dark:bg-blue-950 dark:text-blue-300">
            {overallProgress}%
          </span>
        </div>
      </div>

      {/* List of Step Cards */}
      <div className="space-y-2.5">
        {steps.map((step, idx) => (
          <PlanStepCard
            key={step.id}
            step={step}
            index={idx}
            totalSteps={steps.length}
            allSteps={steps}
            planId={effectivePlanId}
            currency={currency}
            onOpenAllocate={onOpenAllocate}
            onToggleStatus={onToggleStatus}
            onStopStep={onStopStep}
            onResumeStep={onResumeStep}
            onSuspendStep={onSuspendStep}
            onRescheduleStep={onRescheduleStep}
            onEdit={onEditStep}
            onDelete={onDeleteStep}
            onMove={onMoveStep}
            allowReorder={allowReorder}
            readOnly={readOnly}
          />
        ))}
      </div>
    </div>
  );
};
