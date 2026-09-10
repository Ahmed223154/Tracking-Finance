import { registerPlugin } from '@capacitor/core';

export interface WidgetBridgePlugin {
  exitToHomeScreen(): Promise<{ success: boolean }>;
  updateWidgetData(options: {
    balance: number;
    unallocated: number;
    priorityPlanName: string;
    priorityPlanProgress: number;
  }): Promise<{ success: boolean }>;
}

// Register strictly to native - do NOT attach a web mock that intercepts iOS calls
export const WidgetBridge = registerPlugin<WidgetBridgePlugin>('WidgetBridge');

export const syncWidgetState = async (
  balance: number,
  unallocated: number,
  priorityPlanName: string = "No Active Plan",
  priorityPlanProgress: number = 0
) => {
  try {
    const res = await WidgetBridge.updateWidgetData({
      balance: Number(balance) || 0,
      unallocated: Number(unallocated) || 0,
      priorityPlanName,
      priorityPlanProgress: Number(priorityPlanProgress) || 0
    });
    console.log('[WidgetSync] Successfully pushed to iOS App Group:', res);
  } catch (err) {
    console.warn('[WidgetSync] Native bridge not available or failed:', err);
  }
};

export const exitAppToHome = async () => {
  try {
    await WidgetBridge.exitToHomeScreen();
  } catch (err) {
    console.warn('[WidgetSync] Native exitToHomeScreen failed:', err);
  }
};

// Aliases for compatibility across app and tests
export const syncWidgetData = syncWidgetState;
export const syncToWidget = syncWidgetState;
export const dismissToHome = exitAppToHome;


