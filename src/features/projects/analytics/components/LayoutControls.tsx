import { Settings2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { premiumColors, premiumTypography, premiumLayout, premiumEffects } from '../utils/premiumTheme';
import { useLanguage } from '../i18n/LanguageContext';

interface LayoutControlsProps {
  readonly visibleWidgets: string[];
  readonly onToggleWidget: (id: string) => void;
}

const WIDGETS = [
  { id: 'insights', label: 'smartInsights' },
  { id: 'kpis', label: 'KPI Stats' },
  { id: 'salesTrend', label: 'salesTrendAnalysis' },
  { id: 'deviceDist', label: 'deviceDistribution' },
  { id: 'funnel', label: 'conversionFunnel' },
];

export function LayoutControls({ visibleWidgets, onToggleWidget }: LayoutControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-white/5 transition-all duration-300 rounded-full"
      >
        <Settings2 className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} style={{ color: isOpen ? premiumColors.brand.primary : premiumColors.accent.grey }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-3 z-[100] min-w-[240px] p-6"
            style={{
              ...premiumEffects.glassmorphism,
              backgroundColor: 'rgba(18, 18, 18, 0.9)',
              borderRadius: premiumLayout.borderRadius.lg,
              boxShadow: premiumEffects.shadow.lg,
            }}
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <div className="w-1 h-4 rounded-full" style={{ backgroundColor: premiumColors.brand.primary }}></div>
              <p className="text-xs font-bold tracking-widest uppercase">
                {t('customize')}
              </p>
            </div>

            <div className="space-y-1">
              {WIDGETS.map((widget) => {
                const isVisible = visibleWidgets.includes(widget.id);
                return (
                  <button
                    key={widget.id}
                    onClick={() => onToggleWidget(widget.id)}
                    className="w-full flex items-center justify-between group p-3 rounded-2xl hover:bg-white/5 transition-all"
                  >
                    <span 
                      className="text-xs font-medium transition-colors"
                      style={{ color: isVisible ? premiumColors.accent.white : premiumColors.accent.grey }}
                    >
                      {t(widget.label as any) || widget.label}
                    </span>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5">
                      {isVisible ? (
                        <Eye className="w-4 h-4" style={{ color: premiumColors.brand.primary }} />
                      ) : (
                        <EyeOff className="w-4 h-4 opacity-30" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 text-[8px] opacity-20 uppercase tracking-widest text-center border-t border-white/5">
               Dashboard Layout Config v2
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
