import { CURRENCY, MAX_AMOUNT, MIN_AMOUNT } from "stripe.config";
import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
import { formatAmountForStripe } from "lib/stripeUtils";
import env from "lib/env";
import { createClient } from "lib/prismic";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { PostDocument } from "prismic-types";

const stripe = new Stripe(env.stripeSecretKey, { apiVersion: "2022-11-15" });

export type CheckoutSessionBody = {
  productId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestBody = req.body as CheckoutSessionBody;
  if (req.method === "POST") {
    const prismic = createClient();
    const product = await prismic.getByID<PostDocument>(requestBody.productId);
    const session = await getServerSession(req, res, authOptions);

    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: session?.user?.email ?? "",
        metadata: {
          product_id: requestBody.productId,
        },
        line_items: [
          {
            quantity: 1,
            price_data: {
              unit_amount: formatAmountForStripe(
                product.data.price ?? 0,
                CURRENCY
              ),
              currency: CURRENCY,
              product_data: {
                name: product.data.name[0]?.text ?? "",
                description: product.data.description ?? "",
                images: [product.data.image.url ?? ""],
              },
            },
          },
        ],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/donate-with-checkout`,
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
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
