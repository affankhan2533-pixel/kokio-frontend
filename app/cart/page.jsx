'use client';

import Link from 'next/link';
import Header from '@components/navigation/Header';
import MinimalLuxuryFooter from '@components/common/MinimalLuxuryFooter';
import CartItem from '@components/cart/CartItem';
import CartSummary from '@components/cart/CartSummary';
import EmptyCart from '@components/cart/EmptyCart';
import RelatedProducts from '@components/pdp/RelatedProducts';
import { useCartStore } from '@store/useCartStore';
import { PRODUCTS_CATALOG } from '@lib/catalogData';

export default function CartPage() {
  const { items, cartItemsCount, clearCart } = useCartStore();

  return (
    <div className="min-h-screen bg-white text-[#161616] flex flex-col font-sans selection:bg-[#B8892D]/20 selection:text-[#161616]">
      {/* Header */}
      <Header />

      <main className="flex-1 w-full pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
          
          {/* Breadcrumbs & Title */}
          <div className="border-b border-[#EAEAEA] pb-6">
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.14em] text-[#777777] uppercase mb-3">
              <Link href="/" className="hover:text-[#B8892D] transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-[#161616] font-medium">YOUR BAG</span>
            </nav>

            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161616]">
                  YOUR BAG
                </h1>
                {cartItemsCount > 0 && (
                  <span className="text-sm font-sans text-[#777777] font-normal">
                    ({cartItemsCount})
                  </span>
                )}
              </div>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[10px] font-sans tracking-[0.14em] text-[#888888] hover:text-[#B8892D] transition-colors uppercase cursor-pointer"
                >
                  CLEAR ALL
                </button>
              )}
            </div>
          </div>

          {/* Cart Content */}
          {items.length === 0 ? (
            <div className="py-12">
              <EmptyCart />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              
              {/* Left Column (70%): Cart Items List - Editorial, unboxed */}
              <div className="lg:col-span-8">
                <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3 mb-2">
                  <span className="text-[11px] font-sans tracking-[0.12em] text-[#777777] uppercase font-medium">
                    ITEMS ({cartItemsCount})
                  </span>
                  <span className="text-[11px] font-sans tracking-[0.12em] text-[#777777] uppercase font-medium hidden sm:block">
                    PRICE & QUANTITY
                  </span>
                </div>

                <div className="divide-y divide-[#EAEAEA]">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Right Column (30%): Order Summary */}
              <div className="lg:col-span-4 bg-white border border-[#EAEAEA] rounded-xs p-6 sm:p-8 sticky top-28">
                <h2 className="font-serif text-xl font-light text-[#161616] border-b border-[#EAEAEA] pb-3 mb-4">
                  Order Summary
                </h2>
                <CartSummary />
              </div>

            </div>
          )}

          {/* You May Also Explore Recommendations */}
          <div className="pt-8">
            <RelatedProducts currentProductId="" products={PRODUCTS_CATALOG} />
          </div>

        </div>
      </main>

      {/* Footer */}
      <MinimalLuxuryFooter />
    </div>
  );
}
