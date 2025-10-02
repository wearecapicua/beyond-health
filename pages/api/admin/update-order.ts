import { addDays, addMonths, addYears } from 'date-fns'
import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'

// function to calculate next date based on interval
function getNextPaymentDate(currentDate: string, intervalValue: number, intervalUnit: string) {
	const date = new Date(currentDate)

	switch (intervalUnit) {
		case 'day':
		case 'days':
			return addDays(date, intervalValue).toISOString().split('T')[0]
		case 'month':
		case 'months':
			return addMonths(date, intervalValue).toISOString().split('T')[0]
		case 'year':
		case 'years':
			return addYears(date, intervalValue).toISOString().split('T')[0]
		default:
			throw new Error(`Unsupported interval unit: ${intervalUnit}`)
	}
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { orderNumber, orderId, origin, transactionId } = req.body

	const session = await getServerSession(req, res, authOptions)

	if ((session?.user as unknown as { role: string }).role !== 'ADMIN') {
		return res.status(401).json({ error: 'Unauthorized' })
	}
	const supabaseAccessToken = env.supabaseServiceRoleKey

	const supabase = supabaseClient(supabaseAccessToken)

	if (req.method === 'POST') {
		try {
			await supabase
				.from('orders')
				.update({
					status: 'Paid',
					shipo_order_number: orderNumber,
					payment_date: new Date().toISOString(),
					origin,
					transactionId
				})
				.eq('id', orderId)

			const { data: orderData } = await supabase
				.from('orders')
				.select(
					`subscription_id,
					subscriptions(
						user_token_id,
						transaction_id,
						user_payment_option_id,
						product_subscription_types (
							subscription_types (
								id,
								name,
								interval_value,
								interval_unit
							)
						)

					)`
				)
				.eq('id', orderId)
				.single()

			const newDate = getNextPaymentDate(
				new Date().toISOString(),
				// eslint-disable-next-line
				// @ts-ignore
				orderData?.subscriptions?.product_subscription_types?.subscription_types?.interval_value,
				// eslint-disable-next-line
				// @ts-ignore
				orderData?.subscriptions?.product_subscription_types?.subscription_types?.interval_unit
			)

			await supabase
				.from('subscriptions')
				.update({ active: true, next_payment_date: newDate })
				// eslint-disable-next-line
				// @ts-ignore
				.eq('id', orderData.subscription_id)
				.select()

			return res.status(200).json(true)
		} catch (error) {
			if (error instanceof Error) console.error('Error adding payment to history:', error.message)

			return res.status(500).json({ error: 'Internal server error' })
		}
	}
}
