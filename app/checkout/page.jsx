'use client';

import Link from 'next/link';
import CheckoutHeader from '@components/checkout/CheckoutHeader';
import CheckoutForm from '@components/checkout/CheckoutForm';
import OrderSummary from '@components/checkout/OrderSummary';
import EmptyCart from '@components/cart/EmptyCart';
import MinimalLuxuryFooter from '@components/common/MinimalLuxuryFooter';
import { useCartStore } from '@store/useCartStore';

export default function CheckoutPage() {
  const { items, subtotal, cartItemsCount } = useCartStore();

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#161616] flex flex-col font-sans selection:bg-[#B8892D]/30 selection:text-[#161616]">
      
      {/* Focused Checkout Header */}
      <CheckoutHeader />

      <main className="flex-1 w-full py-8 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-8">
          
          {items.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16 bg-white rounded-2xl border border-black/8 p-8 shadow-xs my-8">
              <EmptyCart />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              
              {/* LEFT 60% (7 cols on lg): Customer & Delivery Form */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Mobile Order Summary (Collapsible/Preview on smaller screens) */}
                <div className="lg:hidden bg-white rounded-2xl p-6 border border-black/8 shadow-xs">
                  <OrderSummary isMobile />
                </div>

                {/* Form fields */}
                <CheckoutForm items={items} subtotal={subtotal} />
              </div>

              {/* RIGHT 40% (5 cols on lg): Desktop Sticky Order Summary */}
              <div className="hidden lg:block lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-black/8 shadow-xs sticky top-24">
                <OrderSummary />
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-black/10 py-6 text-center text-xs font-sans tracking-[0.14em] uppercase text-xs text-[#777777] bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} KOKIO LUXURY TRAVEL HOUSE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/" className="hover:text-[#B8892D] transition-colors">PRIVACY POLICY</Link>
            <span>•</span>
            <Link href="/" className="hover:text-[#B8892D] transition-colors">TERMS OF SERVICE</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
