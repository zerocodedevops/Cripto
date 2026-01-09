import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useCryptoPrice } from '../hooks/useCryptoPrice';
import { useWebSocketPrice } from '../hooks/useWebSocketPrice';
import { formatPercentage } from '../utils/formatters';
import { useCurrencyFormat } from '../hooks/useCurrencyFormat';
import { cryptoTheme } from '../utils/cryptoTheme';
import { useWatchlist } from '../context/WatchlistContext';
import { Star } from 'lucide-react';

const USE_WEBSOCKET = import.meta.env.VITE_USE_WEBSOCKET === 'true';
const WS_COINS = ['bitcoin', 'ethereum', 'cardano', 'solana', 'polkadot', 'dogecoin', 'avalanche', 'chainlink', 'polygon', 'litecoin'];

export function CryptoTicker() {
  const { formatCurrency } = useCurrencyFormat();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  
  // Use all coins for ticker, handled by global singleton
  const wsData = useWebSocketPrice({ coingeckoIds: WS_COINS, enabled: USE_WEBSOCKET });
  const rqData = useCryptoPrice({ per_page: 20 });
  
  const { data } = USE_WEBSOCKET ? wsData : rqData;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev - 0.3) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  const doubledData = [...data, ...data]; // Duplicate for infinite scroll

  return (
    <div
      className="w-full overflow-hidden py-4 border-b"
      style={{
        background: cryptoTheme.colors.bg.secondary,
        borderColor: cryptoTheme.colors.border.primary,
      }}
    >
      <motion.div
        className="flex gap-8"
        animate={{ x: `${offset}%` }}
        transition={{ ease: 'linear', duration: 0 }}
      >
        {doubledData.map((coin, index) => {
          const isPositive = coin.price_change_percentage_24h >= 0;
          
          // Generate a consistent color based on coin symbol
          const getColorForCoin = () => {
            const colors = [
              '#F7931A', // Bitcoin orange
              '#627EEA', // Ethereum blue
              '#26A17B', // Tether green
              '#F3BA2F', // BNB yellow
              '#14F195', // Solana green
              '#2775CA', // USDC blue
              '#0033AD', // Cardano blue
              '#C3A634', // Dogecoin gold
              '#EB0029', // TRON red
              '#E84142', // Avalanche red
            ];
            return colors[index % 10] || '#666';
          };

          return (
            <div key={`${coin.id}-${index}`} className="flex items-center gap-3 min-w-max">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  isInWatchlist(coin.id) ? removeFromWatchlist(coin.id) : addToWatchlist(coin.id);
                }}
                className="hover:scale-110 transition-transform"
              >
                <Star 
                  className="w-4 h-4 cursor-pointer" 
                  style={{ 
                    color: isInWatchlist(coin.id) ? '#fbbf24' : cryptoTheme.colors.text.tertiary,
                    fill: isInWatchlist(coin.id) ? '#fbbf24' : 'none' 
                  }} 
                />
              </button>
              {/* Colored circle with coin initial */}
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ 
                  backgroundColor: getColorForCoin(),
                  color: 'white'
                }}
              >
                {coin.symbol.charAt(0).toUpperCase()}
              </div>
              <span className="font-bold text-sm" style={{ color: cryptoTheme.colors.text.primary }}>
                {coin.symbol.toUpperCase()}
              </span>
              <span className="text-sm" style={{ color: cryptoTheme.colors.text.secondary }}>
                {formatCurrency(coin.current_price)}
              </span>
              <span
                className="text-xs font-medium"
                style={{
                  color: isPositive ? cryptoTheme.colors.status.bullish : cryptoTheme.colors.status.bearish,
                }}
              >
                {formatPercentage(coin.price_change_percentage_24h)}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
