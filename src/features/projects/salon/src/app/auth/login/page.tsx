import Link from "next/link";
import { MoveLeft } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <Link href="/" className="inline-flex items-center text-neutral-500 hover:text-white transition-colors mb-8">
                    <MoveLeft size={16} className="mr-2" />
                    Volver
                </Link>

                <div className="bg-neutral-900 border border-white/10 p-8 rounded-sm shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="font-baroque text-3xl text-gold-500 mb-2">ZERO | ADMIN</h1>
                        <p className="text-neutral-500 text-sm">Acceso restringido a personal</p>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                                placeholder="staff@hero.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold-500 outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <Link href="/admin/dashboard" className="block w-full bg-gold-600 text-black font-bold text-center py-3 uppercase tracking-widest hover:bg-gold-500 transition-colors">
                            Entrar
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
