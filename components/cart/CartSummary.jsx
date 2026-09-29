'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '@store/useCartStore';

export default function CartSummary({ isDrawer = false, onCloseDrawer }) {
  const { subtotal } = useCartStore();
  const formattedSubtotal = `₹${subtotal.toLocaleString('en-IN')}`;

  return (
    <div className="space-y-4 text-[#161616]">
      {/* Subtotal Row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-sans tracking-[0.12em] uppercase text-[#777777] font-medium">
          SUBTOTAL
        </span>
        <motion.span
          key={formattedSubtotal}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-base sm:text-lg font-medium text-[#161616]"
        >
          {formattedSubtotal}
        </motion.span>
      </div>

      {!isDrawer && (
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-sans tracking-[0.12em] uppercase text-[#161616] font-semibold">
            TOTAL
          </span>
          <span className="font-sans text-base sm:text-lg font-semibold text-[#161616]">
            {formattedSubtotal}
          </span>
        </div>
      )}

      {/* Thin Divider */}
      <div className="border-b border-[#EAEAEA]" />

      {/* Buttons (Approved KOKIO Luxury System) */}
      <div className="space-y-2 pt-1">
        {/* Primary CTA: CHECKOUT → */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/checkout"
            onClick={isDrawer ? onCloseDrawer : undefined}
            className="w-full min-h-[44px] px-6 py-3 bg-[#161616] hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] rounded-xs text-xs font-sans font-medium tracking-[0.14em] uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer group"
          >
            <span>CHECKOUT</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
          </Link>
        </motion.div>

        {/* Secondary Action */}
        {isDrawer ? (
          <Link
            href="/cart"
            onClick={onCloseDrawer}
            className="w-full min-h-[42px] px-6 py-2.5 bg-white hover:bg-[#F8F6F2] text-[#161616] border border-[#EAEAEA] rounded-xs text-xs font-sans font-medium tracking-[0.14em] uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer group"
          >
            <span>VIEW BAG</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-[2px]">→</span>
          </Link>
        ) : (
          <Link
            href="/collections/all"
            className="w-full min-h-[42px] px-6 py-2.5 bg-white hover:bg-[#F8F6F2] text-[#161616] border border-[#EAEAEA] rounded-xs text-xs font-sans font-medium tracking-[0.14em] uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer group"
          >
            <span>CONTINUE EXPLORING</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-[2px]">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
