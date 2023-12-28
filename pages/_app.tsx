import { useEffect } from 'react'

import { PrismicPreview } from '@prismicio/next'
import { getFormStatus } from 'lib/api/supabase'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { useFormStatusStore } from 'store/useFormStatusStore'
import { useFormStore } from 'store/useFormStore'

import { repositoryName } from '../lib/prismic'

import '../styles/globals.css'
import '../styles/index.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
	const { setFormStep } = useFormStatusStore()
	const { formStore, updateFormStore } = useFormStore()

	useEffect(() => {
		async function fetchFormStatus() {
			const formStatus = await getFormStatus()
			setFormStep(formStatus?.form_step)
			if (!formStatus && formStore) {
				localStorage.removeItem('form-store')
				updateFormStore({})
			}
		}
		fetchFormStatus()
	}, [])

	return (
		<PrismicPreview repositoryName={repositoryName}>
			<SessionProvider>
				<Component {...pageProps} />
			</SessionProvider>
		</PrismicPreview>
	)
}

export default MyApp
