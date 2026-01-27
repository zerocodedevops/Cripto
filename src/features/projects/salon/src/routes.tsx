import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import { PageLoader } from '@/components/ui/PageLoader';

// Layouts
const AdminLayout = lazy(() => import('@salon/layouts/AdminLayout'));

// Pages
const Landing = lazy(() => import('@salon/pages/Landing'));
const Login = lazy(() => import('@salon/pages/auth/Login'));
const Dashboard = lazy(() => import('@salon/pages/admin/Dashboard'));
const Bookings = lazy(() => import('@salon/pages/admin/Bookings'));

export default function SalonRoutes() {
    return (
        <Suspense fallback={<div className="p-20 text-white">Simple Loading...</div>}>
            <div className="theme-salon min-h-screen bg-background text-foreground font-sans">
                <Landing />
            </div>
        </Suspense>
    );
}
