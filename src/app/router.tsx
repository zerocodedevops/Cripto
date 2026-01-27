import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PageTransition } from '@/components/ui/PageTransition';
import { PageLoader } from '@/components/ui/PageLoader';
import { CurrencyProvider } from '@/features/projects/crypto/context/CurrencyContext';

// Lazy Load Components
const Home = lazy(() => import('@/features/home/Home'));
const BlogPost = lazy(() => import('@/features/blog/BlogPost'));
const EcommerceApp = lazy(() => import('@/features/projects/ecommerce/routes'));
const AnalyticsApp = lazy(() => import('@/features/projects/analytics/routes'));
const SalonApp = lazy(() => import('@salon/routes'));
const CryptoApp = lazy(() => import('@/features/projects/crypto/pages/CryptoDashboard').then(m => ({ default: m.CryptoDashboard })));
const NotFound = lazy(() => import('@/features/misc/NotFound'));

const router = createHashRouter([
  {
    path: '/',
    element: (
      <PageTransition>
        <Suspense fallback={<PageLoader text="Initializing Core..." />}>
          <Home />
        </Suspense>
      </PageTransition>
    )
  },
  {
    path: '/proyectos/ecommerce/*',
    element: (
      <PageTransition>
        <Suspense fallback={<PageLoader text="Loading Store..." />}>
          <EcommerceApp />
        </Suspense>
      </PageTransition>
    )
  },
  {
    path: '/proyectos/analytics/*',
    element: (
      <PageTransition>
        <Suspense fallback={<PageLoader text="Loading Analytics..." />}>
          <AnalyticsApp />
        </Suspense>
      </PageTransition>
    )
  },
  {
    path: '/proyectos/crypto',
    element: (
      <PageTransition>
        <Suspense fallback={<PageLoader text="Connecting to Exchange..." />}>
          <CurrencyProvider>
            <CryptoApp />
          </CurrencyProvider>
        </Suspense>
      </PageTransition>
    )
  },
  {
    path: '/proyectos/salon/*',
    element: (
      <PageTransition>
        <Suspense fallback={<PageLoader text="Loading Salon App..." />}>
          <SalonApp />
        </Suspense>
      </PageTransition>
    )
  },
  {
    path: '/blog/:id',
    element: (
      <PageTransition>
        <Suspense fallback={<PageLoader text="Loading Post..." />}>
          <BlogPost />
        </Suspense>
      </PageTransition>
    )
  },
  {
    path: '*',
    element: (
      <PageTransition>
        <Suspense fallback={<PageLoader />}>
          <NotFound />
        </Suspense>
      </PageTransition>
    )
  }
], {
  future: {
    v7_startTransition: true,
  }
});

export function Router() {
  return <RouterProvider router={router} />;
}
