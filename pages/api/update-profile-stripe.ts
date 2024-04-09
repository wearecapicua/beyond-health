import env from 'lib/env'
import { supabaseAuthClient } from 'lib/supabaseAuthClient'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id, updatedEmail, updatedData } = req.body

	const supabaseAccessToken = env.supabaseServiceRoleKey
	const supabase = supabaseClient(supabaseAccessToken)
	const supabaseAuth = supabaseAuthClient(supabaseAccessToken)
	const customerId = id

	if (req.method === 'PUT') {
		try {
			// Update the "profile" table based on "stripe_customer_id"
			const { error: profileError } = await supabase
				.from('profile')
				.update(updatedData)
				.eq('stripe_customer_id', customerId)

			if (profileError) {
				throw profileError
			}

			// 1. Query the "profile" table to get the user_id based on "stripe_customer_id"
			const { data: profileQuery, error: profileQueryError } = await supabase
				.from('profile')
				.select('user_id')
				.eq('stripe_customer_id', customerId)
				.single()

			if (profileQueryError) {
				throw profileQueryError
			}

			if (!profileQuery) {
				return res.status(404).json({ error: 'Profile not found' })
			}

			const userId = profileQuery.user_id

			// 2. Update the "email" field in the "next_auth.user" table using user_id
			const { error } = await supabaseAuth
				.from('users')
				.update({ email: updatedEmail }) // Update the "email" field
				.eq('id', userId)

			if (error) {
				throw error
			}

			return res.status(200).json(true)
		} catch (error) {
			console.error('Error updating profile:', error)

			return res.status(500).json({ error: 'Internal server error' })
		}
	}
}
