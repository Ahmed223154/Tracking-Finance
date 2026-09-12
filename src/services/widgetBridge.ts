import { TransactionItem, PlanItem } from '../types/finance';
import { FinancialEngine } from './financialEngine';
import { WidgetBridge as CapacitorWidgetBridge, exitAppToHome } from '../utils/widgetSync';

export const NativeWidgetBridge = CapacitorWidgetBridge;
export const AppExit = CapacitorWidgetBridge;

/**
 * Exits the application and returns the user to the iOS SpringBoard Home Screen
 */
export const exitToHomeScreen = exitAppToHome;
export const minimizeApp = exitAppToHome;

// Purged legacy background sync methods - retained as lightweight no-ops for backwards compatibility
export const updateWidgetData = async () => {};
export const syncWidgetData = async () => {};

export interface PendingWidgetTransaction {
  id: string;
  amount: number;
  category: string;
  note?: string;
  type: 'expense' | 'income';
  date: string;
}

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
  public static readonly STORAGE_KEY_PENDING = 'pending_transactions';

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

  /**
   * Retrieve pending transactions queued by Home Screen AppIntents
   */
  static async getPendingTransactions(): Promise<PendingWidgetTransaction[]> {
    const list: PendingWidgetTransaction[] = [];

    // 1. Try native Capacitor bridge plugin
    try {
      const capWindow = window as unknown as {
        Capacitor?: {
          Plugins?: {
            WidgetBridge?: {
              getPendingTransactions: (opts: { suite: string }) => Promise<{ transactions?: PendingWidgetTransaction[] }>;
            };
          };
        };
      };

      if (capWindow.Capacitor?.Plugins?.WidgetBridge?.getPendingTransactions) {
        const res = await capWindow.Capacitor.Plugins.WidgetBridge.getPendingTransactions({
          suite: WidgetBridge.APP_GROUP_SUITE,
        });
        if (res?.transactions && Array.isArray(res.transactions)) {
          list.push(...res.transactions);
        }
      } else {
        const { registerPlugin } = await import('@capacitor/core');
        const NativeWidget = registerPlugin<{
          getPendingTransactions: (opts: { suite: string }) => Promise<{ transactions?: PendingWidgetTransaction[] }>;
        }>('WidgetBridge');

        if (NativeWidget && typeof NativeWidget.getPendingTransactions === 'function') {
          const res = await NativeWidget.getPendingTransactions({
            suite: WidgetBridge.APP_GROUP_SUITE,
          });
          if (res?.transactions && Array.isArray(res.transactions)) {
            list.push(...res.transactions);
          }
        }
      }
    } catch {
      // Ignore native bridge error in browser
    }

    // 2. Also check localStorage queue (for simulator / web preview)
    try {
      const stored = localStorage.getItem(WidgetBridge.STORAGE_KEY_PENDING);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Merge items without duplicates by id
          for (const item of parsed) {
            if (!list.some(existing => existing.id === item.id)) {
              list.push(item);
            }
          }
        }
      }
    } catch {
      // Ignore
    }

    return list;
  }

  /**
   * Clear pending transactions after they have been reconciled into the database
   */
  static async clearPendingTransactions(): Promise<void> {
    // 1. Clear native App Group storage
    try {
      const capWindow = window as unknown as {
        Capacitor?: {
          Plugins?: {
            WidgetBridge?: {
              clearPendingTransactions: (opts: { suite: string }) => Promise<{ success: boolean }>;
            };
          };
        };
      };

      if (capWindow.Capacitor?.Plugins?.WidgetBridge?.clearPendingTransactions) {
        await capWindow.Capacitor.Plugins.WidgetBridge.clearPendingTransactions({
          suite: WidgetBridge.APP_GROUP_SUITE,
        });
      } else {
        const { registerPlugin } = await import('@capacitor/core');
        const NativeWidget = registerPlugin<{
          clearPendingTransactions: (opts: { suite: string }) => Promise<{ success: boolean }>;
        }>('WidgetBridge');
        if (NativeWidget && typeof NativeWidget.clearPendingTransactions === 'function') {
          await NativeWidget.clearPendingTransactions({
            suite: WidgetBridge.APP_GROUP_SUITE,
          });
        }
      }
    } catch {
      // Ignore
    }

    // 2. Clear browser localStorage
    try {
      localStorage.removeItem(WidgetBridge.STORAGE_KEY_PENDING);
    } catch {
      // Ignore
    }
  }

  /**
   * Atomically fetch and flush pending transactions
   */
  static async flushPendingTransactions(): Promise<PendingWidgetTransaction[]> {
    const list: PendingWidgetTransaction[] = [];

    // 1. Try native atomic flush
    try {
      const capWindow = window as unknown as {
        Capacitor?: {
          Plugins?: {
            WidgetBridge?: {
              flushPendingTransactions: (opts: { suite: string }) => Promise<{ transactions?: PendingWidgetTransaction[] }>;
            };
          };
        };
      };

      if (capWindow.Capacitor?.Plugins?.WidgetBridge?.flushPendingTransactions) {
        const res = await capWindow.Capacitor.Plugins.WidgetBridge.flushPendingTransactions({
          suite: WidgetBridge.APP_GROUP_SUITE,
        });
        if (res?.transactions && Array.isArray(res.transactions)) {
          list.push(...res.transactions);
        }
      } else {
        const { registerPlugin } = await import('@capacitor/core');
        const NativeWidget = registerPlugin<{
          flushPendingTransactions: (opts: { suite: string }) => Promise<{ transactions?: PendingWidgetTransaction[] }>;
        }>('WidgetBridge');
        if (NativeWidget && typeof NativeWidget.flushPendingTransactions === 'function') {
          const res = await NativeWidget.flushPendingTransactions({
            suite: WidgetBridge.APP_GROUP_SUITE,
          });
          if (res?.transactions && Array.isArray(res.transactions)) {
            list.push(...res.transactions);
          }
        }
      }
    } catch {
      // Ignore
    }

    // 2. Drain localStorage queue
    try {
      const stored = localStorage.getItem(WidgetBridge.STORAGE_KEY_PENDING);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (!list.some(existing => existing.id === item.id)) {
              list.push(item);
            }
          }
        }
        localStorage.removeItem(WidgetBridge.STORAGE_KEY_PENDING);
      }
    } catch {
      // Ignore
    }

    return list;
  }

  /**
   * Simulator helper: Emulate QuickAddExpenseIntent running directly from Home Screen
   */
  static simulateIntentAddExpense(amount: number, category: string, note?: string): PendingWidgetTransaction {
    const newTx: PendingWidgetTransaction = {
      id: 'tx-intent-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      amount: Math.abs(amount),
      category: category || 'Food & Dining',
      note: note || 'Quick Log from Home Screen Widget',
      type: 'expense',
      date: new Date().toISOString(),
    };

    try {
      const stored = localStorage.getItem(WidgetBridge.STORAGE_KEY_PENDING);
      const list: PendingWidgetTransaction[] = stored ? JSON.parse(stored) : [];
      list.push(newTx);
      localStorage.setItem(WidgetBridge.STORAGE_KEY_PENDING, JSON.stringify(list));

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('widget-pending-transactions-updated', {
            detail: { newTx, count: list.length },
          })
        );
      }
    } catch {
      // Ignore
    }

    return newTx;
  }

  /**
   * Simulator helper: Emulate QuickAddIncomeIntent running directly from Home Screen
   */
  static simulateIntentAddIncome(amount: number, source: string, note?: string): PendingWidgetTransaction {
    const newTx: PendingWidgetTransaction = {
      id: 'tx-intent-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      amount: Math.abs(amount),
      category: source || 'Salary',
      note: note || 'Quick Log from Home Screen Widget',
      type: 'income',
      date: new Date().toISOString(),
    };

    try {
      const stored = localStorage.getItem(WidgetBridge.STORAGE_KEY_PENDING);
      const list: PendingWidgetTransaction[] = stored ? JSON.parse(stored) : [];
      list.push(newTx);
      localStorage.setItem(WidgetBridge.STORAGE_KEY_PENDING, JSON.stringify(list));

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('widget-pending-transactions-updated', {
            detail: { newTx, count: list.length },
          })
        );
      }
    } catch {
      // Ignore
    }

    return newTx;
  }
}
