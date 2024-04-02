import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const url = `https://api.na.bambora.com/scripts/tokenization/tokens`
		const body = req.body

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})

			if (response.ok) {
				const data = await response.json()
				res.status(200).json(data)
			} else {
				console.error('Error obtaining token:', response.status)
				res.status(500).json({ error: 'Internal server error' })
			}
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Internal server error' })
		}
	} else {
		res.setHeader('Allow', 'GET')
		res.status(405).end('Method Not Allowed')
	}
}
