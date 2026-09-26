'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
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
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60 cursor-pointer"
          />

          {/* Right Slide-in Drawer Container */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 bottom-0 right-0 w-full sm:w-[420px] md:w-[440px] bg-[#F8F6F2] text-[#161616] z-60 shadow-2xl flex flex-col justify-between overflow-hidden border-l border-black/10 selection:bg-[#B8892D]/30"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between shrink-0 bg-[#F8F6F2]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#B8892D]" />
                <h3 className="font-serif text-xl font-light text-[#161616]">YOUR BAG</h3>
                <span className="px-2 py-0.5 bg-[#111111] text-[#F8F6F2] text-[10px] font-sans rounded-full font-bold">
                  {cartItemsCount}
                </span>
              </div>

              <button
                onClick={closeCart}
                className="p-2 -mr-2 text-[#161616] hover:text-[#B8892D] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Items List or Empty State with Stagger */}
            <div className="flex-1 px-6 overflow-y-auto no-scrollbar py-2">
              {items.length === 0 ? (
                <EmptyCart onClose={closeCart} />
              ) : (
                <div className="divide-y divide-black/8">
                  {items.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2, delay: idx * 0.05, ease: 'easeOut' }}
                    >
                      <CartItem item={item} compact onCloseDrawer={closeCart} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Summary Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-black/10 bg-white/90 backdrop-blur-md shrink-0 shadow-lg">
                <CartSummary isDrawer onCloseDrawer={closeCart} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
