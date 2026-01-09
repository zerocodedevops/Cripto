import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OptimizedImageProps {
  readonly src: string;
  readonly alt: string;
  readonly className?: string;
  readonly width?: number | string;
  readonly height?: number | string;
}

export default function OptimizedImage({ src, alt, className = '', width, height }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* 1. Placeholder / Skeleton */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center"
          >
             <span className="sr-only">Cargando...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Actual Image */}
      {hasError ? (
        <div className="flex items-center justify-center w-full h-full bg-slate-100 dark:bg-slate-800 text-slate-400">
           <span className="text-xs">Sin imagen</span>
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`w-full h-full object-contain ${isLoaded ? '' : 'invisible'}`}
        />
      )}
    </div>
  );
}
