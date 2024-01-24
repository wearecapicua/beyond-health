import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { signedUrl } = req.body
	const session = await getServerSession(req, res, authOptions)

	if (!session?.user) {
		return res.status(401).json({ error: 'Unauthorized' })
	}
	const supabaseAccessToken = env.supabaseServiceRoleKey
	const supabase = supabaseClient(supabaseAccessToken)

	if (req.method === 'POST') {
		const pathTemporary = signedUrl.split('profile-images/')[1]
		const path = pathTemporary.split('?')[0]
		try {
			const { data, error } = await supabase.storage.from('profile-images').remove([path])

			if (error) {
				console.error('Error uploading image:', error)
			}

			return res.status(200).json(data)
		} catch (error) {
			console.error('Error updating profile:', error)

			return res.status(500).json({ error: 'Internal server error' })
		}
	}
}
