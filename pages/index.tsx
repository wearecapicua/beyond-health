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
import PostBody from "components/post-body";

type IndexProps = {
  preview: boolean;
  allPosts: PostDocumentWithAuthor[];
};

export default function Index({ preview, home }: IndexProps) {
  //const [heroPost, ...morePosts] = allPosts;
console.log("home", home)
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Beyond Health</title>
        </Head>
        <Container>
          <Intro />
          <PostBody slices={home.data.slices} />
          {/* {heroPost && (
            <HeroPost
              title={heroPost.data.name}
              href={heroPost.url ?? "#"}
              coverImage={heroPost.data.image}
              date={heroPost.data.date}
              author={heroPost.data.author}
              description={heroPost.data.description ?? ""}
            />
          )} */}
          {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
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

  const home = await client.getByUID("landing_page", "home", {
    fetchLinks: [],
  });

  return {
    props: { preview, home },
  };
}
