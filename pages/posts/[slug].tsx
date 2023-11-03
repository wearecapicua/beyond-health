import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { createClient } from "lib/prismic";
import Image from 'next/image'
import Container from "components/container";
import Layout from "components/layout";
import PageBody from "components/page-body";
import PostTitle from "components/post-title";
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

type PostProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Post({ page, preview }: PostProps) {
  const router = useRouter();
  
  return (
    <Layout preview={preview}>
      <div className="bg-gray-000 min-h-screen">
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
                <Container>
                  <div className="pt-14 lg:pt-20 pb-14 px-5 sm:px-0 lg:px-16">
                    <h1 className="text-center leading-tight pb-8">{page.data.title}</h1>
                    <p className="uppercase text-center text-sm pb-12">{page.data.category.data?.name}</p>
                    <div className="relative h-[490px] rounded-2xl overflow-hidden">
                      <Image src={page.data.image.url} alt={page.data.title} fill={true} style={{objectFit: "cover"}} />
                    </div>
                  </div>
                  <div className="px-5 sm:px-0 lg:px-40 pb-6 md:pb-16">
                    <PageBody slices={page.data.slices} />
                  </div>
                  <Link href="/posts" className=" sm:px-0 block pb-24 md:pb-32 mx-auto w-[200px]">
                    <button className="w-full text-lg font-semibold flex items-center justify-center gap-3 inline-block border-solid border-[1px] border-main-black rounded-full px-6 py-3">
                      <ArrowLeftIcon className="h-6" />
                      Back to Blog
                    </button>
                  </Link>
                </Container>
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
    client.getByUID("post", params.slug, {
      fetchLinks: 'category.name'
    })
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
  const posts = await client.getAllByType("post")

  return {
    paths: posts.map((post) => ({ params: { slug: post.uid } })),
    fallback: true,
  };
}