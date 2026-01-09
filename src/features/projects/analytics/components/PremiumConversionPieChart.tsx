import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { RevenueData } from '../types';
import { premiumColors, premiumTypography, premiumLayout, premiumEffects } from '../utils/premiumTheme';
import { useLanguage } from '../i18n/LanguageContext';

interface PremiumConversionPieChartProps {
  readonly data: RevenueData[];
  readonly isLoading: boolean;
  readonly onSliceClick?: (label: string, value: number) => void;
}

const PREMIUM_VIBRANT_COLORS = [
  premiumColors.brand.primary,
  premiumColors.brand.secondary,
  premiumColors.brand.tertiary,
  premiumColors.brand.quaternary,
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div 
      className="backdrop-blur-xl p-3 shadow-2xl"
      style={{
        backgroundColor: 'rgba(18, 18, 18, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: premiumLayout.borderRadius.md,
      }}
    >
      <p className="text-xs font-bold text-white mb-1">{payload[0].name}</p>
      <p className="text-[10px]" style={{ color: payload[0].fill }}>
        {payload[0].value}% TOTAL
      </p>
    </div>
  );
};

const DEVICE_LABELS: Record<string, string> = {
  'Mobile': 'Mobile Sales',
  'Desktop': 'Desktop Performance',
  'Tablet': 'Tablet Activity',
  'Other': 'Other Sources'
};

const RenderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any) => (
        <li key={`legend-${entry.value}`} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: premiumColors.accent.grey }}>
            {DEVICE_LABELS[entry.value] || entry.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

export function PremiumConversionPieChart({ data, isLoading, onSliceClick }: PremiumConversionPieChartProps) {
  const { t } = useLanguage();
  
  if (isLoading) {
    return (
      <div 
        className="h-80 animate-pulse" 
        style={{ 
          ...premiumEffects.glassmorphism,
          borderRadius: premiumLayout.borderRadius.lg 
        }} 
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative p-6 flex flex-col h-full w-full min-w-0"
      style={{
        ...premiumEffects.glassmorphism,
        borderRadius: premiumLayout.borderRadius.lg,
      }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-1 h-6 rounded-full" style={{ backgroundColor: premiumColors.brand.secondary }}></div>
        <h3 
          className="text-lg font-semibold tracking-tight"
          style={{ 
            color: premiumColors.accent.white,
            fontFamily: premiumTypography.fontFamily.display,
          }}
        >
          {t('deviceDistribution')}
        </h3>
      </div>
      
      <div className="w-full">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
              stroke="none"
              onClick={(e: any) => {
                if (e?.name && e?.value && onSliceClick) {
                  onSliceClick(e.name, e.value);
                }
              }}
              nameKey="device"
              style={{ cursor: onSliceClick ? 'pointer' : 'default' }}
            >
              {data.map((entry) => (
                <Cell 
                  key={`cell-premium-${entry.device}`} 
                  fill={PREMIUM_VIBRANT_COLORS[data.indexOf(entry) % PREMIUM_VIBRANT_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<RenderLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center transform -mt-2">
         <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: premiumColors.accent.grey, fontFamily: premiumTypography.fontFamily.display }}>
            {t('all')}
         </p>
         <p className="text-2xl font-bold" style={{ color: premiumColors.accent.white }}>1.2M€</p>
      </div>
    </motion.div>
  );
}
