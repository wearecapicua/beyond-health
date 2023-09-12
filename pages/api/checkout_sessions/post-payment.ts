import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import env from "lib/env";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const stripe = new Stripe(env.stripeSecretKey, { apiVersion: "2022-11-15" });

export type CheckoutSessionBody = {
  id: string;
  productId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestBody = req.body as CheckoutSessionBody;
  if (req.method === "POST") {
    const sessionId = requestBody.id
    const priceId = requestBody.productId
  
    const session = await getServerSession(req, res, authOptions);

   // const setupId = "seti_1NpM34KtJLVHmqXvBv9cBn9D"

    try {
      const fetchedSession = await stripe.checkout.sessions.retrieve(sessionId)
      /* @ts-ignore */
   const setupIntent = await stripe.setupIntents.retrieve(fetchedSession.setup_intent);
      // Create Checkout Sessions from body params.
      console.log(setupIntent)
      const customerId = setupIntent.customer
      const paymentMethodId = setupIntent.payment_method

      const params = {
       customer: customerId,
       payment_method: paymentMethodId,
       amount: 2000,
       currency: 'usd',
      // automatic_payment_methods: {enabled: true},
      };

      const paymentIntent: Stripe.PaymentIntent =
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
