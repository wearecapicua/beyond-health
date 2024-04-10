import env from 'lib/env'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const urlToken = `${env.bamboraApiUrl}/scripts/tokenization/tokens`
		const { formStore, number, cvd, expiry_date } = await JSON.parse(req.body)
		const bodyToken = {
			number,
			expiry_month: expiry_date.split('/')[0],
			expiry_year: expiry_date.split('/')[1],
			cvd
		}

		try {
			const responseToken = await fetch(urlToken, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bodyToken)
			})

			const { token } = await responseToken.json()
			const decodedStringBtoA = `${env.bamboraMerchantId}:${env.bamboraApiPasscode}`

			const encodedStringBtoA = btoa(decodedStringBtoA)
			const url = `${env.bamboraApiUrl}/v1/profiles`
			const body = {
				token: {
					name: formStore.first_name,
					code: token
				},
				billing: {
					name: formStore.first_name,
					address_line1: formStore.billing_address.line1,
					address_line2: formStore.billing_address.line2 || '',
					city: formStore.billing_address.city,
					postal_code: formStore.billing_address.postal_code,
					phone_number: formStore.phone_number
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
				res.status(200).json(data)
			} else {
				console.error('Error obtaining token:', response.status)
				res.status(500).json({ error: response.statusText })
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
