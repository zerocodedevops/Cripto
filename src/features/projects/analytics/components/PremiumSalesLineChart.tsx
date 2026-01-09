import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { motion } from 'framer-motion';
import { SalesData } from '../types';
import { premiumColors, premiumTypography, premiumLayout, premiumEffects, premiumChartTheme } from '../utils/premiumTheme';
import { useLanguage } from '../i18n/LanguageContext';

interface PremiumSalesLineChartProps {
  readonly data: SalesData[];
  readonly isLoading: boolean;
  readonly showComparison?: boolean;
  readonly onPointClick?: (label: string, value: number) => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {

    return (
      <div 
        className="p-4 rounded-2xl border border-white/10 shadow-2xl space-y-3"
        style={{ backgroundColor: 'rgba(26, 26, 26, 0.95)', backdropFilter: 'blur(10px)' }}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any) => (
            <div key={`tooltip-${entry.dataKey}`} className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-xs font-medium opacity-70">{entry.name}</span>
              </div>
              <span className="text-xs font-bold">{entry.value.toLocaleString()}€</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function PremiumSalesLineChart({ data, isLoading, showComparison, onPointClick }: PremiumSalesLineChartProps) {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative p-6 w-full min-w-0"
      style={{
        ...premiumEffects.glassmorphism,
        borderRadius: premiumLayout.borderRadius.lg,
      }}
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
           <div className="w-1 h-6 rounded-full" style={{ backgroundColor: premiumColors.brand.primary }}></div>
           <h3 
             className="text-lg font-semibold tracking-tight"
             style={{ 
               color: premiumColors.accent.white,
               fontFamily: premiumTypography.fontFamily.display,
             }}
           >
             {t('salesTrendAnalysis')}
           </h3>
        </div>
        
        <div className="flex gap-4">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: premiumColors.brand.primary }}></div>
              <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: premiumColors.accent.grey }}>{t('sales')}</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: premiumColors.brand.tertiary }}></div>
              <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: premiumColors.accent.grey }}>{t('revenue')}</span>
           </div>
        </div>
      </div>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart 
            data={data}
            onClick={(e: any) => {
              if (e?.activeLabel && e?.activePayload?.[0]?.value && onPointClick) {
                onPointClick(String(e.activeLabel), e.activePayload[0].value as number);
              }
            }}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="premiumSalesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={premiumColors.brand.primary} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={premiumColors.brand.primary} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="premiumRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={premiumColors.brand.tertiary} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={premiumColors.brand.tertiary} stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray={premiumChartTheme.grid.strokeDasharray}
              stroke={premiumChartTheme.grid.stroke}
              vertical={false}
            />
            
            <XAxis 
              dataKey="date" 
              stroke={premiumChartTheme.axis.stroke}
              fontSize={premiumChartTheme.axis.fontSize}
              fontFamily={premiumChartTheme.axis.fontFamily}
              tickLine={false}
              axisLine={false}
              dy={15}
            />
            
            <YAxis 
              stroke={premiumChartTheme.axis.stroke}
              fontSize={premiumChartTheme.axis.fontSize}
              fontFamily={premiumChartTheme.axis.fontFamily}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${(val / 1000)}k€`}
              dx={-10}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {showComparison && (
              <>
                <Area
                  type="monotone"
                  dataKey="previousSales"
                  stroke={premiumColors.brand.primary}
                  strokeWidth={2}
                  strokeDasharray="8 8"
                  fill="transparent"
                  opacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="previousRevenue"
                  stroke={premiumColors.brand.tertiary}
                  strokeWidth={2}
                  strokeDasharray="8 8"
                  fill="transparent"
                  opacity={0.3}
                />
              </>
            )}

            <Area
              type="monotone"
              dataKey="sales"
              name={t('sales')}
              stroke={premiumColors.brand.primary}
              strokeWidth={4}
              fill="url(#premiumSalesGradient)"
              dot={{ r: 0, fill: premiumColors.brand.primary, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, fill: premiumColors.brand.primary, strokeWidth: 3, stroke: '#fff' }}
              animationDuration={1500}
            />
            
            <Area
              type="monotone"
              dataKey="revenue"
              name={t('revenue')}
              stroke={premiumColors.brand.tertiary}
              strokeWidth={4}
              fill="url(#premiumRevenueGradient)"
              dot={{ r: 0, fill: premiumColors.brand.tertiary, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, fill: premiumColors.brand.tertiary, strokeWidth: 3, stroke: '#fff' }}
              animationDuration={1800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
