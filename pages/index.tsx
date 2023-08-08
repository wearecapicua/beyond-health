import { signIn, useSession } from "next-auth/react";

import Head from "next/head";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { createClient } from "../lib/prismic";
import { PostDocumentWithAuthor } from "../lib/types";
import { GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from "next";
import LoginButton from "components/login";
import PageBody from "components/page-body";


type IndexProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Index({ preview, home }: IndexProps) {
  console.log(home)
  return (
    <>
      <Layout preview={preview} >
        <Head>
          <title>Beyond Health</title>
        </Head>
        <div className="bg-gray-000 min-h-screen py-10">
          <Container>
            {/* {<Intro />} */}
            {/* @ts-ignore */}
            <PageBody slices={home.data.slices} />
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
    fetchLinks: ["treatment.title", "treatment.image"]
  });

  return {
    props: { preview, home },
  };
}
