import { FC, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import FormErrors from './forms/form-errors'
import { sendEmail } from '../lib/sendEmail'
import { contactSchema } from '../utils/forms/contact-form'

export type FormData = {
	name: string
	email: string
	message: string
	subject: string
}

const ContactForm: FC = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isSubmitSuccessful }
	} = useForm<FormData>({
		resolver: zodResolver(contactSchema)
	})

	const onSubmit = (data: FormData) => {
		sendEmail(data)
	}

	useEffect(() => {
		reset({
			name: '',
			email: '',
			message: '',
			subject: ''
		})
	}, [isSubmitSuccessful])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<p className="mb-[5%] flex justify-center text-6xl">Get In Touch</p>
			<div className="flex justify-between max-[640px]:flex-col">
				<div className="mb-5 w-[49%] max-[640px]:w-[100%]">
					<label htmlFor="name" className="mb-3 block text-base font-medium text-black">
						Full Name *
					</label>
					<input
						type="text"
						placeholder="Full Name"
						className="w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
						{...register('name', { required: true })}
					/>
					{errors && <FormErrors errors={errors} id="name" text="This field is required" />}
				</div>
				<div className="mb-5 w-[49%] max-[640px]:w-[100%]">
					<label htmlFor="email" className="mb-3 block text-base font-medium text-black">
						Email Address *
					</label>
					<input
						type="email"
						placeholder="example@domain.com"
						className="w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
						{...register('email', { required: true })}
					/>
					{errors && <FormErrors errors={errors} id="email" text="This field is required" />}
				</div>
			</div>
			<div className="mb-5">
				<label htmlFor="subject" className="mb-3 block text-base font-medium text-black">
					Subject *
				</label>
				<input
					type="text"
					placeholder="Subject"
					className="w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
					{...register('subject', { required: true })}
				/>
				{errors && <FormErrors errors={errors} id="subject" text="This field is required" />}
			</div>
			<div className="mb-5">
				<label htmlFor="message" className="mb-3 block text-base font-medium text-black">
					Message *
				</label>
				<textarea
					rows={4}
					placeholder="Type your message"
					className="w-full resize-none rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
					{...register('message', { required: true })}></textarea>
				{errors && <FormErrors errors={errors} id="message" text="This field is required" />}
			</div>
			<div>
				<button className="hover:shadow-form mb-[10%] w-[100%] rounded-md bg-accent-green-800 px-8 py-3 text-base font-semibold text-white outline-none hover:bg-accent-green-500">
					Send
				</button>
			</div>
		</form>
	)
}

export default ContactForm
