'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';

export default function StickyPurchaseBar({ product, selectedColor, quantity }) {
  const [visible, setVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled past 600px
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedColor || 'default'}`,
      productId: product.id,
      name: `${product.name} (${selectedColor || 'Default'})`,
      price: product.price,
      rawPrice: product.rawPrice,
      image: product.image,
      variant: selectedColor || 'Default Edition',
      categoryLabel: product.categoryLabel,
      quantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
    openCart();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#111111]/95 backdrop-blur-2xl text-[#F8F6F2] border-t border-white/10 shadow-2xl py-3 px-4 sm:px-6 md:px-12"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            {/* Left: Product Info */}
            <div className="flex items-center gap-3 truncate">
              <div className="space-y-0.5 truncate">
                <span className="text-[9px] font-sans text-[#B8892D] uppercase tracking-widest block font-semibold truncate">
                  {product.categoryLabel}
                </span>
                <h4 className="font-serif text-xs sm:text-base font-light text-[#F8F6F2] truncate">
                  {product.name}
                </h4>
              </div>
            </div>

            {/* Right: Price & Quick Buy Button */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <span className="font-sans text-xs sm:text-base font-semibold text-[#F8F6F2]">
                {product.price}
              </span>
              <button
                onClick={handleAddToCart}
                className="min-h-[44px] px-4 sm:px-6 py-2.5 bg-[#B8892D] hover:bg-white text-[#111111] rounded-xs text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 sm:gap-2 cursor-pointer"
                aria-label={`Add ${product.name} to bag`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">ADDED TO BAG</span>
                    <span className="sm:hidden">ADDED</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">ADD TO BAG</span>
                    <span className="sm:hidden">ADD</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
