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

export const WidgetBridge = registerPlugin<WidgetBridgePlugin>('WidgetBridge');

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
    console.error('[WidgetSync] Failed to update widget:', err);
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

