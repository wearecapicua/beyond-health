import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const JOTFORM_API_KEY = process.env.JOTFORM_API_KEY;

    const submissionID = req.query.submissionId as string;

    const updatedSubmissionData = req.body;
    // console.log({updatedSubmissionData})

    try {
      const response = await axios.put(
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
