// @ts-nocheck

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FormStatusStore = {
  formStep: any;
  setFormStep: (data: any) => void;
};

export const useFormStatusStore = create<FormStatusStore>(
  persist(
    (set) => ({
      formStep: null,
      setFormStep: (step) => set({ formStep: step }),
    }),
    {
      name: 'form-status-store',
    }
  )
);

export default useFormStatusStore;