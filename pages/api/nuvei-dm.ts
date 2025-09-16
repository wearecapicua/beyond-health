import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		res.status(200).send('OK') // Always respond with 200/OK
	} catch (err: any) {
		console.error('❌ Error:', err)
		res.status(500).send('Error')
	}
}
