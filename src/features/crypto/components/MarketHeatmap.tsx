import { useCryptoPrice } from '../hooks/useCryptoPrice';
import { Treemap, ResponsiveContainer } from 'recharts';
import { cryptoTheme } from '../utils/cryptoTheme';
import { formatPercentage } from '../utils/formatters';
import { useTranslation } from 'react-i18next';

export function MarketHeatmap() {
  const { t } = useTranslation();
  const { data, isLoading } = useCryptoPrice({ per_page: 50 });

  if (isLoading || !data) {
    return (
      <div
        className="h-96 rounded-2xl border backdrop-blur-xl animate-pulse"
        style={{
          ...cryptoTheme.effects.glass,
          borderColor: cryptoTheme.colors.border.primary,
        }}
      />
    );
  }

  const treeData = data.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    size: coin.market_cap,
    change: coin.price_change_percentage_24h,
    price: coin.current_price,
  }));

  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, change } = props;
    
    // Safe check for change value to prevent NaN
    const safeChange = (change === undefined || change === null || Number.isNaN(change)) ? 0 : change;
    const isPositive = safeChange >= 0;

    if (width < 40 || height < 40) return null;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: isPositive ? cryptoTheme.colors.status.bullish : cryptoTheme.colors.status.bearish,
            opacity: Math.min(Math.abs(safeChange) / 10, 0.9) || 0.5,
            stroke: cryptoTheme.colors.bg.primary,
            strokeWidth: 2,
          }}
        />
        <text
          x={x + width / 2}
          y={y + height / 2 - 10}
          textAnchor="middle"
          fill="white"
          fontSize={width > 80 ? 14 : 11}
          fontWeight="bold"
        >
          {name}
        </text>
        <text
          x={x + width / 2}
          y={y + height / 2 + 8}
          textAnchor="middle"
          fill="white"
          fontSize={width > 80 ? 12 : 9}
        >
          {formatPercentage(safeChange)}
        </text>
      </g>
    );
  };

  return (
    <div
      className="p-6 rounded-2xl border backdrop-blur-xl"
      style={{
        ...cryptoTheme.effects.glass,
        borderColor: cryptoTheme.colors.border.primary,
      }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold" style={{ color: cryptoTheme.colors.text.primary }}>
          {t('crypto.sections.marketHeatmap')}
        </h3>
        <p className="text-sm mt-1" style={{ color: cryptoTheme.colors.text.tertiary }}>
          {t('crypto.sections.heatmapSizeBy')} • {t('crypto.sections.heatmapColorBy')}
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height={320}>
          <Treemap
            data={treeData}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="none"
            fill={cryptoTheme.colors.primary.electric}
            content={<CustomizedContent />}
          />
        </ResponsiveContainer>
      </div>
    </div>
  );
}
