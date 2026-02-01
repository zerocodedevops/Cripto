import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PageLoader } from '@/components/ui/PageLoader';

// Pages
const Landing = lazy(() => import('@salon/pages/Landing'));

// Admin Components (Lazy Loaded)
const AdminLogin = lazy(() => import('@salon/pages/AdminLogin'));
const AdminLayout = lazy(() => import('@salon/layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('@salon/pages/AdminDashboard'));
const AdminServices = lazy(() => import('@salon/pages/admin/ServicesPage'));
const AdminStylists = lazy(() => import('@salon/pages/admin/StylistsPage'));
const RequireAuth = lazy(() => import('@salon/components/auth/RequireAuth'));

export default function SalonRoutes() {
    return (
        <Suspense fallback={<div className="p-20 text-white flex justify-center"><PageLoader text="Loading Salon..." /></div>}>
            <div className="theme-salon min-h-screen bg-background text-foreground font-sans">
                <Routes>
                    {/* Public Landing */}
                    <Route path="/" element={<Landing />} />

                    {/* Admin Login */}
                    <Route path="/admin/login" element={<AdminLogin />} />

                    {/* Protected Admin Routes */}
                    <Route path="/admin" element={<RequireAuth />}>
                        <Route element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="services" element={<AdminServices />} />
                            <Route path="team" element={<AdminStylists />} />
                            {/* Future routes: /calendar, /clients, etc. */}
                        </Route>
                    </Route>

                    {/* Redirect unknown salon paths to landing */}
                    <Route path="*" element={<Navigate to="" replace />} />
                </Routes>
            </div>
        </Suspense>
    );
}
