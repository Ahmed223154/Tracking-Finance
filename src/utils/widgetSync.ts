import { registerPlugin } from '@capacitor/core';

export interface WidgetBridgePlugin {
  exitToHomeScreen(): Promise<{ success: boolean } | void>;
  updateWidgetData(options: {
    balance: number;
    unallocated: number;
    priorityPlanName: string;
    priorityPlanProgress: number;
  }): Promise<{ success: boolean }>;
}

export const WidgetBridge = registerPlugin<WidgetBridgePlugin>('WidgetBridge');

/**
 * Synchronize current financial balances and priority plan progress to iOS App Group
 */
export const syncWidgetData = async (
  balance: number,
  unallocated: number,
  priorityPlanName: string = 'General Savings',
  priorityPlanProgress: number = 0.0
): Promise<void> => {
  try {
    await WidgetBridge.updateWidgetData({
      balance,
      unallocated,
      priorityPlanName,
      priorityPlanProgress,
    });
  } catch (err) {
    console.warn('Widget sync skipped (running in browser or simulator):', err);
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

// Aliases for compatibility
export const syncToWidget = syncWidgetData;
export const dismissToHome = exitAppToHome;
