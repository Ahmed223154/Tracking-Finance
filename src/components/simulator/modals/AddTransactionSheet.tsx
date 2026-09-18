import React from 'react';
import { AddTransactionModal, AddTransactionModalProps } from './AddTransactionModal';

export type AddTransactionSheetProps = AddTransactionModalProps;

export const AddTransactionSheet: React.FC<AddTransactionSheetProps> = (props) => {
  return <AddTransactionModal {...props} />;
};

export { AddTransactionModal };
