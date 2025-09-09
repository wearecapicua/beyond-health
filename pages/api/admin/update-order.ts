import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { orderNumber, orderId, origin, subscriptionId } = req.body

	console.log('orderId')
	console.log(orderId)

	const session = await getServerSession(req, res, authOptions)

	if ((session?.user as unknown as { role: string }).role !== 'ADMIN') {
		return res.status(401).json({ error: 'Unauthorized' })
	}
	const supabaseAccessToken = env.supabaseServiceRoleKey

	const supabase = supabaseClient(supabaseAccessToken)

	if (req.method === 'POST') {
		try {
			const { data: updateOrderData, error: updateOrderError } = await supabase
				.from('orders')
				.update({
					status: 'Paid',
					shipo_order_number: orderNumber,
					payment_date: new Date().toISOString(),
					origin
				})
				.eq('id', orderId)

			console.log(updateOrderData)
			console.log(updateOrderError)

			const { data: orderData, error: orderError } = await supabase
				.from('orders')
				.select('subscription_id')
				.eq('id', orderId)
				.single()

			console.log('orderData')
			console.log(orderData)
			console.log(orderError)

			console.log('orderData.subscription_id')
			console.log(orderData?.subscription_id)

			if (orderData) {
				const { data: updateSubscriptionData, error: updateSubscriptionError } = await supabase
					.from('subscriptions')
					.update({
						nuvei_subscription_id: subscriptionId
					})
					.eq('id', orderData.subscription_id)

				console.log(updateSubscriptionData)
				console.log(updateSubscriptionError)
			}

			return res.status(200).json(true)
		} catch (error) {
			if (error instanceof Error) console.error('Error adding payment to history:', error.message)

			return res.status(500).json({ error: 'Internal server error' })
		}
	}
}
