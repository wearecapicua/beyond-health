import env from 'lib/env'
import { supabaseAuthClient } from 'lib/supabaseAuthClient'
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
	const supabase = supabaseAuthClient(supabaseAccessToken)

	if (req.method === 'POST') {
		try {
			const { data: user } = await supabase.from('users').select('id,email').eq('id', user_id).single()

			if (user) {
				return res.status(200).json({ user })
			} else {
				return res.status(200).json(null)
			}
		} catch (error) {
			console.log(error)

			return res.status(500).json({ error: 'Internal server error' })
		}
	}
}
