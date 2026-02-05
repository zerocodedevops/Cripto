import { Lock } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const location = useLocation();

	// @ts-expect-error
	const from = location.state?.from?.pathname || "/proyectos/salon/admin";

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				console.error("Login Error Details:", error);
				throw error;
			}
			navigate(from, { replace: true });
		} catch (err: any) {
			setError(err.message || "Error al iniciar sesión");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
			<div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
				<div className="flex flex-col items-center mb-8">
					<div className="w-12 h-12 bg-amber-900/20 rounded-full flex items-center justify-center mb-4">
						<Lock className="w-6 h-6 text-amber-400" />
					</div>
					<h2 className="text-2xl font-bold text-slate-100 mb-2">
						Acceso Administrativo
					</h2>
					<p className="text-slate-400 text-sm">
						Introduce tus credenciales para continuar
					</p>
				</div>

				{error && (
					<div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6">
						{error}
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-slate-400 text-xs uppercase font-bold mb-1.5 ml-1"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
							placeholder="admin@zerovanity.com"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-slate-400 text-xs uppercase font-bold mb-1.5 ml-1"
						>
							Contraseña
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
							placeholder="••••••••"
							required
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-medium py-2 rounded-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? (
							<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
						) : (
							"Iniciar Sesión"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
