import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils still exists or I need to recreate it

export default function AdminLayout() {
    const location = useLocation();
    const pathname = location.pathname;

    const navItems = [
        { href: '/admin/dashboard', label: 'Panel', icon: LayoutDashboard },
        { href: '/admin/bookings', label: 'Reservas', icon: Calendar },
        { href: '/admin/staff', label: 'Equipo', icon: Users },
        { href: '/admin/settings', label: 'Ajustes', icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-[#BF953F] selection:text-black">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-black/40 hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-heading text-[#d4af37] tracking-wider">ZERO | Admin</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-sm group",
                                    isActive
                                        ? "bg-[#BF953F] text-black shadow-lg shadow-[#BF953F]/20"
                                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon size={18} className={cn("transition-colors", isActive ? "text-black" : "text-neutral-500 group-hover:text-white")} />
                                <span className="uppercase tracking-widest text-xs font-bold">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <Link to="/auth/login" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-sm transition-colors">
                        <LogOut size={18} />
                        <span className="uppercase tracking-widest text-xs font-bold">Salir</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <div className="flex-1 overflow-auto bg-[url('https://res.cloudinary.com/dnggn27qg/image/upload/v1714050000/noise_p0x1yq.png')] bg-repeat opacity-100">
                    <div className="bg-black/20 min-h-full">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
