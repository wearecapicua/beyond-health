import { addDays, addMonths, addYears } from 'date-fns'
import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { getEmailForUserId, getUserShippingAddress } from 'lib/supabaseUtils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateOrderNumber } from 'utils'
import { productOne, productTwo, productThree } from 'utils/productToShip'

const paymentTimestamp = new Date().toISOString()
const randomOrderNumber = generateOrderNumber()
export function findProductByName(productName: string) {
	const products = [productOne, productTwo, productThree]

	return products.find((product) => product.line_items[0].title === productName) || null
}

export const config = {
	api: {
		bodyParser: false // disable Next.js default JSON parser
	}
}

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
	const supabaseAccessToken = env.supabaseServiceRoleKey
	const supabase = supabaseClient(supabaseAccessToken)

	console.log('✅ Insert Active Subscriptions Order Task')

	try {
		const startOfToday = new Date()
		startOfToday.setHours(0, 0, 0, 0)

		const tomorrow = new Date()
		tomorrow.setDate(startOfToday.getDate() + 1)

		const { data: dataSubscriptions } = await supabase
			.from('subscriptions')
			.select(
				`
					id,
					next_payment_date,
					active,
					user_token_id,
					transaction_id,
					user_payment_option_id,
					user_id,
					card_name,
					product_subscription_types (
						id,
						products (
							id,
							name,
							price
						),
						subscription_types (
							id,
							name,
							interval_value,
							interval_unit
						)
					)
				`
			)
			.eq('active', true)
			.gte('next_payment_date', startOfToday.toDateString())
			.lte('next_payment_date', tomorrow.toDateString())

		console.log('✅ startOfToday: ', startOfToday.toDateString())
		console.log('✅ tomorrow: ', tomorrow.toDateString())

		if (dataSubscriptions) {
			console.log('✅ dataSubscriptions: ', JSON.stringify(dataSubscriptions))

			for (const subscriptionData of dataSubscriptions) {
				if (subscriptionData) {
					console.log('✅ subscriptionData: ', JSON.stringify(subscriptionData))

					const shippoApiKey = env.shippoApiKey
					const shippoApiUrl = 'https://api.goshippo.com/orders'
					const orderNumber = `#${randomOrderNumber}`

					const selectedProduct = findProductByName(
						// eslint-disable-next-line
						// @ts-ignore
						subscriptionData?.product_subscription_types?.products.name
					)
					const userShippingAddress = await getUserShippingAddress(
						subscriptionData?.user_id,
						supabaseAccessToken
					)
					const userEmail = await getEmailForUserId(subscriptionData?.user_id, supabaseAccessToken)

					const newData = {
						...selectedProduct,
						order_number: orderNumber,
						placed_at: paymentTimestamp,
						to_address: {
							...userShippingAddress,
							email: userEmail
						}
					}

					const shippoResponse = await fetch(shippoApiUrl, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `ShippoToken ${shippoApiKey}`
						},
						body: JSON.stringify(newData)
					})

					const shippoData = await shippoResponse.json()

					console.log('✅ shippoData: ', shippoData?.order_number || '#')

					//  Insert new order
					await supabase
						.from('orders')
						.insert({
							// eslint-disable-next-line
							// @ts-ignore
							product_id: subscriptionData?.product_subscription_types?.products.id,
							user_id: subscriptionData.user_id,
							status: 'Scheduled',
							ip: '0.0.0.0',
							shipo_order_number: shippoData?.order_number || '#',
							payment_date: new Date().toISOString(),
							subscription_id: subscriptionData.id,
							origin: 'SCHEDULED'
						})
						.select('id')
						.single()

					const newDate = getNextPaymentDate(
						subscriptionData.next_payment_date,
						// eslint-disable-next-line
						// @ts-ignore
						subscriptionData?.product_subscription_types?.subscription_types?.interval_value,
						// eslint-disable-next-line
						// @ts-ignore
						subscriptionData?.product_subscription_types?.subscription_types?.interval_unit
					)

					await supabase
						.from('subscriptions')
						.update({ next_payment_date: newDate })
						.eq('id', subscriptionData.id)
						.select()
				}
			}
		} else {
			console.log('✅ NO Active Subscriptions')
		}

		console.log('✅ End Insert Active Subscriptions Order Task')
		res.status(200).send('OK') // Always respond with 200/OK
	} catch (err: any) {
		console.error('❌ Error Insert Active Subscriptions Order Task:')
		console.error(err)
		res.status(500).send('Error')
	}
}
