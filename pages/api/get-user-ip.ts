import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const forwarded = req.headers['x-forwarded-for']
		let ip =
			typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress || 'unknown'

		if (ip === '::1' || ip === '::ffff:127.0.0.1') {
			ip = '127.0.0.1'
		}
		if (ip.startsWith('::ffff:')) {
			ip = ip.replace('::ffff:', '')
		}
		console.log('Get user ip:', ip)
		res.status(200).json({ ip })
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ message: err.message })
		}
	}
}
