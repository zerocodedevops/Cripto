import { AlertCircle, Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function ClientRegister() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const { error: signUpError } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						full_name: fullName,
						role: "client", // Explicitly set role as client
					},
				},
			});

			if (signUpError) throw signUpError;

			// Optional: Create entry in public clients table if needed
			const { error: profileError } = await supabase
				.from("stylists") // Using stylists table? No, we need a clients table or just rely on metadata for now.
				// Ideally we should have a 'clients' table as per plan, but let's stick to auth metadata for Minimum Viable Module
				.select()
				.limit(1);

			navigate("/proyectos/salon/client/bookings");
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
			<div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden">
				{/* Decorative background elements */}
				<div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

				<div className="relative z-10">
					<div className="flex flex-col items-center mb-8">
						<div className="w-12 h-12 bg-amber-900/20 rounded-full flex items-center justify-center mb-4 border border-amber-500/20">
							<UserPlus className="w-6 h-6 text-amber-500" />
						</div>
						<h2 className="text-2xl font-bold text-slate-100 mb-2">
							Crear Cuenta
						</h2>
						<p className="text-slate-400 text-sm text-center">
							Únete a Zero Vanity para gestionar tus reservas
						</p>
					</div>

					{error && (
						<div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6 flex items-start gap-2">
							<AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
							<span>{error}</span>
						</div>
					)}

					<form onSubmit={handleRegister} className="space-y-4">
						<div>
							<label className="block text-slate-400 text-xs uppercase font-bold mb-1.5 ml-1">
								Nombre Completo
							</label>
							<input
								type="text"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder-slate-700"
								placeholder="Ej. Ana García"
								required
							/>
						</div>

						<div>
							<label className="block text-slate-400 text-xs uppercase font-bold mb-1.5 ml-1">
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder-slate-700"
								placeholder="tu@email.com"
								required
							/>
						</div>

						<div>
							<label className="block text-slate-400 text-xs uppercase font-bold mb-1.5 ml-1">
								Contraseña
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder-slate-700"
								placeholder="••••••••"
								required
								minLength={6}
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-900/20 mt-2"
						>
							{loading ? (
								<Loader2 className="w-5 h-5 animate-spin" />
							) : (
								"Registrarse"
							)}
						</button>
					</form>

					<div className="mt-6 text-center text-sm text-slate-500">
						¿Ya tienes cuenta?{" "}
						<Link
							to="/proyectos/salon/login"
							className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
						>
							Inicia Sesión
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
