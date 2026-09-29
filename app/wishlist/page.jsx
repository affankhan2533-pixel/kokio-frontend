'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Heart, Sparkles, RotateCcw } from 'lucide-react';
import Header from '@components/navigation/Header';
import MinimalLuxuryFooter from '@components/common/MinimalLuxuryFooter';
import { useWishlistStore } from '@store/useWishlistStore';
import { PRODUCTS_CATALOG } from '@lib/catalogData';

const INITIAL_WISHLIST_IDS = [
  'monolith-carryon-35l',
  'horizon-leather-weekender',
  'apex-titanium-trunk-88l',
  'florentine-crossbody-sling',
];

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { wishlistIds, removeWishlist, clearWishlist, addWishlist } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const wishlistItems = useMemo(() => {
    if (!mounted) {
      return PRODUCTS_CATALOG.filter((p) => INITIAL_WISHLIST_IDS.includes(p.id));
    }
    return PRODUCTS_CATALOG.filter((p) => wishlistIds.includes(p.id));
  }, [mounted, wishlistIds]);

  const handleRemove = (productId) => {
    removeWishlist(productId);
  };

  const handleClearAll = () => {
    clearWishlist();
  };

  const handleResetSample = () => {
    INITIAL_WISHLIST_IDS.forEach((id) => addWishlist(id));
  };

  return (
    <div className="min-h-screen bg-white text-[#161616] flex flex-col font-sans selection:bg-[#B8892D]/20 selection:text-[#161616]">
      {/* Universal Navigation Header */}
      <Header />

      <main className="flex-1 w-full pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
          
          {/* Breadcrumbs & Title */}
          <div className="space-y-3 border-b border-[#EAEAEA] pb-6">
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] font-sans tracking-widest text-[#777777] uppercase font-semibold">
              <Link href="/" className="hover:text-[#161616] transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-[#161616] font-medium">WISHLIST</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161616]">
                  WISHLIST
                </h1>
                <p className="text-xs sm:text-sm text-[#666666] font-light mt-1 font-sans">
                  Pieces you&apos;ve chosen to revisit.
                </p>
              </div>

              {/* State Controls for Visual QA */}
              <div className="flex items-center gap-3">
                {wishlistItems.length > 0 ? (
                  <button
                    onClick={handleClearAll}
                    className="text-xs font-sans text-[#777777] hover:text-[#B8892D] transition-colors uppercase cursor-pointer tracking-wider"
                  >
                    CLEAR ALL ({wishlistItems.length})
                  </button>
                ) : (
                  <button
                    onClick={handleResetSample}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#B8892D] hover:underline uppercase cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>LOAD SAMPLE PIECES</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Wishlist Content */}
          {wishlistItems.length === 0 ? (
            /* EMPTY STATE */
            <div className="max-w-xl mx-auto text-center py-16 sm:py-24 px-6 space-y-5 animate-kokio-fade">
              <div className="w-12 h-12 rounded-full bg-[#EFEAE2] flex items-center justify-center mx-auto text-[#B8892D]">
                <Heart className="w-6 h-6 stroke-[1.5]" />
              </div>
              
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#161616]">
                  YOUR WISHLIST IS EMPTY
                </h2>
                <p className="text-xs sm:text-sm text-[#777777] font-light leading-relaxed max-w-md mx-auto font-sans">
                  Save pieces you love and return to them whenever you&apos;re ready.
                </p>
              </div>

              <div className="pt-3">
                <Link
                  href="/collections/all"
                  className="btn-primary-gold"
                >
                  <span>EXPLORE COLLECTIONS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* POPULATED STATE: Responsive 2-column (mobile) & 4-column (desktop) Grid */
            <div className="space-y-6">
              <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                <AnimatePresence mode="popLayout">
                  {wishlistItems.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      key={item.id}
                      className="group bg-white rounded-xs border border-[#EAEAEA] overflow-hidden flex flex-col justify-between hover:border-[#161616] transition-all duration-300"
                    >
                      {/* Image Area with Remove Button */}
                      <div className="relative aspect-[1/1] bg-white overflow-hidden p-3 border-b border-[#EAEAEA]">
                        <Link href={`/products/${item.slug}`} className="block w-full h-full relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain object-center group-hover:scale-[1.02] transition-transform duration-300"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </Link>

                        {/* Discreet Remove Button */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 hover:bg-[#161616] text-[#777777] hover:text-white rounded-full transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center border border-[#EAEAEA]"
                          aria-label={`Remove ${item.name} from wishlist`}
                          title="Remove"
                        >
                          <X className="w-3.5 h-3.5 stroke-[1.5]" />
                        </button>
                      </div>

                      {/* Product Metadata */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <span className="text-[9px] font-sans text-[#888888] uppercase tracking-widest font-semibold block truncate">
                            {item.collectionLabel || item.collection}
                          </span>
                          <Link href={`/products/${item.slug}`}>
                            <h3 className="font-serif text-sm sm:text-base text-[#161616] group-hover:text-[#B8892D] transition-colors leading-snug line-clamp-2 font-light">
                              {item.name}
                            </h3>
                          </Link>
                        </div>

                        <div className="pt-2 border-t border-black/6 flex items-center justify-between">
                          <span className="font-sans text-xs sm:text-sm font-semibold text-[#161616]">
                            {item.price}
                          </span>
                          <Link
                            href={`/products/${item.slug}`}
                            className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold tracking-wider uppercase text-[#B8892D] hover:underline"
                          >
                            <span>EXPLORE</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Informational banner */}
              <div className="py-4 px-6 bg-[#EFEAE2]/60 rounded-xs border border-black/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#666666]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B8892D] shrink-0" />
                  <span>Wishlist items are saved in this session. Sign in to synchronize across devices.</span>
                </div>
                <Link
                  href="/account"
                  className="text-[#161616] font-semibold hover:text-[#B8892D] transition-colors uppercase whitespace-nowrap"
                >
                  SIGN IN TO SAVE →
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Minimal Footer */}
      <MinimalLuxuryFooter />
    </div>
  );
}
