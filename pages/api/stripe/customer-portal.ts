import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';
import { getSession } from 'next-auth/react';
import env from 'lib/env';

const stripe = new Stripe(env.stripeSecretKey, {
  apiVersion: '2022-11-15',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const session = await getSession({ req });

      if (!session) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      const email = session.user?.email

      // Make db call to get customer id
      const customerId = "cus_OcwPlGYwHq6eyF"
      const returnUrl = "http://localhost:3000/"

      const portalLink = await stripe.billingPortal.sessions.create({
        customer: customerId, // Replace with the actual customer ID or identifier
        return_url: returnUrl,
      });

      res.status(200).json({ url: portalLink.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
