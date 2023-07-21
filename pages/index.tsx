import { signIn, useSession } from "next-auth/react";

import Head from "next/head";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { createClient } from "../lib/prismic";
import { PostDocumentWithAuthor } from "../lib/types";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import LoginButton from "components/login";

type IndexProps = {
  preview: boolean;
  allPosts: PostDocumentWithAuthor[];
};

export default function Index({ preview, allPosts }: IndexProps) {
  const [heroPost, ...morePosts] = allPosts;

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Beyond Health</title>
        </Head>
        <Container>
          <Intro />

          {heroPost && (
            <HeroPost
              title={heroPost.data.title}
              href={heroPost.url ?? "#"}
              coverImage={heroPost.data.cover_image}
              date={heroPost.data.date}
              author={heroPost.data.author}
              excerpt={heroPost.data.excerpt ?? ""}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({
  preview = false,
  previewData,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<IndexProps>> {
  const client = createClient({ previewData });

  const allPosts = await client.getAllByType("post", {
    fetchLinks: ["author.name", "author.picture"],
    orderings: [{ field: "my.post.date", direction: "desc" }],
  });

  return {
    props: { preview, allPosts },
  };
}
