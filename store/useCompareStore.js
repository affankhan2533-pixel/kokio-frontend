import { create } from 'zustand';

export const useCompareStore = create((set, get) => ({
  compareList: [], // array of product ids
  isOpen: false,

  openCompare: () => set({ isOpen: true }),
  closeCompare: () => set({ isOpen: false }),

  addCompare: (productId) => {
    const { compareList } = get();
    if (compareList.includes(productId)) return;
    if (compareList.length >= 3) return;
    set({ compareList: [...compareList, productId] });
  },

  removeCompare: (productId) => {
    set((state) => ({
      compareList: state.compareList.filter((id) => id !== productId),
      isOpen: state.compareList.length <= 1 ? false : state.isOpen,
    }));
  },

  toggleCompare: (productId) => {
    const { compareList } = get();
    if (compareList.includes(productId)) {
      set({
        compareList: compareList.filter((id) => id !== productId),
        isOpen: compareList.length <= 1 ? false : get().isOpen,
      });
    } else {
      if (compareList.length < 3) {
        set({ compareList: [...compareList, productId] });
      }
    }
  },

  clearCompare: () => set({ compareList: [], isOpen: false }),
}));
