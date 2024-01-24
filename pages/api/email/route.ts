import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { email, name, message, subject } = await req.body.data

			const transport = nodemailer.createTransport({
				service: 'gmail',
				/* 
          setting service as 'gmail' is same as providing these setings:
          host: "smtp.gmail.com",
          port: 465,
          secure: true
          If you want to use a different email provider other than gmail, you need to provide these manually.
          Or you can go use these well known services and their settings at
          https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
      */
				auth: {
					user: process.env.MY_EMAIL,
					pass: process.env.MY_PASSWORD
				}
			})

			const mailOptions: Mail.Options = {
				from: process.env.MY_EMAIL,
				to: process.env.MY_EMAIL,
				// cc: email, (uncomment this line if you want to send a copy to the sender)
				subject: `${subject}`,
				html: `<p>Message from <strong>${name}</strong>,<br> User email: (${email})<br> The subject is <strong>${subject}</strong><br> The message is: ${message}</p>`
			}

			const sendMail = await transport.sendMail(mailOptions)

			if (!sendMail) {
				throw new Error('Error sending email')
			}
			res.status(200).json({ message: 'Email sent.' })
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' })
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
}
