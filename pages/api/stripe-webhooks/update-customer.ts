import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';
import env from "lib/env";
import getRawBody from 'raw-body';
import { formatCustomerData } from 'lib/stripeUtils';

interface StripeEventDataObject {
  id: string;
  email: string;
}

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
      console.log("event", event)
      switch (event.type) {
        case 'customer.updated':
          const stripeObject = event.data.object as StripeEventDataObject 
          const filteredData = formatCustomerData(stripeObject)
          const id = stripeObject.id
          const email = stripeObject.email
        
          await sendUpdatedDataToProfile(id, email, filteredData)
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


async function sendUpdatedDataToProfile(id: string, email: string, updatedData: any) {
  try {
    const response = await fetch(process.env.HOST + '/api/update-profile-stripe', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, email, updatedData }),
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log('Update successful:', result);
    } else {
      console.error('Update failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending data to update-profile:', error);
  }
}