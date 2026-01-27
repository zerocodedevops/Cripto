import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PageLoader } from '@/components/ui/PageLoader';

// Layouts
const AdminLayout = lazy(() => import('@salon/layouts/AdminLayout'));

// Pages
const Landing = lazy(() => import('@salon/pages/Landing'));
const Login = lazy(() => import('@salon/pages/auth/Login'));
const Dashboard = lazy(() => import('@salon/pages/admin/Dashboard'));
const Bookings = lazy(() => import('@salon/pages/admin/Bookings'));

export default function SalonRoutes() {
    return (
        <Suspense fallback={<PageLoader text="Loading Salon System..." />}>
            <div className="theme-salon min-h-screen bg-background text-foreground font-sans">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Landing />} />
                    <Route path="auth/login" element={<Login />} />

                    {/* Admin Routes */}
                    <Route path="admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="bookings" element={<Bookings />} />
                        <Route index element={<Navigate to="dashboard" replace />} />
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Suspense>
    );
}
