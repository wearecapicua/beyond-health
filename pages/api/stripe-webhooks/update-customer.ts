import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';
import env from "lib/env";
import getRawBody from 'raw-body';

const stripeWebhookSecret: string = env.stripeWebhookSecret;
const stripe = new Stripe(env.stripeSecretKey, { apiVersion: "2022-11-15" });

// Stripe dashboard lets user change payment, email, phone number, name, and billing address
// billing.stripe.com/p/login/test_9AQbJc9Rg8Nb0yA8ww

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'] as string
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        stripeWebhookSecret
      );
      
      switch (event.type) {
        case 'customer.updated':
          console.log("customer.updated", event.data.object)
          break;
        case 'payment_method.updated':
          console.log("payment_method.updated", event.data.object)
          break;  
      }

    } catch (error) {
      console.error(error);
      res.status(400).send('Webhook Error');
    }
    res.send({ success: true });
  }
}
