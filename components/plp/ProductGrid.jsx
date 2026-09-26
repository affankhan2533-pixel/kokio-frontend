'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@components/plp/ProductCard';

export default function ProductGrid({ products, showFilters, onReset }) {
  if (products.length === 0) {
    return (
      <div className="py-24 px-6 text-center space-y-4 max-w-md mx-auto">
        <span className="text-xs font-sans tracking-[0.25em] font-semibold text-[#B8892D] uppercase block">
          NO MATCHES FOUND
        </span>
        <h3 className="font-serif text-2xl font-light text-[#161616]">
          No pieces match your selected filters
        </h3>
        <p className="text-xs text-[#666666] font-light leading-relaxed font-sans">
          Try clearing selected filters or changing your criteria to view available pieces.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onReset}
            className="btn-primary-luxury text-xs"
          >
            CLEAR ALL FILTERS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-10 sm:gap-y-14 ${
        showFilters
          ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
      }`}
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
