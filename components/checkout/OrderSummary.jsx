'use client';

import Image from 'next/image';
import { useCartStore } from '@store/useCartStore';

export default function OrderSummary({ isMobile = false }) {
  const { items, subtotal, cartItemsCount } = useCartStore();
  const formattedSubtotal = `₹${subtotal.toLocaleString('en-IN')}`;

  return (
    <div className="bg-white border border-[#EAEAEA] rounded-xs p-5 sm:p-6 space-y-6 text-[#161616]">
      
      {/* Summary Header */}
      <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4">
        <h2 className="font-serif text-lg sm:text-xl font-light text-[#161616]">
          ORDER SUMMARY
        </h2>
        <span className="text-[11px] font-sans text-[#777777] font-medium tracking-wide">
          {cartItemsCount} {cartItemsCount === 1 ? 'ITEM' : 'ITEMS'}
        </span>
      </div>

      {/* Items List */}
      <div className="divide-y divide-[#EAEAEA] max-h-[380px] overflow-y-auto no-scrollbar pr-1">
        {items.map((item) => {
          const unitPriceNum = item.rawPrice || parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0;
          const lineTotal = unitPriceNum * (item.quantity || 1);

          return (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-3 sm:gap-4">
              
              {/* Product Thumbnail (1:1 White Canvas, Object Contain) */}
              <div className="relative w-16 h-16 bg-white rounded-xs border border-[#EAEAEA] overflow-hidden shrink-0 p-1.5">
                <Image
                  src={item.image || '/images/kokio_monolith_carryon.jpg'}
                  alt={item.name}
                  fill
                  className="object-contain object-center"
                  sizes="64px"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0 space-y-0.5">
                <span className="text-[9px] font-sans text-[#777777] uppercase tracking-wider block truncate">
                  {item.collection || item.collectionLabel || 'KOKIO'}
                </span>
                <h3 className="font-serif text-sm font-light text-[#161616] truncate">
                  {item.name}
                </h3>
                {item.variant && item.variant !== 'Default' && item.variant !== 'Default Edition' && (
                  <p className="text-[11px] font-sans text-[#777777]">
                    Colour: {item.variant}
                  </p>
                )}
                <div className="text-[11px] font-sans text-[#777777] pt-0.5">
                  Qty: {item.quantity}
                </div>
              </div>

              {/* Line Total */}
              <div className="text-right shrink-0">
                <span className="font-sans text-xs sm:text-sm font-medium text-[#161616]">
                  ₹{lineTotal.toLocaleString('en-IN')}
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Totals Breakdown - Verified Subtotal & Total only */}
      <div className="space-y-3 border-t border-[#EAEAEA] pt-4 text-xs font-sans">
        <div className="flex items-center justify-between text-[#777777]">
          <span className="tracking-[0.08em] uppercase">SUBTOTAL</span>
          <span className="font-medium text-[#161616]">{formattedSubtotal}</span>
        </div>
        
        <div className="border-b border-[#EAEAEA] pt-1" />

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-sans tracking-[0.12em] uppercase font-semibold text-[#161616]">
            TOTAL
          </span>
          <span className="font-sans text-base sm:text-lg font-semibold text-[#161616]">
            {formattedSubtotal}
          </span>
        </div>
      </div>

    </div>
  );
}
