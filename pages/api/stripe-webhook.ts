// import { NextApiRequest, NextApiResponse } from "next";
// import { buffer } from "micro";
// import Stripe from "stripe";
// import env from "lib/env";

// const stripe = new Stripe(env.stripeSecretKey, {
//   apiVersion: "2022-11-15",
// });

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     try {
//       const buf = await buffer(req);
//       const secret = process.env.STRIPE_WEBHOOK_SECRET;
//       const sig = req.headers["stripe-signature"];

//       let event;

//       try {
//         event = stripe.webhooks.constructEvent(buf.toString(), sig, secret);
//       } catch (err) {
//         console.error("Webhook signature verification failed.", err);
//         return res.status(400).end("Webhook Error");
//       }

//       if (event.type === "checkout.session.completed") {
//         const session = event.data.object as Stripe.Checkout.Session;
//         // Handle the completed checkout session
//         console.log("Checkout Session ID:", session.id);
//         // Perform further processing as needed
//       }

//       res.status(200).end("Webhook Received");
//     } catch (error) {
//       console.error("Error handling webhook:", error);
//       res.status(500).end("Server Error");
//     }
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// };