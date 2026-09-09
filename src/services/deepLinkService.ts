import { App as CapApp } from '@capacitor/app';

export type DeepLinkAction =
  | { type: 'add-expense' }
  | { type: 'add-income' }
  | { type: 'plans-dashboard' }
  | { type: 'plan-detail'; planId: string }
  | { type: 'unknown'; rawUrl: string };

type DeepLinkHandler = (action: DeepLinkAction) => void;

export class DeepLinkService {
  private static handlers: Set<DeepLinkHandler> = new Set();
  private static isInitialized = false;

  /**
   * Parse any deep link string into a typed DeepLinkAction
   */
  static parseUrl(urlStr: string): DeepLinkAction {
    if (!urlStr) return { type: 'unknown', rawUrl: '' };

    try {
      // 1. Custom URL Scheme (e.g. myapp://add-expense, myapp://plan?id=XYZ)
      if (urlStr.startsWith('myapp://') || urlStr.startsWith('financeapp://')) {
        const pathPart = urlStr.replace(/^(myapp|financeapp):\/\//, '');
        const [path, queryString] = pathPart.split('?');
        const params = new URLSearchParams(queryString || '');

        if (path === 'add-expense' || path === 'expense') {
          return { type: 'add-expense' };
        }
        if (path === 'add-income' || path === 'income') {
          return { type: 'add-income' };
        }
        if (path === 'plans-dashboard' || path === 'plans') {
          return { type: 'plans-dashboard' };
        }
        if (path === 'plan' || path === 'plan-detail') {
          const planId = params.get('id') || params.get('planId') || '';
          if (planId) {
            return { type: 'plan-detail', planId };
          }
        }
      }

      // 2. HTTP/HTTPS or relative URL with query params (e.g. /?action=add-expense)
      if (urlStr.includes('action=')) {
        let url: URL;
        if (urlStr.startsWith('http')) {
          url = new URL(urlStr);
        } else {
          url = new URL(urlStr, window.location.origin);
        }

        const action = url.searchParams.get('action');
        if (action === 'add-expense') return { type: 'add-expense' };
        if (action === 'add-income') return { type: 'add-income' };
        if (action === 'plans-dashboard') return { type: 'plans-dashboard' };
        if (action === 'plan') {
          const planId = url.searchParams.get('id') || '';
          if (planId) return { type: 'plan-detail', planId };
        }
      }

      // 3. URL Hash navigation (e.g. #add-expense, #add-income)
      if (urlStr.includes('#')) {
        const hash = urlStr.split('#')[1] || '';
        if (hash.startsWith('add-expense')) return { type: 'add-expense' };
        if (hash.startsWith('add-income')) return { type: 'add-income' };
        if (hash.startsWith('plans-dashboard')) return { type: 'plans-dashboard' };
        if (hash.startsWith('plan')) {
          const params = new URLSearchParams(hash.split('?')[1] || '');
          const planId = params.get('id') || '';
          if (planId) return { type: 'plan-detail', planId };
        }
      }
    } catch (err) {
      console.warn('Failed to parse deep link url:', urlStr, err);
    }

    return { type: 'unknown', rawUrl: urlStr };
  }

  /**
   * Register a callback listener for incoming deep links
   */
  static addListener(handler: DeepLinkHandler): () => void {
    this.handlers.add(handler);
    this.init();

    return () => {
      this.handlers.delete(handler);
    };
  }

  /**
   * Programmatically dispatch a deep link action (used by Widgets and Quick Actions)
   */
  static triggerDeepLink(urlStr: string): void {
    const action = this.parseUrl(urlStr);
    this.notifyHandlers(action);
  }

  private static notifyHandlers(action: DeepLinkAction): void {
    if (action.type === 'unknown') return;
    this.handlers.forEach(handler => {
      try {
        handler(action);
      } catch (e) {
        console.error('Error in deep link handler:', e);
      }
    });
  }

  /**
   * Initialize native and web URL listeners
   */
  static init(): void {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    // 1. Listen to Capacitor Native App URL Open events
    try {
      CapApp.addListener('appUrlOpen', data => {
        if (data?.url) {
          const action = this.parseUrl(data.url);
          this.notifyHandlers(action);
        }
      });
    } catch {
      // Capacitor not available or running pure web
    }

    // 2. Listen to custom DOM events (dispatched by native bridge / web shortcuts)
    window.addEventListener('app-deep-link', ((e: CustomEvent<{ url: string }>) => {
      if (e.detail?.url) {
        this.triggerDeepLink(e.detail.url);
      }
    }) as EventListener);

    // 3. Check current window.location query/hash on boot
    const checkCurrentLocation = () => {
      const fullUrl = window.location.href;
      if (
        fullUrl.includes('action=') ||
        fullUrl.includes('#add-') ||
        fullUrl.includes('#plans-') ||
        fullUrl.includes('#plan')
      ) {
        const action = this.parseUrl(fullUrl);
        if (action.type !== 'unknown') {
          // Clean up query param/hash from address bar without reloading
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
          this.notifyHandlers(action);
        }
      }
    };

    // Run slightly after DOM load so listeners are attached
    setTimeout(checkCurrentLocation, 200);

    // 4. Listen to window hash change
    window.addEventListener('hashchange', () => {
      checkCurrentLocation();
    });
  }
}
