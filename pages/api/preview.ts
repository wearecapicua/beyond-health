import { setPreviewData, redirectToPreviewURL } from '@prismicio/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { createClient } from '../../lib/prismic'

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
	const client = createClient({ req })

	setPreviewData({ req, res })

	await redirectToPreviewURL({ req, res, client })
}
