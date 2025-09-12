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
		const { transactionId, userPaymentOptionId, userTokenId, product_id, user_id, cardName } = req.body

		const { data: productSubscriptionTypesData } = await supabase
			.from('product_subscription_types')
			.select('id')
			.eq('product_id', product_id)
			.single()

		if (!productSubscriptionTypesData) {
			return
		}

		const resultSubscription = await supabase
			.from('subscriptions')
			.insert({
				product_subscription_type_id: productSubscriptionTypesData.id,
				user_id,
				active: false,
				transaction_id: transactionId,
				user_payment_option_id: userPaymentOptionId,
				user_token_id: userTokenId,
				card_name: cardName
			})
			.select('id')
			.single()

		const result = await supabase
			.from('orders')
			.insert({
				product_id,
				user_id,
				status: 'Pending Approve',
				ip,
				subscription_id: resultSubscription?.data?.id
			})
			.select('id')
			.single()

		const orderId = result?.data?.id

		res.status(200).json({ orderId })
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message })
		}
	}
}
