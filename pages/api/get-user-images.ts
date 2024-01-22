import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions)
	const { userId } = req.body

	if (!session?.user) {
		return res.status(401).json({ error: 'Unauthorized' })
	}
	const supabaseAccessToken = env.supabaseServiceRoleKey
	const supabase = supabaseClient(supabaseAccessToken)

	if (req.method === 'POST') {
		try {
			const { data: userImagesPath } = await supabase
				.from('profile')
				.select('profile_image_url,insurance_image_url,health_card_image_url,photo_id_url')
				.eq('user_id', userId)
				.single()

			if (userImagesPath) {
				const { data: profileImageUrl } = await supabase.storage
					.from('profile-images')
					.createSignedUrl(userImagesPath.profile_image_url, 300)
				const { data: photoIdUrl } = await supabase.storage
					.from('profile-images')
					.createSignedUrl(userImagesPath.photo_id_url, 300)
				const { data: healthCardImageUrl } = await supabase.storage
					.from('profile-images')
					.createSignedUrl(userImagesPath.health_card_image_url, 300)
				const { data: insuranceImageUrl } = await supabase.storage
					.from('profile-images')
					.createSignedUrl(userImagesPath.insurance_image_url, 300)

				return res.status(200).json({ profileImageUrl, photoIdUrl, healthCardImageUrl, insuranceImageUrl })
			} else {
				return res.status(200).json(null)
			}
		} catch (error) {
			console.log(error)
			console.error('Error getting profile image:', error)

			return res.status(500).json({ error: 'Internal server error' })
		}
	}
}
