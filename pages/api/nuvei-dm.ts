import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const body = await req.body
		console.log('✅ Nuvei DMN: ', body)
		res.status(200).send('OK') // Always respond with 200/OK
	} catch (err: any) {
		if (err instanceof Error) {
			console.error('❌ Error Post Nuvei Do Payment:', err.message)
		}
		res.status(500).send('Error')
	}
}
