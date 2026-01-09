import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Mic, ArrowDown } from 'lucide-react';
import { useGetProductsQuery, useGetCategoriesQuery } from '../services/productsApi';
import ProductCard from '../components/ProductCard';
import { useDebounce } from '../../../../hooks/useDebounce';

export default function CatalogPage() {
  const { t } = useTranslation();
  
  // State for API Params
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [sort] = useState<'price_asc' | 'price_desc' | 'newest' | undefined>(undefined);
  
  // Constant for skeleton keys to avoid index warning
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  
  // Debounce search to prevent API spam
  const debouncedSearch = useDebounce(search, 500);

  // Fetch Data (simulating Server-Side)
  const { data, isLoading, isFetching } = useGetProductsQuery({
    page,
    limit: 8,
    search: debouncedSearch,
    category: selectedCategory,
    sort
  });

  const products = data?.data || [];
  const total = data?.total || 0;
  
  const { data: categories } = useGetCategoriesQuery();
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    const SpeechRecognition = (globalThis as any).SpeechRecognition || (globalThis as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.start();
      setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearch(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      alert('Tu navegador no soporta búsqueda por voz');
    }
  };

  // Reset page when filters change
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('shop.catalog.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{t('shop.catalog.subtitle')}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder={isListening ? t('shop.catalog.voiceSearch') : t('shop.catalog.search')}
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={`pl-10 pr-10 py-2 bg-slate-50 dark:bg-slate-800 border ${isListening ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64 transition-all dark:text-white dark:placeholder-slate-500`}
            />
            <button 
              onClick={handleVoiceSearch}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}
              title="Buscar por voz"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
          
          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="pl-10 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer capitalize w-full sm:w-48 dark:text-white"
            >
              <option value="all">{t('shop.catalog.category.all')}</option>
              {categories?.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skeletons.map((id) => (
            <div key={`skeleton-${id}`} className="bg-white dark:bg-slate-900 rounded-2xl p-4 h-[400px] animate-pulse border border-slate-100 dark:border-slate-800">
              <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4" />
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/4 mb-2" />
              <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-3/4 mb-4" />
              <div className="mt-auto pt-4 flex justify-between">
                 <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-1/3" />
                 <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded w-8" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Loading Overlay for Refetching */}
            {isFetching && !isLoading && (
               <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 z-10 backdrop-blur-[1px] rounded-2xl" />
            )}

            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {products.length === 0 && (
               <div className="col-span-full py-20 text-center text-slate-400">
                 {t('shop.catalog.noResults')}
               </div>
            )}
          </div>

          {/* Simple Pagination Controls */}
          {products.length > 0 && products.length < total && (
            <div className="flex justify-center mt-12 animate-fade-in">
              <button
                onClick={() => setPage(prev => prev + 1)}
                 disabled={isFetching}
                className="px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full font-medium text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isFetching ? 'Cargando...' : `Cargar Más Productos (${total - (page * 8)} restantes)`}
                {!isFetching && <ArrowDown className="w-4 h-4" />}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
