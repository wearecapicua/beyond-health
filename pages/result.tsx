import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import Container from "components/container";
import Header from "components/header";
import PostTitle from "components/post-title";
import SectionSeparator from "components/section-separator";
import Head from "next/head";
import Layout from "components/layout";
import Stripe from "stripe";
import env from "lib/env";
import { createClient } from "lib/prismic";
import { PostDocument } from "prismic-types";
import { asImageSrc, asText } from "@prismicio/helpers";

const stripe = new Stripe(env.stripeSecretKey, {
  apiVersion: "2022-11-15",
});

const ResultPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();

  return (
    <Layout preview={false}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{`${asText(
                  props.product.data.name
                )} | Beyond Health`}</title>
                <meta
                  property="og:image"
                  content={
                    asImageSrc(props.product.data.image, {
                      width: 1200,
                      height: 600,
                      fit: "crop",
                    })!
                  }
                />
              </Head>
              <h1>Checkout Payment Result</h1>
              <h2>Status: {props.checkout_session.status ?? "loading..."}</h2>
              <h3>Bought: 1 x {props.product.data.name[0]?.text}</h3>
            </article>
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
        expand: ["payment_intent"],
      });
    const prismic = createClient();
    if (!checkout_session.metadata?.product_id) {
      throw new Error("Missing product ID.");
    }
    const product = await prismic.getByID<PostDocument>(
      checkout_session.metadata.product_id
    );

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
