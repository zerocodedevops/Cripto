import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import { ConversionStep } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { technicalColors, technicalChartTheme, technicalTypography } from '../utils/technicalTheme';

interface TechnicalRevenueBarChartProps {
  readonly data: ConversionStep[];
  readonly isLoading: boolean;
  readonly onBarClick?: (label: string, value: number) => void;
}

const FUNNEL_COLORS = [
  technicalColors.electric.green,
  technicalColors.electric.blue,
  technicalColors.electric.cyan,
  technicalColors.electric.amber,
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  
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
      <p className="text-xs font-bold text-white mb-2">{data.name}</p>
      <div className="space-y-1">
        <p className="text-[10px]" style={{ color: technicalColors.electric.cyan }}>
          COUNT: <span className="font-bold text-white">{data.count.toLocaleString()}</span>
        </p>
        {data.dropOff > 0 && (
          <p className="text-[10px]" style={{ color: technicalColors.status.error }}>
            DROP: <span className="font-bold">{data.dropOff}%</span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export function TechnicalRevenueBarChart({ data, isLoading, onBarClick }: TechnicalRevenueBarChartProps) {
  const { t } = useLanguage();
  if (isLoading) {
    return (
      <div className="h-80 bg-[#1a1f35] border border-[#1e3a5f] animate-pulse" />
    );
  }

  const conversionRate = ((data[data.length - 1]?.count / data[0]?.count) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="relative group"
    >
      {/* Main card */}
      <div 
        className="relative overflow-hidden bg-[#1a1f35] border p-4"
        style={{
          borderColor: technicalColors.grid.primary,
          boxShadow: `inset 0 0 0 1px ${technicalColors.electric.amber}20`,
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-4" style={{ backgroundColor: technicalColors.electric.amber }}></div>
            <h3 
              className="text-sm font-bold tracking-wider uppercase"
              style={{ 
                color: '#ffffff',
                fontFamily: technicalTypography.fontFamily.display,
              }}
            >
              {t('conversionFunnel')}
            </h3>
          </div>
          <div 
            className="flex items-center gap-2 text-[10px] px-2 py-1 border"
            style={{
              borderColor: technicalColors.electric.green,
              color: technicalColors.electric.green,
              fontFamily: technicalTypography.fontFamily.mono,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: technicalColors.electric.green }}></div>
            <span>{t('rate')}: {conversionRate}%</span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              layout="vertical" 
              margin={{ left: 20 }}
              onClick={(e: any) => {
                if (e?.activeLabel && e?.activePayload?.[0]?.value && onBarClick) {
                  onBarClick(e.activeLabel, e.activePayload[0].value as number);
                }
              }}
              style={{ cursor: onBarClick ? 'pointer' : 'default' }}
            >
              <CartesianGrid 
                strokeDasharray={technicalChartTheme.grid.strokeDasharray}
                stroke={technicalChartTheme.grid.stroke}
                strokeOpacity={0.3}
                horizontal={false}
              />
              
              <XAxis 
                type="number" 
                stroke={technicalChartTheme.axis.stroke}
                fontSize={technicalChartTheme.axis.fontSize}
                fontFamily={technicalChartTheme.axis.fontFamily}
                tickLine={false}
                axisLine={{ stroke: technicalColors.grid.primary }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke={technicalChartTheme.axis.stroke}
                fontSize={technicalChartTheme.axis.fontSize}
                fontFamily={technicalChartTheme.axis.fontFamily}
                tickLine={false}
                axisLine={{ stroke: technicalColors.grid.primary }}
                width={100}
              />
              
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 212, 255, 0.05)' }} />
              
              <Bar 
                dataKey="count" 
                radius={[0, 0, 0, 0]}
                barSize={28}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((entry) => (
                  <Cell 
                    key={`cell-bar-${entry.name}`} 
                    fill={FUNNEL_COLORS[data.indexOf(entry) % FUNNEL_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
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
        <div className="absolute top-0 left-0 w-3 h-3 border-l border-t" style={{ borderColor: technicalColors.electric.amber }}></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-r border-t" style={{ borderColor: technicalColors.electric.amber }}></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b" style={{ borderColor: technicalColors.electric.amber }}></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b" style={{ borderColor: technicalColors.electric.amber }}></div>
      </div>
    </motion.div>
  );
}
