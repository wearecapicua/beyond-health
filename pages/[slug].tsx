import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { predicate } from "@prismicio/client";

import { PostDocumentWithAuthor } from "../lib/types";
import { createClient } from "../lib/prismic";

import Container from "../components/container";
import Layout from "../components/layout";
import PageBody from "../components/page-body";
import PostTitle from "../components/post-title";

type PostProps = {
  preview: boolean;
  page: PostDocumentWithAuthor;
  morePosts: PostDocumentWithAuthor[];
};

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
}: GetStaticPropsContext<{ slug: string }>): Promise<
  GetStaticPropsResult<PostProps>
> {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }
  const client = createClient({ previewData });

  const [page] = await Promise.all([
    client.getByUID<PostDocumentWithAuthor>("landing_page", params.slug),
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

  const allLandingPages = await client.getAllByType("landing_page", {
    predicates: [predicate.not("my.landing_page.uid", "home")],
  });

  return {
    paths: allLandingPages.map((page) => ({ params: { slug: page.uid } })),
    fallback: true,
  };
}