import { useState } from 'react'

type Props = {
	subscription: any
	refresh: () => unknown
	setBusy: (busy: boolean) => unknown
}

const ChargeNowButton = ({ subscription, refresh, setBusy }: Props) => {
	const [loading, setLoading] = useState(false)

	const handleCharge = async () => {
		setLoading(true)
		setBusy(true)
		try {
			const response = await fetch('/api/charge-subscription', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ subscriptionId: subscription.id })
			})
			if (!response.ok) {
				throw new Error('Failed to charge subscription')
			}
			setLoading(false)
			setBusy(false)
			refresh()
		} catch (error) {
			console.error('Error', error)
			setLoading(false)
			setBusy(false)
		}
	}

	return (
		<div className="text-sm text-blue-500">
			<button onClick={handleCharge} disabled={loading} className={loading ? 'text-gray-500' : ''}>
				{loading ? 'Charging...' : 'Charge Now'}
			</button>
		</div>
	)
}

export default ChargeNowButton
