import { z } from 'zod'

export interface IContactFormProps {
	name?: string
	email?: string
	message?: string
	subject?: string
}

export const contactSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100),
	email: z.string().email('Invalid email address').min(1, 'Email is required').max(100),
	message: z.string().min(1, 'Message is required').max(1000),
	subject: z.string().min(1, 'Subject is required').max(100)
})
