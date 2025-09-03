import { NextRequest, NextResponse } from 'next/server'
// import { db } from "@/server/db"; // Uncomment if you want to update your DB
// import { orders } from "@/server/db/schema"; // Example with Drizzle/Prisma

/**
 * Nuvei DMN (Direct Merchant Notification) handler
 * Nuvei will send a POST request with transaction details when payment status changes
 * e.g., approved, declined, settled, refunded, chargeback, subscription event, etc.
 *
 * You must respond with HTTP 200 OK to acknowledge receipt, otherwise Nuvei will retry.
 */
export async function POST(req: NextRequest) {
	try {
		// Parse the DMN payload (Nuvei sends JSON by default if configured)
		const body = await req.json()

		console.log('🔔 Received Nuvei success:', body)

		// ✅ Example: extract important fields
		// const { transactionId, transactionType, transactionStatus, totalAmount, currency, customData } = body

		// TODO: verify DMN signature here (Nuvei docs: https://docs.nuvei.com/documentation/integration/webhooks/payment-dmns/)
		// Example: use the secret key to validate hash parameters

		// TODO: Update your database if needed (order status, subscription, etc.)
		// Example with Drizzle/Prisma:
		// await db.update(orders)
		//   .set({ status: transactionStatus })
		//   .where(eq(orders.transactionId, transactionId));

		// Always respond with 200 to confirm receipt
		return NextResponse.json({ received: true })
	} catch (err) {
		console.error('❌ Error handling Nuvei DMN:', err)

		// Still return 200 so Nuvei doesn’t keep retrying, but log the error
		return NextResponse.json({ received: false })
	}
}
