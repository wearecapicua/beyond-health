import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const JOTFORM_API_KEY = process.env.JOTFORM_API_KEY
    const JOTFORM_FORM_ID = process.env.JOTFORM_FORM_ID

    const formData = req.body;


    const submissionData = Object.entries(formData).map(([key, value]) => {
      console.log('Form Field Key:', key); // Log the form field key
      return {
        [key]: value,
      };
    });

    // const submissionData =[
    //   {"3": "skdfksfitst"},
    //   {"4": "last"}
    // ]

    console.log({submissionData})

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
  } else if (req.method === 'GET') {
    const JOTFORM_API_KEY = 'YOUR_JOTFORM_API_KEY';
    const JOTFORM_FORM_ID = 'YOUR_JOTFORM_FORM_ID';

    try {
      const response = await axios.get(
        `https://api.jotform.com/form/${JOTFORM_FORM_ID}/questions`,
        {
          headers: {
            'APIKEY': JOTFORM_API_KEY,
          },
        }
      );

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