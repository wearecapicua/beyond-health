import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import { createClient } from "../lib/prismic";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import PageBody from "../components/page-body";
import React from "react";

type IndexProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Index({ preview, home }: IndexProps) {

  return (
    <>
      <Layout preview={preview} >
        <Head>
          <title>Beyond Health</title>
        </Head>
        <div className="bg-gray-000 min-h-screen sm:py-10">
          <Container>
            {/* @ts-ignore */}
            <PageBody slices={home.data.slices} />
          </Container>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({
  preview = false,
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData });
  /* @ts-ignore */
  const home = await client.getByUID("landing_page", "home", {
    fetchLinks: [
      "treatment.title",
      "treatment.image",
      "treatment.available",
      "review.name",
      "review.text",
      "review.rating",
      "faq.question",
      "faq.answer"
    ]
  });

  return {
    props: { preview, home },
  };
}
