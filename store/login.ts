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


// import { create, persist } from 'zustand/middleware';

// type LoginStore = {
//   loginState: boolean;
//   setLoginState: (value: boolean) => void;
// };

// const useLoginStore = create<LoginStore>(
//   persist(
//     (set) => ({
//       loginState: false,
//       setLoginState: (value) => set({ loginState: value }),
//     }),
//     {
//       name: 'loginStore',
//     }
//   )
// );

// export default useLoginStore;
