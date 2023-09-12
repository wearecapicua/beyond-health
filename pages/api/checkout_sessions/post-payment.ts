import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import env from "lib/env";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const stripe = new Stripe(env.stripeSecretKey, { apiVersion: "2022-11-15" });

export type PaymentIntentBody = {
  setupId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestBody = req.body as PaymentIntentBody;
  if (req.method === "POST") {
    const { setupId } = requestBody
  
    const session = await getServerSession(req, res, authOptions);

    try {
      /* @ts-ignore */
      const setupIntent = await stripe.setupIntents.retrieve(setupId);
      // Create Checkout Sessions from body params.
      console.log(setupIntent)
      const customerId = setupIntent.customer
      const paymentMethodId = setupIntent.payment_method

      const params = {
       customer: customerId,
       payment_method: paymentMethodId,
       amount: 2000,
       currency: 'usd',
       confirm: true
      };

      const paymentIntent: Stripe.PaymentIntent =
        /* @ts-ignore */
        await stripe.paymentIntents.create(params);
     
      res.status(200).json(paymentIntent);
      console.log({paymentIntent})
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
