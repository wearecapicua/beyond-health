import { Address } from 'pages/api/checkout_sessions/capture-payment'

export function formatAmountForDisplay(amount: number, currency: string): string {
	const formattedAmount = amount / 100
	const numberFormat = new Intl.NumberFormat(['en-US'], {
		style: 'currency',
		currency,
		currencyDisplay: 'symbol'
	})

	return numberFormat.format(formattedAmount)
}

export function formatAmountForStripe(amount: number, currency: string): number {
	const numberFormat = new Intl.NumberFormat(['en-US'], {
		style: 'currency',
		currency,
		currencyDisplay: 'symbol'
	})
	const parts = numberFormat.formatToParts(amount)
	let zeroDecimalCurrency: boolean = true
	for (const part of parts) {
		if (part.type === 'decimal') {
			zeroDecimalCurrency = false
		}
	}

	return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}

export function formatAmountFromStripe(amount: number, currency: string): number {
	const numberFormat = new Intl.NumberFormat(['en-US'], {
		style: 'currency',
		currency,
		currencyDisplay: 'symbol'
	})
	const parts = numberFormat.formatToParts(amount)
	let zeroDecimalCurrency: boolean = true
	for (const part of parts) {
		if (part.type === 'decimal') {
			zeroDecimalCurrency = false
		}
	}

	return zeroDecimalCurrency ? amount : Math.round(amount / 100)
}

export async function createCustomerPortalSession() {
	try {
		const response = await fetch('/api/stripe/customer-portal', {
			method: 'POST'
		})

		if (response.ok) {
			const data = await response.json()

			return data.url // Return the Customer Portal URL
		} else {
			console.error('Error:', response.statusText)

			return null
		}
	} catch (error) {
		console.error('Error:', error)

		return null
	}
}

export function formatCustomerData(originalObject: {
	name: string
	shipping?: { address: Address }
	address?: Address
}) {
	const nameParts = originalObject.name.split(' ')
	const first_name = nameParts[0]
	const last_name = nameParts.slice(1).join(' ')
	const formattedObject = {
		billing_address: {
			...originalObject.address
		},
		shipping_address: {
			...originalObject.shipping?.address
		},
		first_name,
		last_name
	}

	return formattedObject
}
