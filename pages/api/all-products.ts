import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const products = await stripeInstance.products.list({
			limit: 100
		})

		// Fetch prices for each product using Promise.all
		const productsWithPrices = await Promise.all(
			products.data.map(async (product) => {
				const prices = await stripeInstance.prices.list({
					product: product.id,
					limit: 10 // Adjust the limit as needed
				})

				// Select only the desired properties from the product
				const selectedProductProps = {
					default_price: product.default_price,
					description: product.description,
					metadata: product.metadata,
					name: product.name,
					id: product.id,
					price: prices.data[0].unit_amount
				}

				return selectedProductProps
			})
		)

		res.status(200).json({ productsWithPrices })
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message })
		}
	}
}
