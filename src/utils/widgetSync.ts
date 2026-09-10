import { registerPlugin, WebPlugin } from '@capacitor/core';

export interface WidgetBridgePlugin {
  exitToHomeScreen(): Promise<{ success: boolean }>;
  updateWidgetData(options: {
    balance: number;
    unallocated: number;
    priorityPlanName: string;
    priorityPlanProgress: number;
  }): Promise<{ success: boolean }>;
  syncWidgetData?(options: {
    suite: string;
    displayMode: string;
    selectedPlanId?: string | null;
    data: string;
  }): Promise<{ success: boolean }>;
  minimizeApp?(): Promise<{ success: boolean }>;
}

export class WidgetBridgeWeb extends WebPlugin implements WidgetBridgePlugin {
  async exitToHomeScreen(): Promise<{ success: boolean }> {
    console.log('[WidgetBridgeWeb] exitToHomeScreen invoked in web environment');
    return { success: true };
  }

  async minimizeApp(): Promise<{ success: boolean }> {
    console.log('[WidgetBridgeWeb] minimizeApp invoked in web environment');
    return { success: true };
  }

  async updateWidgetData(options: {
    balance: number;
    unallocated: number;
    priorityPlanName: string;
    priorityPlanProgress: number;
  }): Promise<{ success: boolean }> {
    try {
      localStorage.setItem('cached_balance', String(options.balance));
      localStorage.setItem('cached_unallocated', String(options.unallocated));
      localStorage.setItem('cached_priority_plan_name', options.priorityPlanName);
      localStorage.setItem('cached_priority_plan_progress', String(options.priorityPlanProgress));

      const payload = {
        balance: options.balance,
        unallocated: options.unallocated,
        priorityPlanName: options.priorityPlanName,
        priorityPlanProgress: options.priorityPlanProgress,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('widget_data_json', JSON.stringify(payload));
      localStorage.setItem('finance_widget_data', JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent('finance_widget_data_updated', { detail: payload }));
    } catch {
      // Ignore localStorage errors in restricted environments
    }
    return { success: true };
  }

  async syncWidgetData(options: {
    suite: string;
    displayMode: string;
    selectedPlanId?: string | null;
    data: string;
  }): Promise<{ success: boolean }> {
    try {
      localStorage.setItem('widget_data_json', options.data);
      localStorage.setItem('finance_widget_data', options.data);
      localStorage.setItem('widget_display_mode', options.displayMode);
    } catch {
      // Ignore
    }
    return { success: true };
  }
}

export const WidgetBridge = registerPlugin<WidgetBridgePlugin>('WidgetBridge', {
  web: () => new WidgetBridgeWeb(),
});

export const syncWidgetState = async (
  balance: number,
  unallocated: number,
  planName = "No Active Plan",
  progress = 0
): Promise<void> => {
  try {
    const res = await WidgetBridge.updateWidgetData({
      balance: Number(balance) || 0,
      unallocated: Number(unallocated) || 0,
      priorityPlanName: planName,
      priorityPlanProgress: Number(progress) || 0,
    });
    console.log('[WidgetSync] Updated successfully:', res);
  } catch (err) {
    console.warn('[WidgetSync] Skipped native widget update:', err);
  }
};

/**
 * Suspend app back to iOS SpringBoard (Home Screen)
 */
export const exitAppToHome = async (): Promise<void> => {
  try {
    await WidgetBridge.exitToHomeScreen();
  } catch (err) {
    console.warn('Could not suspend to home:', err);
  }
};

// Aliases for compatibility across app and tests
export const syncWidgetData = syncWidgetState;
export const syncToWidget = syncWidgetState;
export const dismissToHome = exitAppToHome;

