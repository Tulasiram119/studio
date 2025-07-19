import { create } from "zustand";

interface Mode {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useModeStore = create<Mode>((set) => {
  return {
    isDarkMode: true,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  };
});
