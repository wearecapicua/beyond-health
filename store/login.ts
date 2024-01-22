import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'

type LoginStore = {
	loginState: boolean
	setLoginState: (value: boolean) => void
}

const useLoginStore = create<LoginStore>(
	persist(
		(set) => ({
			loginState: false,
			setLoginState: (value: boolean) => set({ loginState: value })
		}),
		{
			name: 'loginStore'
		}
	) as unknown as StateCreator<LoginStore, [], []>
)

export default useLoginStore
