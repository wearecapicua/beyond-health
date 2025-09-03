// /api/nuvei/session-token.ts (Next.js API Route)
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const payload = {
		merchant_id: process.env.NUVEI_MERCHANT_ID!,
		merchant_site_id: process.env.NUVEI_MERCHANT_SITE_ID!,
		client_request_id: 'user-123', // unique per session
		time_stamp: new Date().toISOString(),
		checksum: '', // see below
		user_token_id: 'USER_123' // your unique user ID
	}

	// 👇 Build the checksum: SHA256(merchant_id + merchant_site_id + client_request_id + time_stamp + secret_key)
	const toHash =
		payload.merchant_id +
		payload.merchant_site_id +
		payload.client_request_id +
		payload.time_stamp +
		process.env.NUVEI_SECRET_KEY!
	const crypto = await import('crypto')
	payload.checksum = crypto.createHash('sha256').update(toHash).digest('hex')

	const { data } = await axios.post('https://ppp-test.nuvei.com/ppp/api/v1/getSessionToken.do', payload)

	res.json({ sessionToken: data.sessionToken })
}
