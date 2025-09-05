import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Nuvei DMN (Direct Merchant Notification) handler
 * Nuvei will send a POST request with transaction details when payment status changes
 * e.g., approved, declined, settled, refunded, chargeback, subscription event, etc.
 *
 * You must respond with HTTP 200 OK to acknowledge receipt, otherwise Nuvei will retry.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		// Parse the DMN payload (Nuvei sends JSON by default if configured)
		const body = await req.body

		console.log('🔔 Received Nuvei DMN:', body)

		return res.status(200).json({ received: true })
	} catch (err) {
		console.error('❌ Error handling Nuvei DMN:', err)

		// Still return 200 so Nuvei doesn’t keep retrying, but log the error
		return res.status(200).json({ received: false })
	}
}
