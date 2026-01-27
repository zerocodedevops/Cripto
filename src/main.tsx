import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Providers } from './app/providers';
import { Router } from './app/router';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initGA, logPageView } from './lib/analytics';
import './i18n/config';

// Initialize Google Analytics
initGA();
logPageView();

async function enableMocking() {
  const USE_WEBSOCKET = import.meta.env.VITE_USE_WEBSOCKET === 'true';

  // Disable MSW in production to prevent CSP errors and performance impact
  if (import.meta.env.PROD) {
    return;
  }

  // Enable MSW for HTTP mocking only (not WebSocket)
  const { worker } = await import('./mocks/browser');

  console.log('🎭 MSW enabled (Development)');

  if (USE_WEBSOCKET) {
    console.log('🔌 WebSocket enabled - MSW will only mock HTTP, not WebSocket');
  }

  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    // IMPORTANT: Don't intercept WebSocket connections
    quiet: false,
  });
}

await enableMocking();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Providers>
        {/* Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Saltar al contenido principal
        </a>
        <Router />
      </Providers>
    </ErrorBoundary>
  </React.StrictMode>
);
