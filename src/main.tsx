import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { I18nProvider } from './context/I18nContext';
import './index.css';

// PWA Service Worker Registration & Auto Cache Invalidation
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js?v=2.1.0')
      .then(registration => {
        // Explicitly check for newer worker on load
        registration.update().catch(() => {});
      })
      .catch(err => {
        console.warn('Service worker registration failed:', err);
      });

    let isRefreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!isRefreshing) {
        isRefreshing = true;
        window.location.reload();
      }
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);

