import { create } from 'zustand';

export const use3DStore = create((set) => ({
  activeVariant: 'titanium', // 'titanium' | 'onyx' | 'champagne' | 'emerald'
  isExplodingView: false,
  autoRotate: true,
  setVariant: (variant) => set({ activeVariant: variant }),
  toggleExplodingView: () => set((state) => ({ isExplodingView: !state.isExplodingView })),
  setAutoRotate: (status) => set({ autoRotate: status }),
}));
