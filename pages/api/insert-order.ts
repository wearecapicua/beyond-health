import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const supabaseAccessToken = env.supabaseServiceRoleKey
		const supabase = supabaseClient(supabaseAccessToken)

		const response = await supabase.from('orders').insert({
			product_id: req.body.product_id,
			user_id: req.body.user_id,
			status: 'Pending Approve'
		})
		console.log('Insert Order Response:', response)

		res.status(200).json({ response })
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message })
		}
	}
}
