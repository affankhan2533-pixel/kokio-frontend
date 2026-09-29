'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import WishlistButton from '@components/common/WishlistButton';
import QuickView from '@components/plp/QuickView';
import { useCompareStore } from '@store/useCompareStore';

export default function ProductCard({ product }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { compareList, toggleCompare } = useCompareStore();
  const isComparing = compareList.includes(product.id);
  const productUrl = `/products/${product.slug || product.id}`;

  // Audit real secondary image from gallery (never fabricate or duplicate)
  const hasSecondaryImage = Boolean(
    product.gallery &&
      product.gallery.length > 1 &&
      product.gallery[1] &&
      product.gallery[1] !== product.image
  );
  const secondaryImage = hasSecondaryImage ? product.gallery[1] : null;

  const handleOpenQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const handleToggleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product.id);
  };

  // Restrained collection label
  const collectionLabel = product.collectionLabel || product.categoryLabel || 'KOKIO';

  return (
    <>
      <article className="group relative bg-white flex flex-col justify-between h-full select-none">
        
        {/* Product Image Stage (Floating on pure white canvas, no card background, no shadow, no border) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white flex items-center justify-center">
          <Link href={productUrl} className="block w-full h-full relative" aria-label={`View ${product.name}`}>
            {/* Primary Image: scale 1.018, 250-300ms ease */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-contain object-center p-6 sm:p-8 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                hasSecondaryImage
                  ? 'group-hover:opacity-0'
                  : 'group-hover:scale-[1.018]'
              }`}
              loading="lazy"
            />

            {/* Real Secondary Image: crossfade 250-300ms on hover */}
            {hasSecondaryImage && (
              <Image
                src={secondaryImage}
                alt={`${product.name} alternate view`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain object-center p-6 sm:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-280 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.018]"
                loading="lazy"
              />
            )}
          </Link>

          {/* Discreet Secondary Compare Action (Appears quietly on desktop hover/focus) */}
          <div className="hidden lg:block absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]">
            <button
              type="button"
              onClick={handleToggleCompare}
              className={`inline-flex items-center gap-1.5 text-[10px] font-sans tracking-wider uppercase transition-colors cursor-pointer py-1 px-1.5 ${
                isComparing ? 'text-[#B8892D] font-medium' : 'text-[#777777] hover:text-[#161616]'
              }`}
              aria-label={isComparing ? `Remove ${product.name} from comparison` : `Compare ${product.name}`}
            >
              <span
                className={`w-3 h-3 rounded-[1px] border flex items-center justify-center shrink-0 transition-colors ${
                  isComparing ? 'border-[#B8892D] bg-[#B8892D]' : 'border-black/30 bg-white hover:border-black/60'
                }`}
              >
                {isComparing && <Check className="w-2 h-2 text-white stroke-[3]" />}
              </span>
              <span>Compare</span>
            </button>
          </div>

          {/* Small Quiet Minimal Wishlist Heart (No filled circle behind it) */}
          <div className="absolute top-1 right-1 z-10">
            <WishlistButton
              productId={product.id}
              productName={product.name}
              size="sm"
              className="!min-h-[36px] !min-w-[36px] !p-1 hover:!text-[#B8892D]"
            />
          </div>

          {/* Desktop Hover Action: QUICK VIEW → (Subtle text action, no black rectangular button, no heavy overlay) */}
          <div className="hidden lg:flex absolute bottom-2.5 inset-x-0 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none z-10">
            <button
              type="button"
              onClick={handleOpenQuickView}
              className="pointer-events-auto inline-flex items-center gap-1 text-[11px] font-sans font-medium tracking-[0.14em] uppercase text-[#161616] hover:text-[#B8892D] transition-colors cursor-pointer py-1 px-2 group/qv"
            >
              <span>QUICK VIEW</span>
              <span className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/qv:translate-x-[3px] group-hover:translate-x-[3px]">→</span>
            </button>
          </div>
        </div>

        {/* Product Information (Restrained TUMI Rhythm) */}
        <div className="pt-3 pb-3 text-center space-y-1">
          {/* SMALL COLLECTION LABEL */}
          <div className="text-[10px] font-sans tracking-[0.12em] text-[#777777] uppercase font-medium truncate px-1">
            {collectionLabel}
          </div>

          {/* Product Name (Cormorant Garamond, subtle translateY(-1px) on hover) */}
          <Link href={productUrl} className="block transition-transform duration-200 group-hover:-translate-y-[1px]">
            <h3 className="font-serif text-[16px] sm:text-[18px] font-light text-[#161616] leading-snug truncate hover:text-[#B8892D] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* ₹ PRICE */}
          <div className="pt-0.5">
            <span className="font-sans text-xs sm:text-[13px] font-medium text-[#161616]">
              {product.price}
            </span>
          </div>

          {/* Consistent Variant Indicator Slot (ensures all card heights and dividers strictly align) */}
          <div className="h-4 flex items-center justify-center gap-1.5 pt-0.5">
            {product.colors && product.colors.length > 1 ? (
              product.colors.map((color, idx) => (
                <span
                  key={color}
                  title={color}
                  className={`w-1.5 h-1.5 rounded-full border border-black/20 ${
                    idx === 0
                      ? 'bg-[#B0B0B0]'
                      : idx === 1
                      ? 'bg-[#1A1A1A]'
                      : 'bg-[#B8892D]'
                  }`}
                />
              ))
            ) : null}
          </div>
        </div>

        {/* Thin divider below the product information */}
        <div className="w-full border-b border-[#EAEAEA]" />

      </article>

      {/* Quick View Modal Portal */}
      <QuickView
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
