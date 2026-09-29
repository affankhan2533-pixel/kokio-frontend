'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';

export default function CartItem({ item, compact = false, onCloseDrawer }) {
  const { updateQuantity, removeItem } = useCartStore();
  const quantity = item.quantity || 1;

  const unitPriceNum = item.rawPrice || parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0;
  const lineTotalNum = unitPriceNum * quantity;
  const formattedLineTotal = `₹${lineTotalNum.toLocaleString('en-IN')}`;

  return (
    <div className="flex gap-4 items-start py-4">
      {/* Product Photography (White stage, no dark box, no force cropping) */}
      <Link
        href={`/products/${item.slug || item.productId}`}
        onClick={onCloseDrawer}
        className={`relative aspect-[1/1] ${compact ? 'w-20 h-20' : 'w-24 h-24 sm:w-28 sm:h-28'} rounded-xs bg-white border border-[#EAEAEA] shrink-0 block overflow-hidden p-2 group`}
        aria-label={`View ${item.name}`}
      >
        <Image
          src={item.image || '/images/kokio_monolith_carryon.jpg'}
          alt={item.name}
          fill
          sizes="80px"
          className="object-contain object-center group-hover:scale-[1.02] transition-transform duration-300"
        />
      </Link>

      {/* Item Details */}
      <div className="flex-1 space-y-1 min-w-0">
        <span className="text-[10px] font-sans tracking-[0.12em] text-[#777777] uppercase font-medium block truncate">
          {item.categoryLabel || item.collectionLabel || 'KOKIO'}
        </span>

        <Link
          href={`/products/${item.slug || item.productId}`}
          onClick={onCloseDrawer}
          className="block group"
        >
          <h4 className="font-serif text-sm sm:text-base font-light text-[#161616] group-hover:text-[#B8892D] transition-colors truncate">
            {item.name}
          </h4>
        </Link>

        {item.variant && item.variant !== 'Default' && item.variant !== 'Default Edition' && (
          <span className="text-[11px] font-sans text-[#777777] block">
            Colour: {item.variant}
          </span>
        )}

        {/* Line Price */}
        <div className="pt-0.5 flex items-center justify-between">
          <span className="font-sans text-xs sm:text-sm font-medium text-[#161616]">
            {formattedLineTotal}
          </span>
          {quantity > 1 && (
            <span className="text-[10px] font-sans text-[#888888]">
              ({item.price} each)
            </span>
          )}
        </div>

        {/* Quantity Controls & Remove Action */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <div className="inline-flex items-center border border-[#EAEAEA] rounded-xs bg-white">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, quantity - 1)}
              disabled={quantity <= 1}
              className="min-h-[32px] min-w-[32px] flex items-center justify-center text-[#777777] hover:text-[#161616] disabled:opacity-30 transition-colors cursor-pointer"
              aria-label={`Decrease quantity of ${item.name}`}
            >
              <Minus className="w-3 h-3 stroke-[1.5]" />
            </button>
            <span className="w-7 text-center font-sans text-xs font-medium text-[#161616]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, quantity + 1)}
              className="min-h-[32px] min-w-[32px] flex items-center justify-center text-[#777777] hover:text-[#161616] transition-colors cursor-pointer"
              aria-label={`Increase quantity of ${item.name}`}
            >
              <Plus className="w-3 h-3 stroke-[1.5]" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="text-[10px] font-sans tracking-wider uppercase text-[#777777] hover:text-[#B8892D] transition-colors cursor-pointer py-1 px-1.5"
            aria-label={`Remove ${item.name} from bag`}
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}
