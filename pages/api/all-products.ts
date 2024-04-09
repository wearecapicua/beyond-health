import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const supabaseAccessToken = env.supabaseServiceRoleKey
		const supabase = supabaseClient(supabaseAccessToken)
		const response = await supabase.from('products').select('*')
		const products = response.data

		if (!products) {
			throw new Error('No products found')
		}
		const productsWithPrices = await Promise.all(
			products.map(async (product) => {
				const selectedProductProps = {
					stage: product.stage,
					name: product.name,
					id: product.id,
					price: product.price,
					ingredients: product.ingredients,
					term: product.term
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
