import { registerPlugin } from '@capacitor/core';

export interface WidgetBridgePlugin {
  exitToHomeScreen(): Promise<{ success: boolean }>;
}

// Register strictly to native - minimal bridge for Home Screen dismissal
export const WidgetBridge = registerPlugin<WidgetBridgePlugin>('WidgetBridge');

/**
 * Suspend app back to iOS SpringBoard (Home Screen)
 */
export const exitAppToHome = async (): Promise<void> => {
  try {
    await WidgetBridge.exitToHomeScreen();
  } catch (err) {
    console.warn('[WidgetSync] Native exitToHomeScreen skipped or failed:', err);
  }
};

// Aliases for compatibility
export const dismissToHome = exitAppToHome;


