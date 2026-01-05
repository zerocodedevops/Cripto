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

ReactDOM.createRoot(document.getElementById('root')!).render(
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
