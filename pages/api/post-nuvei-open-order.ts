import crypto from 'crypto'

import env from 'lib/env'
import { NextApiRequest, NextApiResponse } from 'next'
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

		const body = await req.body

		const { user_id, client_request_id, price, productName, ts, sessionToken } = JSON.parse(body)

		const orderPayload = {
			sessionToken,
			transactionType: 'Auth',
			merchantId: env.nuveiMerchantId,
			merchantSiteId: env.nuveiMerchantSiteId,
			clientUniqueId: user_id,
			clientRequestId: client_request_id,
			currency: 'USD',
			amount: price,
			isRebilling: 0,
			timeStamp: ts,
			paymentOption: {
				card: {
					threeD: {
						v2AdditionalParams: {
							rebillExpiry: '20260201',
							rebillFrequency: '90'
						}
					}
				}
			},
			items: [
				{
					name: productName,
					quantity: 1,
					price
				}
			],
			checksum: ''
		}

		const orderChecksumStr =
			env.nuveiMerchantId +
			env.nuveiMerchantSiteId +
			orderPayload.clientRequestId +
			orderPayload.amount +
			orderPayload.currency +
			ts +
			env.nuveiMerchantSecretKey

		orderPayload.checksum = crypto.createHash('sha256').update(orderChecksumStr).digest('hex')

		const responseOrders = await fetch(env.nuveiDomain + '/ppp/api/v1/openOrder.do', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(orderPayload)
		})

		const dataOrders = await responseOrders.json()

		const st = dataOrders.sessionToken

		const safeChargeBody = {
			env: env.nuveiEnv,
			sessionToken: st,
			merchantId: env.nuveiMerchantId,
			merchantSiteId: env.nuveiMerchantSiteId,
			logLevel: '6',
			showAccountCapture: true
		}

		res.status(200).json({ safeChargeBody, st })
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message })
		}
	}
}
