import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'

// const stripe = new Stripe(env.stripeSecretKey, { apiVersion: '2022-11-15' })
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const supabaseAccessToken = env.supabaseServiceRoleKey
	const supabase = supabaseClient(supabaseAccessToken)

	if (req.method === 'GET') {
		try {
			// 1) Orders + products (include user_id so we can join on the app side)
			const { data: orders, error: ordersError } = await supabase
				.from('orders')
				.select(
					'id, status, created_at, user_id, user_token_id, transaction_id, user_payment_option_id, products(name, price)'
				)
				.order('created_at', { ascending: false })

			if (ordersError) throw ordersError

			const userIds = Array.from(new Set((orders ?? []).map((o) => o.user_id).filter(Boolean))) as string[]

			// 2) Fetch related profiles in one shot
			let profileByUserId = new Map<string, any>()
			if (userIds.length > 0) {
				const { data: profiles, error: profilesError } = await supabase
					.from('profile')
					.select(
						'id, user_id, shipping_address, payments_history, billing_address, phone_number, country, first_name, last_name, customer_code, gender, birthdate, notice_hair_loss, medications, conditions, questions, stage, has_insurance, insurance_image_url'
					)
					.in('user_id', userIds)

				if (profilesError) throw profilesError
				profileByUserId = new Map((profiles ?? []).map((p) => [p.user_id, p]))
			}

			// 3) Fetch users from the other schema (if exposed & permitted)
			let userById = new Map<string, any>()
			if (userIds.length > 0) {
				try {
					const { data: users, error: usersError } = await supabase
						.schema('next_auth') // requires "next_auth" to be exposed in API & RLS/grants to allow select
						.from('users')
						.select('id, email, name, image')
						.in('id', userIds)

					if (usersError) throw usersError
					userById = new Map((users ?? []).map((u) => [u.id, u]))
				} catch (schemaErr) {
					// If next_auth isn't exposed / allowed, skip users silently
					console.warn('next_auth.users not accessible:', schemaErr)
				}
			}

			// 4) Merge into a single payload
			const result = (orders ?? []).map((o) => ({
				...o,
				profile: profileByUserId.get(o.user_id) ?? null,
				user: userById.get(o.user_id) ?? null
			}))

			console.log(result)

			res.status(200).json(result)
		} catch (error) {
			console.error('Error fetching orders with profile & users:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' })
	}
}
