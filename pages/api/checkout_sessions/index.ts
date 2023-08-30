import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import env from "lib/env";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

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
    const priceId = req.body.productId
  
    const session = await getServerSession(req, res, authOptions);

    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        mode: "payment",
       // customer_email: session?.user?.email ?? "",
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: priceId,
            quantity: 1,
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


// const stripe = new Stripe(env.stripeSecretKey, { apiVersion: "2022-11-15" });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     const priceId = req.body.productId
//     console.log({priceId})
//     try {
//       // Create Checkout Sessions from body params.
//       const session = await stripe.checkout.sessions.create({
//         // submit_type: "pay",
//         // payment_method_types: ["card"],
//         mode: "payment",
//         line_items: [
//           {
//             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//             price: priceId,
//             quantity: 1,
//           },
//         ],
//         success_url: `${req.headers.origin}/?success=true`,
//         cancel_url: `${req.headers.origin}/?canceled=true`,
//       });
//       res.redirect(303, session.url);
//     } catch (err) {
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }