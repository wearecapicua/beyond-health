import { useState } from 'react'

import Avatar from 'components/avatar'
import { createCustomerPortalSession } from 'lib/stripeUtils'
import { signOut as nextAuthSignOut, signIn, useSession } from 'next-auth/react'

const LoginButton = () => {
	const session = useSession()
	const [loading, setLoading] = useState(false)
	const signOut = async () => {
		localStorage.removeItem('form-status-store')
		localStorage.removeItem('form-store')
		await nextAuthSignOut({ callbackUrl: '/' })
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
					className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue">
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
			onClick={() => signIn('google')}
			className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue">
			Log In
		</button>
	)
}

export default LoginButton
