import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import { createClient } from "../lib/prismic";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import PageBody from "components/page-body";

type IndexProps = InferGetStaticPropsType<typeof getStaticProps>

export default function TermsPage({ preview, page}: IndexProps) {

  return (
    <>
      <Layout preview={preview} >
        <Head>
          <title>Beyond Health</title>
        </Head>
        <div className="bg-gray-000 min-h-screen sm:py-10">
          <Container>
            <div className="max-w-[1120px] mx-auto">
              {/* @ts-ignore */}
              <PageBody slices={page.data.slices} />
            </div>
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
  const page = await client.getSingle("privacy_policy");

  return {
    props: { preview, page },
  };
}
