'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export default function ProductGallery({ product }) {
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Touch swipe tracking
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  // Keyboard navigation for fullscreen modal
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen, images.length]);

  // Touch gestures for mobile native swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40 && touchEndX.current !== 0) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const formattedIndex = String(activeIndex + 1).padStart(2, '0');
  const formattedTotal = String(images.length).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4 select-none"
    >
      {/* Primary Product Canvas (Pure white, no heavy border, generous scale) */}
      <div
        onClick={() => setIsFullscreen(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-[1/1] w-full bg-white flex items-center justify-center overflow-hidden group cursor-zoom-in"
        role="button"
        tabIndex={0}
        aria-label={`Open fullscreen view of ${product.name}, image ${activeIndex + 1} of ${images.length}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFullscreen(true);
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={images[activeIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={images[activeIndex]}
              alt={`${product.name} View ${activeIndex + 1}`}
              fill
              priority={activeIndex === 0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain object-center p-6 sm:p-10 lg:p-12 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.018]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Quiet Desktop Fullscreen Trigger */}
        <div className="hidden lg:flex absolute bottom-3 right-3 text-[#777777] hover:text-[#161616] p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 items-center gap-1 text-[11px] font-sans uppercase tracking-wider">
          <Maximize2 className="w-3.5 h-3.5" />
          <span>EXPAND</span>
        </div>

        {/* Discreet Mobile Pagination Badge */}
        {images.length > 1 && (
          <div className="sm:hidden absolute bottom-3 right-3 text-[11px] font-sans tracking-widest text-[#777777] bg-white/90 backdrop-blur-xs px-2 py-0.5 border border-black/10 rounded-xs">
            {formattedIndex} / {formattedTotal}
          </div>
        )}
      </div>

      {/* Supporting Minimal Thumbnails (Desktop/Tablet) */}
      {images.length > 1 && (
        <div className="hidden sm:flex items-center gap-3 pt-1 overflow-x-auto no-scrollbar">
          {images.map((img, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={img + idx}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsZoomed(false);
                }}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-white shrink-0 overflow-hidden cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'border-b-2 border-[#B8892D]'
                    : 'border-b-2 border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label={`Select product image view ${idx + 1} of ${images.length}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain object-center p-1.5"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Product Gallery (Portal) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isFullscreen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-70 bg-white text-[#161616] flex flex-col justify-between overflow-hidden select-none"
                role="dialog"
                aria-modal="true"
                aria-label={`Fullscreen media viewer for ${product.name}`}
              >
                {/* Minimal Header */}
                <header className="px-6 py-4 border-b border-[#EAEAEA] flex items-center justify-between z-20 bg-white">
                  <div className="flex flex-col truncate max-w-[45%]">
                    <span className="text-[10px] font-sans text-[#777777] uppercase tracking-[0.14em] font-medium truncate">
                      {product.collectionLabel || product.categoryLabel}
                    </span>
                    <h2 className="font-serif text-base sm:text-lg font-light text-[#161616] truncate">
                      {product.name}
                    </h2>
                  </div>

                  {/* Centered Counter (Fade on change) */}
                  <motion.div
                    key={formattedIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-sans tracking-[0.2em] text-[#777777] uppercase"
                  >
                    {formattedIndex} / {formattedTotal}
                  </motion.div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#161616] hover:text-[#B8892D] transition-colors cursor-pointer"
                      aria-label={isZoomed ? 'Reset Zoom' : 'Zoom In'}
                    >
                      {isZoomed ? (
                        <ZoomOut className="w-5 h-5 stroke-[1.5]" />
                      ) : (
                        <ZoomIn className="w-5 h-5 stroke-[1.5]" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setIsFullscreen(false);
                        setIsZoomed(false);
                      }}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#161616] hover:text-[#B8892D] transition-colors cursor-pointer"
                      aria-label="Close Fullscreen Gallery"
                    >
                      <X className="w-5 h-5 stroke-[1.5]" />
                    </button>
                  </div>
                </header>

                {/* Main Fullscreen Stage */}
                <div
                  className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden p-4 sm:p-10"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {images.length > 1 && (
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 sm:left-8 z-20 min-h-[44px] min-w-[44px] text-[#161616] hover:text-[#B8892D] transition-all cursor-pointer flex items-center justify-center group"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 stroke-[1.5] transition-transform duration-200 group-hover:-translate-x-[3px]" />
                    </button>
                  )}

                  <div
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={`relative w-full h-full max-w-4xl max-h-[80vh] overflow-hidden flex items-center justify-center cursor-${
                      isZoomed ? 'zoom-out' : 'zoom-in'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={images[activeIndex] + (isZoomed ? '-zoomed' : '-normal')}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={images[activeIndex]}
                          alt={`${product.name} - View ${activeIndex + 1}`}
                          fill
                          sizes="100vw"
                          className={`object-contain transition-transform duration-300 ease-out ${
                            isZoomed ? 'scale-[1.5]' : 'scale-100'
                          }`}
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {images.length > 1 && (
                    <button
                      onClick={handleNext}
                      className="absolute right-4 sm:right-8 z-20 min-h-[44px] min-w-[44px] text-[#161616] hover:text-[#B8892D] transition-all cursor-pointer flex items-center justify-center group"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 stroke-[1.5] transition-transform duration-200 group-hover:translate-x-[3px]" />
                    </button>
                  )}
                </div>

                {/* Minimal Bottom Thumbnail Strip */}
                {images.length > 1 && (
                  <footer className="px-6 py-3 border-t border-[#EAEAEA] flex items-center justify-center gap-3 z-20 bg-white">
                    {images.map((img, idx) => (
                      <button
                        key={img + idx}
                        onClick={() => {
                          setActiveIndex(idx);
                          setIsZoomed(false);
                        }}
                        className={`relative w-12 h-12 rounded-xs overflow-hidden cursor-pointer transition-all ${
                          activeIndex === idx
                            ? 'border-b-2 border-[#B8892D]'
                            : 'border-b-2 border-transparent opacity-50 hover:opacity-100'
                        }`}
                        aria-label={`Jump to image ${idx + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          sizes="48px"
                          className="object-contain object-center p-1"
                        />
                      </button>
                    ))}
                  </footer>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.div>
  );
}
