import { useState, useEffect } from 'react';
import { CreditCard, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface PaymentSimulatorProps {
    amount: number;
    onSuccess: (paymentDetails: any) => void;
    onCancel: () => void;
}

export default function PaymentSimulator({ amount, onSuccess, onCancel }: PaymentSimulatorProps) {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    });

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'number') {
            setCardData(prev => ({ ...prev, [name]: formatCardNumber(value) }));
        } else if (name === 'expiry') {
            // Simple logic for expiry formatting (MM/YY)
            let formatted = value.replace(/[^0-9]/g, '');
            if (formatted.length > 2) {
                formatted = formatted.substring(0, 2) + '/' + formatted.substring(2, 4);
            }
            setCardData(prev => ({ ...prev, [name]: formatted }));
        } else {
            setCardData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setError(null);

        // Simulate network delay
        setTimeout(() => {
            // Validation simulation
            if (cardData.number.length < 16) {
                setError('Número de tarjeta inválido');
                setProcessing(false);
                return;
            }

            // Simulate success
            setSuccess(true);

            // Wait a moment before calling onSuccess to show the success state
            setTimeout(() => {
                onSuccess({
                    id: 'sim_' + Math.random().toString(36).substr(2, 9),
                    status: 'paid',
                    amount: amount,
                    method: 'card',
                    last4: cardData.number.slice(-4)
                });
            }, 1500);

        }, 2000);
    };

    if (success) {
        return (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                    <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-emerald-400 mb-2">¡Pago Completado!</h3>
                <p className="text-slate-400">Tu reserva ha sido confirmada con éxito.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-500" />
                    Pago Seguro (Simulado)
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    <Lock className="w-3 h-3" />
                    TLS Encriptado
                </div>
            </div>

            <div className="mb-6 bg-slate-950 rounded-lg p-4 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 text-sm">Total a Pagar (Depósito):</span>
                <span className="text-2xl font-bold text-amber-400">{amount.toFixed(2)}€</span>
            </div>

            {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-slate-400 text-xs uppercase font-bold mb-1.5">Número de Tarjeta</label>
                    <div className="relative">
                        <input
                            name="number"
                            type="text"
                            maxLength={19}
                            value={cardData.number}
                            onChange={handleInputChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all font-mono"
                            required
                        />
                        <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-1.5">Expiración</label>
                        <input
                            name="expiry"
                            type="text"
                            maxLength={5}
                            value={cardData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all font-mono text-center"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs uppercase font-bold mb-1.5">CVC</label>
                        <input
                            name="cvc"
                            type="text"
                            maxLength={3}
                            value={cardData.cvc}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all font-mono text-center"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-slate-400 text-xs uppercase font-bold mb-1.5">Nombre del Titular</label>
                    <input
                        name="name"
                        type="text"
                        value={cardData.name}
                        onChange={handleInputChange}
                        placeholder="COMO APARECE EN LA TARJETA"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all uppercase"
                        required
                    />
                </div>

                <div className="pt-4 flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={processing}
                        className="flex-1 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold py-2 rounded-lg transition-all shadow-lg shadow-amber-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Procesando...
                            </>
                        ) : (
                            <>
                                Pagar {amount.toFixed(2)}€
                            </>
                        )}
                    </button>
                </div>
            </form>

            <p className="text-xs text-slate-600 text-center mt-4">
                * Esto es un simulador. No se realizará ningún cargo real.
            </p>
        </div>
    );
}
