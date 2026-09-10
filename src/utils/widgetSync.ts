import { registerPlugin } from '@capacitor/core';

interface WidgetBridgePlugin {
  exitToHomeScreen(): Promise<void>;
  updateWidgetData(options: {
    balance: number;
    unallocated: number;
    priorityPlanName: string;
    priorityPlanProgress: number;
  }): Promise<{ success: boolean }>;
}

export const WidgetBridge = registerPlugin<WidgetBridgePlugin>('WidgetBridge');

export const syncToWidget = async (
  balance: number,
  unallocated: number,
  priorityPlanName: string = "General Savings",
  priorityPlanProgress: number = 0.0
) => {
  try {
    await WidgetBridge.updateWidgetData({
      balance,
      unallocated,
      priorityPlanName,
      priorityPlanProgress
    });
  } catch (err) {
    console.warn("Widget sync skipped (running in browser or simulator):", err);
  }
};

export const dismissToHome = async () => {
  try {
    await WidgetBridge.exitToHomeScreen();
  } catch (err) {
    console.warn("Could not suspend to home:", err);
  }
};
