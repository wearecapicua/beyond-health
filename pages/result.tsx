import { useEffect } from 'react';
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Container from "components/container";
import PostTitle from "components/post-title";
import SectionSeparator from "components/section-separator";
import Layout from "components/layout";
import Stripe from "stripe";
import env from "lib/env";
import { sendUpdatedData } from "lib/api/supabase";

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

  useEffect(() => {
    sendUpdatedData({stripe_setup_id: setupId})
  }, [setupId]);


  return (
    <Layout preview={false}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <div className="text-center">
            <PostTitle>Payment saved!</PostTitle>
            <p>You will be charged once our team has reviewed your application and insurance information.</p>
            <SectionSeparator />
          </div>
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
