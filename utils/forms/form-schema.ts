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
  'step-12': z.object({
    product: z.string().refine(value => !!value)
  }),
  'step-13': z.object({
    addr_line1: z.string().min(1, "Street address is required").max(100),
    addr_line2: z.string().min(1, "Address is required").max(100),
    city: z.string().min(1, "City is required").max(100),
    state: z.string().min(1, "State or Province is required").max(100),
    postal: z.string().min(1, "Zipcode is required").max(100),
    country: z.string().optional()
  }),
  'step-14': z.object({
    picture: z.object({
      fileUrl: z.string(),
      fileName: z.string(),
    })
  }),
  'step-15': z.object({
    photoId: z.object({
      fileUrl: z.string(),
      fileName: z.string(),
    })
  }),
  'step-16': z.object({
    healthCard: z.object({
      fileUrl: z.string(),
      fileName: z.string(),
    })
  }),
  'step-17': z.object({
    insurance: z.object({
      fileUrl: z.string(),
      fileName: z.string(),
    })
  }),
};