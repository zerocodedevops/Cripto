import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { ConversionStep } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { premiumColors, premiumTypography, premiumLayout, premiumEffects, premiumChartTheme } from '../utils/premiumTheme';

interface PremiumRevenueBarChartProps {
  readonly data: ConversionStep[];
  readonly isLoading: boolean;
  readonly onBarClick?: (label: string, value: number) => void;
}

const PREMIUM_FUNNEL_COLORS = [
  premiumColors.brand.primary,
  premiumColors.brand.secondary,
  premiumColors.brand.tertiary,
  premiumColors.brand.quaternary,
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  
  return (
    <div 
      className="backdrop-blur-xl p-3 shadow-2xl"
      style={{
        backgroundColor: 'rgba(18, 18, 18, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: premiumLayout.borderRadius.md,
      }}
    >
      <p className="text-xs font-bold text-white mb-2">{data.name}</p>
      <div className="space-y-1">
        <p className="text-[10px]" style={{ color: premiumColors.accent.grey }}>
          COUNT: <span className="font-bold text-white">{data.count.toLocaleString()}</span>
        </p>
        {data.dropOff > 0 && (
          <p className="text-[10px]" style={{ color: premiumColors.brand.tertiary }}>
            DROP: <span className="font-bold">{data.dropOff}%</span>
          </p>
        )}
      </div>
    </div>
  );
};

export function PremiumRevenueBarChart({ data, isLoading, onBarClick }: PremiumRevenueBarChartProps) {
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

  const conversionRate = ((data[data.length - 1]?.count / data[0]?.count) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative p-6 h-full w-full min-w-0"
      style={{
        ...premiumEffects.glassmorphism,
        borderRadius: premiumLayout.borderRadius.lg,
      }}
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-6 rounded-full" style={{ backgroundColor: premiumColors.brand.tertiary }}></div>
          <h3 
            className="text-lg font-semibold tracking-tight"
            style={{ 
              color: premiumColors.accent.white,
              fontFamily: premiumTypography.fontFamily.display,
            }}
          >
            {t('conversionFunnel')}
          </h3>
        </div>
        
        <div 
          className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold"
          style={{
            backgroundColor: `${premiumColors.brand.secondary}15`,
            color: premiumColors.brand.secondary,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: premiumColors.brand.secondary }}></div>
          <span>{t('rate')}: {conversionRate}%</span>
        </div>
      </div>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={data} 
            layout="vertical" 
            margin={{ left: 0, right: 30 }}
            onClick={(e: any) => {
              if (e?.activeLabel && e?.activePayload?.[0]?.value && onBarClick) {
                onBarClick(e.activeLabel, e.activePayload[0].value as number);
              }
            }}
            style={{ cursor: onBarClick ? 'pointer' : 'default' }}
          >
            <CartesianGrid 
              strokeDasharray="0"
              stroke={premiumChartTheme.grid.stroke}
              horizontal={false}
            />
            
            <XAxis 
              type="number" 
              hide
            />
            
            <YAxis 
              dataKey="name" 
              type="category" 
              stroke={premiumChartTheme.axis.stroke}
              fontSize={10}
              fontFamily={premiumTypography.fontFamily.mono}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.03)', radius: 10 }} />
            
            <Bar 
              dataKey="count" 
              radius={[10, 10, 10, 10]}
              barSize={20}
              animationDuration={1500}
              background={{ fill: 'rgba(255, 255, 255, 0.05)', radius: 10 }}
            >
              {data.map((_entry, index) => (
                <motion.rect
                  key={`cell-bar-${_entry.name}`} 
                  fill={PREMIUM_FUNNEL_COLORS[index % PREMIUM_FUNNEL_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
