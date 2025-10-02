import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { ProductOrder } from 'lib/types/global'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const supabaseAccessToken = env.supabaseServiceRoleKey
		const supabase = supabaseClient(supabaseAccessToken)

		const { userId } = req.body

		const { data, error } = await supabase
			.from('orders')
			.select('id, status, created_at, products(name), subscriptions(next_payment_date)')
			.eq('user_id', userId)
			.order('created_at', { ascending: false })

		if (error) {
			console.error('Error fetching orders:', error.message)

			return [] as ProductOrder[]
		}

		res.status(200).json({ orders: data })
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message })
		}
	}
}
