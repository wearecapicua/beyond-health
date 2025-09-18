import crypto from 'crypto'

import env from 'lib/env'
import { NextApiRequest, NextApiResponse } from 'next'

const generateChecksum = (req: NextApiRequest, res: NextApiResponse) => {
	const { publicMerchantId, publicMerchantSiteId, productPrice, timeStamp } = req.body
	const clientRequestId = ''
	const checksumData = `${publicMerchantId}${publicMerchantSiteId}${clientRequestId}${productPrice}USD${timeStamp}${env.nuveiMerchantSecretKey}`

	const checksum = crypto.createHash('sha256').update(checksumData, 'utf8').digest('hex')

	res.status(200).json({ checksum })
}

export default generateChecksum
