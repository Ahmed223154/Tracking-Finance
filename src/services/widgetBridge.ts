import { TransactionItem, PlanItem } from '../types/finance';
import { FinancialEngine } from './financialEngine';

export type WidgetDisplayMode = 'balance' | 'unallocated' | 'all_plans' | 'single_plan';

export interface WidgetSelectedPlan {
  name: string;
  progress: number;
  current: number;
  target: number;
}

export interface WidgetPlanSummaryItem {
  id: string;
  name: string;
  progress: number;
  current?: number;
  target?: number;
}

export interface WidgetDataPayload {
  totalBalance: number;
  unallocatedAmount: number;
  currency: string;
  selectedPlan: WidgetSelectedPlan | null;
  plans: WidgetPlanSummaryItem[];

  // Helpers & compatibility fields
  displayMode?: WidgetDisplayMode;
  selectedPlanId?: string | null;
  appGroupSuite?: string;
  totalBalanceFormatted?: string;
  unallocatedAmountFormatted?: string;
  lastSyncTimestamp?: string;
  quickActions?: {
    addExpenseUrl: string;
    addIncomeUrl: string;
    plansDashboardUrl: string;
  };
}

export class WidgetBridge {
  public static readonly APP_GROUP_SUITE = 'group.com.ahmedalrubaye.financeapp';
  public static readonly STORAGE_KEY_DATA = 'group.com.ahmedalrubaye.financeapp';
  public static readonly STORAGE_KEY_JSON = 'widget_data_json';
  public static readonly STORAGE_KEY_MODE = 'widget_display_mode';
  public static readonly STORAGE_KEY_PLAN_ID = 'widget_selected_plan_id';

  /**
   * Get current persisted display mode from localStorage
   */
  static getDisplayMode(): WidgetDisplayMode {
    try {
      const mode = localStorage.getItem(WidgetBridge.STORAGE_KEY_MODE);
      if (mode === 'unallocated' || mode === 'all_plans' || mode === 'single_plan') {
        return mode;
      }
    } catch {
      // Fallback
    }
    return 'balance';
  }

  /**
   * Persist display mode in localStorage
   */
  static setDisplayMode(mode: WidgetDisplayMode): void {
    try {
      localStorage.setItem(WidgetBridge.STORAGE_KEY_MODE, mode);
    } catch {
      // Ignore
    }
  }

  /**
   * Get current selected plan ID for Single Plan mode
   */
  static getSelectedPlanId(): string | null {
    try {
      return localStorage.getItem(WidgetBridge.STORAGE_KEY_PLAN_ID) || null;
    } catch {
      return null;
    }
  }

  /**
   * Persist selected plan ID
   */
  static setSelectedPlanId(id: string | null): void {
    try {
      if (id) {
        localStorage.setItem(WidgetBridge.STORAGE_KEY_PLAN_ID, id);
      } else {
        localStorage.removeItem(WidgetBridge.STORAGE_KEY_PLAN_ID);
      }
    } catch {
      // Ignore
    }
  }

