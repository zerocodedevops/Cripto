import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';
import { formatPercentage } from '../utils/formatters';
import { useCurrencyFormat } from '../hooks/useCurrencyFormat';
import { cryptoTheme } from '../utils/cryptoTheme';
import { useTranslation } from 'react-i18next';

export function MarketOverview() {
  const { t } = useTranslation();
  const { formatLargeNumber } = useCurrencyFormat();
  const { data, isLoading } = useMarketData();

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {new Array(4).fill(0).map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className="h-32 rounded-2xl animate-pulse"
            style={{ ...cryptoTheme.effects.glass, background: cryptoTheme.colors.bg.card }}
          />
        ))}
      </div>
    );
  }

  const globalData = data.data;
  const totalMarketCap = globalData.total_market_cap.usd;
  const totalVolume = globalData.total_volume.usd;
  const btcDominance = globalData.market_cap_percentage.btc;
  const ethDominance = globalData.market_cap_percentage.eth;
  const marketCapChange = globalData.market_cap_change_percentage_24h_usd;

  const stats = [
    {
      label: t('crypto.stats.marketCap'),
      value: formatLargeNumber(totalMarketCap),
      change: marketCapChange,
      icon: DollarSign,
      color: cryptoTheme.colors.primary.electric,
    },
    {
      label: t('crypto.stats.volume24h'),
      value: formatLargeNumber(totalVolume),
      icon: Activity,
      color: cryptoTheme.colors.primary.neon,
    },
    {
      label: t('crypto.stats.btcDominance'),
      value: `${btcDominance.toFixed(2)}%`,
      icon: TrendingUp,
      color: cryptoTheme.colors.status.bullish,
    },
    {
      label: t('crypto.stats.ethDominance'),
      value: `${ethDominance.toFixed(2)}%`,
      icon: TrendingUp,
      color: cryptoTheme.colors.chart.secondary,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl border backdrop-blur-xl cursor-pointer hover:scale-105 transition-transform"
            style={{
              ...cryptoTheme.effects.glass,
              borderColor: cryptoTheme.colors.border.primary,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${stat.color}20`,
                }}
              >
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              {stat.change !== undefined && (
                <div
                  className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg"
                  style={{
                    color: stat.change >= 0 ? cryptoTheme.colors.status.bullish : cryptoTheme.colors.status.bearish,
                    background: stat.change >= 0 ? `${cryptoTheme.colors.status.bullish}20` : `${cryptoTheme.colors.status.bearish}20`,
                  }}
                >
                  {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {formatPercentage(stat.change)}
                </div>
              )}
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: cryptoTheme.colors.text.tertiary }}>
                {stat.label}
              </p>
              <p className="text-2xl font-bold" style={{ color: cryptoTheme.colors.text.primary }}>
                {stat.value}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
