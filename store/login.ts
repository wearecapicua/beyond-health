import { create } from "zustand"

type LoginStore = {
  loginState: boolean;
  setLoginState: (value: boolean) => void
}

const useLoginStore = create<LoginStore>()((set) => ({
  loginState: false,
  setLoginState: (value) => set({ loginState: value }),
}))

export default useLoginStore