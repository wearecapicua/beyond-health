import crypto from 'crypto'

import env from 'lib/env'
import { NextApiRequest, NextApiResponse } from 'next'

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const forwarded = req.headers['x-forwarded-for']
		let ip =
			typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress || 'unknown'

		if (ip === '::1' || ip === '::ffff:127.0.0.1') {
			ip = '127.0.0.1'
		}
		if (ip.startsWith('::ffff:')) {
			ip = ip.replace('::ffff:', '')
		}
		console.log('Get user ip:', ip)

		const body = await req.body

		console.log(body)

		const { product, order, email, profile } = JSON.parse(body)
		console.log(body)

		const { first_name, last_name, billing_address } = profile
		const { country, line1, city, postal_code, state } = billing_address

		const { userTokenId, transactionId, userPaymentOptionId } = order

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
					name: product.name,
					quantity: 1,
					price: amount
				}
			],
			transactionType: 'Sale',
			isRebilling: 1, // ← marks this as MIT
			relatedTransactionId: transactionId,
			cardHolderName: order.cardName,
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
				country: country.value, // ISO-2 or ISO-3
				/* still smart to keep the old risk helpers */
				zip: postal_code
			},
			deviceDetails: {
				ipAddress: ip // **IPv4** string
			},
			checksum
		}

		const responseFinal = await fetch(env.nuveiDomain + '/ppp/api/v1/payment.do', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload2)
		})

		res.status(200).json(responseFinal)
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message })
		}
	}
}
