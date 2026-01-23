import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import EcommerceLayout from './layout/EcommerceLayout';

const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const CheckoutSuccessPage = lazy(() => import('./pages/CheckoutSuccessPage'));
const CheckoutCancelPage = lazy(() => import('./pages/CheckoutCancelPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-96">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
);

import { Seo } from '@/components/common/SEO';

export default function EcommerceRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Seo
        title="DevOps Shop"
        description="Premium E-commerce for Developer Swag. Built with React, Redux Toolkit, and Stripe."
        keywords="devops, shop, ecommerce, react, redux, stripe"
      />
      <Routes>
        <Route element={<EcommerceLayout />}>
          <Route index element={<CatalogPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="producto/:id" element={<ProductDetailPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="checkout/cancel" element={<CheckoutCancelPage />} />
          <Route path="admin" element={<AdminPage />} /> {/* Added AdminPage route */}
          <Route path="*" element={<div>Página no encontrada en tienda</div>} />
        </Route>
      </Routes>
    </Suspense>
  );
}
