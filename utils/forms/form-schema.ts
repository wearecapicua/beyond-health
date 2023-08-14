import { z } from 'zod';

export interface IFormProps {
  firstName?: string;
  lastName?: string;
}

export const schema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
});