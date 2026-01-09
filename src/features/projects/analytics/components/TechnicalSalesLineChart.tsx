import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { SalesData } from '../types';
import { technicalColors, technicalChartTheme, technicalTypography } from '../utils/technicalTheme';
import { useLanguage } from '../i18n/LanguageContext';

interface TechnicalSalesLineChartProps {
  readonly data: SalesData[];
  readonly isLoading: boolean;
  readonly showComparison?: boolean;
  readonly onPointClick?: (label: string, value: number) => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#1a1f35] border p-3"
      style={{
        borderColor: technicalColors.electric.blue,
        boxShadow: `0 0 20px ${technicalColors.electric.blue}40`,
        fontFamily: technicalTypography.fontFamily.mono,
      }}
    >
      <p className="text-[10px] tracking-wider mb-2" style={{ color: technicalColors.electric.cyan }}>
        {label}
      </p>
      {payload.map((entry: any) => (
        <div key={`tooltip-${entry.name}`} className="flex items-center gap-2 mb-1">
          <div 
            className="w-2 h-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs font-bold text-white">
            {entry.name}: ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export function TechnicalSalesLineChart({ data, isLoading, showComparison, onPointClick }: TechnicalSalesLineChartProps) {
  const { t } = useLanguage();
  if (isLoading) {
    return (
      <div className="h-80 bg-[#1a1f35] border border-[#1e3a5f] animate-pulse" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      {/* Main card */}
      <div 
        className="relative overflow-hidden bg-[#1a1f35] border p-4"
        style={{
          borderColor: technicalColors.grid.primary,
          boxShadow: `inset 0 0 0 1px ${technicalColors.electric.blue}20`,
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-4" style={{ backgroundColor: technicalColors.electric.blue }}></div>
            <h3 
              className="text-sm font-bold tracking-wider uppercase"
              style={{ 
                color: '#ffffff',
                fontFamily: technicalTypography.fontFamily.display,
              }}
            >
              {t('salesTrendAnalysis')}
            </h3>
          </div>
          <div className="flex gap-3 text-[10px]" style={{ fontFamily: technicalTypography.fontFamily.mono }}>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2" style={{ backgroundColor: technicalColors.electric.blue }}></div>
              <span style={{ color: technicalColors.electric.cyan }}>{t('sales')}</span>
            </div>
            {showComparison && (
              <div className="flex items-center gap-1.5 opacity-50">
                <div className="w-2 h-2 border border-dashed" style={{ borderColor: technicalColors.electric.blue }}></div>
                <span style={{ color: technicalColors.electric.cyan }}>{t('prev')}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 ml-2">
              <div className="w-2 h-2" style={{ backgroundColor: technicalColors.electric.green }}></div>
              <span style={{ color: technicalColors.electric.cyan }}>{t('revenue')}</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={data}
              onClick={(e: any) => {
                if (e?.activeLabel && e?.activePayload?.[0]?.value && onPointClick) {
                  onPointClick(String(e.activeLabel), e.activePayload[0].value as number);
                }
              }}
              style={{ cursor: onPointClick ? 'pointer' : 'default' }}
            >
              <defs>
                <linearGradient id="salesGradientTech" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={technicalColors.electric.blue} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={technicalColors.electric.blue} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="revenueGradientTech" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={technicalColors.electric.green} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={technicalColors.electric.green} stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray={technicalChartTheme.grid.strokeDasharray}
                stroke={technicalChartTheme.grid.stroke}
                strokeOpacity={technicalChartTheme.grid.strokeOpacity}
                vertical={false}
              />
              
              <XAxis 
                dataKey="date" 
                stroke={technicalChartTheme.axis.stroke}
                fontSize={technicalChartTheme.axis.fontSize}
                fontFamily={technicalChartTheme.axis.fontFamily}
                tickLine={false}
                axisLine={{ stroke: technicalColors.grid.primary }}
                dy={8}
              />
              
              <YAxis 
                stroke={technicalChartTheme.axis.stroke}
                fontSize={technicalChartTheme.axis.fontSize}
                fontFamily={technicalChartTheme.axis.fontFamily}
                tickLine={false}
                axisLine={{ stroke: technicalColors.grid.primary }}
                tickFormatter={(value) => `$${value}`}
                dx={-8}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              {showComparison && (
                <>
                  <Area
                    type="monotone"
                    dataKey="previousSales"
                    name={`${t('prev')} ${t('sales')}`}
                    stroke={technicalColors.electric.blue}
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    fill="transparent"
                    animationDuration={1000}
                  />
                  <Area
                    type="monotone"
                    dataKey="previousRevenue"
                    name={`${t('prev')} ${t('revenue')}`}
                    stroke={technicalColors.electric.green}
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    fill="transparent"
                    animationDuration={1000}
                  />
                </>
              )}

              <Area
                type="monotone"
                dataKey="sales"
                name={t('sales')}
                stroke={technicalColors.electric.blue}
                strokeWidth={2}
                fill="url(#salesGradientTech)"
                animationDuration={1000}
                animationEasing="ease-out"
              />
              
              <Area
                type="monotone"
                dataKey="revenue"
                name={t('revenue')}
                stroke={technicalColors.electric.green}
                strokeWidth={2}
                fill="url(#revenueGradientTech)"
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(${technicalColors.grid.secondary} 1px, transparent 1px),
              linear-gradient(90deg, ${technicalColors.grid.secondary} 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        ></div>

        {/* Corner indicators */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l border-t" style={{ borderColor: technicalColors.electric.blue }}></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-r border-t" style={{ borderColor: technicalColors.electric.blue }}></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b" style={{ borderColor: technicalColors.electric.blue }}></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b" style={{ borderColor: technicalColors.electric.blue }}></div>
      </div>
    </motion.div>
  );
}
