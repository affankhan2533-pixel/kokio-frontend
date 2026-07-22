import { create } from 'zustand';

export const useCartStore = create((set) => ({
  isOpen: false,
  items: [],
  cartItemsCount: 2, // Default luxury initial items
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
      cartItemsCount: state.cartItemsCount + 1,
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      cartItemsCount: Math.max(0, state.cartItemsCount - 1),
    })),
}));
