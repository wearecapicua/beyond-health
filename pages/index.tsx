import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import Container from '../components/container'
import Layout from '../components/layout'
import PageBody from '../components/page-body'
import { createClient } from '../lib/prismic'

type IndexProps = InferGetStaticPropsType<typeof getStaticProps>

const Index = ({ preview, home }: IndexProps) => {
	return (
		<>
			<Layout preview={preview}>
				<Head>
					<title>Beyond Health</title>
				</Head>
				<div className="min-h-screen bg-gray-000 sm:py-10">
					<Container>
						<PageBody slices={home.data.slices} />
					</Container>
				</div>
			</Layout>
		</>
	)
}

export async function getStaticProps({ preview = false, previewData }: GetStaticPropsContext) {
	const client = createClient({ previewData })

	const home = await client.getByUID('landing_page', 'home', {
		fetchLinks: [
			'treatment.title',
			'treatment.image',
			'treatment.available',
			'review.name',
			'review.text',
			'review.rating',
			'faq.question',
			'faq.answer'
		]
	})

	return {
		props: { preview, home }
	}
}

export default Index
