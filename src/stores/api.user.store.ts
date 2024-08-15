import { IApiUserInterface } from "@/interfaces/api.user.interface";
import { create } from "zustand";

export const apiUserStore = create((set) => ({
  userList: [],
  setUserList: (newUserList: Array<IApiUserInterface>) =>
    set({ userList: newUserList }),
}));
