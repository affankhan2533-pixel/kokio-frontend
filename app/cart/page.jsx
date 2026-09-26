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
    <div className="min-h-screen bg-[#F8F6F2] text-[#161616] flex flex-col font-sans selection:bg-[#B8892D]/30 selection:text-[#161616]">
      {/* Header */}
      <Header />

      <main className="flex-1 w-full pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          
          {/* Breadcrumbs & Title */}
          <div className="space-y-2 border-b border-black/8 pb-6">
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.14em] uppercase text-xs tracking-widest text-[#777777] uppercase">
              <Link href="/" className="hover:text-[#B8892D] transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-[#161616] font-semibold">YOUR BAG</span>
            </nav>

            <div className="flex items-center justify-between">
              <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#161616]">
                YOUR <span className="italic font-normal text-champagne-gradient">BAG</span>
              </h1>
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs font-sans tracking-[0.14em] uppercase text-xs text-[#888888] hover:text-[#B8892D] transition-colors uppercase cursor-pointer"
                >
                  CLEAR ALL
                </button>
              )}
            </div>
          </div>

          {/* Cart Content */}
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              
              {/* Left Column (70%): Cart Items List */}
              <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-black/8 shadow-xs">
                <div className="flex items-center justify-between border-b border-black/8 pb-4 mb-2">
                  <span className="text-xs font-sans tracking-[0.14em] uppercase text-xs text-[#777777] uppercase tracking-wider font-bold">
                    BAG ITEMS ({cartItemsCount})
                  </span>
                  <span className="text-xs font-sans tracking-[0.14em] uppercase text-xs text-[#777777] uppercase hidden sm:block">
                    PRICE & QUANTITY
                  </span>
                </div>

                <div className="divide-y divide-black/8">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Right Column (30%): Order Summary */}
              <div className="lg:col-span-4 bg-white rounded-2xl p-6 sm:p-8 border border-black/8 shadow-xs sticky top-28">
                <h3 className="font-serif text-xl font-light text-[#161616] border-b border-black/8 pb-4 mb-4">
                  Order Summary
                </h3>
                <CartSummary />
              </div>

            </div>
          )}

          {/* You May Also Explore Recommendations */}
          <div className="pt-12">
            <RelatedProducts currentProductId="" products={PRODUCTS_CATALOG} />
          </div>

        </div>
      </main>

      {/* Footer */}
      <MinimalLuxuryFooter />
    </div>
  );
}
