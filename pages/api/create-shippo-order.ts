import env from 'lib/env'
import { getEmailForUserId, getUserShippingAddress } from 'lib/supabaseUtils'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateOrderNumber } from 'utils'
import { productOne, productTwo, productThree } from 'utils/productToShip'

const paymentTimestamp = new Date().toISOString()
const randomOrderNumber = generateOrderNumber()

export function findProductByName(productName: string) {
	const products = [productOne, productTwo, productThree]

	return products.find((product) => product.line_items[0].title === productName) || null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' })
	}

	const supabaseAccessToken = env.supabaseServiceRoleKey
	const { userId, productName } = req.body

	const selectedProduct = findProductByName(productName)

	try {
		const userEmail = await getEmailForUserId(userId, supabaseAccessToken)
		const userShippingAddress = await getUserShippingAddress(userId, supabaseAccessToken)

		const shippoApiKey = env.shippoApiKey
		const shippoApiUrl = 'https://api.goshippo.com/orders'
		const orderNumber = `#${randomOrderNumber}`

		const newData = {
			...selectedProduct,
			order_number: orderNumber,
			placed_at: paymentTimestamp,
			to_address: {
				...userShippingAddress,
				email: userEmail
			}
		}

		const shippoResponse = await fetch(shippoApiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `ShippoToken ${shippoApiKey}`
			},
			body: JSON.stringify(newData)
		})

		const shippoData = await shippoResponse.json()

		console.log(shippoData)

		if (shippoResponse.ok) {
			res.status(200).json({ success: true, shippoData })
		} else {
			res.status(shippoResponse.status).json({ success: false, error: shippoData.detail })
		}
	} catch (error) {
		console.error('Error creating shipment:', error)
		res.status(500).json({ success: false, error: 'Internal Server Error' })
	}
}
