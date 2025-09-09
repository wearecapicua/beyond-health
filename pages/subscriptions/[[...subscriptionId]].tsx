import { useEffect, useState } from 'react'

import CancelSubscriptionButton from 'components/cancel-subscription-button'
import Container from 'components/container'
import Layout from 'components/layout'
import Pdf from 'components/pdf'
import PriceColumn from 'components/price-column'
import env from 'lib/env'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import ScreenLoader from 'pages/screenLoader'
type SubscriptionsPageProps = {
	subscriptionsData: any[]
	preview: boolean | undefined
}

// type UserState = {
// 	[userId: string]: boolean
// }

const activeColors: Record<string, string> = {
	Active: 'text-green-600',
	Inactive: 'text-red-500'
}

const SubscriptionsPage = ({ preview, subscriptionsData }: SubscriptionsPageProps) => {
	const { subscriptionId: filteredIds } = useRouter().query
	const subscriptionId = filteredIds?.[0]

	const { data: session } = useSession()
	const [isAdmin, setIsAdmin] = useState(false)
	const [busy, setBusy] = useState(false)

	const router = useRouter()
	useEffect(() => {
		if ((session?.user as unknown as { role: string })?.role === 'ADMIN') {
			setIsAdmin(true)
		} else {
			setIsAdmin(false)
		}
	}, [session])

	const refresh = () => {
		router.push({
			pathname: router.pathname, // not router.asPath
			query: { confirm: true }
		})
	}

	// function formatDates(dateStamps: [], id: number) {
	// 	return (dateStamps as { orderId: number; timestamp: string }[])
	// 		.filter((ph) => ph.orderId === id)
	// 		?.map((dateStamp: { timestamp: string }) => {
	// 			const newDate = format(new Date(dateStamp.timestamp), 'MM-dd-yyyy HH:mm')

	// 			return {
	// 				...dateStamp,
	// 				timestamp: newDate
	// 			}
	// 		})
	// 		.reverse()
	// }
	// const [userStates, setUserStates] = useState<UserState>({})

	// // Function to toggle the visibility of items for a specific user
	// const toggleItems = (userId: string) => {
	// 	setUserStates((prevStates) => ({
	// 		...prevStates,
	// 		[userId]: !prevStates[userId]
	// 	}))
	// }

	return (
		<Layout preview={preview} fullPage>
			<Head>
				<title>Beyond Health</title>
			</Head>
			<Container>
				<ScreenLoader active={busy} />
				{subscriptionsData?.filter(
					(subscription) =>
						subscriptionId === null ||
						subscriptionId === undefined ||
						subscriptionId === subscription?.nuvei_subscription_id
				).length !== 0 && isAdmin ? (
					<div>
						<h3 className="mb-7 mt-12">Subscriptions</h3>
						<table className="text-left">
							<tbody>
								<tr>
									<th className="p-4">Download</th>
									<th className="p-4">Name</th>
									<th className="p-4">Email</th>
									<th className="p-4">Product</th>
									<th className="p-4">Price</th>
									<th className="p-4">Subscription Status</th>
									<th className="p-4">Nuvei Subscription Id</th>
									{/* <th className="p-4">Submit</th>
									<th className="w-[190px] p-4">Shippo Order</th> */}
									<th className="p-4">Stop subscription</th>
								</tr>
								{subscriptionsData?.map(
									({ user, profile, products, active, nuvei_subscription_id, id }, index) => {
										// const showItems = userStates[user.user_id] || false

										// const dates = formatDates(profile?.payments_history as [], id)

										return (
											<tr key={`user-${index}`}>
												<td className="p-4">
													<Pdf user={user} profile={profile} products={products} />
												</td>
												<td className="p-4">{`${profile.first_name} ${profile.last_name}`}</td>
												<td className="p-4">{user.email}</td>
												<td className="max-w-sm p-4">{products?.name}</td>
												<PriceColumn product={products} />
												<td className="max-w-sm p-4">{active ? 'Active' : 'Inactive'}</td>
												<td className="max-w-sm p-4">{nuvei_subscription_id}</td>
												<td
													className={`px-4 py-2 text-base ${
														activeColors[active ? 'Active' : 'Inactive']
													}`}>
													{active ? (
														<CancelSubscriptionButton
															subscription={{
																id
															}}
															refresh={refresh}
															setBusy={setBusy}
														/>
													) : (
														'-'
													)}
												</td>
											</tr>
										)
									}
								)}
							</tbody>
						</table>
					</div>
				) : subscriptionsData?.filter(
						(subscription) =>
							subscriptionId === null ||
							subscriptionId === undefined ||
							subscriptionId === subscription?.nuvei_subscription_id
				  ).length === 0 && isAdmin ? (
					<p>There are no subscriptions to show</p>
				) : !isAdmin ? (
					<p>Not authorized</p>
				) : null}
			</Container>
		</Layout>
	)
}

export const getServerSideProps = async () => {
	try {
		// Fetch user data from your API route
		const response = await fetch(`${env.host}/api/get-customer-subscriptions`)

		if (response.status === 500) {
			throw new Error('Internal Server Error')
		}
		const data = await response.json()

		return {
			props: {
				subscriptionsData: data // Pass the fetched user data as props
			}
		}
	} catch (error) {
		console.error('Error fetching user data:', error)

		return {
			props: {
				subscriptionsData: [] // Return an empty array if there's an error
			}
		}
	}
}

export default SubscriptionsPage
