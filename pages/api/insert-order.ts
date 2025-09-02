import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const supabaseAccessToken = env.supabaseServiceRoleKey
		const supabase = supabaseClient(supabaseAccessToken)
		const forwarded = req.headers['x-forwarded-for']
		let ip =
			typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress || 'unknown'

		if (ip === '::1' || ip === '::ffff:127.0.0.1') {
			ip = '127.0.0.1'
		}
		if (ip.startsWith('::ffff:')) {
			ip = ip.replace('::ffff:', '')
		}
		const { transactionId, userPaymentOptionId, userTokenId, product_id, user_id } = req.body

		const result = await supabase
			.from('orders')
			.insert({
				product_id,
				user_id,
				transaction_id: transactionId,
				user_payment_option_id: userPaymentOptionId,
				status: 'Pending Approve',
				ip,
				user_token_id: userTokenId
			})
			.select('id') // 👈 This tells Supabase to return the 'id' of the inserted row
			.single()

		const orderId = result?.data?.id
		console.log('Insert Order orderId:', orderId)
		res.status(200).json({ orderId })
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message })
		}
	}
}
