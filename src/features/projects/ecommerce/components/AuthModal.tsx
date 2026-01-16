import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { syncCartWithCloud } from '../store/cartSlice';

interface AuthModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      dispatch(login({ username }));
      // Sync cart after login (ignore typescript error for thunk dispatch if any, as it's dynamic)
      // @ts-ignore
      dispatch(syncCartWithCloud(username));
      
      setIsLoading(false);
      onClose();
      
      // Show prototype alert
      // In a real app we'd use a toast library, but simple alert fits the "Prototype" instruction
      // Or better, we can rely on the Navbar to show the "Logged in" state visually
      if (isRegister) {
          alert(`✅ Registro Simulado Exitoso\n\nBienvenido al prototipo de DevOps Shop, ${username}. Esta es una simulación, no se han guardado datos reales.`);
      }
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="relative p-8">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
                </h2>
                <p className="text-slate-500 mt-2">
                  Accede a funciones exclusivas y gestiona tus pedidos.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username-input" className="text-sm font-medium text-slate-700 ml-1">Usuario</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input 
                      id="username-input"
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-900"
                      placeholder="Ej. daviddevops"
                      autoFocus
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password-input" className="text-sm font-medium text-slate-700 ml-1">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input 
                      id="password-input"
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-900"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    'Procesando...'
                  ) : (
                    <>
                      {isRegister ? 'Registrarse Gratis' : 'Entrar ahora'}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-sm text-slate-500 hover:text-indigo-600 font-medium transition-colors"
                >
                  {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                </button>
              </div>

              {/* Prototype Warning */}
              <div className="mt-6 p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-600 text-center">
                ⚠️ Modo Prototipo: El registro es simulado.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
