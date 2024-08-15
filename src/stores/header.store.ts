import { create } from "zustand";

export const headerStore = create((set) => ({
  currentIndex: 0,
  setCurrentIndex: (newIndex: number) => set({ currentIndex: newIndex }),
  pathName: "",
  setPathName: (newPathName: string) => set({ pathName: newPathName }),
}));
