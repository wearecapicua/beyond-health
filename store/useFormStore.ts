import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FormState = {
	[key: string]: string | number | null | undefined | boolean | object
}

export type FormStore = {
	formStore: FormState
	updateFormStore: (data: FormState) => void
}

export const useFormStore = create<FormStore>(
	persist(
		(set) => ({
			formStore: {},
			updateFormStore: (data: FormState) =>
				set((state: FormStore) => ({ formStore: { ...state.formStore, ...data } }))
		}),
		{
			name: 'form-store'
		}
	) as unknown as StateCreator<FormStore, [], []>
)

export default useFormStore
