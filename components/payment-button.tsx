import { useState } from 'react'

import { adminUpdatePayments, createOrder } from 'lib/api/supabase'
import { fetchPostJSON } from 'lib/http'
import useStripe from 'lib/useStripe'

import { Product } from './price-column'

type Props = {
	setupId: string
	price: number
	userId: string
	product: Product
}

interface CreateOrderResponse {
	success: boolean
	shippoData?: {
		order_number: string
	}
}

const PaymentButton = ({ setupId, price, userId, product }: Props) => {
	const stripe = useStripe()
	const [loading, setLoading] = useState(false)
	const [results, setResults] = useState<string | null>()
	const priceString = (price / 100).toFixed(2).toString()
	const productId = product?.id

	const handlePayment = async () => {
		setLoading(true)
		if (!stripe) {
			console.error('Failed to load Stripe.js')

			return
		}

		try {
			const response: { status: string } = await fetchPostJSON(`/api/checkout_sessions/post-payment`, {
				method: 'POST',
				setupId,
				price
			})

			setResults(response?.status)

			if (response?.status === 'succeeded') {
				const orderResponse: CreateOrderResponse = (await createOrder(
					userId,
					productId as string
				)) as CreateOrderResponse
				if (orderResponse?.success) {
					await adminUpdatePayments(userId, orderResponse.shippoData?.order_number || '#')
				} else {
					await adminUpdatePayments(userId, '#00000')
				}
			} else {
				await adminUpdatePayments(userId, '#00000')
			}

			setLoading(false)
		} catch (error) {
			console.error('Error', error)
		}
	}

	return (
		<div className="text-sm text-main-blue">
			{!results ? (
				<button onClick={handlePayment} disabled={loading} className={loading ? 'text-gray-500' : ''}>
					<p>Submit payment for </p>
					<span>{`$${priceString}`}</span>
				</button>
			) : (
				<div className="text-center">
					<p>Payment status:</p>
					<span>{results}</span>
				</div>
			)}
		</div>
	)
}

export default PaymentButton
