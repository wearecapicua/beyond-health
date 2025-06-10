import { useEffect, useState } from 'react'

import { adminUpdatePayments, createOrder } from 'lib/api/supabase'
import env from 'lib/env'
import { Product } from 'lib/types'
import { CreatePaymentResponse, SafeCharge } from 'lib/types/global'

type Props = {
	setupId: string
	price: number
	userId: string
	product: Product
}
export interface CreateOrderResponse {
	success: boolean
	shippoData?: {
		order_number: string
	}
}

const PaymentButton = ({ userId, product }: Props) => {
	const { price } = product
	const [loading, setLoading] = useState(false)
	const [safeCharge, setSafeCharge] = useState<SafeCharge>()
	const [sessionToken, setSessionToken] = useState()
	const [timeStamp, setTimeStamp] = useState('')
	const [checksum, setChecksum] = useState('')
	const [userTokenId, setUserTokenId] = useState('')
	const currency = 'USD'
	const [amount, setAmount] = useState(0)

	useEffect(() => {
		setAmount(price)
		setTimeStamp(generateTimestamp())
		setUserTokenId(userId)
	}, [])

	useEffect(() => {
		if (timeStamp !== '' && userTokenId !== '' && amount > 0) {
			handleGenerateChecksum()
		}
	}, [timeStamp, userTokenId, amount])

	useEffect(() => {
		if (sessionToken !== undefined) {
			console.log('sessionToken:', sessionToken)

			if (window.SafeCharge) {
				setSafeCharge(
					window.SafeCharge({
						env: 'int',
						sessionToken,
						merchantId: env.publicMerchantId,
						merchantSiteId: env.publicMerchantSiteId
					})
				)
				console.log('safecharge.js está listo para usarse en step-18')
			}
		}
	}, [sessionToken])

	useEffect(() => {
		if (checksum !== '') {
			openOrder()
				.then((sessionToken) => {
					setSessionToken(sessionToken)
				})
				.catch((error) => {
					console.error('Error al abrir la orden:', error)
				})
		}
	}, [checksum])

	const handleGenerateChecksum = async () => {
		const response = await fetch('/api/nuvei/generateChecksum', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				publicMerchantId: env.publicMerchantId,
				publicMerchantSiteId: env.publicMerchantSiteId,
				user_id: userTokenId,
				productPrice: amount,
				timeStamp
			})
		})

		if (response.ok) {
			const data = await response.json()
			setChecksum(data.checksum)
		}
	}

	const openOrder = async () => {
		const response = await fetch('https://ppp-test.nuvei.com/ppp/api/v1/openOrder.do', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				merchantId: env.publicMerchantId,
				merchantSiteId: env.publicMerchantSiteId,
				timeStamp,
				checksum,
				amount,
				userTokenId,
				currency
			})
		})

		if (!response.ok) {
			throw new Error(response.statusText)
		}

		const order = await response.json()

		if (order.status !== 'SUCCESS') {
			throw new Error(order.reason)
		}

		return order.sessionToken
	}

	const generateTimestamp = (): string => {
		const now = new Date()

		return now
			.toISOString()
			.replace(/[-:.TZ]/g, '')
			.slice(0, 14)
	}

	const handlePayment = async () => {
		setLoading(true)

		try {
			const payment = await fetch('/api/nuvei/payment', {
				method: 'POST',
				body: JSON.stringify({ userId })
			})

			const res = await fetch('/api/get-user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					user_id: userId
				})
			})

			const data = await payment.json()
			const userData = await res.json()

			console.log('Payment response:', data)

			if (data.status !== 200 || userData === null) {
				throw new Error('Error creating payment')
			}

			if (safeCharge && sessionToken) {
				const payment: CreatePaymentResponse = await new Promise((resolve, reject) => {
					safeCharge.createPayment(
						{
							sessionToken,
							paymentOption: {
								userPaymentOptionId: data.data.customer_code
							},
							billingAddress: {
								email: userData.user.email,
								country: data.data.shipping_address.country.value,
								firstName: data.data.first_name,
								lastName: data.data.last_name,
								address: data.data.shipping_address.line1
							}
						},
						(res) => {
							if (res.errCode !== '0') {
								// resolve(res.userPaymentOptionId?.toString())
								resolve(res)
							} else {
								reject(new Error(res.errorDescription))
							}
						}
					)
				})
				console.log('Payment responsesss:', payment)

				if (payment.result !== 'ERROR') {
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
