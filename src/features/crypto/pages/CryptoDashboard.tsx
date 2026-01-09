import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { TopGainers } from '../components/TopGainers';
import { TopLosers } from '../components/TopLosers';
import { TrendingCoins } from '../components/TrendingCoins';
import { CryptoTicker } from '../components/CryptoTicker';
import { PriceChart } from '../components/PriceChart';
import { MarketHeatmap } from '../components/MarketHeatmap';
import { WebSocketStatus } from '../components/WebSocketStatus';
import { WatchlistWidget } from '../components/WatchlistWidget';
import { PortfolioWidget } from '../components/PortfolioWidget';
import { NewsFeed } from '../components/NewsFeed';
import { CryptoComparator } from '../components/CryptoComparator';
import { PriceAlerts } from '../components/PriceAlerts';
import { WalletConnect } from '../components/WalletConnect';
import { cryptoTheme } from '../utils/cryptoTheme';
import { useCryptoPrice } from '../hooks/useCryptoPrice';
import { useWebSocketPrice } from '../hooks/useWebSocketPrice';
import { useCurrency } from '../context/CurrencyContext';

const USE_WEBSOCKET = import.meta.env.VITE_USE_WEBSOCKET === 'true';

export function CryptoDashboard() {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency, currencySymbol } = useCurrency();
  
  // WebSocket for real-time prices (Binance)
  const wsData = useWebSocketPrice({
    coingeckoIds: ['bitcoin'],
    enabled: USE_WEBSOCKET,
  });
  
  // ALWAYS fetch MSW data as fallback
  const rqData = useCryptoPrice({ per_page: 10 });
  
  // Use WebSocket data if connected, otherwise use MSW
  const markets = (USE_WEBSOCKET && wsData.isConnected && wsData.data.length > 0) 
    ? wsData.data 
    : rqData.data;
  
  const isConnected = USE_WEBSOCKET ? wsData.isConnected : false;
  const bitcoin = markets?.[0];
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  const changeCurrency = (curr: 'EUR' | 'USD' | 'GBP') => {
    setCurrency(curr);
    setCurrencyMenuOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ background: cryptoTheme.colors.bg.primary }}>
      {/* Crypto Ticker Tape */}
      <CryptoTicker />

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Link to="/">
              <button
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0"
                style={{
                  ...cryptoTheme.effects.glass,
                  borderColor: cryptoTheme.colors.border.primary,
                  border: '1px solid',
                }}
              >
                <ArrowLeft className="w-5 h-5" style={{ color: cryptoTheme.colors.text.primary }} />
              </button>
            </Link>
            <div className="flex-1">
              <h1
                className="text-2xl md:text-3xl font-bold flex items-center gap-2 md:gap-3"
                style={{ color: cryptoTheme.colors.text.primary }}
              >
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8" style={{ color: cryptoTheme.colors.primary.electric }} />
                {t('crypto.title')}
              </h1>
              <p className="text-xs md:text-sm mt-1" style={{ color: cryptoTheme.colors.text.tertiary }}>
                {t('crypto.subtitle')}
              </p>
            </div>
          </div>
          
          {/* Selectors Container */}
          <div className="flex items-center gap-3 flex-wrap w-full md:w-auto justify-end">
            <WalletConnect />

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                className="h-10 px-3 rounded-xl transition-all duration-200 hover:scale-105 flex items-center gap-2"
                style={{
                  background: cryptoTheme.colors.bg.tertiary,
                  borderColor: cryptoTheme.colors.border.primary,
                  border: '1px solid',
                  color: cryptoTheme.colors.text.primary,
                }}
              >
                <span className="text-base font-bold">{currencySymbol}</span>
                <span className="text-sm font-medium">{currency}</span>
              </button>
              
              {currencyMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 py-2 rounded-xl min-w-[120px] z-50"
                  style={{
                    background: cryptoTheme.colors.bg.tertiary,
                    borderColor: cryptoTheme.colors.border.primary,
                    border: '1px solid',
                  }}
                >
                  <button
                    onClick={() => changeCurrency('EUR')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors"
                    style={{ color: cryptoTheme.colors.text.primary }}
                  >
                    € EUR
                  </button>
                  <button
                    onClick={() => changeCurrency('USD')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors"
                    style={{ color: cryptoTheme.colors.text.primary }}
                  >
                    $ USD
                  </button>
                  <button
                    onClick={() => changeCurrency('GBP')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors"
                    style={{ color: cryptoTheme.colors.text.primary }}
                  >
                    £ GBP
                  </button>
                </motion.div>
              )}
            </div>
            
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="h-10 px-3 rounded-xl transition-all duration-200 hover:scale-105 flex items-center gap-2"
              style={{
                background: cryptoTheme.colors.bg.tertiary,
                borderColor: cryptoTheme.colors.border.primary,
                border: '1px solid',
                color: cryptoTheme.colors.text.primary,
              }}
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">{i18n.language.toUpperCase()}</span>
            </button>
            
            {langMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 py-2 rounded-xl min-w-[120px] z-50"
                style={{
                  background: cryptoTheme.colors.bg.tertiary,
                  borderColor: cryptoTheme.colors.border.primary,
                  border: '1px solid',
                }}
              >
                <button
                  onClick={() => changeLanguage('es')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors"
                  style={{ color: cryptoTheme.colors.text.primary }}
                >
                  🇪🇸 Español
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors"
                  style={{ color: cryptoTheme.colors.text.primary }}
                >
                  🇬🇧 English
                </button>
              </motion.div>
            )}
          </div>
          </div>
        </div>

        {/* Data Source Status */}
        <WebSocketStatus isConnected={isConnected} />

        {/* Main Grid */}
        {/* ROW 1: Hero Section (Chart + Personal Tools) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Chart (8 cols) */}
          <div className="lg:col-span-8">
            {bitcoin && (
              <PriceChart
                coinId={bitcoin.id}
                coinName={bitcoin.name}
                currentPrice={bitcoin.current_price}
                priceChange24h={bitcoin.price_change_percentage_24h}
              />
            )}
          </div>
          
          {/* Personal Sidebar (4 cols) - Flex column to handle height properly */}
          <div className="lg:col-span-4 flex flex-col gap-6 h-full">
            <div className="flex-none">
              <PortfolioWidget />
            </div>
            <div className="flex-1 min-h-[300px]">
              <WatchlistWidget />
            </div>
          </div>
        </div>

        {/* ROW 2: Market Pulse (Gainers, Losers, Trending) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TopGainers />
          <TopLosers />
          <TrendingCoins />
        </div>

        {/* ROW 3: Tools Section (Comparator & Alerts) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
                <CryptoComparator />
            </div>
            <div className="lg:col-span-4">
                <PriceAlerts />
            </div>
        </div>

        {/* ROW 4: Deep Analysis (Heatmap) */}
        <MarketHeatmap />

        {/* ROW 5: News & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <NewsFeed />
          </div>
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Stats Widget */}
            <div
              className="p-6 rounded-2xl border backdrop-blur-xl"
              style={{
                ...cryptoTheme.effects.glass,
                borderColor: cryptoTheme.colors.border.primary,
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: cryptoTheme.colors.text.primary }}>
                {t('crypto.sections.quickStats')}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: cryptoTheme.colors.text.secondary }}>
                    {t('crypto.stats.totalCryptos')}
                  </span>
                  <span className="font-bold" style={{ color: cryptoTheme.colors.text.primary }}>
                    10,000+
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: cryptoTheme.colors.text.secondary }}>
                    {t('crypto.stats.activeMarkets')}
                  </span>
                  <span className="font-bold" style={{ color: cryptoTheme.colors.text.primary }}>
                    734
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: cryptoTheme.colors.text.secondary }}>
                    {t('crypto.stats.dataSource')}
                  </span>
                  <span className="font-bold" style={{ color: cryptoTheme.colors.text.primary }}>
                    {import.meta.env.VITE_USE_REAL_API === 'true' ? 'CoinGecko' : 'Datos Simulados'}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Widget */}
            <div
              className="p-6 rounded-2xl border backdrop-blur-xl"
              style={{
                ...cryptoTheme.effects.glass,
                borderColor: cryptoTheme.colors.border.primary,
              }}
            >
              <h3 className="text-lg font-bold mb-3" style={{ color: cryptoTheme.colors.text.primary }}>
                {t('crypto.sections.about')}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: cryptoTheme.colors.text.secondary }}>
                {t('crypto.about.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center py-12 md:py-16">
          <p className="text-xs" style={{ color: cryptoTheme.colors.text.tertiary }}>
            {t('crypto.footer')}
          </p>
        </div>
      </div>
    </div>
  );
}
