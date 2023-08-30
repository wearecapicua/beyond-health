// @ts-nocheck

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ProductStore = {
  productStore: any;
  updateProductStore: (data: FormState) => void;
};

export const useProductStore = create<ProductStore>(
  persist(
    (set) => ({
      productStore: [],
      updateProductStore: (value) => set({ productStore: value }),
    }),
    {
      name: 'product-store',
    }
  )
);

export default useProductStore;
