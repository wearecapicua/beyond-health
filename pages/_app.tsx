import { useEffect } from 'react'

import { PrismicPreview } from '@prismicio/next'
import { getFormStatus } from 'lib/api/supabase'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useFormStatusStore } from 'store/useFormStatusStore'
import { useFormStore } from 'store/useFormStore'

import { repositoryName } from '../lib/prismic'
// prettier-ignore
import '../styles/index.css'
// prettier-ignore
import '../styles/globals.css'

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
