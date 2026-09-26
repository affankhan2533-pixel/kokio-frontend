'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';



import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import WishlistButton from '@components/common/WishlistButton';
import { useCartStore } from '@store/useCartStore';

export default function QuickView({ product, isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset selected variant whenever a new product is loaded
  useEffect(() => {
    if (product) {
      setSelectedColor(null);
      setIsAdded(false);
    }
  }, [product]);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !product) return null;

  const productUrl = `/products/${product.slug || product.id}`;
  const hasVariants = product.colors && product.colors.length > 0;
  const isVariantRequiredAndUnselected = hasVariants && !selectedColor;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isVariantRequiredAndUnselected) return;

    addItem({
      id: `${product.id}-${selectedColor || 'default'}`,
      productId: product.id,
      name: selectedColor ? `${product.name} (${selectedColor})` : product.name,
      price: product.price,
      rawPrice: product.rawPrice,
      image: product.image,
      variant: selectedColor || 'Default Edition',
      categoryLabel: product.categoryLabel,
      quantity: 1,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
      openCart();
    }, 400);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop (200-250ms fade) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0D0D0D]/75 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Panel (200-250ms scale & fade) */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Quick View: ${product.name}`}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl bg-[#F8F6F2] rounded-xs border border-black/10 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-[#161616] hover:text-[#B8892D] transition-colors cursor-pointer border border-black/10"
              aria-label="Close Quick View"
            >
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>

            {/* Left: Product Image Stage */}
            <div className="relative md:w-1/2 bg-white aspect-[4/5] md:aspect-auto md:min-h-[420px] flex items-center justify-center overflow-hidden p-6">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-contain object-center p-6"
                priority
              />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 bg-[#111111]/85 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[9px] font-sans text-[#EFEAE2] tracking-wider uppercase border border-white/10 max-w-[80%] truncate">
                {product.tag || `${product.brand || 'KOKIO'} • ${product.collectionLabel || product.categoryLabel}`}
              </div>

              {/* Discreet Wishlist Button */}
              <div className="absolute top-3 right-3 md:left-auto md:top-3 md:right-3">
                <div className="bg-white/80 hover:bg-white rounded-full border border-black/10 transition-colors shadow-xs">
                  <WishlistButton productId={product.id} productName={product.name} />
                </div>
              </div>
            </div>

            {/* Right: Inspection & Actions */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar space-y-6">
              <div className="space-y-4">
                {/* Collection Metadata */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[9px] font-sans tracking-[0.2em] text-[#888888] uppercase font-semibold">
                    <span className="text-[#B8892D] font-bold">{product.brand || 'KOKIO'}</span>
                    <span>•</span>
                    <span>{product.collectionLabel || product.categoryLabel}</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#161616] leading-snug">
                    {product.name}
                  </h2>
                  <div className="pt-1 font-sans text-lg font-semibold text-[#161616]">
                    {product.price}
                  </div>
                </div>

                {/* Short Verified Descriptor */}
                <p className="text-xs text-[#555555] font-light leading-relaxed border-t border-black/8 pt-3">
                  {product.story || product.specs}
                </p>

                {/* Mandatory Variants Selection */}
                {hasVariants && (
                  <div className="space-y-2 border-t border-black/8 pt-3">
                    <div className="flex items-center justify-between text-[10px] font-sans tracking-wider uppercase">
                      <span className="text-[#888888]">SELECT VARIANT:</span>
                      <span className="font-medium text-[#161616]">
                        {selectedColor || 'Required Selection'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      {product.colors.map((color, idx) => {
                        const isSelected = selectedColor === color;
                        return (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`min-h-[44px] px-3 py-1.5 rounded-xs border text-[11px] font-sans transition-all cursor-pointer flex items-center gap-2 ${isSelected
                                ? 'border-[#B8892D] bg-[#B8892D]/10 text-[#161616] font-semibold'
                                : 'border-black/15 bg-white text-[#555555] hover:border-black/40'
                              }`}
                            aria-label={`Select ${color} finish`}
                          >
                            <span
                              className={`w-2.5 h-2.5 rounded-full border border-black/20 ${idx === 0
                                  ? 'bg-[#C0C0C0]'
                                  : idx === 1
                                    ? 'bg-[#111]'
                                    : 'bg-[#B8892D]'
                                }`}
                            />
                            <span>{color}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase & Navigation CTAs */}
              <div className="space-y-3 pt-4 border-t border-black/8">
                {isVariantRequiredAndUnselected ? (
                  /* If variant required and not selected, show VIEW PIECE */
                  <Link
                    href={productUrl}
                    onClick={onClose}
                    className="w-full min-h-[44px] px-6 py-3 bg-[#161616] hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] rounded-xs text-xs font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>VIEW PIECE →</span>
                  </Link>
                ) : (
                  /* Variant chosen or single-edition: ADD TO BAG */
                  <button
                    onClick={handleAddToCart}
                    className="w-full min-h-[44px] px-6 py-3 bg-[#B8892D] hover:bg-[#161616] text-[#111111] hover:text-[#F8F6F2] rounded-xs text-xs font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-[#B8892D] hover:border-[#161616]"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD TO BAG</span>
                      </>
                    )}
                  </button>
                )}

                {/* Secondary EXPLORE Link */}
                <Link
                  href={productUrl}
                  onClick={onClose}
                  className="w-full min-h-[44px] py-2 text-center text-xs font-sans font-medium text-[#666666] hover:text-[#B8892D] transition-colors uppercase tracking-[0.16em] flex items-center justify-center gap-1 group"
                >
                  <span>EXPLORE FULL SPECIFICATIONS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
