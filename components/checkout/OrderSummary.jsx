'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Truck, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';

export default function OrderSummary({ isMobile = false }) {
  const { items, subtotal, cartItemsCount } = useCartStore();

  const formattedSubtotal = `₹${subtotal.toLocaleString('en-IN')}`;

  return (
    <div className={`space-y-6 text-[#161616] ${isMobile ? '' : ''}`}>
      
      {/* Summary Header */}
      <div className="flex items-center justify-between border-b border-black/10 pb-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-[#B8892D]" />
          <h2 className="font-serif text-xl font-light text-[#161616]">ORDER SUMMARY</h2>
        </div>
        <span className="text-xs font-sans text-[#777777] uppercase font-semibold">
          {cartItemsCount} {cartItemsCount === 1 ? 'ITEM' : 'ITEMS'}
        </span>
      </div>

      {/* Items List */}
      <div className="divide-y divide-black/8 max-h-[360px] overflow-y-auto no-scrollbar pr-1">
        {items.map((item) => (
          <div key={item.id} className="py-4 first:pt-0 flex items-start gap-4">
            
            {/* Thumbnail */}
            <div className="relative w-16 h-20 bg-[#F0ECE1] rounded-lg overflow-hidden shrink-0 border border-black/8">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover object-center"
                sizes="64px"
              />
              <span className="absolute top-1 right-1 bg-[#161616] text-[#F8F6F2] text-[10px] font-sans w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {item.quantity}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-1">
              <span className="text-[9px] font-sans text-[#777777] uppercase tracking-widest block">
                {item.collection || 'KOKIO ESSENTIALS'}
              </span>
              <h4 className="font-serif text-sm text-[#161616] truncate font-medium">
                {item.name}
              </h4>
              {item.selectedVariant && (
                <p className="text-[11px] font-sans text-[#555555]">
                  Color: <span className="font-semibold">{item.selectedVariant.name}</span>
                </p>
              )}
              <div className="text-xs font-sans text-[#777777] pt-0.5">
                {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Line Total */}
            <div className="text-right shrink-0">
              <span className="font-sans text-sm font-semibold text-[#161616]">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Delivery strip */}
      <div className="bg-[#EFEAE2] p-3.5 rounded-xl border border-black/8 flex items-center gap-3 text-xs text-[#555555]">
        <Truck className="w-4 h-4 text-[#B8892D] shrink-0" />
        <div className="space-y-0.5">
          <p className="text-[11px] font-sans uppercase font-bold text-[#161616]">
            INSURED INDIA DELIVERY
          </p>
          <p className="text-[10px] font-sans text-[#666666]">
            Insured courier transit across all Indian postal codes.
          </p>
        </div>
      </div>

      {/* Totals Breakdown */}
      <div className="space-y-2.5 border-t border-b border-black/10 py-4 text-xs font-sans">
        <div className="flex items-center justify-between text-[#666666]">
          <span>SUBTOTAL</span>
          <span className="font-semibold text-[#161616]">{formattedSubtotal}</span>
        </div>
        <div className="flex items-center justify-between text-[#666666]">
          <span>DELIVERY</span>
          <span className="text-[#2E7D32] font-semibold">INCLUDED</span>
        </div>
        <div className="flex items-center justify-between text-[#666666]">
          <span>TAXES</span>
          <span className="text-[#161616]">INCLUDED</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-black/8 text-sm font-semibold">
          <span className="font-serif uppercase tracking-wider text-[#161616]">TOTAL</span>
          <span className="font-sans text-lg text-[#161616] font-bold">{formattedSubtotal}</span>
        </div>
      </div>

      {/* Guarantee Note */}
      <div className="flex items-center justify-center gap-2 text-[10px] font-sans text-[#777777] uppercase pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-[#B8892D]" />
        <span>KOKIO Care Warranty & Services Included</span>
      </div>

    </div>
  );
}
