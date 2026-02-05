export const translations = {
	es: {
		// Header
		title: "DASHBOARD ANALÍTICO",
		subtitle:
			"SISTEMA DE MONITOREO EN TIEMPO REAL // FLUJO DE DATOS MSW SIMULADO",
		backToPortfolio: "Volver al Portfolio",

		// Filters
		segment: "SEGMENTO:",
		all: "TODOS",
		mobile: "MÓVIL",
		desktop: "ESCRITORIO",

		// Date picker
		quickSelect: "SELECCIÓN RÁPIDA",

		// Export
		export: "EXPORTAR",
		exportCSV: "EXPORTAR CSV",
		exportPDF: "EXPORTAR PDF",

		// Comparison
		compare: "COMPARAR",
		comparing: "COMPARANDO",
		customize: "PERSONALIZAR",
		layout: "DISEÑO",
		showHide: "MOSTRAR/OCULTAR WIDGETS",

		// Charts
		salesTrendAnalysis: "ANÁLISIS DE TENDENCIA DE VENTAS",
		sales: "VENTAS",
		revenue: "INGRESOS",
		deviceDistribution: "DISTRIBUCIÓN POR DISPOSITIVO",
		conversionFunnel: "EMBUDO DE CONVERSIÓN",
		rate: "TASA",

		// KPIs
		live: "EN VIVO",
		prev: "ANTERIOR",
		vsPrev: "vs. ANTERIOR",

		// Smart Insights
		smartInsights: "INSIGHTS INTELIGENTES",
		positiveMomentum: "MOMENTUM POSITIVO",
		positiveMomentumDesc:
			"métricas mostrando tendencia alcista. El rendimiento es fuerte.",
		decliningMetrics: "MÉTRICAS EN DECLIVE",
		decliningMetricsDesc:
			"métricas con tendencia a la baja. Revisar estrategia.",
		highDropOff: "ALTA TASA DE ABANDONO DETECTADA",
		highDropOffDesc: "abandono. Optimizar este paso.",
		mobileFirstAudience: "AUDIENCIA MOBILE-FIRST",
		mobileFirstAudienceDesc: "ingresos desde móvil. Priorizar UX móvil.",
		acceleratingGrowth: "CRECIMIENTO ACELERADO",
		acceleratingGrowthDesc:
			"Ventas recientes 20% superiores al inicio del período. Momentum en construcción.",

		// Error
		systemError: "ERROR DEL SISTEMA",
		failedToLoad: "FALLO AL CARGAR DATOS DEL DASHBOARD",
	},
	en: {
		// Header
		title: "ANALYTICS DASHBOARD",
		subtitle: "REAL-TIME MONITORING SYSTEM // MSW MOCK DATA STREAM",
		backToPortfolio: "Back to Portfolio",

		// Filters
		segment: "SEGMENT:",
		all: "ALL",
		mobile: "MOBILE",
		desktop: "DESKTOP",

		// Date picker
		quickSelect: "QUICK SELECT",

		// Export
		export: "EXPORT",
		exportCSV: "EXPORT CSV",
		exportPDF: "EXPORT PDF",

		// Comparison
		compare: "COMPARE",
		comparing: "COMPARING",
		customize: "CUSTOMIZE",
		layout: "LAYOUT",
		showHide: "SHOW/HIDE WIDGETS",

		// Charts
		salesTrendAnalysis: "SALES TREND ANALYSIS",
		sales: "SALES",
		revenue: "REVENUE",
		deviceDistribution: "DEVICE DISTRIBUTION",
		conversionFunnel: "CONVERSION FUNNEL",
		rate: "RATE",

		// KPIs
		live: "LIVE",
		prev: "PREV",
		vsPrev: "vs. PREV",

		// Smart Insights
		smartInsights: "SMART INSIGHTS",
		positiveMomentum: "POSITIVE MOMENTUM",
		positiveMomentumDesc:
			"metrics showing upward trend. Performance is strong.",
		decliningMetrics: "DECLINING METRICS",
		decliningMetricsDesc: "metrics trending down. Review strategy.",
		highDropOff: "HIGH DROP-OFF DETECTED",
		highDropOffDesc: "drop-off. Optimize this step.",
		mobileFirstAudience: "MOBILE-FIRST AUDIENCE",
		mobileFirstAudienceDesc: "revenue from mobile. Prioritize mobile UX.",
		acceleratingGrowth: "ACCELERATING GROWTH",
		acceleratingGrowthDesc:
			"Recent sales 20% higher than period start. Momentum building.",

		// Error
		systemError: "SYSTEM ERROR",
		failedToLoad: "FAILED TO LOAD DASHBOARD DATA",
	},
};

export type Language = "es" | "en";
export type TranslationKey = keyof typeof translations.es;
