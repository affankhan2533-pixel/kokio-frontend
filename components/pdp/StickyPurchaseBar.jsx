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
    setTimeout(() => setIsAdded(false), 800);
    openCart();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md text-[#161616] border-t border-[#EAEAEA] shadow-sm py-2 px-4 sm:px-8"
          style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Product Name */}
            <div className="flex items-center gap-3 truncate">
              <h4 className="font-serif text-sm sm:text-base font-light text-[#161616] truncate">
                {product.name}
              </h4>
            </div>

            {/* Right: Price & Compact ADD TO BAG */}
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-sans text-xs sm:text-sm font-medium text-[#161616]">
                {product.price}
              </span>
              <button
                type="button"
                onClick={handleAddToCart}
                className="min-h-[44px] px-5 py-2.5 bg-[#161616] hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] rounded-xs text-xs font-sans font-medium tracking-[0.14em] uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                aria-label={`Add ${product.name} to bag`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD TO BAG</span>
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
