import { useState } from 'react'

import Avatar from 'components/avatar'
import { getProfileData } from 'lib/api/supabase'
import { createCustomerPortalSession } from 'lib/stripeUtils'
import { useRouter } from 'next/router'
import { signOut as nextAuthSignOut, useSession } from 'next-auth/react'
import { useFormStore } from 'store/useFormStore'

const LoginButton = () => {
	const session = useSession()

	const userLoggedIn = session.status === 'authenticated' && session.data?.user
	const [loading, setLoading] = useState(false)
	const signOut = async () => {
		localStorage.removeItem('form-status-store')
		localStorage.removeItem('form-store')
		await nextAuthSignOut({ callbackUrl: '/' })
	}
	const router = useRouter()

	const { updateFormStore } = useFormStore()

	async function handleStartNow() {
		const profileData = await getProfileData()
		if (userLoggedIn) {
			updateFormStore(profileData)
			router.push('/form/step-1')
		} else {
			router.push('/login')
		}
	}

	if (session.status === 'authenticated' && session.data?.user) {
		const handlePortalClick = async () => {
			setLoading(true)
			const portalUrl = await createCustomerPortalSession()

			if (portalUrl) {
				window.location.href = portalUrl // Redirect to the Customer Portal
			}
			setLoading(false)
		}

		return (
			<>
				<button
					onClick={() => signOut()}
					className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue"
				>
					Log Out
				</button>
				{session.data.user.image && (
					<button onClick={handlePortalClick} disabled={loading}>
						<Avatar
							picture={{
								id: '',
								edit: {
									x: 0,
									y: 0,
									zoom: 0,
									background: ''
								},
								url: session.data.user.image ?? '',
								dimensions: {
									width: 40,
									height: 40
								},
								alt: session.data.user.name || null,
								copyright: null
							}}
						/>
					</button>
				)}
			</>
		)
	}

	return (
		<button
			onClick={handleStartNow}
			className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue"
		>
			Log In
		</button>
	)
}

export default LoginButton
