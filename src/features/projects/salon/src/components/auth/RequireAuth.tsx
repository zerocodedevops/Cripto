import { useEffect, useState } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function RequireAuth() {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                setIsAuthorized(false);
                return;
            }

            const role = session.user.user_metadata?.role;
            if (role === 'admin') {
                setIsAuthorized(true);
            } else {
                // User is logged in but not admin (e.g. client).
                // Sign out to prevent session conflict and force admin login.
                await supabase.auth.signOut();
                setIsAuthorized(false);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (!session) {
                setIsAuthorized(false);
                return;
            }
            const role = session.user.user_metadata?.role;
            if (role === 'admin') {
                setIsAuthorized(true);
            } else {
                await supabase.auth.signOut();
                setIsAuthorized(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    if (isAuthorized === null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950">
                <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
            </div>
        );
    }

    if (!isAuthorized) {
        return <Navigate to="/proyectos/salon/auth/admin/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
