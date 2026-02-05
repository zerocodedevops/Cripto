// Technical Dashboard Theme - Unique Visual Identity
// Inspired by: Industrial monitoring, Terminal UIs, Electric circuits

export const technicalColors = {
	// Electric/Neon palette
	electric: {
		blue: "#00d4ff", // Bright electric blue
		cyan: "#00ffff", // Neon cyan
		green: "#00ff88", // Matrix green
		amber: "#ffaa00", // Warning amber
		red: "#ff0055", // Alert red
		purple: "#aa00ff", // Electric purple
	},

	// Dark technical background
	background: {
		primary: "#0a0e1a", // Deep space blue
		secondary: "#111827", // Dark slate
		tertiary: "#1a1f35", // Card background
		elevated: "#1f2937", // Elevated surfaces
	},

	// Grid and borders
	grid: {
		primary: "#1e3a5f", // Electric blue grid
		secondary: "#1a2942", // Subtle grid
		glow: "rgba(0, 212, 255, 0.3)", // Grid glow
	},

	// Semantic colors (different from portfolio)
	status: {
		success: "#00ff88",
		warning: "#ffaa00",
		error: "#ff0055",
		info: "#00d4ff",
	},

	// Chart palette (electric theme)
	charts: {
		primary: ["#00d4ff", "#0099ff"],
		secondary: ["#00ff88", "#00cc66"],
		tertiary: ["#aa00ff", "#8800cc"],
		quaternary: ["#ffaa00", "#ff8800"],
	},
};

export const technicalTypography = {
	// Technical/Monospace fonts
	fontFamily: {
		display: '"Orbitron", "Rajdhani", sans-serif', // Futuristic display
		body: '"IBM Plex Mono", "Fira Code", monospace', // Technical mono
		mono: '"JetBrains Mono", "Courier New", monospace', // Code/data
	},
	fontSize: {
		xs: "0.625rem", // 10px - tiny labels
		sm: "0.75rem", // 12px - small text
		base: "0.875rem", // 14px - body (smaller than portfolio)
		lg: "1rem", // 16px - large text
		xl: "1.25rem", // 20px - headings
		"2xl": "1.75rem", // 28px - big numbers
		"3xl": "2.5rem", // 40px - hero numbers
	},
	fontWeight: {
		light: 300,
		normal: 400,
		medium: 500,
		bold: 700,
		black: 900,
	},
	letterSpacing: {
		tight: "-0.025em",
		normal: "0",
		wide: "0.05em",
		wider: "0.1em",
	},
};

export const technicalSpacing = {
	// Tighter spacing than portfolio
	xs: "0.25rem", // 4px
	sm: "0.5rem", // 8px
	md: "0.75rem", // 12px (vs 16px in portfolio)
	lg: "1rem", // 16px (vs 24px in portfolio)
	xl: "1.5rem", // 24px (vs 32px in portfolio)
	"2xl": "2rem", // 32px (vs 48px in portfolio)
};

export const technicalEffects = {
	// Glow effects (electric theme)
	glow: {
		sm: "0 0 10px rgba(0, 212, 255, 0.3)",
		md: "0 0 20px rgba(0, 212, 255, 0.4)",
		lg: "0 0 30px rgba(0, 212, 255, 0.5)",
		success: "0 0 20px rgba(0, 255, 136, 0.4)",
		warning: "0 0 20px rgba(255, 170, 0, 0.4)",
		error: "0 0 20px rgba(255, 0, 85, 0.4)",
	},

	// Box shadows (different from portfolio)
	shadow: {
		sm: "0 2px 4px rgba(0, 0, 0, 0.5)",
		md: "0 4px 8px rgba(0, 0, 0, 0.6)",
		lg: "0 8px 16px rgba(0, 0, 0, 0.7)",
		inset: "inset 0 2px 4px rgba(0, 0, 0, 0.4)",
	},

	// Borders
	border: {
		width: "1px",
		style: "solid",
		color: technicalColors.grid.primary,
		glow: `1px solid ${technicalColors.electric.blue}`,
	},
};

export const technicalAnimations = {
	// Faster, snappier animations
	duration: {
		fast: "100ms",
		normal: "200ms",
		slow: "400ms",
	},
	easing: {
		sharp: "cubic-bezier(0.4, 0.0, 0.6, 1)",
		standard: "cubic-bezier(0.4, 0.0, 0.2, 1)",
		emphasized: "cubic-bezier(0.0, 0.0, 0.2, 1)",
	},
	keyframes: {
		pulse: {
			"0%, 100%": { opacity: 1 },
			"50%": { opacity: 0.6 },
		},
		scanline: {
			"0%": { transform: "translateY(-100%)" },
			"100%": { transform: "translateY(100%)" },
		},
		flicker: {
			"0%, 100%": { opacity: 1 },
			"50%": { opacity: 0.95 },
		},
	},
};

// Recharts theme (technical style)
export const technicalChartTheme = {
	grid: {
		stroke: technicalColors.grid.primary,
		strokeDasharray: "2 4", // Different pattern
		strokeOpacity: 0.4,
	},
	axis: {
		stroke: technicalColors.electric.cyan,
		fontSize: 11, // Smaller than portfolio
		fontFamily: technicalTypography.fontFamily.mono,
		fontWeight: 500,
	},
	tooltip: {
		backgroundColor: technicalColors.background.tertiary,
		border: `1px solid ${technicalColors.electric.blue}`,
		borderRadius: "2px", // Sharp corners (vs rounded in portfolio)
		padding: "8px 12px",
		boxShadow: technicalEffects.glow.md,
	},
};

// Utility classes
export const technicalUtils = {
	// Scanline effect
	scanline: `
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 212, 255, 0.02) 50%
    );
    background-size: 100% 4px;
  `,

	// Grid background
	gridPattern: `
    background-image: 
      linear-gradient(${technicalColors.grid.secondary} 1px, transparent 1px),
      linear-gradient(90deg, ${technicalColors.grid.secondary} 1px, transparent 1px);
    background-size: 20px 20px;
  `,

	// Terminal-style border
	terminalBorder: `
    border: 1px solid ${technicalColors.grid.primary};
    box-shadow: 
      inset 0 0 0 1px rgba(0, 212, 255, 0.1),
      0 0 10px rgba(0, 212, 255, 0.2);
  `,
};
