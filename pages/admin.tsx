import { useEffect, useState } from 'react'

import CancelOrderButton from 'components/cancel-order-button'
import Container from 'components/container'
import Layout from 'components/layout'
import PaymentButton from 'components/payment-button'
import Pdf from 'components/pdf'
import PriceColumn from 'components/price-column'
import { format } from 'date-fns'
import env from 'lib/env'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import ScreenLoader from 'pages/screenLoader'
type AdminPageProps = {
	ordersData: any[]
	preview: boolean | undefined
}

type UserState = {
	[userId: string]: boolean
}

const statusColors: Record<string, string> = {
	Paid: 'text-green-600',
	'Pending Approve': 'text-yellow-600',
	Rejected: 'text-red-500'
}

const AdminPage = ({ preview, ordersData }: AdminPageProps) => {
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

	function formatDates(dateStamps: [], id: number) {
		return (dateStamps as { orderId: number; timestamp: string }[])
			.filter((ph) => ph.orderId === id)
			?.map((dateStamp: { timestamp: string }) => {
				const newDate = format(new Date(dateStamp.timestamp), 'MM-dd-yyyy HH:mm')

				return {
					...dateStamp,
					timestamp: newDate
				}
			})
			.reverse()
	}
	const [userStates, setUserStates] = useState<UserState>({})

	// Function to toggle the visibility of items for a specific user
	const toggleItems = (userId: string) => {
		setUserStates((prevStates) => ({
			...prevStates,
			[userId]: !prevStates[userId]
		}))
	}

	return (
		<Layout preview={preview} fullPage>
			<Head>
				<title>Beyond Health</title>
			</Head>
			<Container>
				<ScreenLoader active={busy} />
				{ordersData.length !== 0 && isAdmin ? (
					<div>
						<h3 className="mb-7 mt-12">Pending Payments</h3>
						<table className="text-left">
							<tbody>
								<tr>
									<th className="p-4">Download</th>
									<th className="p-4">Name</th>
									<th className="p-4">Email</th>
									<th className="p-4">Product</th>
									<th className="p-4">Price</th>
									<th className="p-4">Submit</th>
									<th className="w-[190px] p-4">Shippo Order</th>
									<th className="p-4">Reject Order</th>
								</tr>
								{ordersData?.map(
									(
										{
											user,
											profile,
											products,
											user_token_id,
											transaction_id,
											user_payment_option_id,
											id,
											status
										},
										index
									) => {
										const showItems = userStates[user.user_id] || false

										const dates = formatDates(profile?.payments_history as [], id)

										return (
											<tr key={`user-${index}`}>
												<td className="p-4">
													<Pdf user={user} profile={profile} products={products} />
												</td>
												<td className="p-4">{`${profile.first_name} ${profile.last_name}`}</td>
												<td className="p-4">{user.email}</td>
												<td className="max-w-sm p-4">{products?.name}</td>
												<PriceColumn product={products} />
												<td className={`px-4 py-2 text-base ${statusColors[status]}`}>
													{status === 'Pending Approve' ? (
														<PaymentButton
															order={{
																orderId: id,
																userTokenId: user_token_id,
																transactionId: transaction_id,
																userPaymentOptionId: user_payment_option_id
															}}
															user={user}
															product={products}
															profile={profile}
															refresh={refresh}
															setBusy={setBusy}
														/>
													) : status === 'Paid' ? (
														'Paid'
													) : (
														'-'
													)}
												</td>
												<td className="w-[190px] p-4">
													{dates?.length > 0 && (
														<>
															<div
																className={`${
																	showItems ? 'font-bold' : 'mb-2 font-normal'
																} text-xs`}>
																<span className="mr-3">
																	{
																		(
																			dates[0] as unknown as {
																				orderNumber: number
																			}
																		).orderNumber
																	}
																</span>
																<span>{dates[0].timestamp}</span>
															</div>
															<div
																className="text-xs uppercase text-main-light-blue"
																onClick={() => toggleItems(user.user_id)}>
																{showItems && (
																	<ul className="mb-2 text-main-black">
																		{dates.slice(1).map((item, index) => (
																			<li
																				key={`${item.timestamp}-${index}`}
																				className="text-xs">
																				<span className="mr-3">
																					{
																						(
																							item as unknown as {
																								orderNumber: number
																							}
																						).orderNumber
																					}
																				</span>
																				<span>{item.timestamp}</span>
																			</li>
																		))}
																	</ul>
																)}
																{showItems
																	? `Hide items`
																	: dates.length > 1
																		? `Show more (${dates.length - 1})`
																		: null}
															</div>
														</>
													)}
												</td>
												<td className={`px-4 py-2 text-base ${statusColors[status]}`}>
													{status === 'Pending Approve' ? (
														<CancelOrderButton
															order={{
																orderId: id
															}}
															refresh={refresh}
															setBusy={setBusy}
														/>
													) : status === 'Rejected' ? (
														'Rejected'
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
				) : ordersData.length === 0 && isAdmin ? (
					<p>There are no current pending payments to show</p>
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
		const response = await fetch(`${env.host}/api/get-stripe-customer`)

		if (response.status === 500) {
			throw new Error('Internal Server Error')
		}
		const data = await response.json()

		return {
			props: {
				ordersData: data // Pass the fetched user data as props
			}
		}
	} catch (error) {
		console.error('Error fetching user data:', error)

		return {
			props: {
				ordersData: [] // Return an empty array if there's an error
			}
		}
	}
}

export default AdminPage
