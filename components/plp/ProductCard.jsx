'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, ArrowUpRight } from 'lucide-react';
import WishlistButton from '@components/common/WishlistButton';
import QuickView from '@components/plp/QuickView';

export default function ProductCard({ product }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
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

  // Determine clean brand badge label (e.g. "KOKIO • ONLINE EXCLUSIVE")
  const badgeLabel = product.tag || (product.brand ? `${product.brand} • EXCLUSIVE` : 'KOKIO');

  return (
    <>
      <article className="group relative bg-white flex flex-col justify-between h-full select-none">
        
        {/* Top Product Badge (TUMI Style: KOKIO • ONLINE EXCLUSIVE) */}
        <div className="h-5 flex items-center justify-center mb-1">
          {badgeLabel && (
            <span className="text-[10px] font-sans text-[#777777] uppercase tracking-[0.16em] font-medium text-center truncate px-1">
              {badgeLabel}
            </span>
          )}
        </div>

        {/* Product Image Stage (Floating on pure white canvas) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white flex items-center justify-center">
          <Link href={productUrl} className="block w-full h-full relative" aria-label={`View ${product.name}`}>
            {/* Primary Image */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-contain object-center p-1 transition-all duration-300 ease-out ${
                hasSecondaryImage ? 'group-hover:opacity-0' : 'group-hover:scale-[1.02]'
              }`}
              loading="lazy"
            />

            {/* Real Secondary Image (Crossfade on hover if available) */}
            {hasSecondaryImage && (
              <Image
                src={secondaryImage}
                alt={`${product.name} alternate view`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain object-center p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                loading="lazy"
              />
            )}
          </Link>

          {/* Discreet Top Right Wishlist Action */}
          <div className="absolute top-1.5 right-1.5 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/80 hover:bg-white rounded-full p-0.5 transition-colors">
              <WishlistButton
                productId={product.id}
                productName={product.name}
                size="sm"
                className="!text-[#161616] hover:!text-[#B8892D]"
              />
            </div>
          </div>

          {/* Subtle Quick View Hover Bar (Desktop Only) */}
          <div className="hidden lg:block absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-10">
            <button
              type="button"
              onClick={handleOpenQuickView}
              className="w-full bg-[#161616]/90 hover:bg-[#161616] text-[#F8F6F2] text-[11px] font-sans font-medium tracking-wider uppercase py-2 px-3 rounded-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm backdrop-blur-xs transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#B8892D]" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Product Information Section (Understated TUMI-Style Hierarchy) */}
        <div className="pt-3 pb-2 text-center space-y-1">
          {/* Collection / Brand Identifier */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-sans tracking-[0.16em] text-[#777777] uppercase font-medium truncate">
            <span className="text-[#161616] font-semibold">{product.brand || 'KOKIO'}</span>
            <span>•</span>
            <span>{product.collectionLabel || product.categoryLabel}</span>
          </div>

          {/* Product Name */}
          <Link href={productUrl} className="block group-hover:text-[#B8892D] transition-colors">
            <h3 className="font-serif text-sm sm:text-[15px] font-light text-[#161616] leading-snug truncate">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="pt-0.5">
            <span className="font-sans text-xs sm:text-sm font-semibold text-[#161616]">
              {product.price}
            </span>
          </div>
        </div>

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
