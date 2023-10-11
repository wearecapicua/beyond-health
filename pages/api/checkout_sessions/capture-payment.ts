import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { supabaseClient } from 'lib/supabaseClient';
import env from 'lib/env';

const stripe = new Stripe(env.stripeSecretKey, { apiVersion: "2022-11-15" });

export type CheckoutSessionBody = {
  filteredData: any
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestBody = req.body as CheckoutSessionBody;
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const supabaseAccessToken = env.supabaseServiceRoleKey;
  const userId = session.user.id
  const supabase = supabaseClient(supabaseAccessToken)

  if (req.method === "POST") {
    const data = requestBody.filteredData;
    const name = `${data.first_name} ${data.last_name}`;

    try {
      const customer = await stripe.customers.create({
        address: data.billing_address,
        shipping: {
          address: data.shipping_address,
          name: name
        },
        name: name
      });

      const updatedData = { stripe_customer_id: customer.id };

      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .update(updatedData)
        .eq('user_id', userId);

      if (profileError) {
        throw profileError;
      }

      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        mode: 'setup',
        customer: customer?.id,
        metadata: {
          productId: data.product.default_price,
          amount: data.product.price
        },
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
