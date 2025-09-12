import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { subscription_id, active } = req.body

	const session = await getServerSession(req, res, authOptions)

	if ((session?.user as unknown as { role: string }).role !== 'ADMIN') {
		return res.status(401).json({ error: 'Unauthorized' })
	}
	const supabaseAccessToken = env.supabaseServiceRoleKey

	const supabase = supabaseClient(supabaseAccessToken)

	if (req.method === 'POST') {
		try {
			await supabase.from('subscriptions').update({ active }).eq('id', subscription_id).select()

			return res.status(200).json(true)
		} catch (error) {
			if (error instanceof Error) console.error('Error adding payment to history:', error.message)

			return res.status(500).json({ error: 'Internal server error' })
		}
	}
}
