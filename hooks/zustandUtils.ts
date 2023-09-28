import { create } from "zustand";

interface IuseStoreModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoreModal = create<IuseStoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface DarkModeStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeStore>((set) => ({
  isDarkMode:
    typeof window !== "undefined" &&
    window.localStorage.getItem("darkMode") === "true",
  toggleDarkMode: () => {
    set((state) => {
      const newIsDarkMode = !state.isDarkMode;

      // Update localStorage when dark mode is toggled
      window.localStorage.setItem("darkMode", newIsDarkMode.toString());

      return { isDarkMode: newIsDarkMode };
    });
  },
}));
