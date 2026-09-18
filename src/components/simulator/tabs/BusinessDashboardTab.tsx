import React from 'react';
import {
  BusinessDashboardView,
  BusinessDashboardViewProps,
} from './BusinessDashboardView';

export type BusinessDashboardTabProps = BusinessDashboardViewProps;

export const BusinessDashboardTab: React.FC<BusinessDashboardTabProps> = (props) => {
  return <BusinessDashboardView {...props} />;
};

export { BusinessDashboardView };
