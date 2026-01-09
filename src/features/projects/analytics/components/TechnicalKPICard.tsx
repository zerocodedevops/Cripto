import { ArrowDown, ArrowUp, Minus, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { KPI } from '../types';
import { technicalColors, technicalTypography } from '../utils/technicalTheme';
import { useLanguage } from '../i18n/LanguageContext';

interface TechnicalKPICardProps {
  readonly kpi: KPI;
  readonly sparklineData?: number[];
  readonly isLoading?: boolean;
}

export function TechnicalKPICard({ kpi, sparklineData = [], isLoading }: TechnicalKPICardProps) {
  const { t } = useLanguage();
  if (isLoading) {
    return (
      <div className="relative overflow-hidden bg-[#1a1f35] border border-[#1e3a5f] p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-3 bg-[#1e3a5f]/50 w-1/2"></div>
          <div className="h-8 bg-[#1e3a5f]/50 w-3/4"></div>
          <div className="h-2 bg-[#1e3a5f]/50 w-1/3"></div>
        </div>
      </div>
    );
  }

  const getTrendColor = () => {
    if (kpi.trend === 'up') return technicalColors.status.success;
    if (kpi.trend === 'down') return technicalColors.status.error;
    return technicalColors.electric.cyan;
  };

  const getTrendIcon = () => {
    if (kpi.trend === 'up') return ArrowUp;
    if (kpi.trend === 'down') return ArrowDown;
    return Minus;
  };

  const TrendIcon = getTrendIcon();
  const trendColor = getTrendColor();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative"
    >
      {/* Terminal-style border with glow */}
      <div 
        className="absolute inset-0 border opacity-50 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          borderColor: trendColor,
          boxShadow: `0 0 10px ${trendColor}40`,
        }}
      ></div>
      
      {/* Main card */}
      <div 
        className="relative bg-[#1a1f35] p-4 overflow-hidden"
        style={{
          fontFamily: technicalTypography.fontFamily.body,
        }}
      >
        {/* Scanline effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 212, 255, 0.02) 50%)',
            backgroundSize: '100% 4px',
          }}
        ></div>

        {/* Corner indicators */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t" style={{ borderColor: trendColor }}></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t" style={{ borderColor: trendColor }}></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b" style={{ borderColor: trendColor }}></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b" style={{ borderColor: trendColor }}></div>

        {/* Header */}
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-3 h-3" style={{ color: trendColor }} />
              <p 
                className="text-[10px] font-medium tracking-widest uppercase"
                style={{ 
                  color: technicalColors.electric.cyan,
                  letterSpacing: '0.1em',
                }}
              >
                {kpi.title}
              </p>
            </div>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              <h3 
                className="text-3xl font-black tracking-tight"
                style={{ 
                  color: '#ffffff',
                  fontFamily: technicalTypography.fontFamily.display,
                  textShadow: `0 0 10px ${trendColor}60`,
                }}
              >
                {kpi.value}
              </h3>
            </motion.div>
          </div>

          {/* Trend indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
            className="flex items-center gap-1 px-2 py-1 border"
            style={{
              borderColor: trendColor,
              backgroundColor: `${trendColor}10`,
              color: trendColor,
            }}
          >
            <TrendIcon className="w-3 h-3" />
            <span className="text-xs font-bold" style={{ fontFamily: technicalTypography.fontFamily.mono }}>
              {Math.abs(kpi.change)}%
            </span>
          </motion.div>
        </div>

        {/* Sparkline */}
        {sparklineData.length > 0 && (
          <div className="mt-3 h-10 relative">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`tech-gradient-${kpi.title}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={trendColor} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={trendColor} stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                d={generateSparklinePath(sparklineData)}
                fill={`url(#tech-gradient-${kpi.title})`}
                stroke={trendColor}
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        )}

        {/* Status bar */}
        <div className="mt-3 flex items-center justify-between text-[10px]" style={{ color: technicalColors.electric.cyan }}>
          <span className="font-mono tracking-wider">{t('live')}</span>
          <div className="flex items-center gap-1">
            <div 
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: trendColor }}
            ></div>
            <span className="font-mono">{t('vsPrev')}</span>
          </div>
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
      </div>
    </motion.div>
  );
}

// Helper function to generate SVG path for sparkline
function generateSparklinePath(data: number[]): string {
  if (data.length === 0) return '';
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  });
  
  const pathData = points.map((point, index) => {
    return index === 0 ? `M ${point}` : `L ${point}`;
  }).join(' ');
  
  return `${pathData} L 100,100 L 0,100 Z`;
}
