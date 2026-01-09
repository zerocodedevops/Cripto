import { useState, useEffect } from 'react';
import { Bell, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cryptoTheme } from '../utils/cryptoTheme';
import { useCryptoPrice } from '../hooks/useCryptoPrice';
import { useCurrencyFormat } from '../hooks/useCurrencyFormat';

interface PriceAlert {
  id: string;
  coinId: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
}

export function PriceAlerts() {
  const { data: coins } = useCryptoPrice({ per_page: 50 });
  const { formatCurrency } = useCurrencyFormat();
  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    const saved = localStorage.getItem('crypto-alerts');
    return saved ? JSON.parse(saved) : [];
  });

  const [newAlertCoin, setNewAlertCoin] = useState('bitcoin');
  const [newAlertPrice, setNewAlertPrice] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('crypto-alerts', JSON.stringify(alerts));
  }, [alerts]);

  // Check alerts logic (Simulation)
  // In a real app this would run in a service worker or backend
  useEffect(() => {
    if (!coins) return;

    alerts.forEach(alert => {
      if (!alert.isActive) return;
      const coin = coins.find(c => c.id === alert.coinId);
      if (coin) {
        if (
          (alert.condition === 'above' && coin.current_price >= alert.targetPrice) ||
          (alert.condition === 'below' && coin.current_price <= alert.targetPrice)
        ) {
          // Trigger notification (Mock)
          // alert(`PRICE ALERT: ${coin.name} is ${alert.condition} ${alert.targetPrice}`);
          // Disable after trigger to avoid spam
          // toggleAlert(alert.id);
        }
      }
    });
  }, [coins, alerts]);

  const addAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertPrice) return;
    
    const coin = coins?.find(c => c.id === newAlertCoin);
    const currentPrice = coin?.current_price || 0;
    const target = Number.parseFloat(newAlertPrice);
    const condition = target > currentPrice ? 'above' : 'below';

    const newAlert: PriceAlert = {
      id: crypto.randomUUID(),
      coinId: newAlertCoin,
      targetPrice: target,
      condition,
      isActive: true
    };

    setAlerts(prev => [...prev, newAlert]);
    setNewAlertPrice('');
    setIsFormOpen(false);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div
      className="p-6 rounded-2xl border backdrop-blur-xl"
      style={{
        ...cryptoTheme.effects.glass,
        borderColor: cryptoTheme.colors.border.primary,
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${cryptoTheme.colors.status.bullish}20` }}
          >
            <Bell className="w-5 h-5" style={{ color: cryptoTheme.colors.status.bullish }} />
          </div>
          <h3 className="text-lg font-bold" style={{ color: cryptoTheme.colors.text.primary }}>
            Alertas
          </h3>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
        >
          <Plus className="w-4 h-4 text-blue-400" />
        </button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={addAlert}
            className="mb-6 space-y-3 overflow-hidden"
          >
            <select
              value={newAlertCoin}
              onChange={(e) => setNewAlertCoin(e.target.value)}
              className="w-full p-2 rounded-lg bg-black/20 border border-white/10 text-sm"
            >
              {coins?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input
              type="number"
              value={newAlertPrice}
              onChange={(e) => setNewAlertPrice(e.target.value)}
              placeholder="Precio Objetivo ($)"
              className="w-full p-2 rounded-lg bg-black/20 border border-white/10 text-sm"
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg font-bold text-sm bg-blue-500 text-white"
            >
              Crear Alerta
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
        {alerts.length === 0 ? (
          <div className="text-center py-6 text-sm opacity-50">
            No tienes alertas activas
          </div>
        ) : (
          alerts.map(alert => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
            >
              <div>
                <div className="font-bold text-sm capitalize">{alert.coinId}</div>
                <div className="text-xs opacity-70">
                  {alert.condition === 'above' ? 'Subir de' : 'Bajar de'} {formatCurrency(alert.targetPrice)}
                </div>
              </div>
              <button
                onClick={() => removeAlert(alert.id)}
                className="p-2 hover:bg-red-500/20 rounded-lg group"
              >
                <Trash2 className="w-4 h-4 text-red-500 opacity-50 group-hover:opacity-100" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
