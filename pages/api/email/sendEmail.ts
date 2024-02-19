import * as sgMail from '@sendgrid/mail'
import env from 'lib/env'

sgMail.setApiKey(env.sendgridApiKey)

type EmailProps = {
	to: string
	from: string
	subject: string
	text?: string
	html: string
	templateId?: string
}
const sendEmail = ({ to, from, subject, text, html, templateId }: EmailProps) => {
	const msg = { to, from, subject, text, html, templateId }

	return sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent')
		})
		.catch((error) => {
			console.log(JSON.stringify(error, null, 4))
		})
}

export default sendEmail
