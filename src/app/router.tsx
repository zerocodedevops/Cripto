import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PageTransition } from '@/components/ui/PageTransition';
const Home = lazy(() => import('@/features/home/Home'));
const BlogPost = lazy(() => import('@/features/blog/BlogPost'));
const EcommerceApp = lazy(() => import('@/features/projects/ecommerce/routes'));
const NotFound = lazy(() => import('@/features/misc/NotFound'));

const router = createHashRouter([
  { 
    path: '/', 
    element: (
      <PageTransition>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-dark-950 text-dark-400">Cargando…</div>}>
          <Home />
        </Suspense>
      </PageTransition>
    ) 
  },
  {
    path: '/proyectos/ecommerce/*',
    element: (
      <PageTransition>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">Cargando Tienda...</div>}>
          <EcommerceApp />
        </Suspense>
      </PageTransition>
    )
  },
  { 
    path: '/blog/:id', 
    element: (
      <PageTransition>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-dark-950 text-dark-400">Cargando…</div>}>
          <BlogPost />
        </Suspense>
      </PageTransition>
    ) 
  },
  {
    path: '*',
    element: (
      <PageTransition>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-dark-950 text-dark-400">Cargando…</div>}>
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
