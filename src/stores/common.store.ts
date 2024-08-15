import { create } from "zustand";

export const commonStore = create((set) => ({
  locale: "en",
  setLocale: (newLocale: string) => set({ locale: newLocale }),
}));
