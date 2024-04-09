import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'

import { FormState } from './useFormStore'

type ProductStore = {
	productStore: FormState[]
	updateProductStore: (data: FormState) => void
}

export const useProductStore = create<ProductStore>(
	persist(
		(set) => ({
			productStore: [],
			updateProductStore: (value: FormState) =>
				set({
					productStore: value
				})
		}),
		{
			name: 'product-store'
		}
	) as unknown as StateCreator<ProductStore, [], []>
)

export default useProductStore
