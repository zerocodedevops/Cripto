```javascript
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, LogOut, Scissors, Users } from 'lucide-react';

export default function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/proyectos/salon/admin/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/proyectos/salon/admin' },
        // { icon: Calendar, label: 'Agenda', to: '/proyectos/salon/admin/calendar' }, // Merged into Dashboard
        { icon: Scissors, label: 'Servicios', to: '/proyectos/salon/admin/services' },
        { icon: Users, label: 'Equipo', to: '/proyectos/salon/admin/team' },
        // { icon: Settings, label: 'Configuración', to: '/proyectos/salon/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex font-sans text-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                        Zero Vanity
                    </h2>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Admin Panel</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/proyectos/salon/admin'}
                            className={({ isActive }) =>
                                `flex items - center space - x - 3 px - 4 py - 3 rounded - lg mb - 1 transition - all ${
    isActive
        ? 'bg-amber-900/30 text-amber-400 border border-amber-800/50'
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
} `
                            }
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                            <span className="font-bold text-amber-500">A</span>
                        </div>
                    </div>
                </header>

                <Outlet />
            </main>
        </div>
    );
}
