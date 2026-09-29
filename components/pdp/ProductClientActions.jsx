'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
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
    setTimeout(() => setIsAdded(false), 900);
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      {/* Variant / Colour Swatches */}
      {product.colors && product.colors.length > 0 && (
        <VariantSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      )}

      {/* Quantity & ADD TO BAG Row + Discreet Wishlist */}
      <div className="flex items-center gap-3 pt-1">
        <QuantitySelector
          quantity={quantity}
          onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          onIncrease={() => setQuantity((q) => q + 1)}
        />

        {/* Primary CTA: ADD TO BAG */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 min-h-[44px] px-6 py-3 bg-[#161616] hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] rounded-xs text-xs font-sans font-medium tracking-[0.14em] uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
          aria-label={`Add ${product.name} to bag`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[2]" />
              <span>ADDED TO BAG</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              <span>ADD TO BAG</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
            </>
          )}
        </button>

        {/* Discreet Wishlist Action (No giant button, no circular background) */}
        <div className="border border-[#EAEAEA] rounded-xs flex items-center justify-center min-h-[44px] min-w-[44px] shrink-0 bg-white">
          <WishlistButton
            productId={product.id}
            productName={product.name}
            size="sm"
            className="!min-h-[44px] !min-w-[44px] !p-0"
          />
        </div>
      </div>

      {/* Subtle Sticky Purchase Bar */}
      <StickyPurchaseBar
        product={product}
        selectedColor={selectedColor}
        quantity={quantity}
      />
    </motion.div>
  );
}
