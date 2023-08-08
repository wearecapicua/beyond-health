import { GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { predicate } from "@prismicio/client";
import { createClient } from "../lib/prismic";

import Container from "../components/container";
import Layout from "../components/layout";
import PageBody from "../components/page-body";
import PostTitle from "../components/post-title";

type PostProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Post({ page, preview }: PostProps) {
  const router = useRouter();

  return (
    <Layout preview={preview}>
      <div className="bg-gray-000 min-h-screen py-10">
        <Container>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <Head>
                  {/* {<meta
                    property="og:image"
                    content={
                      asImageSrc(page.data.image, {
                        width: 1200,
                        height: 600,
                        fit: "crop",
                      })!
                    }
                  />} */}
                </Head>
                {/* @ts-ignore */}
                <PageBody slices={page.data.slices} />
              </article>
            </>
          )}
        </Container>
      </div>
    </Layout>
  );
}

export async function getStaticProps({
  params,
  preview = false,
  previewData,
}: GetStaticPropsContext<{ slug: string }>) {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }
  const client = createClient({ previewData });

  const [page] = await Promise.all([
    /* @ts-ignore */
    client.getByUID("landing_page", params.slug, {
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
    }),
  ]);


  if (!page) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: { preview, page },
    };
  }
}

export async function getStaticPaths() {
  const client = createClient();
  /* @ts-ignore */
  const allLandingPages = await client.getAllByType("landing_page", {
    predicates: [predicate.not("my.landing_page.uid", "home")],
  });

  return {
    paths: allLandingPages.map((page) => ({ params: { slug: page.uid } })),
    fallback: true,
  };
}