import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { keyedData } from 'utils'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const JOTFORM_API_KEY = process.env.JOTFORM_API_KEY;

    const submissionID = req.query.id as string;

    const updatedSubmissionData = keyedData(req.body)

    try {
      const response = await axios.post(
        `https://api.jotform.com/submission/${submissionID}?apiKey=${JOTFORM_API_KEY}`,
        updatedSubmissionData
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error updating submission:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
