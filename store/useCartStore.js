import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const INITIAL_ITEMS = [
  {
    id: 'monolith-carryon-35l-Silver Aluminum',
    productId: 'monolith-carryon-35l',
    slug: 'monolith-carryon-35l',
    name: 'The Monolith Carry-On 35L',
    variant: 'Silver Aluminum',
    price: '₹1,09,999',
    rawPrice: 109999,
    quantity: 1,
    image: '/images/monolith.png',
    categoryLabel: 'CABIN LUGGAGE',
  },
  {
    id: 'horizon-leather-weekender-Chestnut Brown',
    productId: 'horizon-leather-weekender',
    slug: 'horizon-leather-weekender',
    name: 'The Horizon Leather Weekender',
    variant: 'Chestnut Brown',
    price: '₹79,999',
    rawPrice: 79999,
    quantity: 1,
    image: '/images/duffel.png',
    categoryLabel: 'LEATHER DUFFELS',
  },
];

const parseRawPrice = (priceStr, rawVal) => {
  if (typeof rawVal === 'number' && !isNaN(rawVal)) return rawVal;
  if (!priceStr) return 0;
  const cleaned = String(priceStr).replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
};

const computeCartMetrics = (items) => {
  const count = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const subtotal = items.reduce((acc, item) => {
    const unitPrice = parseRawPrice(item.price, item.rawPrice);
    return acc + unitPrice * (item.quantity || 1);
  }, 0);
  return { cartItemsCount: count, subtotal };
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      isOpen: false,
      items: INITIAL_ITEMS,
      cartItemsCount: 2,
      subtotal: 189998,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (newItem) => {
        set((state) => {
          const itemVariant = newItem.variant || newItem.selectedColor || 'Default';
          const itemId = newItem.id || `${newItem.productId || newItem.slug || 'prod'}-${itemVariant}`;
          const itemRawPrice = parseRawPrice(newItem.price, newItem.rawPrice);
          const addQty = newItem.quantity || 1;

          const existingIndex = state.items.findIndex((i) => i.id === itemId);
          let updatedItems;

          if (existingIndex > -1) {
            updatedItems = [...state.items];
            const existing = updatedItems[existingIndex];
            updatedItems[existingIndex] = {
              ...existing,
              quantity: (existing.quantity || 1) + addQty,
            };
          } else {
            updatedItems = [
              ...state.items,
              {
                id: itemId,
                productId: newItem.productId || newItem.id,
                slug: newItem.slug || newItem.id,
                name: newItem.name,
                variant: itemVariant,
                price: newItem.price,
                rawPrice: itemRawPrice,
                quantity: addQty,
                image: newItem.image,
                categoryLabel: newItem.categoryLabel || 'KOKIO EDITION',
              },
            ];
          }

          const metrics = computeCartMetrics(updatedItems);
          return {
            items: updatedItems,
            isOpen: true, // Automatically open drawer on add
            ...metrics,
          };
        });
      },

      updateQuantity: (id, newQuantity) => {
        set((state) => {
          if (newQuantity < 1) return state;
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          );
          const metrics = computeCartMetrics(updatedItems);
          return { items: updatedItems, ...metrics };
        });
      },

      removeItem: (id) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          const metrics = computeCartMetrics(updatedItems);
          return { items: updatedItems, ...metrics };
        });
      },

      clearCart: () =>
        set({
          items: [],
          cartItemsCount: 0,
          subtotal: 0,
        }),
    }),
    {
      name: 'kokio-cart-storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : null)),
      partialize: (state) => ({
        items: state.items,
        cartItemsCount: state.cartItemsCount,
        subtotal: state.subtotal,
      }),
    }
  )
);
