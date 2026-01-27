import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, User, Bell, LogOut } from 'lucide-react';
import { DashboardFilter } from '../components/DashboardFilter';
import { PremiumKPIStats } from '../components/PremiumKPIStats';
import { PremiumSalesLineChart } from '../components/PremiumSalesLineChart';
import { PremiumRevenueBarChart } from '../components/PremiumRevenueBarChart';
import { PremiumConversionPieChart } from '../components/PremiumConversionPieChart';
import { SmartInsights } from '../components/SmartInsights';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { LoginModal } from '../components/LoginModal';
import { LanguageToggle } from '../components/LanguageToggle';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import { DateRange, Segment, DashboardData } from '../types';
import { premiumColors, premiumTypography, premiumLayout, premiumEffects } from '../utils/premiumTheme';
import { useLanguage } from '../i18n/LanguageContext';

type TabType = 'Overview' | 'Analytics' | 'Finance' | 'Strategy';

export default function DashboardPage() {
  const [range, setRange] = useState<DateRange>('7d');
  const [segment, setSegment] = useState<Segment>('all');
  const [showComparison, setShowComparison] = useState(false);
  const [visibleWidgets, setVisibleWidgets] = useState<string[]>(['insights', 'kpis', 'salesTrend', 'deviceDist', 'funnel', 'globalMap', 'revenueBar']);
  const [drillDownData, setDrillDownData] = useState<{ type: string; label: string; value: any } | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  // Live Mode State
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [liveData, setLiveData] = useState<DashboardData | null>(null);

  const { t } = useLanguage();
  const { data, isLoading, isError } = useDashboardMetrics({ range, segment });

  // Sync liveData with initial fetch
  useEffect(() => {
    if (data) setLiveData(data);
  }, [data]);

  // Live Mode Simulation
  useEffect(() => {
    if (!isLiveMode || !liveData) return;

    const interval = setInterval(() => {
      setLiveData(prev => {
        if (!prev) return null;

        // Simulate random increments
        const newRevenue = Math.random() > 0.7 ? Math.floor(Math.random() * 150) : 0;

        // Deep clone to update nested properties safely
        const next = structuredClone(prev);

        // Update Active Users (fluctuate)
        const currentUsers = Number.parseInt(String(next.kpi.activeUsers.value).replaceAll(',', ''));
        const userChange = Math.floor(Math.random() * 10) - 4; // -4 to +5
        next.kpi.activeUsers.value = (currentUsers + userChange).toLocaleString();

        // Update Revenue (only up)
        if (newRevenue > 0) {
          const currentRev = Number.parseFloat(String(next.kpi.totalRevenue.value).replaceAll(',', '').replace('€', '')); // Handle format
          next.kpi.totalRevenue.value = (currentRev + newRevenue).toLocaleString();

          // Update Sales count
          const currentSales = Number.parseInt(String(next.kpi.totalSales.value).replaceAll(',', ''));
          next.kpi.totalSales.value = (currentSales + 1).toLocaleString();
        }

        return next;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isLiveMode, liveData]);

  // Use liveData for rendering if available, else fallback to fetched data
  const displayData = isLiveMode && liveData ? liveData : data;

  useEffect(() => {
    const savedUser = localStorage.getItem('premium_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
      setIsLoginOpen(true);
    }
  }, []);

  const handleLogin = (username: string) => {
    const user = { name: username, email: `${username.toLowerCase()}@fitn.net` };
    setCurrentUser(user);
    localStorage.setItem('premium_user', JSON.stringify(user));
    setIsLoginOpen(false);
  };

  const handleDrillDown = (type: string, label: string, value: any) => {
    setDrillDownData({ type, label, value });
  };

  const toggleWidget = (id: string) => {
    setVisibleWidgets(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  const shouldShowChart = (id: string) => {
    if (!visibleWidgets.includes(id)) return false;

    switch (activeTab) {
      case 'Overview':
        return ['insights', 'kpis', 'salesTrend', 'deviceDist', 'globalMap'].includes(id);
      case 'Analytics':
        return ['insights', 'salesTrend', 'deviceDist', 'funnel'].includes(id);
      case 'Finance':
        return ['kpis', 'salesTrend', 'revenueBar'].includes(id);
      case 'Strategy':
        return ['insights', 'funnel', 'globalMap'].includes(id);
      default:
        return true;
    }
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#080808]">
        <div className="text-center p-12 rounded-[32px] border border-white/10 glass">
          <div className="text-6xl mb-6">⚠</div>
          <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">{t('systemError')}</h3>
          <p className="text-sm opacity-60 text-[#8E8E93]">{t('failedToLoad')}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-20 selection:bg-lavender-500/30"
      style={{
        backgroundColor: premiumColors.background.primary,
        fontFamily: premiumTypography.fontFamily.body,
        color: premiumColors.accent.white,
      }}
    >
      <LoginModal isOpen={isLoginOpen} onLogin={handleLogin} />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px]" style={{ backgroundColor: premiumColors.brand.primary }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[120px]" style={{ backgroundColor: premiumColors.brand.secondary }}></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 pt-6 relative z-10">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-12">
            <Link
              to="/"
              className="group flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-all duration-300 rounded-full border border-white/5"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-semibold tracking-wide uppercase opacity-70 group-hover:opacity-100">{t('backToPortfolio')}</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              {(['Overview', 'Analytics', 'Finance', 'Strategy'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 transition-all duration-300 relative ${activeTab === tab ? 'text-white opacity-100' : 'opacity-40 hover:opacity-100'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-lavender-400 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <Search className="w-4 h-4 opacity-40" />
              <input
                type="text"
                placeholder="Search metrics..."
                className="bg-transparent border-none outline-none text-xs w-48 placeholder:opacity-40"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className={`p-2 rounded-full transition-colors relative z-20 ${isNotifOpen ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  <Bell className="w-5 h-5 opacity-60" />
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-[#080808]" style={{ backgroundColor: premiumColors.brand.tertiary }}></div>
                </button>
                <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
              </div>

              <LanguageToggle />

              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="text-right hidden lg:block">
                  <p className="text-xs font-bold">{currentUser?.name || 'Guest'}</p>
                  <p className="text-[10px] opacity-40">{currentUser?.email || 'initializing...'}</p>
                </div>
                <div className="group relative">
                  {/* Live Mode Toggle */}
                  <button
                    onClick={() => setIsLiveMode(!isLiveMode)}
                    className={`relative px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 transition-all ${isLiveMode ? 'bg-red-500/20 border-red-500/50' : 'bg-transparent hover:bg-white/5'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-red-500 animate-pulse' : 'bg-white/50'}`} />
                    <span className={`text-xs font-bold tracking-widest uppercase ${isLiveMode ? 'text-red-400' : 'opacity-50'}`}>Live</span>
                  </button>

                  <button className="w-10 h-10 rounded-2xl bg-gradient-to-br from-lavender-400 to-purple-600 flex items-center justify-center border border-white/10 overflow-hidden shadow-lg transition-transform hover:scale-105 active:scale-95">
                    <User className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem('premium_user');
                      setCurrentUser(null);
                      setIsLoginOpen(true);
                    }}
                    className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    title="Log Out"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <h1
              className="text-4xl font-semibold tracking-tight mb-2"
              style={{ fontFamily: premiumTypography.fontFamily.display }}
            >
              {activeTab}
            </h1>
            <p className="text-sm opacity-40 max-w-md">{t('subtitle')}</p>
          </div>

          <div className="w-full lg:w-auto relative z-20">
            <DashboardFilter
              range={range}
              segment={segment}
              showComparison={showComparison}
              visibleWidgets={visibleWidgets}
              onRangeChange={setRange}
              onSegmentChange={setSegment}
              onComparisonToggle={setShowComparison}
              onToggleWidget={toggleWidget}
            />
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="space-y-6">

            {shouldShowChart('kpis') && (
              <PremiumKPIStats
                kpis={displayData?.kpi || {}}
                isLoading={isLoading}
              />
            )}

            {shouldShowChart('insights') && (
              <SmartInsights data={displayData} isLoading={isLoading} />
            )}

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-0">

              <div className="xl:col-span-8 flex flex-col gap-6 min-h-0">
                {shouldShowChart('salesTrend') && (
                  <div className="min-h-[400px]">
                    <PremiumSalesLineChart
                      data={displayData?.salesTrend || []}
                      isLoading={isLoading}
                      showComparison={showComparison}
                      onPointClick={(label, val) => handleDrillDown('TIME_SERIES_EVENT', label, `${val.toLocaleString()}€`)}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
                  {shouldShowChart('deviceDist') && (
                    <div className="min-h-[400px]">
                      <PremiumConversionPieChart
                        data={displayData?.revenueByDevice || []}
                        isLoading={isLoading}
                        onSliceClick={(label, val) => handleDrillDown('DEVICE_ENTITY', label, `${val}%`)}
                      />
                    </div>
                  )}

                  {shouldShowChart('funnel') && (
                    <div className="min-h-[400px]">
                      <PremiumRevenueBarChart
                        data={displayData?.conversionFunnel || []}
                        isLoading={isLoading}
                        onBarClick={(label, val) => handleDrillDown('FUNNEL_STEP', label, val.toLocaleString())}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="xl:col-span-4 flex flex-col gap-6 min-h-0">
                <AnimatePresence mode="wait">
                  {drillDownData ? (
                    <motion.div
                      key="drilldown"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="h-full"
                    >
                      <div
                        className="p-8 h-full flex flex-col relative overflow-hidden"
                        style={{
                          ...premiumEffects.glassmorphism,
                          borderRadius: premiumLayout.borderRadius.lg,
                          borderColor: premiumColors.brand.primary,
                          backgroundColor: 'rgba(182, 161, 229, 0.05)',
                        }}
                      >
                        <div className="absolute top-0 right-0 p-4 z-10">
                          <button
                            onClick={() => setDrillDownData(null)}
                            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="mb-8">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: premiumColors.brand.primary }}></div>
                            <h3 className="text-xl font-bold">{drillDownData.label}</h3>
                          </div>
                          <p className="text-xs opacity-40 uppercase tracking-widest">{drillDownData.type}</p>
                        </div>

                        <div className="flex-1 flex flex-col justify-center text-center">
                          <p className="text-[10px] uppercase tracking-[0.3em] mb-4 opacity-50">Signal Extraction</p>
                          <h4 className="text-6xl font-black mb-8" style={{ color: premiumColors.accent.white }}>
                            {drillDownData.value}
                          </h4>

                          <div className="flex justify-center">
                            <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest">
                              Status: <span style={{ color: premiumColors.brand.secondary }}>Analyzed</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-12 p-4 rounded-3xl bg-white/5 border border-white/5">
                          <p className="text-xs opacity-60 leading-relaxed italic">
                            "The analyzed segment shows high-performance correlation with current market trends. Priority extraction complete."
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full rounded-[32px] border border-white/5 bg-white/5 flex flex-col items-center justify-center p-8 text-center" style={premiumEffects.glassmorphism}>
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 opacity-50">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 opacity-50">
                          <Search className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="text-sm font-bold opacity-70 mb-2">Detailed Analysis</h3>
                      <p className="opacity-30 text-xs leading-relaxed">Select a data point from any chart to view detailed drill-down metrics here.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
