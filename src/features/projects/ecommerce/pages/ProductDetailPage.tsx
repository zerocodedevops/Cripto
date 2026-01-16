import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetProductByIdQuery } from '../services/productsApi';
import { ShoppingCart, Star, Heart, Share2, Truck, ShieldCheck, ArrowLeft, Home, ChevronRight, ShoppingBag, RefreshCw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { motion } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: product, isLoading } = useGetProductByIdQuery(id!);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [refreshReviews, setRefreshReviews] = useState(0);
  const [showSizeError, setShowSizeError] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    
    const isClothing = product.category.toLowerCase().includes('clothing') || 
                      product.category.toLowerCase().includes('ropa') || 
                      product.category.toLowerCase().includes('shirt') ||
                      product.category.toLowerCase().includes('jacket');

    if (isClothing && !selectedSize) {
      setShowSizeError(true);
      return;
    }

    dispatch(addToCart({
       ...product,
       size: selectedSize || undefined
    }));
    
    // Optional: Show success feedback or navigate
    setSelectedSize(null);
  };

  useEffect(() => {
    if (product) {
      document.title = `${product.title} | DevOps Shop`;
    }
  }, [product]);

  if (isLoading) {
    return <div className="min-h-[50vh] flex items-center justify-center">Cargando producto...</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Producto no encontrado</div>;
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
        <Link to="/proyectos/ecommerce" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors">
          <Home className="w-4 h-4" />
          <span>Inicio</span>
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-300" />
        <span className="font-medium text-indigo-600 dark:text-indigo-400 truncate">{product.title}</span>
      </nav>
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al catálogo
      </button>

      <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain mix-blend-multiply"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <span className="text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wider text-sm mb-2">{product.category}</span>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((starId) => (
                <Star key={starId} className={`w-5 h-5 ${starId <= Math.round(product.rating.rate) ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`} />
              ))}
            </div>
            <span className="text-slate-400 text-sm">({product.rating.count} reseñas)</span>
          </div>

          <div className="text-4xl font-bold text-slate-900 dark:text-white mb-6">${product.price}</div>

          {/* Size Selector for Detail Page */}
          {(product.category.toLowerCase().includes('clothing') || 
            product.category.toLowerCase().includes('ropa') || 
            product.category.toLowerCase().includes('shirt') ||
            product.category.toLowerCase().includes('jacket')) && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Selecciona Talla</h3>
              <div className="flex gap-3">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setShowSizeError(false); }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-medium transition-all
                      ${selectedSize === size 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110' 
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-500'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {showSizeError && <p className="text-sm text-red-500 mt-2 font-medium animate-fade-in">⚠️ Por favor selecciona una talla</p>}
            </div>
          )}

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 border-t border-b border-slate-100 dark:border-slate-800 py-6">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={handleAddToCart}
              className={`flex-1 bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/30 active:scale-95 text-lg font-medium ${showSizeError ? 'bg-red-500 hover:bg-red-600' : ''}`}
            >
              <ShoppingBag className="w-5 h-5" />
              Añadir a la Cesta
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span>Envío Gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span>Garantía de 2 años</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span>30 días devoluciones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <span>Reseñas Reales</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full font-medium">Fotos</span>
              </h2>
              <ReviewForm 
                  productId={product.id} 
                  onReviewAdded={() => setRefreshReviews(prev => prev + 1)} 
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
             <ReviewList productId={product.id} refreshTrigger={refreshReviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
