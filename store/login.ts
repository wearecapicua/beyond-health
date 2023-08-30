// @ts-nocheck
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LoginStore = {
  loginState: boolean;
  setLoginState: (value: boolean) => void;
};

const useLoginStore = create<LoginStore>(
  persist(
    (set) => ({
      loginState: false,
      setLoginState: (value) => set({ loginState: value }),
    }),
    {
      name: 'loginStore',
    }
  )
);

export default useLoginStore;
