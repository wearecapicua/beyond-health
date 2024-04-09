import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { userId, price } = await JSON.parse(req.body)
			const supabaseAccessToken = env.supabaseServiceRoleKey
			const supabase = supabaseClient(supabaseAccessToken)
			const user = await supabase.from('profile').select('*').eq('user_id', userId).single()

			const urlCard = `${env.bamboraApiUrl}/v1/profiles/${user.data.customer_code}/cards`
			const decodeApiPasscode = `${env.bamboraMerchantId}:${env.bamboraApiPasscode}`
			const encodeApiPasscode = btoa(decodeApiPasscode)

			const cardResponse = await fetch(urlCard, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Passcode ${encodeApiPasscode}`
				}
			})
			if (cardResponse.status !== 200) {
				throw new Error('Error fetching card')
			}
			const card = await cardResponse.json()
			const decodePaymentPasscode = `${env.bamboraMerchantId}:${env.bamboraPaymentPasscode}`
			const encodePaymentPasscode = await btoa(decodePaymentPasscode)

			const paymentData = {
				amount: price,
				payment_method: 'payment_profile',
				payment_profile: {
					customer_code: user.data.customer_code,
					card_id: card.card[0].card_id,
					complete: true
				}
			}
			const response = await fetch(`${env.bamboraApiUrl}/v1/payments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Passcode ${encodePaymentPasscode}`
				},
				body: JSON.stringify(paymentData)
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
