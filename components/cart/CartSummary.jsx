'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Truck, Sparkles, Check } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';

export default function CartSummary({ isDrawer = false, onCloseDrawer }) {
  const { subtotal } = useCartStore();

  const formattedSubtotal = `₹${subtotal.toLocaleString('en-IN')}`;

  return (
    <div className="space-y-4 text-[#161616]">
      {/* Subtotal Row */}
      <div className="space-y-2 border-t border-black/10 pt-4">
        <div className="flex items-center justify-between font-serif">
          <span className="text-sm uppercase tracking-wider text-[#777777] font-sans text-xs font-semibold">SUBTOTAL</span>
          <span className="text-xl sm:text-2xl font-semibold text-[#161616] font-sans">{formattedSubtotal}</span>
        </div>
        <p className="text-[11px] text-[#777777] font-light leading-tight font-sans">
          Taxes included. Insured domestic delivery calculated at checkout across India.
        </p>
      </div>

      {/* Verified India Shipping Tag */}
      <div className="bg-[#EFEAE2]/60 rounded-xs p-3 border border-black/8 flex items-center gap-2 text-xs text-[#555555]">
        <Truck className="w-4 h-4 text-[#B8892D] shrink-0" />
        <span className="text-[11px] font-sans uppercase font-medium">
          Insured Express Delivery Across India
        </span>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-2 pt-2">
        <Link
          href="/checkout"
          onClick={isDrawer ? onCloseDrawer : undefined}
          className="btn-primary-gold w-full min-h-[48px]"
        >
          <span>PROCEED TO CHECKOUT</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>

        {isDrawer ? (
          <Link
            href="/cart"
            onClick={onCloseDrawer}
            className="btn-secondary-luxury w-full min-h-[44px]"
          >
            <span>VIEW FULL BAG</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B8892D]" />
          </Link>
        ) : (
          <Link
            href="/collections/all"
            className="btn-secondary-luxury w-full min-h-[44px]"
          >
            <span>CONTINUE EXPLORING</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B8892D]" />
          </Link>
        )}
      </div>

      {/* Trust Guarantee */}
      <div className="pt-1 flex items-center justify-center gap-2 text-[11px] font-sans text-[#777777] uppercase">
        <ShieldCheck className="w-3.5 h-3.5 text-[#B8892D]" />
        <span>KOKIO Care Warranty & Services</span>
      </div>
    </div>
  );
}
