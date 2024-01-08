import { useEffect } from 'react'

import Container from 'components/container'
import Layout from 'components/layout'
import PostTitle from 'components/post-title'
import { sendUpdatedData } from 'lib/api/supabase'
import env from 'lib/env'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Stripe from 'stripe'

type ResultProps = {
	amount: number
	setupId: string
}

const stripe = new Stripe(env.stripeSecretKey, {
	apiVersion: '2022-11-15'
})

const ResultPage = ({ setupId }: ResultProps) => {
	const router = useRouter()

	useEffect(() => {
		sendUpdatedData({ stripe_setup_id: setupId, form_step: 'COMPLETE' })
		localStorage.removeItem('form-status-store')
		localStorage.removeItem('form-store')
	}, [setupId])

	const handleReturnToHome = () => {
		router.push('/')
	}

	return (
		<Layout preview={false}>
			<Container>
				{router.isFallback ? (
					<PostTitle>Loading…</PostTitle>
				) : (
					<div className="align-items flex h-[70vh] flex-col justify-center text-center">
						<PostTitle>Payment saved!</PostTitle>
						<p>
							You will be charged once our team has reviewed your application and insurance
							information.
						</p>
						<button className="mt-12 text-main-blue" onClick={handleReturnToHome}>
							Return home
						</button>
					</div>
				)}
			</Container>
		</Layout>
	)
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const id = ctx.query.session_id as string

	try {
		if (!id?.startsWith('cs_')) {
			throw Error('Incorrect CheckoutSession ID.')
		}
		const checkout_session: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(id, {
			expand: ['setup_intent']
		})
		if (!checkout_session.metadata?.productId) {
			throw new Error('Missing product ID.')
		}

		const amount = checkout_session.metadata?.amount

		const setupId = (checkout_session.setup_intent as unknown as { id: string })?.id

		return {
			props: {
				amount,
				setupId
			}
		}
	} catch (err) {
		console.error(err)

		return {
			notFound: true
		}
	}
}

export default ResultPage
