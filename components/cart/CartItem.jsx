'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';

export default function CartItem({ item, compact = false, onCloseDrawer }) {
  const { updateQuantity, removeItem } = useCartStore();
  const quantity = item.quantity || 1;

  const unitPriceNum = item.rawPrice || parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0;
  const lineTotalNum = unitPriceNum * quantity;
  const formattedLineTotal = `₹${lineTotalNum.toLocaleString('en-IN')}`;

  return (
    <div className={`flex gap-4 items-start border-b border-black/8 py-4 ${compact ? 'text-xs' : 'text-sm'}`}>
      {/* Product Image */}
      <Link
        href={`/products/${item.slug || item.productId}`}
        onClick={onCloseDrawer}
        className="relative aspect-[4/3] w-20 sm:w-24 rounded-xl overflow-hidden bg-[#EFEAE2] border border-black/8 shrink-0 block group"
      >
        <Image
          src={item.image || '/images/monolith.png'}
          alt={item.name}
          fill
          sizes="100px"
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
        />
      </Link>

      {/* Item Details */}
      <div className="flex-1 space-y-1 min-w-0">
        <span className="text-[9px] font-sans tracking-[0.14em] uppercase text-xs tracking-[0.2em] font-bold text-[#B8892D] uppercase block truncate">
          {item.categoryLabel || 'KOKIO EDITION'}
        </span>
        <Link
          href={`/products/${item.slug || item.productId}`}
          onClick={onCloseDrawer}
          className="block group"
        >
          <h4 className="font-serif text-sm sm:text-base font-medium text-[#161616] group-hover:text-[#B8892D] transition-colors truncate">
            {item.name}
          </h4>
        </Link>

        {item.variant && item.variant !== 'Default' && (
          <span className="text-[10px] font-sans tracking-[0.14em] uppercase text-xs text-[#777777] uppercase block">
            Finish: {item.variant}
          </span>
        )}

        {/* Line Price */}
        <div className="pt-1 flex items-center justify-between">
          <span className="font-serif text-sm font-semibold text-[#161616]">
            {formattedLineTotal}
          </span>
          <span className="text-[10px] font-sans tracking-[0.14em] uppercase text-xs text-[#888888]">
            ({item.price} ea)
          </span>
        </div>

        {/* Quantity Controls & Remove Action */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <div className="inline-flex items-center bg-[#EFEAE2] border border-black/10 rounded-lg overflow-hidden">
            <button
              onClick={() => updateQuantity(item.id, quantity - 1)}
              disabled={quantity <= 1}
              className="min-h-[36px] min-w-[36px] px-2.5 text-[#161616] hover:bg-[#B8892D]/20 disabled:opacity-30 transition-colors flex items-center justify-center cursor-pointer"
              aria-label={`Decrease quantity of ${item.name}`}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center font-sans tracking-[0.14em] uppercase text-xs text-xs font-semibold text-[#161616]">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, quantity + 1)}
              className="min-h-[36px] min-w-[36px] px-2.5 text-[#161616] hover:bg-[#B8892D]/20 transition-colors flex items-center justify-center cursor-pointer"
              aria-label={`Increase quantity of ${item.name}`}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-[10px] font-sans tracking-[0.14em] uppercase text-xs text-[#888888] hover:text-[#B8892D] transition-colors flex items-center gap-1 cursor-pointer py-1 min-h-[36px] px-2"
            aria-label={`Remove ${item.name} from bag`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline uppercase">REMOVE</span>
          </button>
        </div>

      </div>
    </div>
  );
}
