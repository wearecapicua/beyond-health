import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { keyedData } from 'utils'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const JOTFORM_API_KEY = process.env.JOTFORM_API_KEY
    const JOTFORM_FORM_ID = process.env.JOTFORM_FORM_ID

    const formData = req.body

    const submissionData = keyedData(formData)
   
    try {
      const response = await axios.post(
        `https://api.jotform.com/form/${JOTFORM_FORM_ID}/submissions`,
        submissionData,
        {
          headers: {
            'APIKEY': JOTFORM_API_KEY,
          },
        }
      );

      const submissionID = response.data.content.submissionID;
      console.log('Submission ID:', submissionID);

      res.status(200).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.toJSON());
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.error('Non-Axios error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}