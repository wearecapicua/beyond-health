import env from 'lib/env'
import { formatCustomerData } from 'lib/stripeUtils'
import { NextApiRequest, NextApiResponse } from 'next'
import getRawBody from 'raw-body'
import { Stripe } from 'stripe'

import { Address } from '../checkout_sessions/capture-payment'

interface StripeEventDataObject {
	id: string
	email: string
}

const stripeWebhookSecret: string = env.stripeWebhookSecret
const stripe = new Stripe(env.stripeSecretKey, { apiVersion: '2022-11-15' })

// Stripe dashboard lets user change payment, email, phone number, name, and billing address
// billing.stripe.com/p/login/test_9AQbJc9Rg8Nb0yA8ww

export const config = {
	api: {
		bodyParser: false
	}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const rawBody = await getRawBody(req)
		const sig = req.headers['stripe-signature'] as string
		let event: Stripe.Event

		try {
			event = stripe.webhooks.constructEvent(rawBody, sig, stripeWebhookSecret)

			switch (event.type) {
				case 'customer.updated': {
					const stripeObject = event.data.object as StripeEventDataObject
					const filteredData = formatCustomerData(
						stripeObject as unknown as {
							name: string
							shipping?: { address: Address }
							address?: Address
						}
					)
					const id = stripeObject.id
					const updatedEmail = stripeObject.email

					await sendUpdatedDataToProfile(id, updatedEmail, filteredData)
					break
				}
				case 'payment_method.updated': {
					console.log('payment_method.updated', event.data.object)
					break
				}
			}
		} catch (error) {
			console.error(error)
			res.status(400).send('Webhook Error')
		}
		res.send({ success: true })
	}
}

async function sendUpdatedDataToProfile(
	id: string,
	updatedEmail: string,
	updatedData: {
		billing_address: {
			line1?: string | undefined
			line2?: string | undefined
			city?: string | undefined
			state?: string | undefined
			postal_code?: string | undefined
			country?: {
				value: string
			}
		}
		shipping_address: {
			line1?: string
			line2?: string
			city?: string
			state?: string
			postal_code?: string
		}
		first_name: string
		last_name: string
	}
) {
	try {
		const response = await fetch(process.env.HOST + '/api/update-profile-stripe', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, updatedEmail, updatedData })
		})

		if (response.status === 200) {
			const result = await response.json()
			console.log('Update successful:', result)
		} else {
			console.error('Update failed:', response.statusText)
		}
	} catch (error) {
		console.error('Error sending data to update-profile:', error)
	}
}
