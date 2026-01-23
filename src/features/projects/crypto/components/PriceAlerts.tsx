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

  // Check alerts logic
  useEffect(() => {
    if (!coins) return;

    // Check permission on mount
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    alerts.forEach(alert => {
      if (!alert.isActive) return;
      const coin = coins.find(c => c.id === alert.coinId);

      if (coin) {
        const isAbove = alert.condition === 'above' && coin.current_price >= alert.targetPrice;
        const isBelow = alert.condition === 'below' && coin.current_price <= alert.targetPrice;

        if (isAbove || isBelow) {
          // Trigger notification
          if (Notification.permission === 'granted') {
            new Notification(`🚨 Alerta Crypto: ${coin.name}`, {
              body: `${coin.name} ha ${isAbove ? 'superado' : 'bajado de'} ${formatCurrency(alert.targetPrice)}. Precio actual: ${formatCurrency(coin.current_price)}`,
              icon: coin.image,
              silent: false,
            });
          }

          // Disable alert to prevent notification spam
          toggleAlert(alert.id);
        }
      }
    });
  }, [coins, alerts, formatCurrency]);

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(a =>
      a.id === id ? { ...a, isActive: !a.isActive } : a
    ));
  };

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
      {Notification.permission === 'denied' && (
        <div className="mb-4 text-xs text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
          ⚠️ Notificaciones bloqueadas. Habilítalas en tu navegador para recibir alertas.
        </div>
      )}

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
          onClick={() => {
            if (Notification.permission === 'default') {
              Notification.requestPermission();
            }
            setIsFormOpen(!isFormOpen);
          }}
          className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
          title={Notification.permission === 'granted' ? 'Crear Alerta' : 'Habilitar Notificaciones'}
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
              step="any"
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
              <div className="flex items-center">
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className={`mr-2 w-8 h-4 rounded-full transition-colors relative ${alert.isActive ? 'bg-green-500' : 'bg-gray-600'}`}
                  title={alert.isActive ? 'Desactivar' : 'Activar'}
                >
                  <div
                    className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all`}
                    style={{ left: alert.isActive ? '18px' : '2px' }}
                  />
                </button>
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="p-2 hover:bg-red-500/20 rounded-lg group"
                >
                  <Trash2 className="w-4 h-4 text-red-500 opacity-50 group-hover:opacity-100" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
