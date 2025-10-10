import crypto from 'crypto'

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

const getNuveiTimeStamp = (): string => {
	const now = new Date()

	const YYYY = now.getFullYear().toString()
	const MM = String(now.getMonth() + 1).padStart(2, '0')
	const DD = String(now.getDate()).padStart(2, '0')
	const HH = String(now.getHours()).padStart(2, '0')
	const mm = String(now.getMinutes()).padStart(2, '0')
	const ss = String(now.getSeconds()).padStart(2, '0')

	return `${YYYY}${MM}${DD}${HH}${mm}${ss}`
}

const confirmPayment = async (
	user: { email: string },
	profile: {
		first_name: string
		last_name: string
		billing_address: {
			country: string
			line1: string
			city: { value: string }
			postal_code: string
			state: string
		}
	},
	userTokenId: string,
	transactionId: string,
	userPaymentOptionId: string,
	product: { price: number; name: string },
	cardName: string
) => {
	const { email } = user
	const { first_name, last_name, billing_address } = profile
	const { country, line1, city, postal_code, state } = billing_address

	const ts = getNuveiTimeStamp()
	const client_request_id = `crid-${Date.now()}`

	const rawString1 = env.nuveiMerchantId + env.nuveiMerchantSiteId + ts + env.nuveiMerchantSecretKey
	const checksum1 = crypto.createHash('sha256').update(rawString1).digest('hex')

	const payload1 = {
		merchantId: env.nuveiMerchantId,
		merchantSiteId: env.nuveiMerchantSiteId,
		timeStamp: ts,
		checksum: checksum1
	}

	const response1 = await fetch(env.nuveiDomain + '/ppp/api/v1/getSessionToken.do', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload1)
	})

	const data1 = await response1.json()

	const st = data1.sessionToken

	const currency = 'USD'
	const amount = product.price.toString()

	const rawString =
		env.nuveiMerchantId +
		env.nuveiMerchantSiteId +
		client_request_id +
		amount +
		currency +
		ts +
		env.nuveiMerchantSecretKey

	const checksum = crypto.createHash('sha256').update(rawString).digest('hex')

	const payload2 = {
		paymentFlow: 'direct',
		merchantId: env.nuveiMerchantId,
		merchantSiteId: env.nuveiMerchantSiteId,
		timeStamp: ts,
		sessionToken: st,
		userTokenId,
		clientRequestId: client_request_id,
		clientUniqueId: `cuid-${Date.now()}`, // your invoice/order id
		currency,
		amount,
		items: [
			{
				// eslint-disable-next-line
				// @ts-ignore
				name: product.name,
				quantity: 1,
				price: amount
			}
		],
		transactionType: 'Sale',
		isRebilling: 1, // ← marks this as MIT
		relatedTransactionId: transactionId,
		cardHolderName: cardName,
		paymentOption: {
			userPaymentOptionId
		},
		billingAddress: {
			firstName: first_name,
			lastName: last_name,
			email, // shopper’s e-mail
			address: line1, // street line 1
			city,
			state, // 2-letter for US/CA; full name elsewhere
			// eslint-disable-next-line
			// @ts-ignore
			country: country.value, // ISO-2 or ISO-3
			/* still smart to keep the old risk helpers */
			zip: postal_code
		},
		deviceDetails: {
			ipAddress: '34.21.9.50' // **IPv4** string
		},
		checksum
	}

	const responseFinal = await fetch(env.nuveiDomain + '/ppp/api/v1/payment.do', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload2)
	})

	return responseFinal.json()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	const { subscriptionId } = req.body

	if (!subscriptionId) {
		return res.status(400).json({ message: 'Subscription ID is required' })
	}

	const supabaseAccessToken = env.supabaseServiceRoleKey
	const supabase = supabaseClient(supabaseAccessToken)

	console.log('✅ Charge Subscription for ID:', subscriptionId)

	try {
		const { data: subscriptionData, error } = await supabase
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
			.eq('id', subscriptionId)
			.single()

		if (error || !subscriptionData) {
			throw new Error('Subscription not found')
		}

		if (!subscriptionData.active) {
			throw new Error('Subscription is not active')
		}

		const { data: user } = await supabase
			.schema('next_auth')
			.from('users')
			.select('id, email, name, image')
			.eq('id', subscriptionData.user_id)
			.single()

		if (!user) {
			throw new Error('User not found')
		}

		const { data: profile } = await supabase
			.from('profile')
			.select(
				'id, user_id, shipping_address, billing_address, phone_number, country, first_name, last_name, customer_code, gender, birthdate, notice_hair_loss, medications, conditions, questions, stage, has_insurance, insurance_image_url'
			)
			.eq('user_id', subscriptionData.user_id)
			.single()

		if (!profile) {
			throw new Error('Profile not found')
		}

		const dataPayment = await confirmPayment(
			// eslint-disable-next-line
			// @ts-ignore
			{ email: user.email },
			// eslint-disable-next-line
			// @ts-ignore
			profile,
			subscriptionData.user_token_id,
			subscriptionData.transaction_id,
			subscriptionData.user_payment_option_id,
			{
				// eslint-disable-next-line
				// @ts-ignore
				price: subscriptionData.product_subscription_types.products.price,
				// eslint-disable-next-line
				// @ts-ignore
				name: subscriptionData.product_subscription_types.products.name
			},
			subscriptionData.card_name
		)

		console.log('confirmPayment: ', dataPayment)

		if (dataPayment.status !== 'SUCCESS') {
			throw new Error('Error creating payment')
		}

		const shippoApiKey = env.shippoApiKey
		const shippoApiUrl = 'https://api.goshippo.com/orders'
		const orderNumber = `#${randomOrderNumber}`

		// eslint-disable-next-line
		// @ts-ignore
		const selectedProduct = findProductByName(subscriptionData.product_subscription_types.products.name)
		const userShippingAddress = await getUserShippingAddress(subscriptionData.user_id, supabaseAccessToken)
		const userEmail = await getEmailForUserId(subscriptionData.user_id, supabaseAccessToken)

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

		// Insert new order
		await supabase
			.from('orders')
			.insert({
				// eslint-disable-next-line
				// @ts-ignore
				product_id: subscriptionData.product_subscription_types.products.id,
				user_id: subscriptionData.user_id,
				status: 'Charged Now',
				ip: '0.0.0.0',
				shipo_order_number: shippoData?.order_number || '#',
				payment_date: new Date().toISOString(),
				subscription_id: subscriptionData.id,
				origin: 'MANUAL',
				transactionId: dataPayment.transactionId
			})
			.select('id')
			.single()

		const newDate = getNextPaymentDate(
			subscriptionData.next_payment_date,
			// eslint-disable-next-line
			// @ts-ignore
			subscriptionData.product_subscription_types.subscription_types.interval_value,
			// eslint-disable-next-line
			// @ts-ignore
			subscriptionData.product_subscription_types.subscription_types.interval_unit
		)

		await supabase
			.from('subscriptions')
			.update({ next_payment_date: newDate })
			.eq('id', subscriptionData.id)
			.select()

		console.log('✅ End Charge Subscription')
		res.status(200).json({ message: 'Subscription charged successfully' })
	} catch (err: any) {
		console.error('❌ Error Charging Subscription:', err)
		res.status(500).json({ message: err.message || 'Error charging subscription' })
	}
}
