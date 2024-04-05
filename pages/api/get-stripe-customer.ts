import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'

// const stripe = new Stripe(env.stripeSecretKey, { apiVersion: '2022-11-15' })

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const supabaseAccessToken = env.supabaseServiceRoleKey
	const supabase = supabaseClient(supabaseAccessToken)

	if (req.method === 'GET') {
		try {
			const { data: profileData, error: profileError } = await supabase
				.from('profile')
				.select('*, products (*)')
				.not('customer_code', 'is', null)

			if (profileError) {
				throw profileError
			}

			res.status(200).json(profileData)
		} catch (error) {
			console.error('Error fetching user data:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' })
	}
}
