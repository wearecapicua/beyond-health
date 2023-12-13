import { z } from "zod";

export interface IFormProps {
  first_name?: string;
  last_name?: string;
}

export const schema = {
  "step-1": z.object({
    first_name: z.string().min(1, "First name is required").max(100),
    last_name: z.string().min(1, "Last name is required").max(100),
  }),
  "step-2": z.object({
    gender: z.string().refine((value) => !!value),
  }),
  "step-3": z.object({
    birthdate: z.string().refine((value) => !!value),
  }),
  "step-4": z.object({
    country: z.string().refine((value) => !!value),
  }),
  "step-5": z.object({
    phone_number: z.string().min(1, "Phone number is required").max(30),
  }),
  "step-6": z.object({
    notice_hair_loss: z.string().refine((value) => !!value),
  }),
  "step-7": z.object({
    medications: z.string().refine((value) => !!value),
  }),
  "step-8": z.object({
    conditions: z.string().refine((value) => !!value),
  }),
  "step-9": z.object({
    questions: z.string().optional(),
  }),
  "step-10": z.object({
    stage: z.string().refine((value) => !!value),
  }),
  "step-11": z.object({
    product: z.object({
      default_price: z.string().refine((value) => !!value),
      price: z.number().refine((value) => !!value),
      name: z.string().refine((value) => !!value),
      id: z.string().refine((value) => !!value),
    }),
  }),
  "step-12": z.object({
    // product: z.string().refine(value => !!value)
  }),
  "step-13": z.object({
    shipping_address: z.object({
      line1: z.string().min(1, "Street address is required").max(100),
      line2: z.string().max(100).optional(),
      city: z.string().min(1, "City is required").max(100),
      state: z.string().min(1, "State or Province is required").max(100),
      postal_code: z.string().min(1, "Zipcode is required").max(100),
      country: z.object({
        value: z.string(),
        label: z.string(),
      })
      //country: z.string().trim().nonempty({ message: "Country is required" }),
    }),
  }),
  "step-14": z.object({
    picture: z.custom<File>(),
  }),
  "step-15": z.object({
    photo_id: z.custom<File>(),
  }),
  "step-16": z.object({
    has_health_card: z.boolean(),
    health_card: z.custom<File>(),
  }),
  "step-17": z.object({
    has_insurance: z.boolean(),
    insurance: z.custom<File>(),
  }),
  "step-18": z.object({
    billing_address: z.object({
      line1: z.string().min(1, "Street address is required").max(100),
      line2: z.string().max(100).optional(),
      city: z.string().min(1, "City is required").max(100),
      state: z.string().min(1, "State or Province is required").max(100),
      postal_code: z.string().min(1, "Zipcode is required").max(100),
      country: z.object({
        value: z.string(),
        label: z.string(),
      })
    }),
  }),
};
