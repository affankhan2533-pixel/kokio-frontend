import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const INITIAL_WISHLIST_IDS = [
  'monolith-carryon-35l',
  'horizon-leather-weekender',
  'apex-titanium-trunk-88l',
  'florentine-crossbody-sling',
];

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistIds: INITIAL_WISHLIST_IDS,

      toggleWishlist: (id) => {
        if (!id) return;
        const current = get().wishlistIds;
        if (current.includes(id)) {
          set({ wishlistIds: current.filter((item) => item !== id) });
        } else {
          set({ wishlistIds: [...current, id] });
        }
      },

      addWishlist: (id) => {
        if (!id) return;
        const current = get().wishlistIds;
        if (!current.includes(id)) {
          set({ wishlistIds: [...current, id] });
        }
      },

      removeWishlist: (id) => {
        set((state) => ({
          wishlistIds: state.wishlistIds.filter((item) => item !== id),
        }));
      },

      clearWishlist: () => set({ wishlistIds: [] }),
    }),
    {
      name: 'kokio_wishlist_storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : null)),
    }
  )
);
