import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { DashboardData } from '../types';
import { premiumColors, premiumTypography, premiumLayout, premiumEffects } from '../utils/premiumTheme';
import { useLanguage } from '../i18n/LanguageContext';

interface SmartInsightsProps {
  readonly data: DashboardData;
  readonly isLoading?: boolean;
}

interface Insight {
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  icon: typeof Lightbulb;
}

const generateInsights = (data: DashboardData, t: (key: string) => string): Insight[] => {
  const insights: Insight[] = [];
  const upTrends = Object.values(data.kpi).filter(kpi => kpi.trend === 'up').length;
  const downTrends = Object.values(data.kpi).filter(kpi => kpi.trend === 'down').length;

  if (upTrends >= 3) {
    insights.push({
      type: 'success',
      title: t('positiveMomentum'),
      description: `${upTrends} ${t('positiveMomentumDesc')}`,
      icon: TrendingUp,
    });
  }

  if (downTrends >= 2) {
    insights.push({
      type: 'warning',
      title: t('decliningMetrics'),
      description: `${downTrends} ${t('decliningMetricsDesc')}`,
      icon: TrendingDown,
    });
  }

  const funnelData = data.conversionFunnel;
  const highestDropOff = Math.max(...funnelData.map(step => step.dropOff || 0));
  const criticalStep = funnelData.find(step => step.dropOff === highestDropOff);

  if (highestDropOff > 30 && criticalStep) {
    insights.push({
      type: 'warning',
      title: t('highDropOff'),
      description: `${criticalStep.name}: ${highestDropOff}% ${t('highDropOffDesc')}`,
      icon: AlertTriangle,
    });
  }

  const mobileRevenue = data.revenueByDevice.find(d => d.device.toLowerCase().includes('mobile'));
  if (mobileRevenue && mobileRevenue.value > 60) {
    insights.push({
      type: 'info',
      title: t('mobileFirstAudience'),
      description: `${mobileRevenue.value}% ${t('mobileFirstAudienceDesc')}`,
      icon: Lightbulb,
    });
  }

  const recentSales = data.salesTrend.slice(-3);
  const avgRecent = recentSales.reduce((sum, item) => sum + item.sales, 0) / recentSales.length;
  const olderSales = data.salesTrend.slice(0, 3);
  const avgOlder = olderSales.reduce((sum, item) => sum + item.sales, 0) / olderSales.length;

  if (avgRecent > avgOlder * 1.2) {
    insights.push({
      type: 'success',
      title: t('acceleratingGrowth'),
      description: t('acceleratingGrowthDesc'),
      icon: TrendingUp,
    });
  }

  return insights;
};

export function SmartInsights({ data, isLoading = false }: SmartInsightsProps) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="mb-8 p-6 rounded-2xl border border-white/5 bg-white/5 animate-pulse h-48">
        <div className="h-6 w-1/3 bg-white/10 rounded mb-6" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-24 bg-white/10 rounded" />
          <div className="h-24 bg-white/10 rounded" />
          <div className="h-24 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  const insights = generateInsights(data, t);

  if (insights.length === 0) return null;

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'success':
        return premiumColors.brand.secondary;
      case 'warning':
        return premiumColors.brand.tertiary;
      case 'info':
        return premiumColors.brand.primary;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-8"
    >
      <div
        className="p-6"
        style={{
          ...premiumEffects.glassmorphism,
          borderRadius: premiumLayout.borderRadius.lg,
        }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-6 rounded-full" style={{ backgroundColor: premiumColors.brand.quaternary }}></div>
          <h3
            className="text-lg font-semibold tracking-tight"
            style={{
              color: premiumColors.accent.white,
              fontFamily: premiumTypography.fontFamily.display,
            }}
          >
            {t('smartInsights')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            const color = getInsightColor(insight.type);

            return (
              <motion.div
                key={`${insight.type}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex gap-4 p-4"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: premiumLayout.borderRadius.md,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: `${color}15`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    className="text-sm font-semibold mb-1"
                    style={{
                      color: premiumColors.accent.white,
                      fontFamily: premiumTypography.fontFamily.display,
                    }}
                  >
                    {insight.title}
                  </h4>
                  <p
                    className="text-xs leading-relaxed opacity-60"
                    style={{
                      color: premiumColors.accent.grey,
                      fontFamily: premiumTypography.fontFamily.body,
                    }}
                  >
                    {insight.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
