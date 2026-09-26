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

  // Touch swipe refs
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

  // Keyboard navigation for fullscreen gallery
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

  // Touch swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45 && touchEndX.current !== 0) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Format single-digit pagination to "01 / 03"
  const formattedIndex = String(activeIndex + 1).padStart(2, '0');
  const formattedTotal = String(images.length).padStart(2, '0');

  return (
    <div className="space-y-4">
      {/* Primary High-Resolution Stage */}
      <div
        onClick={() => setIsFullscreen(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-[4/3] sm:aspect-[1/1] w-full rounded-xs overflow-hidden bg-[#EFEAE2] border border-black/8 shadow-xs group cursor-zoom-in"
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
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full h-full"
          >
            <Image
              src={images[activeIndex]}
              alt={`${product.name} View ${activeIndex + 1}`}
              fill
              priority={activeIndex === 0}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          </motion.div>
        </AnimatePresence>

        {/* Hover Expand Hint (Desktop) */}
        <div className="hidden lg:flex absolute top-3 right-3 bg-[#111111]/70 hover:bg-[#111111] backdrop-blur-xs text-[#F8F6F2] p-2 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 items-center gap-1.5 text-[10px] font-sans tracking-wider uppercase">
          <Maximize2 className="w-3.5 h-3.5" />
          <span>FULLSCREEN</span>
        </div>

        {/* Real Pagination Counter Overlay (Mobile) */}
        <div className="absolute bottom-3 right-3 bg-[#111111]/85 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[10px] font-sans tracking-[0.16em] uppercase text-[#F8F6F2] border border-white/10 sm:hidden">
          {formattedIndex} / {formattedTotal}
        </div>
      </div>

      {/* Supporting Thumbnail Selector Bar */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={img + idx}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsZoomed(false);
                }}
                className={`relative aspect-[4/3] rounded-xs overflow-hidden bg-[#EFEAE2] border transition-all duration-200 cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'border-[#B8892D] ring-1 ring-[#B8892D] shadow-xs'
                    : 'border-black/8 opacity-75 hover:opacity-100 hover:border-black/20'
                }`}
                aria-label={`Select product image view ${idx + 1} of ${images.length}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="15vw"
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Premium Fullscreen Product Gallery (Portal) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isFullscreen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.995 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-70 bg-[#0D0D0D]/98 text-[#F8F6F2] flex flex-col justify-between overflow-hidden select-none"
                role="dialog"
                aria-modal="true"
                aria-label={`Fullscreen media viewer for ${product.name}`}
              >
                {/* Minimal Top Controls Bar */}
                <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between z-20 bg-[#0D0D0D]/90 backdrop-blur-xs">
                  {/* Left: Product Name & Collection */}
                  <div className="flex flex-col truncate max-w-[45%]">
                    <span className="text-[9px] font-sans text-[#B8892D] tracking-[0.2em] uppercase font-semibold truncate">
                      {product.collectionLabel || product.categoryLabel}
                    </span>
                    <h2 className="font-serif text-sm sm:text-base font-light text-[#F8F6F2] truncate">
                      {product.name}
                    </h2>
                  </div>

                  {/* Center: Pagination Counter */}
                  <div className="text-xs font-sans tracking-[0.25em] text-[#CCCCCC] uppercase font-medium">
                    {formattedIndex} <span className="text-white/30">/</span> {formattedTotal}
                  </div>

                  {/* Right: Zoom & Close Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#F8F6F2] hover:text-[#B8892D] transition-colors rounded-full hover:bg-white/10 cursor-pointer"
                      aria-label={isZoomed ? 'Reset Zoom' : 'Zoom In 1.5x'}
                      title={isZoomed ? 'Reset Zoom' : 'Zoom In'}
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
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#F8F6F2] hover:text-[#B8892D] transition-colors rounded-full hover:bg-white/10 cursor-pointer"
                      aria-label="Close Fullscreen Gallery"
                    >
                      <X className="w-5 h-5 stroke-[1.5]" />
                    </button>
                  </div>
                </header>

                {/* Main Fullscreen Stage */}
                <div
                  className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden p-4 sm:p-8"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Previous Control Button */}
                  {images.length > 1 && (
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 sm:left-6 z-20 min-h-[44px] min-w-[44px] p-2 rounded-full bg-[#161616]/80 hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] transition-all cursor-pointer flex items-center justify-center border border-white/10"
                      aria-label="Previous product image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}

                  {/* High Resolution Centered Image Canvas */}
                  <div
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={`relative w-full h-full max-w-5xl max-h-[82vh] overflow-hidden flex items-center justify-center cursor-${
                      isZoomed ? 'zoom-out' : 'zoom-in'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={images[activeIndex] + (isZoomed ? '-zoomed' : '-normal')}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={images[activeIndex]}
                          alt={`${product.name} - Fullscreen view ${activeIndex + 1}`}
                          fill
                          sizes="100vw"
                          className={`object-contain transition-transform duration-300 ease-out ${
                            isZoomed ? 'scale-[1.6]' : 'scale-100'
                          }`}
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Next Control Button */}
                  {images.length > 1 && (
                    <button
                      onClick={handleNext}
                      className="absolute right-4 sm:right-6 z-20 min-h-[44px] min-w-[44px] p-2 rounded-full bg-[#161616]/80 hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] transition-all cursor-pointer flex items-center justify-center border border-white/10"
                      aria-label="Next product image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Minimal Bottom Thumbnail Indicator Strip */}
                {images.length > 1 && (
                  <footer className="px-6 py-4 border-t border-white/10 flex items-center justify-center gap-3 z-20 bg-[#0D0D0D]/90 backdrop-blur-xs">
                    {images.map((img, idx) => (
                      <button
                        key={img + idx}
                        onClick={() => {
                          setActiveIndex(idx);
                          setIsZoomed(false);
                        }}
                        className={`relative w-12 h-9 sm:w-16 sm:h-12 rounded-xs overflow-hidden border transition-all cursor-pointer min-h-[36px] ${
                          activeIndex === idx
                            ? 'border-[#B8892D] ring-1 ring-[#B8892D]'
                            : 'border-white/20 opacity-50 hover:opacity-100'
                        }`}
                        aria-label={`Jump to image view ${idx + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover object-center"
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
    </div>
  );
}
