import { DateRange, Segment } from '../types';
import { DateRangePicker } from './DateRangePicker';
import { LayoutControls } from './LayoutControls';
import { ExportMenu } from './ExportMenu';
import { premiumColors, premiumTypography, premiumLayout, premiumEffects } from '../utils/premiumTheme';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import { useLanguage } from '../i18n/LanguageContext';

interface DashboardFilterProps {
  readonly range: DateRange;
  readonly segment: Segment;
  readonly showComparison: boolean;
  readonly visibleWidgets: string[];
  readonly onRangeChange: (range: DateRange) => void;
  readonly onSegmentChange: (segment: Segment) => void;
  readonly onComparisonToggle: (enabled: boolean) => void;
  readonly onToggleWidget: (id: string) => void;
}

export function DashboardFilter({ 
  range, 
  segment, 
  visibleWidgets,
  onRangeChange, 
  onSegmentChange,
  onToggleWidget 
}: DashboardFilterProps) {
  const { t } = useLanguage();
  const { data } = useDashboardMetrics({ range, segment });

  const handleDateRangeSelect = (start: Date, end: Date) => {
    const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 7) onRangeChange('7d');
    else if (daysDiff <= 30) onRangeChange('30d');
    else onRangeChange('90d');
  };

  const getCurrentDateRange = () => {
    const end = new Date();
    const start = new Date();
    switch (range) {
      case '7d': start.setDate(start.getDate() - 7); break;
      case '30d': start.setDate(start.getDate() - 30); break;
      case '90d': start.setDate(start.getDate() - 90); break;
    }
    return { start, end };
  };

  const handleExportCSV = () => { if (data) exportToCSV(data); };
  const handleExportPDF = () => { if (data) exportToPDF(data); };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-2 transition-all"
      style={{
        ...premiumEffects.glassmorphism,
        borderRadius: premiumLayout.borderRadius.full,
        paddingLeft: '1.5rem',
        paddingRight: '0.5rem',
      }}
    >
      <div className="flex flex-wrap items-center gap-6">
        {/* Date Range Picker */}
        <DateRangePicker 
          currentRange={getCurrentDateRange()}
          onRangeSelect={handleDateRangeSelect}
        />

        {/* Segment Filter */}
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 p-1 rounded-full border border-white/5">
            {(['all', 'mobile', 'desktop'] as Segment[]).map((seg) => (
              <button
                key={seg}
                type="button"
                onClick={() => onSegmentChange(seg)}
                className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300"
                style={{
                  backgroundColor: segment === seg ? premiumColors.brand.primary : 'transparent',
                  color: segment === seg ? '#000' : premiumColors.accent.grey,
                  boxShadow: segment === seg ? premiumEffects.shadow.sm : 'none',
                }}
              >
                {t(seg)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Layout Customization */}
        <LayoutControls 
          visibleWidgets={visibleWidgets}
          onToggleWidget={onToggleWidget}
        />

        {/* Export Menu */}
        <ExportMenu 
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
        />
      </div>
    </div>
  );
}
