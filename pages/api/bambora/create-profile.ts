import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const supabaseAccessToken = env.supabaseServiceRoleKey
			const supabase = supabaseClient(supabaseAccessToken)
			const decodedStringBtoA = `${env.bamboraMerchantId}:${env.bamboraApiPasscode}`

			const encodedStringBtoA = btoa(decodedStringBtoA)

			const { userId } = await JSON.parse(req.body)

			const { data, error } = await supabase.from('profile').select('*').eq('user_id', userId).single()

			if (error) {
				return res.status(404).json({ error: 'Profile not found' })
			}
			const url = `${env.bamboraApiUrl}/v1/profiles`
			const body = {
				token: {
					name: data.first_name,
					code: data.stripe_setup_id
				},
				billing: {
					name: data.first_name,
					address_line1: data.billing_address.line1,
					address_line2: data.billing_address.line2,
					city: data.billing_address.city,
					province: data.billing_address.country.state,
					country: data.billing_address.country.value,
					postal_code: data.billing_address.country.postal_code,
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
				const dataRes = await response.json()
				res.status(200).json(dataRes)
			} else {
				console.error('Error:', response.status)
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
