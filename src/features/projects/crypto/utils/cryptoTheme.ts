// Crypto theme colors and styles

export const cryptoTheme = {
	colors: {
		// Primary Colors
		primary: {
			electric: "#0066FF", // Electric Blue - Bullish
			neon: "#8B5CF6", // Neon Purple - Accent
			deep: "#0A0A0A", // Deep Black - Background
		},

		// Status Colors
		status: {
			bullish: "#10B981", // Crypto Green - Gainers
			bearish: "#EF4444", // Blood Red - Losers
			neutral: "#6B7280", // Grey - Stable
		},

		// Chart Colors
		chart: {
			primary: "#0066FF",
			secondary: "#8B5CF6",
			tertiary: "#10B981",
			quaternary: "#F59E0B",
			quinary: "#EC4899",
		},

		// Gradient Overlays
		gradients: {
			bullish: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
			bearish: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
			primary: "linear-gradient(135deg, #0066FF 0%, #0052CC 100%)",
			purple: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
			glass:
				"linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
		},

		// Background Levels
		bg: {
			primary: "#0A0A0A",
			secondary: "#111111",
			tertiary: "#1A1A1A",
			card: "rgba(255, 255, 255, 0.03)",
			hover: "rgba(255, 255, 255, 0.05)",
		},

		// Text Colors
		text: {
			primary: "#FFFFFF",
			secondary: "rgba(255, 255, 255, 0.7)",
			tertiary: "rgba(255, 255, 255, 0.5)",
			disabled: "rgba(255, 255, 255, 0.3)",
		},

		// Border Colors
		border: {
			primary: "rgba(255, 255, 255, 0.1)",
			secondary: "rgba(255, 255, 255, 0.05)",
			glow: "rgba(0, 102, 255, 0.3)",
		},
	},

	effects: {
		// Glassmorphism
		glass: {
			background: "rgba(255, 255, 255, 0.03)",
			backdropFilter: "blur(20px)",
			WebkitBackdropFilter: "blur(20px)",
			border: "1px solid rgba(255, 255, 255, 0.1)",
		},

		// Card Glow
		glow: {
			boxShadow:
				"0 0 30px rgba(0, 102, 255, 0.2), 0 0 60px rgba(139, 92, 246, 0.1)",
		},

		// Hover Glow
		hoverGlow: {
			boxShadow:
				"0 0 40px rgba(0, 102, 255, 0.3), 0 0 80px rgba(139, 92, 246, 0.15)",
		},
	},

	animations: {
		// Pulse Animation
		pulse: {
			animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
		},

		// Glow Pulse
		glowPulse: {
			animation: "glowPulse 3s ease-in-out infinite",
		},

		// Slide In
		slideIn: {
			animation: "slideIn 0.5s ease-out",
		},
	},

	typography: {
		fontFamily: {
			display:
				'"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
			mono: '"JetBrains Mono", "Fira Code", monospace',
		},
	},
};

// CSS keyframes (to be added to global styles if needed)
export const cryptoKeyframes = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  @keyframes glowPulse {
    0%, 100% {
      box-shadow: 0 0 30px rgba(0, 102, 255, 0.2), 0 0 60px rgba(139, 92, 246, 0.1);
    }
    50% {
      box-shadow: 0 0 40px rgba(0, 102, 255, 0.3), 0 0 80px rgba(139, 92, 246, 0.15);
    }
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
