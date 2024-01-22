import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'

type FormStatusStore = {
	formStep: number | null | string
	setFormStep: (data: number | null | string) => void
}

export const useFormStatusStore = create<FormStatusStore>(
	persist(
		(set) => ({
			formStep: null,
			setFormStep: (step: number | null | string) => set({ formStep: step })
		}),
		{
			name: 'form-status-store'
		}
	) as unknown as StateCreator<FormStatusStore, [], []>
)

export default useFormStatusStore
