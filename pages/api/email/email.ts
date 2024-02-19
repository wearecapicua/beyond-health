import * as sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next'

type EmailFormData = {
	data: string
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { data }: EmailFormData = req.body

	sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

	const msg = {
		to: 'online@beyondhealth.ca',
		from: 'online@beyondhealth.ca',
		subject: 'New Submission',
		html: `<p>The user <h1>${data}</h1> has completed a submission, please check it on the Admin Panel.</p>`
	}

	sgMail
		.send(msg)
		.then(() => res.status(201).json({ message: 'OK' }))
		.catch((err) => res.status(500).json({ error: err }))
}
