import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { getEmailForUserId } from 'lib/supabaseUtils'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(env.stripeSecretKey, { apiVersion: '2022-11-15' })

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const supabaseAccessToken = env.supabaseServiceRoleKey
	const supabase = supabaseClient(supabaseAccessToken)

	if (req.method === 'GET') {
		try {
			const { data: profileData, error: profileError } = await supabase
				.from('profile')
				.select('*')
				.not('stripe_customer_id', 'is', null) // Filter users with stripe_customer_id

			if (profileError) {
				throw profileError
			}

			const enrichedUserData = await Promise.all(
				profileData.map(async (user) => {
					const setupIntent = await stripe.setupIntents.retrieve(user.stripe_setup_id)

					const email = await getEmailForUserId(user.user_id, supabaseAccessToken!)

					return {
						...user,
						email,
						setupIntentCreated: setupIntent.created
					}
				})
			)

			const sortedUserData = enrichedUserData.sort((a, b) => {
				return new Date(b.setupIntentCreated).getTime() - new Date(a.setupIntentCreated).getTime()
			})

			res.status(200).json(sortedUserData)
		} catch (error) {
			console.error('Error fetching user data:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' })
	}
}
