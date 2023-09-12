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

const stripe = new Stripe(env.stripeSecretKey, {
  apiVersion: "2022-11-15",
});

const ResultPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();

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

//console.log("props", props)
  return (
    <Layout preview={false}>
      <Container>
     
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
         
            <SectionSeparator />
          </>
        )}
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.session_id as string;
 // console.log({id})
  try {
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession ID.");
    }
    const checkout_session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(id, {
        expand: ["payment_intent"],
      });
      console.log({checkout_session})
    if (!checkout_session.metadata?.productId) {
      throw new Error("Missing product ID.");
    }
    const product = checkout_session.metadata?.productId

    return {
      props: {
        checkout_session,
        product,
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
