import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Container from 'components/container'
import Layout from 'components/layout'
import PageBody from 'components/page-body'
import PostTitle from 'components/post-title'
import { createClient } from 'lib/prismic'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

type PostProps = InferGetStaticPropsType<typeof getStaticProps>

const Post = ({ page, preview }: PostProps) => {
	const router = useRouter()

	return (
		<Layout preview={preview}>
			<div className="min-h-screen bg-gray-000">
				<Container>
					{router.isFallback ? (
						<PostTitle>Loading…</PostTitle>
					) : (
						<>
							<article>
								<Head>
									<></>
								</Head>

								<Container>
									<div className="px-5 py-14 sm:px-0 lg:px-16 lg:pt-20">
										<h1 className="pb-8 text-center leading-tight">{page.data.title}</h1>

										<p className="pb-12 text-center text-sm uppercase">
											{page.data.category.data?.name}
										</p>
										<div className="relative h-[490px] overflow-hidden rounded-2xl">
											<Image
												src={page.data.image.url}
												alt={page.data.title}
												fill={true}
												style={{ objectFit: 'cover' }}
											/>
										</div>
									</div>
									<div className="px-5 pb-6 sm:px-0 md:pb-16 lg:px-40">
										<PageBody slices={page.data.slices} />
									</div>
									{/* TODO:check if this works well with inline-block else should be changed for flex */}
									<Link
										href="/posts"
										className=" mx-auto block w-[200px] pb-24 sm:px-0 md:pb-32">
										<button className="inline-block  w-full items-center justify-center gap-3 rounded-full border-[1px] border-solid border-main-black px-6 py-3 text-lg font-semibold">
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
	)
}

export async function getStaticProps({
	params,
	preview = false,
	previewData
}: GetStaticPropsContext<{ slug: string }>) {
	if (!params?.slug) {
		return {
			notFound: true
		}
	}
	const client = createClient({ previewData })

	const [page] = await Promise.all([
		client.getByUID('post', params.slug, {
			fetchLinks: 'category.name'
		})
	])

	if (!page) {
		return {
			notFound: true
		}
	} else {
		return {
			props: { preview, page }
		}
	}
}

export async function getStaticPaths() {
	const client = createClient()

	const posts = await client.getAllByType('post')

	return {
		paths: posts.map((post) => ({ params: { slug: post.uid } })),
		fallback: true
	}
}

export default Post
