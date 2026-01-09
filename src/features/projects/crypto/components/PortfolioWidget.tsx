import { useState } from 'react';
import { Wallet, TrendingUp, Plus } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useCurrencyFormat } from '../hooks/useCurrencyFormat';
import { cryptoTheme } from '../utils/cryptoTheme';
import { TransactionModal } from './TransactionModal';

export function PortfolioWidget() {
  const { holdings, totalInvested, addTransaction } = usePortfolio();
  const { formatCurrency } = useCurrencyFormat();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Calculate PnL (Mocked projection for now as we transition to real data)
  // In a real scenario we would pass current prices to the context or calculating here
  const currentTotalValue = totalInvested > 0 ? totalInvested * 1.12 : 0; 
  const pnl = currentTotalValue - totalInvested;
  const pnlPercentage = totalInvested > 0 ? (pnl / totalInvested) * 100 : 0;

  return (
    <>
      <div
        className="p-6 rounded-2xl border backdrop-blur-xl relative overflow-hidden"
        style={{
          ...cryptoTheme.effects.glass,
          borderColor: cryptoTheme.colors.border.primary,
        }}
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Wallet className="w-24 h-24" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: cryptoTheme.colors.text.primary }}>
              <Wallet className="w-5 h-5 text-blue-500" />
              Mi Portfolio
              </h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                title="Añadir Transacción"
              >
                  <Plus className="w-4 h-4 text-blue-400" />
              </button>
          </div>

          <div className="mb-4">
              <div className="text-sm mb-1" style={{ color: cryptoTheme.colors.text.secondary }}>
                  Valor Invertido
              </div>
              <div className="text-2xl font-bold" style={{ color: cryptoTheme.colors.text.primary }}>
                  {formatCurrency(totalInvested)}
              </div>
          </div>

          <div className="flex items-center gap-2 text-sm p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500 font-bold">
                  +{formatCurrency(pnl)} ({pnlPercentage.toFixed(2)}%)
              </span>
          </div>

          <div className="mt-4 space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
              {holdings.length === 0 ? (
                  <div className="text-center py-4 text-sm opacity-50">
                      No tienes activos añadidos
                  </div>
              ) : (
                  holdings.map(h => (
                      <div key={h.id} className="flex justify-between text-sm py-2 border-b border-white/5 last:border-0 hover:bg-white/5 p-2 rounded-lg transition-colors">
                          <span className="font-medium capitalize">{h.id}</span>
                          <span className="opacity-70">{h.amount.toFixed(4)} {h.id.substring(0,3).toUpperCase()}</span>
                      </div>
                  ))
              )}
          </div>
        </div>
      </div>

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addTransaction}
      />
    </>
  );
}
