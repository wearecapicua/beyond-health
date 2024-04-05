import { useState } from 'react'

import { adminUpdatePayments, createOrder } from 'lib/api/supabase'
import { Product } from 'lib/types'

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

const PaymentButton = ({ userId, product }: Props) => {
	const { price } = product
	const [loading, setLoading] = useState(false)

	const handlePayment = async () => {
		setLoading(true)

		try {
			const payment = await fetch('/api/bambora/payment', {
				method: 'POST',
				body: JSON.stringify({ userId, price })
			})

			if (payment?.ok) {
				const orderResponse: CreateOrderResponse = (await createOrder(
					userId,
					`${product.id}`
				)) as CreateOrderResponse
				if (orderResponse?.success) {
					await adminUpdatePayments(userId, orderResponse.shippoData?.order_number || '#')
				} else {
					await adminUpdatePayments(userId, '#00000')
				}
			} else {
				throw new Error('Payment failed')
			}
			setLoading(false)
		} catch (error) {
			console.error('Error', error)
		}
	}

	return (
		<div className="text-sm text-main-blue">
			(
			<button onClick={handlePayment} disabled={loading} className={loading ? 'text-gray-500' : ''}>
				<p>Submit payment for </p>
				<span>{`$${price}`}</span>
			</button>
			)
		</div>
	)
}

export default PaymentButton
