import env from 'lib/env'
import { supabaseClient } from 'lib/supabaseClient'
import { NextApiHandler } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'

const handler: NextApiHandler = async (req, res) => {
	const session = await getServerSession(req, res, authOptions)
	if (!session) {
		return res.status(401).json({})
	}
	const supabase = supabaseClient(env.supabaseServiceRoleKey)
	const userId = session.user.id
	const timestamp = new Date().toISOString()
	const imagePath = `pictures/${userId}/${timestamp}`
	const { data, error } = await supabase.storage.from('profile-images').createSignedUploadUrl(imagePath)
	if (error) {
		console.error('Error uploading image:', error)

		return res.status(500).json(error)
	} else {
		console.log('data', data)

		return res.status(200).json(data)
	}
}

export default handler
