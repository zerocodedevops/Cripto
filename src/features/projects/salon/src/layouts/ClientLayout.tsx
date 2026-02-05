import { Calendar, Home, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function ClientLayout() {
	const navigate = useNavigate();
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const checkUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) {
				navigate("/proyectos/salon/login");
			} else {
				setUser(user);
			}
		};
		checkUser();
	}, [navigate]);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate("/proyectos/salon");
	};

	return (
		<div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-20 md:pb-0">
			{/* Header Desktop */}
			<header className="hidden md:flex items-center justify-between px-8 py-4 bg-slate-900 border-b border-slate-800">
				<div className="flex items-center gap-2">
					<h1 className="text-xl font-bold bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
						Zero Vanity
					</h1>
					<span className="text-xs text-slate-500 uppercase tracking-wider border-l border-slate-700 pl-2 ml-2">
						Portal Cliente
					</span>
				</div>

				<nav className="flex items-center gap-6">
					<NavLink
						to="/proyectos/salon/client/bookings"
						className={({ isActive }) =>
							`text-sm font-medium transition-colors ${isActive ? "text-amber-400" : "text-slate-400 hover:text-slate-200"}`
						}
					>
						Mis Reservas
					</NavLink>
					<button
						onClick={handleLogout}
						className="text-sm font-medium text-slate-400 hover:text-red-400 transition-colors flex items-center gap-2"
					>
						<LogOut className="w-4 h-4" />
						Cerrar Sesión
					</button>
					{user && (
						<div className="w-8 h-8 rounded-full bg-amber-900/20 border border-amber-500/30 flex items-center justify-center text-amber-500">
							<User className="w-4 h-4" />
						</div>
					)}
				</nav>
			</header>

			{/* Main Content */}
			<main className="max-w-5xl mx-auto p-4 md:p-8">
				<Outlet />
			</main>

			{/* Mobile Bottom Nav */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-6 py-3 flex justify-between z-50">
				<NavLink
					to="/proyectos/salon"
					className="flex flex-col items-center gap-1 text-slate-500"
				>
					<Home className="w-5 h-5" />
					<span className="text-[10px]">Inicio</span>
				</NavLink>
				<NavLink
					to="/proyectos/salon/client/bookings"
					className={({ isActive }) =>
						`flex flex-col items-center gap-1 ${isActive ? "text-amber-400" : "text-slate-500"}`
					}
				>
					<Calendar className="w-5 h-5" />
					<span className="text-[10px]">Reservas</span>
				</NavLink>
				<button
					onClick={handleLogout}
					className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-400"
				>
					<LogOut className="w-5 h-5" />
					<span className="text-[10px]">Salir</span>
				</button>
			</nav>
		</div>
	);
}
