import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0a0e1a]">
    <div className="text-[#00d4ff] text-sm font-mono tracking-wider animate-pulse">
      LOADING SYSTEM...
    </div>
  </div>
);

import { Seo } from '@/components/common/SEO';

export default function AnalyticsRoutes() {
  return (
    <LanguageProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Seo
          title="Portfolio Analytics"
          description="Interactive Dashboard visualizing portfolio metrics, user engagement, and revenue data."
          keywords="analytics, dashboard, visualization, metrics, react, charts"
        />
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/proyectos/analytics/dashboard" replace />} />
        </Routes>
      </Suspense>
    </LanguageProvider>
  );
}
