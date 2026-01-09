import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';



i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
    en: {
      translation: {
        welcome: "ZeroCode Portfolio",
        market_cap: "Market Cap",
        volume: "Volume",
        price: "Price",
        change_24h: "24h Change",
        crypto: {
          title: "Crypto Dashboard",
          subtitle: "Real-time market intelligence & portfolio tracking",
          sections: {
            priceChart: "Price Chart",
            topGainers: "Top Gainers",
            topLosers: "Top Losers",
            trending: "Trending Now",
            quickStats: "Quick Stats",
            about: "About Dashboard",
            marketPulse: "Market Pulse",
            watchlist: "Your Watchlist",
            news: "Crypto News (Live)"
          },
          stats: {
            totalCryptos: "Total Cryptos",
            activeMarkets: "Active Markets",
            dataSource: "Data Source"
          },
          about: {
            description: "Advanced crypto analytics dashboard offering real-time data, portfolio tracking, and market insights. Powered by CoinGecko API."
          },
          footer: "© 2026 ZeroCode Crypto. Built for the future of finance."
        }
      }
    },
    es: {
      translation: {
        welcome: "Portafolio ZeroCode",
        market_cap: "Cap. de Mercado",
        volume: "Volumen",
        price: "Precio",
        change_24h: "Cambio 24h",
        crypto: {
          title: "Dashboard Crypto",
          subtitle: "Inteligencia de mercado y seguimiento de portafolio",
          sections: {
            priceChart: "Gráfico de Precios",
            topGainers: "Mayores Ganadores",
            topLosers: "Mayores Perdedores",
            trending: "Tendencia Ahora",
            quickStats: "Estadísticas Rápidas",
            about: "Sobre el Dashboard",
            marketPulse: "Pulso del Mercado",
            watchlist: "Tu Watchlist",
            news: "Noticias Crypto (En Vivo)"
          },
          stats: {
            totalCryptos: "Total Criptos",
            activeMarkets: "Mercados Activos",
            dataSource: "Fuente de Datos"
          },
          about: {
            description: "Dashboard avanzado de análisis crypto con datos en tiempo real, seguimiento de portafolio y noticias. Desarrollado con API de CoinGecko."
          },
          footer: "© 2026 ZeroCode Crypto. Construido para el futuro de las finanzas."
        }
      }
    },
    fr: {
      translation: {
        welcome: "Portefeuille ZeroCode",
        market_cap: "Cap. Boursière",
        volume: "Volume",
        price: "Prix",
        change_24h: "Var. 24h",
        crypto: {
          title: "Tableau de Bord Crypto",
          subtitle: "Intelligence de marché en temps réel",
          sections: {
            priceChart: "Graphique des Prix",
            topGainers: "Top Gagnants",
            topLosers: "Top Perdants",
            trending: "Tendances",
            quickStats: "Stats Rapides",
            about: "À propos",
            marketPulse: "Pouls du Marché",
            watchlist: "Votre Liste",
            news: "Actu Crypto (En Direct)"
          },
          stats: {
            totalCryptos: "Total Cryptos",
            activeMarkets: "Marchés Actifs",
            dataSource: "Source de Données"
          },
          about: {
            description: "Tableau de bord avancé pour l'analyse crypto et le suivi de portefeuille."
          },
          footer: "© 2026 ZeroCode Crypto."
        }
      }
    },
    de: {
      translation: {
        welcome: "ZeroCode Portfolio",
        market_cap: "Marktkapitalisierung",
        volume: "Volumen",
        price: "Preis",
        change_24h: "24h Änd.",
        crypto: {
          title: "Krypto-Dashboard",
          subtitle: "Echtzeit-Marktinformationen",
          sections: {
            priceChart: "Preischart",
            topGainers: "Top Gewinner",
            topLosers: "Top Verlierer",
            trending: "Im Trend",
            quickStats: "Schnellstatistiken",
            about: "Über",
            marketPulse: "Marktpuls",
            watchlist: "Merkliste",
            news: "Krypto-News (Live)"
          },
          stats: {
            totalCryptos: "Kryptos Gesamt",
            activeMarkets: "Aktive Märkte",
            dataSource: "Datenquelle"
          },
          about: {
            description: "Fortschrittliches Krypto-Analyse-Dashboard mit Echtzeitdaten."
          },
          footer: "© 2026 ZeroCode Crypto."
        }
      }
    },
    it: {
      translation: {
        welcome: "ZeroCode Portfolio",
        market_cap: "Cap. di Mercato",
        volume: "Volume",
        price: "Prezzo",
        change_24h: "Var. 24h",
        crypto: {
          title: "Dashboard Cripto",
          subtitle: "Intelligenza di mercato in tempo reale",
          sections: {
            priceChart: "Grafico Prezzi",
            topGainers: "Migliori",
            topLosers: "Peggiori",
            trending: "Di Tendenza",
            quickStats: "Statistiche Veloci",
            about: "Info",
            marketPulse: "Polso del Mercato",
            watchlist: "La tua Lista",
            news: "Notizie Crypto (Live)"
          },
          stats: {
            totalCryptos: "Totale Cripto",
            activeMarkets: "Mercati Attivi",
            dataSource: "Fonte Dati"
          },
          about: {
            description: "Dashboard avanzata per analisi cripto e tracciamento portafoglio."
          },
          footer: "© 2026 ZeroCode Crypto."
        }
      }
    },
    pt: {
      translation: {
        welcome: "Portfólio ZeroCode",
        market_cap: "Cap. de Mercado",
        volume: "Volume",
        price: "Preço",
        change_24h: "Var. 24h",
        crypto: {
          title: "Painel Cripto",
          subtitle: "Inteligência de mercado em tempo real",
          sections: {
            priceChart: "Gráfico de Preços",
            topGainers: "Maiores Ganhos",
            topLosers: "Maiores Perdas",
            trending: "Tendências",
            quickStats: "Estatísticas Rápidas",
            about: "Sobre",
            marketPulse: "Pulso do Mercado",
            watchlist: "Sua Lista",
            news: "Notícias Cripto (Ao Vivo)"
          },
          stats: {
            totalCryptos: "Total Criptos",
            activeMarkets: "Mercados Ativos",
            dataSource: "Fonte de Dados"
          },
          about: {
            description: "Painel avançado de análise cripto e rastreamento de portfólio."
          },
          footer: "© 2026 ZeroCode Crypto."
        }
      }
    }
  },
    fallbackLng: 'es',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n as default };
