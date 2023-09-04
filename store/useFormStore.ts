// @ts-nocheck

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FormState = {
  [key: string]: string | any;
};

type FormStore = {
  formStore: FormState;
  updateFormStore: (data: FormState) => void;
};

export const useFormStore = create<FormStore>(
  persist(
    (set) => ({
      formStore: {},
      updateFormStore: (data) => set((state) => ({ formStore: { ...state.formStore, ...data } })),
    }),
    {
      name: 'form-store',
    }
  )
);

export default useFormStore;
