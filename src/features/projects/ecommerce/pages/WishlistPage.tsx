import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { useGetProductsQuery } from '../services/productsApi';
import ProductCard from '../components/ProductCard';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';

export default function WishlistPage() {
  const wishlistIds = useSelector((state: RootState) => state.wishlist.items);
  const { data: productsData, isLoading } = useGetProductsQuery({});
  const products = productsData?.data || [];

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id)) || [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      );
    }

    if (wishlistProducts.length > 0) {
      return (
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {wishlistProducts.map((product) => (
            <motion.div key={product.id} variants={fadeInUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      );
    }
    
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
        <Heart className="w-16 h-16 mx-auto text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Tu lista está vacía</h2>
        <p className="text-slate-500 mb-6">Guarda los productos que más te gusten para comprarlos más tarde.</p>
        <Link 
          to="/proyectos/ecommerce" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
        >
          Explorar Catálogo
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-[80vh]">
      <div className="mb-8">
        <Link to="/proyectos/ecommerce" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Volver al Catálogo
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-red-100 dark:bg-red-900/20 text-red-500">
            <Heart className="w-8 h-8 fill-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mi Lista de Deseos</h1>
            <p className="text-slate-500">{wishlistProducts.length} productos guardados</p>
          </div>
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
}
