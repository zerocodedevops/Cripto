import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        navigate('/admin/dashboard');
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 bg-[url('https://res.cloudinary.com/dnggn27qg/image/upload/v1714050000/noise_p0x1yq.png')]">
            <div className="w-full max-w-md bg-black/40 border border-[#BF953F]/30 p-8 rounded-sm shadow-2xl backdrop-blur-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-heading text-[#d4af37] mb-2">ZERO</h1>
                    <p className="text-neutral-400 text-xs uppercase tracking-widest">Salon & Barbershop</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative group">
                            <Mail className="absolute left-3 top-3 text-[#BF953F]/50 group-focus-within:text-[#BF953F] transition-colors" size={18} />
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                className="w-full bg-black/40 border border-[#BF953F]/20 rounded-sm py-3 pl-10 pr-4 text-[#FCF6BA] placeholder:text-[#BF953F]/30 focus:outline-none focus:border-[#BF953F]/60 transition-all font-body"
                                autoComplete="username"
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-3 text-[#BF953F]/50 group-focus-within:text-[#BF953F] transition-colors" size={18} />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="w-full bg-black/40 border border-[#BF953F]/20 rounded-sm py-3 pl-10 pr-4 text-[#FCF6BA] placeholder:text-[#BF953F]/30 focus:outline-none focus:border-[#BF953F]/60 transition-all font-body"
                                autoComplete="current-password"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-[#BF953F] hover:bg-[#a67c2e] text-black font-bold py-3 uppercase tracking-widest text-xs transition-all">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}
