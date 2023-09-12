import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import Container from "components/container";

import PostTitle from "components/post-title";
import SectionSeparator from "components/section-separator";
import Head from "next/head";
import Layout from "components/layout";
import Stripe from "stripe";
import env from "lib/env";
import { createClient } from "lib/prismic";

import { asImageSrc, asText } from "@prismicio/helpers";
import PaymentButton from "components/payment-button";

type ResultProps = {
  amount: number
  setupId: string;
}

const stripe = new Stripe(env.stripeSecretKey, {
  apiVersion: "2022-11-15",
});

const ResultPage = ({ amount, setupId }: ResultProps) => {
  const router = useRouter();

  const price = amount.toString();

  // const storeCheckoutSession = async (sessionId: string) => {
  //   try {
  //     // const response = await fetch("/api/store-checkout", {
  //     //   method: "POST",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     //   body: JSON.stringify({ sessionId }),
  //     // });
  
  //     if (session) {
  //       console.log("Checkout session ID stored in the database.", session);
  //     } else {
  //       console.error("Failed to store checkout session ID in the database.");
  //     }
  //   } catch (error) {
  //     console.error("Error storing checkout session ID:", error);
  //   }
  // };

  // storeCheckoutSession(props.checkout_session.id)


  return (
    <Layout preview={false}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <> 
            <PaymentButton
              setupId={setupId}
              price={price}
            />
            <SectionSeparator />
          </>
        )}
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.session_id as string;
 
  try {
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession ID.");
    }
    const checkout_session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(id, {
        expand: ["setup_intent"],
      });
      console.log({checkout_session})
    if (!checkout_session.metadata?.productId) {
      throw new Error("Missing product ID.");
    }
    /* @ts-ignore */
    const customer = checkout_session.setup_intent?.customer
    const amount = checkout_session.metadata?.amount
    /* @ts-ignore */
    const setupId = checkout_session.setup_intent?.id

    return {
      props: {
        amount,
        setupId
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
}

export default ResultPage;
