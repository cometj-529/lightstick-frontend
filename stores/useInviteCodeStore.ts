import { create } from "zustand";
import { InviteCodeStoreType } from "../types/InviteCodeStoreType";

const useInviteCodeStore = create<InviteCodeStoreType>((set) => ({
  code: "",
  isOwner: false,
  setInviteCode: (code: string) => {
    set(() => ({ code }));
  },
  setIsOwner: (state: boolean) => {
    set(() => ({ isOwner: state }));
  },
}));

export default useInviteCodeStore;