  /**
   * Calculate widget payload and sync with App Group UserDefaults & trigger WidgetCenter reload
   */
  static async syncData(
    transactions: TransactionItem[],
    plans: PlanItem[],
    unallocatedBalance?: number,
    _monthlyCapacity?: number,
    language: 'ar' | 'en' = 'en',
    displayModeOverride?: WidgetDisplayMode,
    selectedPlanIdOverride?: string | null
  ): Promise<WidgetDataPayload> {
    const totalBalance = FinancialEngine.actualBalance(transactions);
    const unallocatedAmount =
      unallocatedBalance !== undefined
        ? unallocatedBalance
        : FinancialEngine.unallocatedBalance(transactions, plans);

    const displayMode = displayModeOverride ?? WidgetBridge.getDisplayMode();
    const selectedPlanId =
      selectedPlanIdOverride !== undefined
        ? selectedPlanIdOverride
        : WidgetBridge.getSelectedPlanId();

    const currency = language === 'ar' ? 'د.ع' : 'IQD';

    const formatCurr = (val: number) => {
      const num = Math.round(val);
      const str = num.toLocaleString(language === 'ar' ? 'ar-IQ' : 'en-US');
      return language === 'ar' ? `${str} د.ع` : `${str} IQD`;
    };

    // Filter active plans (not completed)
    const activePlans = plans.filter(p => !p.isCompleted);

    // Build plans summary array for widget (up to 5 plans)
    const widgetPlans: WidgetPlanSummaryItem[] = activePlans.map(plan => {
      const target = Math.max(1, plan.targetAmount || 1);
      const current = Math.max(0, plan.allocatedAmount || 0);
      const progress = Math.round((current / target) * 100) / 100;

      return {
        id: plan.id,
        name: plan.name,
        progress: Math.min(1, Math.max(0, progress)),
        current,
        target,
      };
    });

    // Resolve focused single plan
    let focusedPlan: WidgetSelectedPlan | null = null;
    const targetPlan = selectedPlanId
      ? activePlans.find(p => p.id === selectedPlanId) || activePlans[0]
      : activePlans[0];

    if (targetPlan) {
      const target = Math.max(1, targetPlan.targetAmount || 1);
      const current = Math.max(0, targetPlan.allocatedAmount || 0);
      const progress = Math.round((current / target) * 100) / 100;
      focusedPlan = {
        name: targetPlan.name,
        progress: Math.min(1, Math.max(0, progress)),
        current,
        target,
      };
    }

    // Exact required JSON structure specified in user instructions
    const payload: WidgetDataPayload = {
      totalBalance,
      unallocatedAmount,
      currency,
      selectedPlan: focusedPlan,
      plans: widgetPlans,

      // Additional metadata for convenience & backwards compatibility
      displayMode,
      selectedPlanId: selectedPlanId || null,
      appGroupSuite: WidgetBridge.APP_GROUP_SUITE,
      totalBalanceFormatted: formatCurr(totalBalance),
      unallocatedAmountFormatted: formatCurr(unallocatedAmount),
      quickActions: {
        addExpenseUrl: 'myapp://add-expense',
        addIncomeUrl: 'myapp://add-income',
        plansDashboardUrl: 'myapp://plans-dashboard',
      },
      lastSyncTimestamp: new Date().toISOString(),
    };

    const jsonString = JSON.stringify(payload);

    // 1. Write to browser localStorage
    try {
      localStorage.setItem(WidgetBridge.STORAGE_KEY_MODE, displayMode);
      if (selectedPlanId) {
        localStorage.setItem(WidgetBridge.STORAGE_KEY_PLAN_ID, selectedPlanId);
      } else {
        localStorage.removeItem(WidgetBridge.STORAGE_KEY_PLAN_ID);
      }
      localStorage.setItem(WidgetBridge.STORAGE_KEY_DATA, jsonString);
      localStorage.setItem(WidgetBridge.STORAGE_KEY_JSON, jsonString);
      localStorage.setItem('finance_widget_data', jsonString);
    } catch {
      // Ignore local storage errors
    }

    // 2. Dispatch custom event for in-app UI & simulator reactivity
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('widget-data-synced', {
          detail: {
            payload,
            displayMode,
            selectedPlanId,
          },
        })
      );
    }

    // 3. Capacitor-to-Native Bridge Sync
    try {
      const capWindow = window as unknown as {
        Capacitor?: {
          Plugins?: {
            WidgetBridge?: {
              syncWidgetData: (options: {
                suite: string;
                displayMode: string;
                selectedPlanId?: string | null;
                data: string;
              }) => Promise<void>;
            };
          };
        };
      };

      if (capWindow.Capacitor?.Plugins?.WidgetBridge?.syncWidgetData) {
        await capWindow.Capacitor.Plugins.WidgetBridge.syncWidgetData({
          suite: WidgetBridge.APP_GROUP_SUITE,
          displayMode,
          selectedPlanId: selectedPlanId || '',
          data: jsonString,
        });
      } else {
        // Try dynamic import of @capacitor/core registerPlugin
        const { registerPlugin } = await import('@capacitor/core');
        const NativeWidget = registerPlugin<{
          syncWidgetData: (opts: {
            suite: string;
            displayMode: string;
            selectedPlanId?: string | null;
            data: string;
          }) => Promise<void>;
        }>('WidgetBridge');

        if (NativeWidget && typeof NativeWidget.syncWidgetData === 'function') {
          await NativeWidget.syncWidgetData({
            suite: WidgetBridge.APP_GROUP_SUITE,
            displayMode,
            selectedPlanId: selectedPlanId || '',
            data: jsonString,
          });
        }
      }
    } catch {
      // In web simulator or browser preview, native plugin is not bound
    }

    return payload;
  }

  /**
   * Retrieve cached widget payload
   */
  static getCachedData(): WidgetDataPayload | null {
    try {
      const raw =
        localStorage.getItem(WidgetBridge.STORAGE_KEY_JSON) ||
        localStorage.getItem(WidgetBridge.STORAGE_KEY_DATA);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      return null;
    }
    return null;
  }
}
