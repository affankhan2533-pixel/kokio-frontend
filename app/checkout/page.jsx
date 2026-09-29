'use client';

import Link from 'next/link';
import CheckoutHeader from '@components/checkout/CheckoutHeader';
import CheckoutForm from '@components/checkout/CheckoutForm';
import OrderSummary from '@components/checkout/OrderSummary';
import EmptyCart from '@components/cart/EmptyCart';
import { useCartStore } from '@store/useCartStore';

export default function CheckoutPage() {
  const { items, subtotal } = useCartStore();

  return (
    <div className="min-h-screen bg-white text-[#161616] flex flex-col font-sans selection:bg-[#B8892D]/20 selection:text-[#161616]">
      
      {/* Focused Checkout Header */}
      <CheckoutHeader />

      <main className="flex-1 w-full py-8 md:py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          
          {items.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16">
              <EmptyCart />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              
              {/* LEFT 60% (col-span-7 on lg): Customer Information & Form */}
              <div className="lg:col-span-7">
                <CheckoutForm items={items} subtotal={subtotal} />
              </div>

              {/* RIGHT 40% (col-span-5 on lg): Desktop Sticky Order Summary */}
              <div className="hidden lg:block lg:col-span-5 sticky top-24">
                <OrderSummary />
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Minimal Checkout Footer */}
      <footer className="border-t border-[#EAEAEA] py-6 bg-white text-[11px] font-sans text-[#777777]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} KOKIO. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#161616] transition-colors">PRIVACY</Link>
            <span>•</span>
            <Link href="/" className="hover:text-[#161616] transition-colors">TERMS</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
