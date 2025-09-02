import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const supabaseAccessToken = env.supabaseServiceRoleKey
		const supabase = supabaseClient(supabaseAccessToken)
		if (req.method === 'PUT') {
			try {
				const { status, orderId } = req.body
				const data = {
					status
				}

				const { error } = await supabase.from('orders').update(data).eq('id', orderId)

				if (error) {
					throw error
				}

				return res.status(200).json(true)
			} catch (error) {
				console.error('Error updating order:', error)

				return res.status(500).json({ error: 'Internal server error' })
			}
		}
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message })
		}
	}
}
