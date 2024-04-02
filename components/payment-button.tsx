import { useState } from 'react'

import { Product } from './price-column'

type Props = {
	setupId: string
	price: number
	userId: string
	product: Product
}

const PaymentButton = ({ price, userId }: Props) => {
	const [loading, setLoading] = useState(false)
	const priceString = (price / 100).toFixed(2).toString()

	const handlePayment = async () => {
		setLoading(true)
		console.log(userId)

		// Define the string
		debugger
		const pepe = await fetch('/api/bambora/create-profile', {
			method: 'POST',
			body: JSON.stringify({ userId })
		})

		const pepa = await pepe.json()
		console.log(pepa)

		// if (!stripe) {
		// 	console.error('Failed to load Stripe.js')

		// 	return
		// }

		// try {
		// 	const response: { status: string } = await fetchPostJSON(`/api/checkout_sessions/post-payment`, {
		// 		method: 'POST',
		// 		setupId,
		// 		price
		// 	})

		// 	setResults(response?.status)

		// 	if (response?.status === 'succeeded') {
		// 		const orderResponse: CreateOrderResponse = (await createOrder(
		// 			userId,
		// 			productId as string
		// 		)) as CreateOrderResponse
		// 		if (orderResponse?.success) {
		// 			await adminUpdatePayments(userId, orderResponse.shippoData?.order_number || '#')
		// 		} else {
		// 			await adminUpdatePayments(userId, '#00000')
		// 		}
		// 	} else {
		// 		await adminUpdatePayments(userId, '#00000')
		// 	}

		// 	setLoading(false)
		// } catch (error) {
		// 	console.error('Error', error)
		// }
	}

	return (
		<div className="text-sm text-main-blue">
			(
			<button onClick={handlePayment} disabled={loading} className={loading ? 'text-gray-500' : ''}>
				<p>Submit payment for </p>
				<span>{`$${priceString}`}</span>
			</button>
			)
		</div>
	)
}

export default PaymentButton
