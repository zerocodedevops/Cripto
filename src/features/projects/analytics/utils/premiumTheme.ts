// Premium Dashboard Theme - Inspired by modern, high-end analytics interfaces (e.g., Fitonist)
// Characterized by soft rounded corners, lavender accents, and elegant typography.

export const premiumColors = {
  // Sophisticated palette
  brand: {
    primary: '#B6A1E5',    // Lavender
    secondary: '#A8C69F',  // Mint/Sage
    tertiary: '#EBA896',   // Peach/Coral
    quaternary: '#F2D091', // Muted Yellow
  },
  
  // Neutral palette
  background: {
    primary: '#080808',    // Near black
    secondary: '#121212',  // Card background
    tertiary: '#1A1A1A',   // Surface/Elevated
    elevated: '#242424',   // Active items
  },
  
  // Accents & Indicators
  accent: {
    lavender: '#B6A1E5',
    sage: '#A8C69F',
    coral: '#EBA896',
    amber: '#F2D091',
    white: '#FFFFFF',
    grey: '#8E8E93',
  },
  
  // Opacity layers
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    heavy: 'rgba(255, 255, 255, 0.15)',
    lavender: 'rgba(182, 161, 229, 0.15)',
  }
};

export const premiumTypography = {
  // Clean Sans-serif
  fontFamily: {
    display: '"Outfit", "Inter", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"IBM Plex Mono", monospace',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    '4xl': '3rem',    // 48px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export const premiumLayout = {
  borderRadius: {
    sm: '12px',
    md: '20px',
    lg: '32px',
    full: '9999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  }
};

export const premiumEffects = {
  blur: 'blur(20px)',
  shadow: {
    sm: '0 4px 12px rgba(0, 0, 0, 0.5)',
    md: '0 8px 24px rgba(0, 0, 0, 0.7)',
    lg: '0 16px 48px rgba(0, 0, 0, 0.9)',
  },
  glassmorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  }
};

// Recharts theme (Premium style)
export const premiumChartTheme = {
  grid: {
    stroke: 'rgba(255, 255, 255, 0.05)',
    strokeDasharray: '0',
    strokeOpacity: 1,
  },
  axis: {
    stroke: '#8E8E93',
    fontSize: 12,
    fontFamily: premiumTypography.fontFamily.body,
    fontWeight: 400,
  },
  tooltip: {
    backgroundColor: '#1A1A1A',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '12px 16px',
    boxShadow: premiumEffects.shadow.lg,
  },
};
