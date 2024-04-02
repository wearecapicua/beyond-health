import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import Stripe from 'stripe'

const stripe = new Stripe(env.stripeSecretKey, { apiVersion: '2022-11-15' })

export interface Address {
	line1: string
	line2: string
	city: string
	state: string
	postal_code: string
	country: {
		value: string
	}
}

export type CheckoutSessionBody = {
	filteredData: {
		first_name: string
		last_name: string
		billing_address: Address
		shipping_address: Address
		product: {
			default_price: string
			price: string
		}
	}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const requestBody = req.body as CheckoutSessionBody
	const session = await getServerSession(req, res, authOptions)
	if (!session?.user) {
		return res.status(401).json({ error: 'Unauthorized' })
	}
	const userEmail = session.user.email || undefined
	const userId = session.user.id
	const supabaseAccessToken = env.supabaseServiceRoleKey
	const supabase = supabaseClient(supabaseAccessToken)

	if (req.method === 'POST') {
		const data = requestBody.filteredData
		const name = `${data.first_name} ${data.last_name}`

		try {
			const customer = await stripe.customers.create({
				address: {
					line1: data.billing_address.line1,
					line2: data.billing_address.line2,
					city: data.billing_address.city,
					state: data.billing_address.state,
					postal_code: data.billing_address.postal_code,
					country: data.billing_address.country.value
				},
				shipping: {
					address: {
						line1: data.shipping_address.line1,
						line2: data.shipping_address.line2,
						city: data.shipping_address.city,
						state: data.shipping_address.state,
						postal_code: data.shipping_address.postal_code,
						country: data.shipping_address.country.value
					},
					name
				},
				name,
				email: userEmail
			})

			const updatedData = { stripe_customer_id: customer.id }

			const { error: profileError } = await supabase
				.from('profile')
				.update(updatedData)
				.eq('user_id', userId)

			if (profileError) {
				throw profileError
			}

			const params: Stripe.Checkout.SessionCreateParams = {
				payment_method_types: ['card'],
				mode: 'setup',
				customer: customer?.id,
				metadata: {
					productId: data.product.default_price,
					amount: data.product.price
				},
				success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/`
			}

			const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)

			res.status(200).json(checkoutSession)
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Internal server error'
			res.status(500).json({ statusCode: 500, message: errorMessage })
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
}
