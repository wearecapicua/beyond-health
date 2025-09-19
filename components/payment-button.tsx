import { useState } from 'react'

import { adminUpdateOrder, createShippoOrder } from 'lib/api/supabase'
import { Product } from 'lib/types'

type Props = {
	user: any
	profile: any
	order: any
	product: Product
	refresh: () => unknown
	setBusy: (busy: boolean) => unknown
}
export interface CreateOrderResponse {
	success: boolean
	shippoData?: {
		order_number: string
	}
}

const PaymentButton = ({ user, product, profile, order, refresh, setBusy }: Props) => {
	const [loading, setLoading] = useState(false)

	const confirmPayment = async () => {
		const { email } = user

		const responseFinal = await fetch('/api/post-nuvei-do-payment', {
			method: 'post',
			body: JSON.stringify({
				product,
				order,
				email,
				profile
			})
		})

		const data = await responseFinal.json()

		return data
	}

	const handlePayment = async () => {
		setLoading(true)
		setBusy(true)
		try {
			const dataPayment = await confirmPayment()

			const res = await fetch('/api/get-user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					user_id: user.id
				})
			})

			const userData = await res.json()

			if (dataPayment.status !== 'SUCCESS' || userData === null) {
				throw new Error('Error creating payment')
			}

			const shippoOrderResponse: CreateOrderResponse = (await createShippoOrder(
				user.id,
				`${product.name}`
			)) as CreateOrderResponse

			if (shippoOrderResponse?.success) {
				await adminUpdateOrder('USER', order.orderId, shippoOrderResponse.shippoData?.order_number || '#')
			} else {
				await adminUpdateOrder('USER', order.orderId, '#00000')
			}

			setLoading(false)
			setBusy(false)
			refresh()
		} catch (error) {
			console.error('Error', error)
		}
	}

	return (
		<div className="text-sm">
			<button onClick={handlePayment} disabled={loading} className={loading ? 'text-gray-500' : ''}>
				<p>Submit</p>
			</button>
		</div>
	)
}

export default PaymentButton
