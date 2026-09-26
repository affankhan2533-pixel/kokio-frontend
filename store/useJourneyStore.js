import { create } from 'zustand';

export const useJourneyStore = create((set) => ({
  isOpen: false,
  step: 1, // 1: purpose, 2: duration, 3: destination, 4: preference, 5: results
  answers: {
    purpose: '',
    duration: '',
    destination: '',
    preference: '',
  },

  openJourney: () => set({ isOpen: true }),
  closeJourney: () => set({ isOpen: false }),
  setAnswer: (field, value) =>
    set((state) => ({
      answers: { ...state.answers, [field]: value },
    })),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  resetJourney: () =>
    set({
      step: 1,
      answers: { purpose: '', duration: '', destination: '', preference: '' },
    }),
}));
