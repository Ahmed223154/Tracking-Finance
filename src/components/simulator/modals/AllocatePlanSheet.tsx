import React from 'react';
import { PlanItem } from '../../../types/finance';
import { AllocateFundsModal } from './AllocateFundsModal';

export interface AllocatePlanSheetProps {
  plan?: PlanItem;
  goal?: PlanItem;
  initialStepId?: string;
  unallocatedBalance?: number;
  onClose: () => void;
  onUpdatePlan?: (updatedPlan: PlanItem) => void;
  onUpdateGoal?: (updatedGoal: PlanItem) => void;
}

export const AllocatePlanSheet: React.FC<AllocatePlanSheetProps> = (props) => {
  return <AllocateFundsModal {...props} />;
};

export default AllocatePlanSheet;
