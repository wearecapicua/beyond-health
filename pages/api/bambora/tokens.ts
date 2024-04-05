import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const urlToken = `${env.bamboraApiUrl}/scripts/tokenization/tokens`
		const { userId, number, cvd, expiry_date } = await JSON.parse(req.body)
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

			const supabaseAccessToken = env.supabaseServiceRoleKey
			const supabase = supabaseClient(supabaseAccessToken)
			const decodedStringBtoA = `${env.bamboraMerchantId}:${env.bamboraApiPasscode}`

			const encodedStringBtoA = btoa(decodedStringBtoA)

			const { data, error } = await supabase.from('profile').select('*').eq('user_id', userId).single()

			if (error) {
				return res.status(404).json({ error: 'Profile not found' })
			}
			const url = `${env.bamboraApiUrl}/v1/profiles`
			const body = {
				token: {
					name: data.first_name,
					code: token
				},
				billing: {
					name: data.first_name,
					address_line1: data.billing_address.line1,
					address_line2: data.billing_address.line2,
					city: data.billing_address.city,
					postal_code: data.billing_address.postal_code,
					phone_number: data.phone_number
				}
			}
			console.log(body)

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
				res.status(500).json({ error: 'Internal server error' })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Internal server error' })
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
}
