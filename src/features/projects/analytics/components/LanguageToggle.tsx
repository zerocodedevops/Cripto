import { Languages } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { technicalColors, technicalTypography } from '../utils/technicalTheme';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-4 h-4" style={{ color: technicalColors.electric.cyan }} />
      <div className="flex border" style={{ borderColor: technicalColors.grid.primary }}>
        <button
          type="button"
          onClick={() => setLanguage('es')}
          className="px-3 py-1.5 text-xs transition-all uppercase tracking-wider"
          style={{
            backgroundColor: language === 'es' ? technicalColors.electric.blue : 'transparent',
            color: language === 'es' ? '#ffffff' : technicalColors.electric.cyan,
            fontFamily: technicalTypography.fontFamily.mono,
            boxShadow: language === 'es' ? `0 0 10px ${technicalColors.electric.blue}40` : 'none',
          }}
        >
          ES
        </button>
        <div className="w-px" style={{ backgroundColor: technicalColors.grid.primary }}></div>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className="px-3 py-1.5 text-xs transition-all uppercase tracking-wider"
          style={{
            backgroundColor: language === 'en' ? technicalColors.electric.blue : 'transparent',
            color: language === 'en' ? '#ffffff' : technicalColors.electric.cyan,
            fontFamily: technicalTypography.fontFamily.mono,
            boxShadow: language === 'en' ? `0 0 10px ${technicalColors.electric.blue}40` : 'none',
          }}
        >
          EN
        </button>
      </div>
    </div>
  );
}
