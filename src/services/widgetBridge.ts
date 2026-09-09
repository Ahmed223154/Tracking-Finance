import { TransactionItem, PlanItem, PlanPriority } from '../types/finance';
import { FinancialEngine } from './financialEngine';

export interface WidgetPlanItem {
  id: string;
  name: string;
  priority: PlanPriority;
  allocatedAmount: number;
  targetAmount: number;
  remainingAmount: number;
  progressPercent: number;
  statusFlag: string;
  isDelayed: boolean;
  delayMonths: number;
  deepLink: string;
}

export interface WidgetDataPayload {
  appGroupSuite: string;
  unallocatedBalance: number;
  unallocatedBalanceFormatted: string;
  actualBalance: number;
  actualBalanceFormatted: string;
  monthlyCapacity: number;
  currency: string;
  topPlans: WidgetPlanItem[];
  quickActions: {
    addExpenseUrl: string;
    addIncomeUrl: string;
    plansDashboardUrl: string;
  };
  lastSyncTimestamp: string;
}

const APP_GROUP_SUITE = 'group.com.ahmedalkubaisy.finance';
const LOCAL_STORAGE_KEY = 'group.com.ahmedalkubaisy.finance';

export class WidgetBridge {
  /**
   * Calculate widget payload and sync with App Group UserDefaults / localStorage
   */
  static syncData(
    transactions: TransactionItem[],
    plans: PlanItem[],
    unallocatedBalance: number,
    monthlyCapacity: number,
    language: 'ar' | 'en' = 'en'
  ): WidgetDataPayload {
    const actualBalance = FinancialEngine.actualBalance(transactions);
    const currency = language === 'ar' ? 'د.ع' : 'IQD';

    const formatCurr = (val: number) => {
      const num = Math.round(val);
      const str = num.toLocaleString(language === 'ar' ? 'ar-IQ' : 'en-US');
      return language === 'ar' ? `${str} د.ع` : `${str} IQD`;
    };

    // Filter active plans (not completed)
    const activePlans = plans.filter(p => !p.isCompleted);

    // Priority rank weights for sorting top plans
    const priorityWeight: Record<PlanPriority, number> = {
      critical: 4,
      high: 3,
      medium: 2,
      low: 1,
    };

    // Sort by priority first, then by earliest target date / highest target amount
    const sortedPlans = [...activePlans].sort((a, b) => {
      const pDiff = (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      if (pDiff !== 0) return pDiff;
      return (b.targetAmount || 0) - (a.targetAmount || 0);
    });

    const top2Plans = sortedPlans.slice(0, 2);

    const topPlansWidgetData: WidgetPlanItem[] = top2Plans.map(plan => {
      const analysis = FinancialEngine.analyzePlan(plan, unallocatedBalance, monthlyCapacity);
      const targetAmount = Math.max(1, plan.targetAmount);
      const allocatedAmount = plan.allocatedAmount || 0;
      const remainingAmount = Math.max(0, targetAmount - allocatedAmount);
      const progressPercent = Math.min(100, Math.max(0, Math.round((allocatedAmount / targetAmount) * 100)));

      // Delay calculations
      let isDelayed = false;
      let delayMonths = 0;
      if (plan.targetDate && analysis.projectedCompletionDate) {
        const targetDate = new Date(plan.targetDate);
        const projectedDate = new Date(analysis.projectedCompletionDate);
        if (projectedDate.getTime() > targetDate.getTime() + 15 * 24 * 60 * 60 * 1000) {
          isDelayed = true;
          delayMonths = Math.max(
            1,
            (projectedDate.getFullYear() - targetDate.getFullYear()) * 12 +
              (projectedDate.getMonth() - targetDate.getMonth())
          );
        }
      }

      let statusFlag = 'On Track';
      if (plan.isPaused) {
        statusFlag = language === 'ar' ? 'مؤقتة' : 'Paused';
      } else if (isDelayed) {
        statusFlag = language === 'ar' ? `تأخير +${delayMonths} ش` : `+${delayMonths} Mo Delay`;
      } else if (analysis.status === 'ahead') {
        statusFlag = language === 'ar' ? 'متقدم' : 'Ahead';
      } else {
        statusFlag = language === 'ar' ? 'في المسار' : 'On Track';
      }

      return {
        id: plan.id,
        name: plan.name,
        priority: plan.priority,
        allocatedAmount,
        targetAmount,
        remainingAmount,
        progressPercent,
        statusFlag,
        isDelayed,
        delayMonths,
        deepLink: `myapp://plan?id=${plan.id}`,
      };
    });

    const payload: WidgetDataPayload = {
      appGroupSuite: APP_GROUP_SUITE,
      unallocatedBalance,
      unallocatedBalanceFormatted: formatCurr(unallocatedBalance),
      actualBalance,
      actualBalanceFormatted: formatCurr(actualBalance),
      monthlyCapacity,
      currency,
      topPlans: topPlansWidgetData,
      quickActions: {
        addExpenseUrl: 'myapp://add-expense',
        addIncomeUrl: 'myapp://add-income',
        plansDashboardUrl: 'myapp://plans-dashboard',
      },
      lastSyncTimestamp: new Date().toISOString(),
    };

    // 1. Write to local storage bridge
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore local storage quota errors
    }

    // 2. Dispatch custom event for in-app widget previews
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('widget-data-synced', {
          detail: payload,
        })
      );
    }

    // 3. Native iOS Capacitor plugin bridge (if available in native runtime)
    try {
      const capWindow = window as unknown as {
        Capacitor?: {
          toNative?: (plugin: string, method: string, data: unknown) => void;
          Plugins?: {
            WidgetBridge?: {
              syncWidgetData: (options: { data: string; suite: string }) => Promise<void>;
            };
          };
        };
      };

      if (capWindow.Capacitor?.Plugins?.WidgetBridge?.syncWidgetData) {
        capWindow.Capacitor.Plugins.WidgetBridge.syncWidgetData({
          data: JSON.stringify(payload),
          suite: APP_GROUP_SUITE,
        });
      }
    } catch {
      // Ignore in non-native environment
    }

    return payload;
  }

  /**
   * Retrieve cached widget payload
   */
  static getCachedData(): WidgetDataPayload | null {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      return null;
    }
    return null;
  }
}
