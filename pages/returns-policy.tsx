import PageBody from 'components/page-body'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import Container from '../components/container'
import Layout from '../components/layout'
import { createClient } from '../lib/prismic'

type IndexProps = InferGetStaticPropsType<typeof getStaticProps>

const TermsPage = ({ preview, page }: IndexProps) => {
	return (
		<>
			<Layout preview={preview}>
				<Head>
					<title>Beyond Health</title>
				</Head>
				<div className="min-h-screen bg-gray-000 sm:py-10">
					<Container>
						<div className="mx-auto max-w-[1120px]">
							<PageBody slices={page.data.slices} />
						</div>
					</Container>
				</div>
			</Layout>
		</>
	)
}

export async function getStaticProps({ preview = false, previewData }: GetStaticPropsContext) {
	const client = createClient({ previewData })

	const page = await client.getSingle('returns')

	return {
		props: { preview, page }
	}
}

export default TermsPage
