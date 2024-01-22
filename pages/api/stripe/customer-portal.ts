import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { Stripe } from 'stripe'

const stripe = new Stripe(env.stripeSecretKey, {
	apiVersion: '2022-11-15'
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, authOptions)
		if (!session?.user) {
			return res.status(401).json({ error: 'Unauthorized' })
		}
		const supabaseAccessToken = env.supabaseServiceRoleKey
		const userId = session.user.id
		const supabase = supabaseClient(supabaseAccessToken)

		try {
			const { data: userData, error: userError } = await supabase
				.from('profile')
				.select('stripe_customer_id')
				.eq('user_id', userId)
				.single()

			if (userError) {
				console.error(userError)

				return res.status(500).json({ error: 'Error fetching user data' })
			}

			const customerId = userData?.stripe_customer_id
			const returnUrl = `${env.host}`

			const portalLink = await stripe.billingPortal.sessions.create({
				customer: customerId, // Replace with the actual customer ID or identifier
				return_url: returnUrl
			})

			res.status(200).json({ url: portalLink.url })
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Internal server error' })
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
}
