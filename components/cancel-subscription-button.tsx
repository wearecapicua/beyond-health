import { useState } from 'react'

import { updateOrder } from 'lib/api/supabase'

type Props = {
	subscription: any
	refresh: () => unknown
	setBusy: (busy: boolean) => unknown
}

const CancelSubscriptionButton = ({ subscription, refresh, setBusy }: Props) => {
	const [loading, setLoading] = useState(false)

	const handleStop = async () => {
		setLoading(true)
		setBusy(true)
		try {
			await updateOrder(subscription.id, 'Rejected')
			setLoading(false)
			setBusy(false)
			refresh()
		} catch (error) {
			console.error('Error', error)
		}
	}

	return (
		<div className="text-sm text-red-500">
			<button onClick={handleStop} disabled={loading} className={loading ? 'text-gray-500' : ''}>
				Stop
			</button>
		</div>
	)
}

export default CancelSubscriptionButton
