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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(405).send('Method Not Allowed')

		return
	}

	const supabaseAccessToken = env.supabaseServiceRoleKey
	const supabase = supabaseClient(supabaseAccessToken)

	try {
		// Collect the raw body
		const chunks: Buffer[] = []
		for await (const chunk of req) {
			chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
		}
		// eslint-disable-next-line
		// @ts-ignore
		const raw = Buffer.concat(chunks).toString('utf-8')
		const forwarded = req.headers['x-forwarded-for']
		let ip =
			typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress || 'unknown'

		if (ip === '::1' || ip === '::ffff:127.0.0.1') {
			ip = '127.0.0.1'
		}
		if (ip.startsWith('::ffff:')) {
			ip = ip.replace('::ffff:', '')
		}
		// Parse form-encoded body
		const params = new URLSearchParams(raw)
		const dmnData: Record<string, string> = {}
		// eslint-disable-next-line
		// @ts-ignore
		for (const [key, value] of params.entries()) {
			dmnData[key] = value
		}

		const { dmnType, userPaymentOptionId, user_token_id, subscriptionId } = dmnData

		// Call Resend API directly with fetch
		await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer re_GqW4wsPr_MbpTq9P5wuUTfMUcLy7wDGsi`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: 'ariel@aurorastore.uy', // Must match a verified domain in Resend
				to: 'ariel@capicua.com.uy',
				subject: 'DMN webhook DATA',
				html: '<div>' + JSON.stringify(dmnData) + '</div>'
			})
		})

		if (dmnType === 'subscriptionPayment') {
			const { data: subscriptionData, error: subscriptionDataError } = await supabase
				.from('subscriptions')
				.select('id')
				.eq('nuvei_subscription_id', subscriptionId)
				.single()

			console.log(subscriptionData)
			console.log(subscriptionDataError)

			if (subscriptionData) {
				const { data: prevOrder, error: prevOrderError } = await supabase
					.from('orders')
					.select(
						'id, status, created_at, user_id, user_token_id, subscription_id, shipo_order_number, payment_date, transaction_id, user_payment_option_id, products(id,name, price, nuvei_plan_id), subscriptions(nuvei_subscription_id)'
					)
					.eq('subscription_id', subscriptionData.id)
					.order('created_at', { ascending: false })
					.limit(1)
					.single() // returns the first row directly

				console.log(prevOrder)
				console.log(prevOrderError)
				if (!prevOrder) {
					return
				}

				const shippoApiKey = env.shippoApiKey
				const shippoApiUrl = 'https://api.goshippo.com/orders'
				const orderNumber = `#${randomOrderNumber}`

				// eslint-disable-next-line
				// @ts-ignore
				const selectedProduct = findProductByName(prevOrder?.products.name)
				const userShippingAddress = await getUserShippingAddress(prevOrder?.user_id, supabaseAccessToken)
				const userEmail = await getEmailForUserId(prevOrder?.user_id, supabaseAccessToken)

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

				console.log(shippoData)

				//  Insert new order
				const resultNewOrder = await supabase
					.from('orders')
					.insert({
						// eslint-disable-next-line
						// @ts-ignore
						product_id: prevOrder.products.id,
						user_id: prevOrder.user_id,
						transaction_id: null,
						user_payment_option_id: userPaymentOptionId,
						status: 'DMN Paid',
						ip,
						user_token_id,
						shipo_order_number: shippoData?.order_number || '#',
						payment_date: new Date().toISOString(),
						subscription_id: prevOrder.subscription_id,
						origin: 'DMN'
					})
					.select('id')
					.single()

				const orderId = resultNewOrder?.data?.id

				console.log(resultNewOrder)

				// Call Resend API directly with fetch
				await fetch('https://api.resend.com/emails', {
					method: 'POST',
					headers: {
						Authorization: `Bearer re_GqW4wsPr_MbpTq9P5wuUTfMUcLy7wDGsi`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						from: 'ariel@aurorastore.uy', // Must match a verified domain in Resend
						to: 'ariel@capicua.com.uy',
						subject: 'DMN webhook SAVED DATA',
						html:
							'<div>' +
							'orderId: ' +
							orderId +
							'<br/>orderId: ' +
							(shippoData?.order_number || '#') +
							'<br/>subscriptionId: ' +
							subscriptionData?.id +
							'</div>'
					})
				})

				console.log('✅ DMN received:', dmnData)
			}
		}

		res.status(200).send('OK') // Always respond with 200/OK
	} catch (err: any) {
		console.error('❌ Error:', err)
		res.status(500).send('Error')
	}
}
