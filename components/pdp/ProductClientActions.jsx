'use client';

import { useState } from 'react';
import { ShoppingBag, Check, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import VariantSelector from '@components/pdp/VariantSelector';
import QuantitySelector from '@components/pdp/QuantitySelector';
import StickyPurchaseBar from '@components/pdp/StickyPurchaseBar';
import WishlistButton from '@components/common/WishlistButton';
import { useCartStore } from '@store/useCartStore';

export default function ProductClientActions({ product }) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedColor || 'default'}`,
      productId: product.id,
      name: `${product.name} (${selectedColor || 'Default'})`,
      price: product.price,
      rawPrice: product.rawPrice,
      image: product.image,
      variant: selectedColor || 'Default Edition',
      categoryLabel: product.categoryLabel,
      quantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
    openCart();
  };

  return (
    <div className="space-y-6">
      {/* Color / Variant Selector */}
      {product.colors && (
        <VariantSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      )}

      {/* Quantity Selector, Add To Bag CTA Row & Discreet Wishlist */}
      <div className="flex items-end gap-3 pt-2">
        <QuantitySelector
          quantity={quantity}
          onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          onIncrease={() => setQuantity((q) => q + 1)}
        />

        <button
          onClick={handleAddToCart}
          className="flex-1 min-h-[48px] px-6 sm:px-8 py-3.5 bg-[#B8892D] hover:bg-[#161616] text-[#111111] hover:text-[#F8F6F2] rounded-xs text-xs font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-[#B8892D] hover:border-[#161616]"
          aria-label={`Add ${product.name} to bag`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>ADDED TO BAG</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO BAG • {product.price}</span>
            </>
          )}
        </button>

        {/* Discreet Wishlist Control */}
        <div className="border border-black/15 hover:border-[#B8892D] rounded-xs bg-white transition-colors flex items-center justify-center min-h-[48px] min-w-[48px] shrink-0">
          <WishlistButton
            productId={product.id}
            productName={product.name}
            className="!min-h-[48px] !min-w-[48px]"
          />
        </div>
      </div>

      {/* Verified Trust Badges */}
      <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-sans text-[#555555] border-y border-black/8 py-3">
        <div className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-[#B8892D] shrink-0" />
          <span>Insured Transit</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B8892D] shrink-0" />
          <span>KOKIO Care</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B8892D] shrink-0" />
          <span>Bespoke Detailing</span>
        </div>
      </div>

      {/* Sticky Bottom Purchase Bar */}
      <StickyPurchaseBar
        product={product}
        selectedColor={selectedColor}
        quantity={quantity}
      />
    </div>
  );
}
