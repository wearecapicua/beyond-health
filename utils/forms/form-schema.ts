import { z } from 'zod';

export interface IFormProps {
  firstName?: string;
  lastName?: string;
}

export const schema = {
  'step-1': z.object({
    firstName: z.string().min(1, "First name is required").max(100),
    lastName: z.string().min(1, "Last name is required").max(100),
  }),
 'step-2': z.object({
    gender: z.string().refine(value => !!value)
  }),
  'step-3': z.object({
    birthdate: z.string().refine(value => !!value)
  }),
  'step-4': z.object({
    residence: z.string().refine(value => !!value)
  }),
  'step-5': z.object({
    phoneNumber: z.string().min(1, "Phone number is required").max(30),
  }),
  'step-6': z.object({
    noticeHairLoss: z.string().refine(value => !!value)
  }),
  'step-7': z.object({
    medications: z.string().refine(value => !!value)
  }),
  'step-8': z.object({
    conditions: z.string().refine(value => !!value)
  }),
  'step-9': z.object({
    questions: z.string().optional()
  }),
  'step-10': z.object({
    stage: z.string().refine(value => !!value)
  }),
  'step-11': z.object({
    product: z.string().refine(value => !!value)
  }),
};