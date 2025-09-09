// app/api/nuvei/create-subscription/route.ts

// keep these in server env
const NUVEI_ENDPOINT = 'https://ppp-test.nuvei.com/ppp/api/v1/createSubscription.do'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		// body from client — NEVER send secrets from client
		const {
			userTokenId,
			planId,
			userPaymentOptionId,
			transactionId,
			currency = 'USD',
			initialAmount,
			recurringAmount,
			startAfter,
			recurringPeriod,
			endAfter,
			timeStamp,
			checksum,
			merchantId,
			merchantSiteId
		} = await req.body

		const basePayload = {
			merchantId,
			merchantSiteId,
			userTokenId,
			planId,
			userPaymentOptionId,
			currency,
			timeStamp,
			checksum,
			initialAmount,
			recurringAmount,
			startAfter,
			recurringPeriod,
			endAfter,
			initialTransactionId: transactionId
		}

		console.log(JSON.stringify(basePayload))

		const nuveiRes = await fetch(NUVEI_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			// If your account wants form data, use:
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			// body: new URLSearchParams(Object.entries(payload as Record<string,string>)).toString()
			body: JSON.stringify(basePayload)
		})

		const data = await nuveiRes.json()

		const { status, subscriptionId } = data

		console.log(data)

		return res.json({ ok: true, status, subscriptionId })
	} catch (err) {
		console.error('❌ Error handling Nuvei DMN:', err)

		// Still return 200 so Nuvei doesn’t keep retrying, but log the error
		return res.status(500).json({ ok: false, error: err?.message ?? 'Unknown error' })
	}
}
