import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions)
	const { user_id } = req.body

	if (!session?.user) {
		return res.status(401).json({ error: 'Unauthorized' })
	}
	const supabaseAccessToken = env.supabaseServiceRoleKey
	const supabase = supabaseClient(supabaseAccessToken)

	if (req.method === 'POST') {
		try {
			const { data: orders } = await supabase
				.from('orders')
				.select(`id,status , products(id, name, price)`)
				.eq('user_id', user_id)

			if (orders) {
				return res.status(200).json({ orders })
			} else {
				return res.status(200).json(null)
			}
		} catch (error) {
			console.log(error)

			return res.status(500).json({ error: 'Internal server error' })
		}
	}
}
