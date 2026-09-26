'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@store/useWishlistStore';

export default function WishlistButton({
  productId,
  productName = 'piece',
  className = '',
  showLabel = false,
  size = 'md',
}) {
  const [mounted, setMounted] = useState(false);
  const [justToggled, setJustToggled] = useState(false);
  const { wishlistIds, toggleWishlist } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWishlisted = mounted && wishlistIds.includes(productId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
    setJustToggled(true);
    setTimeout(() => setJustToggled(false), 300);
  };

  const iconSizeClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        isWishlisted
          ? `Remove ${productName} from wishlist`
          : `Save ${productName} to wishlist`
      }
      aria-pressed={isWishlisted}
      className={`group/wishlist relative inline-flex items-center justify-center transition-all duration-200 cursor-pointer min-h-[44px] min-w-[44px] select-none ${
        justToggled ? 'scale-105' : 'scale-100'
      } ${className}`}
    >
      <Heart
        className={`${iconSizeClass} transition-all duration-200 ${
          isWishlisted
            ? 'fill-[#B8892D] text-[#B8892D] stroke-[#B8892D]'
            : 'fill-transparent text-[#161616]/70 group-hover/wishlist:text-[#B8892D] stroke-[1.5]'
        }`}
      />
      {showLabel && (
        <span className="ml-2 text-[10px] font-sans tracking-[0.14em] uppercase font-medium">
          {isWishlisted ? 'SAVED TO WISHLIST' : 'SAVE TO WISHLIST'}
        </span>
      )}
    </button>
  );
}
