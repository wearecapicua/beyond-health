import env from 'lib/env'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const urlToken = `${env.bamboraApiUrl}/scripts/tokenization/tokens`
			const { formStore, number, cvd, expiry_date } = await JSON.parse(req.body)
			const { first_name, billing_address, phone_number } = formStore
			if (!first_name || !billing_address || !phone_number || !number || !cvd || !expiry_date)
				throw new Error('Missing required fields')
			const bodyToken = {
				number,
				expiry_month: expiry_date.split('/')[0],
				expiry_year: expiry_date.split('/')[1],
				cvd
			}

			const responseToken = await fetch(urlToken, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bodyToken)
			})

			const { token } = await responseToken.json()
			if (!token) throw new Error('Error obtaining token from Bambora')
			const decodedStringBtoA = `${env.bamboraMerchantId}:${env.bamboraApiPasscode}`

			const encodedStringBtoA = btoa(decodedStringBtoA)
			if (!encodedStringBtoA) throw new Error('Error encoding string to base64')

			const url = `${env.bamboraApiUrl}/v1/profiles`
			const body = {
				token: {
					name: first_name,
					code: token
				},
				billing: {
					name: first_name,
					address_line1: billing_address.line1,
					address_line2: billing_address.line2 || '',
					city: billing_address.city,
					postal_code: billing_address.postal_code,
					phone_number
				}
			}

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Passcode ${encodedStringBtoA}`
				},
				body: JSON.stringify(body)
			})

			if (response.ok) {
				const data = await response.json()
				if (!data.customer_code) throw new Error('Error obtaining customerCode from Bambora')
				res.status(200).json(data)
			} else {
				console.error('Error obtaining token:', response.status)
				res.status(response.status).json({ error: response.statusText })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ error })
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
}
