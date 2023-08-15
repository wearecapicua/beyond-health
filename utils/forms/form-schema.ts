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
    gender: z.string(),
  }),
  'step-3': z.object({
  
  }),
  'step-4': z.object({
  
  }),
  'step-5': z.object({
  
  }),
  'step-6': z.object({
  
  }),
  'step-7': z.object({
  
  }),
  'step-8': z.object({
  
  }),
  'step-9': z.object({
  
  }),
  'step-10': z.object({
  
  }),
  'step-11': z.object({
  
  }),
};