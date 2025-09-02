import { useState } from 'react'

import { updateOrder } from 'lib/api/supabase'

type Props = {
	order: any
	refresh: () => unknown
	setBusy: (busy: boolean) => unknown
}

const CancelOrderButton = ({ order, refresh, setBusy }: Props) => {
	const [loading, setLoading] = useState(false)

	const handlePayment = async () => {
		setLoading(true)
		setBusy(true)
		try {
			await updateOrder(order.orderId, 'Rejected')
			setLoading(false)
			setBusy(false)
			refresh()
		} catch (error) {
			console.error('Error', error)
		}
	}

	return (
		<div className="text-sm text-red-500">
			<button onClick={handlePayment} disabled={loading} className={loading ? 'text-gray-500' : ''}>
				Reject
			</button>
		</div>
	)
}

export default CancelOrderButton
