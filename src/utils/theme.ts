import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

export type ThemeMode = 'light' | 'dark' | 'system';

export const THEME_STORAGE_KEY = 'app_theme_mode';
const LEGACY_STORAGE_KEY = 'finance_app_theme';

export function getSavedTheme(): ThemeMode {
  const saved = (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode) ||
    (localStorage.getItem(LEGACY_STORAGE_KEY) as ThemeMode);
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }
  return 'system';
}

export function isDarkModeActive(mode?: ThemeMode): boolean {
  const currentMode = mode || getSavedTheme();
  if (currentMode === 'dark') return true;
  if (currentMode === 'light') return false;
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

export function applyTheme(mode: ThemeMode) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    localStorage.setItem(LEGACY_STORAGE_KEY, mode);
  } catch {
    // Storage might fail in sandboxed or private mode
  }

  const root = document.documentElement;
  const systemPrefersDark = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false;
  const isDark = mode === 'dark' || (mode === 'system' && systemPrefersDark);

  if (isDark) {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  }

  // Update native iOS Status Bar style if running on Capacitor
  if (Capacitor.isNativePlatform()) {
    try {
      StatusBar.setStyle({
        style: isDark ? Style.Dark : Style.Light,
      });
      StatusBar.setBackgroundColor({
        color: isDark ? '#0B0F17' : '#FFFFFF',
      });
    } catch {
      // Ignore in web preview
    }
  }

  // Dispatch custom event for reactive UI hooks
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('app-theme-changed', {
      detail: { mode, isDark }
    }));
  }
}

export function initTheme() {
  const mode = getSavedTheme();
  applyTheme(mode);

  // Listen for OS system theme changes when mode is set to 'system'
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (getSavedTheme() === 'system') {
        applyTheme('system');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else if ((mediaQuery as any).addListener) {
      (mediaQuery as any).addListener(handleSystemChange);
    }
  }
}
