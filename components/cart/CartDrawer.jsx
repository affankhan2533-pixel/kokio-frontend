'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';
import CartItem from '@components/cart/CartItem';
import CartSummary from '@components/cart/CartSummary';
import EmptyCart from '@components/cart/EmptyCart';

export default function CartDrawer() {
  const { isOpen, closeCart, items, cartItemsCount } = useCartStore();
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeCart();
    };

    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        closeCart();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-60 cursor-pointer"
          />

          {/* Right Slide-in Commerce Panel (Pure White Canvas, 400-440px width) */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 bottom-0 right-0 w-full sm:w-[420px] md:w-[440px] bg-white text-[#161616] z-60 shadow-xl flex flex-col justify-between overflow-hidden border-l border-[#EAEAEA] font-sans select-none"
          >
            {/* Header: YOUR BAG, item count, close */}
            <div className="px-6 py-5 border-b border-[#EAEAEA] flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-light tracking-wide text-[#161616]">
                  YOUR BAG
                </h3>
                <span className="text-xs font-sans text-[#777777] font-normal">
                  ({cartItemsCount})
                </span>
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="p-1 -mr-1 text-[#161616] hover:text-[#B8892D] transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Scrollable Items List or Empty State */}
            <div className="flex-1 px-6 overflow-y-auto no-scrollbar py-2">
              {items.length === 0 ? (
                <EmptyCart onClose={closeCart} />
              ) : (
                <div className="divide-y divide-[#EAEAEA]">
                  {items.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <CartItem item={item} compact onCloseDrawer={closeCart} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Clean Summary Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#EAEAEA] bg-white shrink-0">
                <CartSummary isDrawer onCloseDrawer={closeCart} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
