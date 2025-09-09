import crypto from 'crypto'

import { useState } from 'react'

import { adminUpdateOrder, createShippoOrder } from 'lib/api/supabase'
import env from 'lib/env'
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

	const getNuveiTimeStamp = (): string => {
		const now = new Date()

		const YYYY = now.getFullYear().toString()
		const MM = String(now.getMonth() + 1).padStart(2, '0')
		const DD = String(now.getDate()).padStart(2, '0')
		const HH = String(now.getHours()).padStart(2, '0')
		const mm = String(now.getMinutes()).padStart(2, '0')
		const ss = String(now.getSeconds()).padStart(2, '0')

		return `${YYYY}${MM}${DD}${HH}${mm}${ss}`
	}

	const confirmPayment = async () => {
		const { email } = user
		const { first_name, last_name, billing_address } = profile
		const { country, line1, city, postal_code, state } = billing_address

		const { userTokenId, transactionId, userPaymentOptionId } = order

		const ts = getNuveiTimeStamp()
		const client_request_id = `crid-${Date.now()}`

		const rawString1 =
			env.nextPublicNuveiMerchantId +
			env.nextPublicNuveiMerchantSiteId +
			ts +
			env.nextPublicNuveiMerchantSecretKey
		const checksum1 = crypto.createHash('sha256').update(rawString1).digest('hex')

		const payload1 = {
			merchantId: env.nextPublicNuveiMerchantId,
			merchantSiteId: env.nextPublicNuveiMerchantSiteId,
			timeStamp: ts,
			checksum: checksum1
		}

		const response1 = await fetch('https://ppp-test.nuvei.com/ppp/api/v1/getSessionToken.do', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload1)
		})

		const data1 = await response1.json()

		const st = data1.sessionToken

		const currency = 'USD'
		const amount = product.price.toString()

		const rawString =
			env.nextPublicNuveiMerchantId +
			env.nextPublicNuveiMerchantSiteId +
			client_request_id +
			amount +
			currency +
			ts +
			env.nextPublicNuveiMerchantSecretKey

		const checksum = crypto.createHash('sha256').update(rawString).digest('hex')
		const el = document.getElementById('card-name')
		const holderName = el && 'value' in el ? (el as HTMLInputElement).value.trim() : ''

		const payload2 = {
			paymentFlow: 'direct',
			merchantId: env.nextPublicNuveiMerchantId,
			merchantSiteId: env.nextPublicNuveiMerchantSiteId,
			timeStamp: ts,
			sessionToken: st,
			userTokenId,
			clientRequestId: client_request_id,
			clientUniqueId: `cuid-${Date.now()}`, // your invoice/order id
			currency,
			amount,
			items: [
				{
					name: product.name,
					quantity: 1,
					price: amount
				}
			],
			transactionType: 'Sale',
			isRebilling: 1, // ← marks this as MIT
			relatedTransactionId: transactionId,
			cardHolderName: holderName,
			paymentOption: {
				userPaymentOptionId
			},
			billingAddress: {
				firstName: first_name,
				lastName: last_name,
				email, // shopper’s e-mail
				address: line1, // street line 1
				city,
				state, // 2-letter for US/CA; full name elsewhere
				country: country.value, // ISO-2 or ISO-3
				/* still smart to keep the old risk helpers */
				zip: postal_code
			},
			deviceDetails: {
				ipAddress: '34.21.9.50' // **IPv4** string
			},
			checksum
		}

		const responseFinal = await fetch('https://ppp-test.nuvei.com/ppp/api/v1/payment.do', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload2)
		})

		return responseFinal.json()
	}

	const createSubscription = async () => {
		debugger
		const { userTokenId, transactionId, userPaymentOptionId } = order
		const ts = getNuveiTimeStamp()
		const currency = 'USD'
		const planId = product.nuvei_plan_id.toString()

		const rawString =
			env.nextPublicNuveiMerchantId +
			env.nextPublicNuveiMerchantSiteId +
			userTokenId +
			planId +
			userPaymentOptionId +
			currency +
			ts +
			env.nextPublicNuveiMerchantSecretKey

		const checksum = crypto.createHash('sha256').update(rawString).digest('hex')

		debugger
		// Example client call
		const responseFinal = await fetch('/api/nuvei-create-subscription', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				merchantId: env.nextPublicNuveiMerchantId,
				merchantSiteId: env.nextPublicNuveiMerchantSiteId,
				userTokenId,
				planId,
				userPaymentOptionId,
				currency,
				transactionId,
				timeStamp: ts,
				checksum
			})
		})

		debugger

		return responseFinal.json()
	}

	const handlePayment = async () => {
		setLoading(true)
		setBusy(true)
		try {
			const dataPayment = await confirmPayment()

			debugger

			const res = await fetch('/api/get-user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					user_id: user.id
				})
			})

			// const data = await payment.json()
			const userData = await res.json()

			console.log('Payment response:', dataPayment)

			debugger

			if (dataPayment.status !== 'SUCCESS' || userData === null) {
				throw new Error('Error creating payment')
			}

			const shippoOrderResponse: CreateOrderResponse = (await createShippoOrder(
				user.id,
				`${product.name}`
			)) as CreateOrderResponse

			console.log('shippoOrderResponse response:', shippoOrderResponse)

			debugger

			const dataSubscription = await createSubscription()

			if (dataSubscription.status !== 'SUCCESS') {
				throw new Error('Error creating subscription')
			}

			debugger
			if (shippoOrderResponse?.success) {
				await adminUpdateOrder(
					'USER',
					order.orderId,
					shippoOrderResponse.shippoData?.order_number || '#',
					dataSubscription.subscriptionId
				)
			} else {
				await adminUpdateOrder('USER', order.orderId, '#00000', dataSubscription.subscriptionId)
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
