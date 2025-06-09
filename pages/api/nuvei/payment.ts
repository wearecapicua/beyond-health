import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { userId } = await JSON.parse(req.body)
			const supabaseAccessToken = env.supabaseServiceRoleKey
			const supabase = supabaseClient(supabaseAccessToken)
			const user = await supabase.from('profile').select('*').eq('user_id', userId).single()

			return res.status(200).json(user)
		
		
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Internal server error' })
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
}
