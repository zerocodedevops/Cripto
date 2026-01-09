import { useMemo, useState } from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useMarketChart } from '../hooks/useMarketChart';
import { formatPercentage } from '../utils/formatters';
import { useCurrencyFormat } from '../hooks/useCurrencyFormat';
import { cryptoTheme } from '../utils/cryptoTheme';
import { useTranslation } from 'react-i18next';

interface PriceChartProps {
  readonly coinId: string;
  readonly coinName: string;
  readonly currentPrice: number;
  readonly priceChange24h: number;
}

export function PriceChart({ coinId, coinName, currentPrice, priceChange24h }: PriceChartProps) {
  const { t } = useTranslation();
  const { formatCurrency } = useCurrencyFormat();
  const [days, setDays] = useState<string>('7');
  const { data, isLoading } = useMarketChart(coinId, days);

  const chartData = useMemo(() => {
    return data?.prices?.map(([timestamp, price]) => ({
      timestamp,
      date: new Date(timestamp).toLocaleDateString(),
      price: price,
    })) ?? [];
  }, [data]);

  const timeframes = [
    { label: '24H', value: '1' },
    { label: '7D', value: '7' },
    { label: '30D', value: '30' },
    { label: '90D', value: '90' },
    { label: '1Y', value: '365' },
  ];

  const isPositive = priceChange24h >= 0;

  if (isLoading) {
    return (
      <div
        className="p-8 rounded-2xl border backdrop-blur-xl h-96 animate-pulse"
        style={{
          ...cryptoTheme.effects.glass,
          borderColor: cryptoTheme.colors.border.primary,
        }}
      />
    );
  }

  return (
    <div
      className="p-6 rounded-2xl border backdrop-blur-xl h-full flex flex-col"
      style={{
        ...cryptoTheme.effects.glass,
        borderColor: cryptoTheme.colors.border.primary,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold mb-1" style={{ color: cryptoTheme.colors.text.primary }}>
            {t('crypto.sections.priceChart')} - {coinName}
          </h3>
          <div className="flex items-baseline gap-3">
            <p className="text-2xl font-bold" style={{ color: cryptoTheme.colors.text.primary }}>
              {formatCurrency(currentPrice)}
            </p>
            <div
              className="flex items-center gap-1 text-sm font-medium"
              style={{ color: isPositive ? cryptoTheme.colors.status.bullish : cryptoTheme.colors.status.bearish }}
            >
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {formatPercentage(priceChange24h)}
            </div>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setDays(tf.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/10"
              style={{
                background: days === tf.value ? cryptoTheme.colors.primary.electric : 'transparent',
                color: days === tf.value ? 'white' : cryptoTheme.colors.text.secondary,
                border: '1px solid',
                borderColor: days === tf.value ? cryptoTheme.colors.primary.electric : cryptoTheme.colors.border.secondary,
              }}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isPositive ? cryptoTheme.colors.status.bullish : cryptoTheme.colors.status.bearish}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={isPositive ? cryptoTheme.colors.status.bullish : cryptoTheme.colors.status.bearish}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke={cryptoTheme.colors.text.tertiary}
              style={{ fontSize: '12px' }}
              tickLine={false}
            />
            <YAxis
              stroke={cryptoTheme.colors.text.tertiary}
              style={{ fontSize: '12px' }}
              tickLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                background: cryptoTheme.colors.bg.tertiary,
                border: `1px solid ${cryptoTheme.colors.border.primary}`,
                borderRadius: '12px',
                padding: '8px 12px',
              }}
              labelStyle={{ color: cryptoTheme.colors.text.secondary }}
              itemStyle={{ color: cryptoTheme.colors.text.primary }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? cryptoTheme.colors.status.bullish : cryptoTheme.colors.status.bearish}
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
