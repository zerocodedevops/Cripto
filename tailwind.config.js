/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"!./src/**/node_modules/**",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#f0fdfa",
					100: "#ccfbf1",
					200: "#99f6e4",
					300: "#5eead4",
					400: "#2dd4bf",
					500: "#14b8a6",
					600: "#0d9488",
					700: "#0f766e",
					800: "#115e59",
					900: "#134e4a",
				},
				accent: {
					50: "#faf5ff",
					100: "#f3e8ff",
					200: "#e9d5ff",
					300: "#d8b4fe",
					400: "#c084fc",
					500: "#a855f7",
					600: "#9333ea",
					700: "#7e22ce",
					800: "#6b21a8",
					900: "#581c87",
				},
				dark: {
					50: "#f8fafc",
					100: "#f1f5f9",
					200: "#e2e8f0",
					300: "#cbd5e1",
					400: "#94a3b8",
					500: "#64748b",
					600: "#475569",
					700: "#334155",
					800: "#1e293b",
					900: "#0f172a",
					950: "#030712", // Exact match from reference
				},
				light: {
					50: "#020617",
					100: "#0f172a",
					200: "#1e293b",
					300: "#334155",
					400: "#475569",
					500: "#64748b",
					600: "#94a3b8",
					700: "#cbd5e1",
					800: "#e2e8f0",
					900: "#f1f5f9",
					950: "#f8fafc",
				},
				// Theme variables for Salon project (Ash Gray support)
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: "hsl(var(--card))",
				"card-foreground": "hsl(var(--card-foreground))",
				popover: "hsl(var(--popover))",
				"popover-foreground": "hsl(var(--popover-foreground))",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",

				neon: {
					cyan: "#06b6d4", // Reference primary
					purple: "#8b5cf6", // Reference secondary
					pink: "#ff00f5", // Kept as extra
					blue: "#0080ff",
				},
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
				outfit: ["Outfit", "sans-serif"],
				// Salon Theme Fonts
				heading: ["var(--font-heading)", "serif"],
				body: ["var(--font-body)", "sans-serif"],
			},
			boxShadow: {
				soft: "0 8px 24px rgba(0,0,0,0.08)",
				glow: "0 0 20px rgba(6, 182, 212, 0.3)", // Updated to Cyan match
				"glow-purple": "0 0 20px rgba(139, 92, 246, 0.3)", // Updated to Purple match
				"glow-lg": "0 0 40px rgba(6, 182, 212, 0.4)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"hero-gradient":
					"linear-gradient(135deg, #030712 0%, #0f172a 50%, #030712 100%)", // Reference background mix
				"card-gradient":
					"linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
			},
			animation: {
				"fade-in": "fadeIn 0.5s ease-out",
				"slide-up": "slideUp 0.5s ease-out",
				"slide-down": "slideDown 0.5s ease-out",
				"scale-in": "scaleIn 0.3s ease-out",
				"glow-pulse": "glowPulse 2s ease-in-out infinite",
				float: "float 6s ease-in-out infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideUp: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				slideDown: {
					"0%": { opacity: "0", transform: "translateY(-20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				scaleIn: {
					"0%": { opacity: "0", transform: "scale(0.95)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				glowPulse: {
					"0%, 100%": { boxShadow: "0 0 20px rgba(0, 245, 255, 0.3)" },
					"50%": { boxShadow: "0 0 40px rgba(0, 245, 255, 0.6)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
