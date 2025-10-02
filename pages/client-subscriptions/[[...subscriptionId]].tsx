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

const activeColors: Record<string, string> = {
	Active: 'text-green-600',
	Inactive: 'text-red-500'
}

const SubscriptionsPage = ({ preview, subscriptionsData }: SubscriptionsPageProps) => {
	const { data: session } = useSession()
	const [isAdmin, setIsAdmin] = useState(false)
	const [busy, setBusy] = useState(false)

	// search + pagination
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10

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
			pathname: router.pathname,
			query: { confirm: true }
		})
	}

	// filter subscriptions
	const filteredSubscriptions =
		subscriptionsData?.length > 0
			? subscriptionsData.filter(({ user, profile, product_subscription_types: { products } }) => {
					const fullName = `${profile?.first_name} ${profile?.last_name}`.toLowerCase()
					const email = user?.email?.toLowerCase()
					const productName = products?.name?.toLowerCase() ?? ''

					return (
						fullName.includes(searchTerm.toLowerCase()) ||
						email.includes(searchTerm.toLowerCase()) ||
						productName.includes(searchTerm.toLowerCase())
					)
				})
			: []

	// pagination
	const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const currentSubscriptions = filteredSubscriptions.slice(startIndex, startIndex + itemsPerPage)

	return (
		<Layout preview={preview} fullPage>
			<Head>
				<title>Beyond Health</title>
			</Head>
			<Container>
				<ScreenLoader active={busy} />
				{subscriptionsData?.length !== 0 && isAdmin ? (
					<div>
						<h3 className="mb-7 mt-12">Subscriptions</h3>

						{/* Search & Pagination controls */}
						<div className="mb-6 flex items-center justify-between">
							<input
								type="text"
								placeholder="Search by name, email or product..."
								className="w-80 rounded border px-3 py-2"
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value)
									setCurrentPage(1)
								}}
							/>

							<div className="flex items-center space-x-2">
								<button
									disabled={currentPage === 1}
									onClick={() => setCurrentPage((prev) => prev - 1)}
									className="rounded border px-3 py-1 disabled:opacity-50">
									Prev
								</button>
								<span>
									Page {currentPage} of {totalPages || 1}
								</span>
								<button
									disabled={currentPage === totalPages || totalPages === 0}
									onClick={() => setCurrentPage((prev) => prev + 1)}
									className="rounded border px-3 py-1 disabled:opacity-50">
									Next
								</button>
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto">
							<table className="w-full text-left">
								<tbody>
									<tr className="border-t text-xs">
										<th className="p-4">Download</th>
										<th className="p-4">Name</th>
										<th className="p-4">Email</th>
										<th className="p-4">Product</th>
										<th className="p-4">Price</th>
										<th className="p-4">Subscription Status</th>
										<th className="p-4">Next Payment Date</th>
										<th className="p-4">Client Orders</th>
										<th className="p-4">Stop subscription</th>
									</tr>
									{currentSubscriptions.map(
										(
											{
												user,
												profile,
												product_subscription_types: { products },
												active,
												id,
												next_payment_date
											},
											index
										) => {
											return (
												<tr key={`user-${index}`} className="border-t  text-xs">
													<td className="p-4">
														<Pdf user={user} profile={profile} products={products} />
													</td>
													<td className="p-4">{`${profile.first_name} ${profile.last_name}`}</td>
													<td className="p-4">{user.email}</td>
													<td className="max-w-sm p-4">{products?.name}</td>
													<PriceColumn product={products} />
													<td className="max-w-sm p-4">
														{active ? 'Active' : 'Inactive'}
													</td>
													<td className="px-3 py-2">{next_payment_date}</td>
													<td className="max-w-sm p-4">
														<a href={`/client-orders/${user.id}`}>View Orders</a>
													</td>
													<td
														className={`px-4 py-2  ${
															activeColors[active ? 'Active' : 'Inactive']
														}`}>
														{active ? (
															<CancelSubscriptionButton
																subscription={{ id }}
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
					</div>
				) : subscriptionsData?.length === 0 && isAdmin ? (
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
		const response = await fetch(`${env.host}/api/get-customer-subscriptions`)
		if (response.status === 500) {
			throw new Error('Internal Server Error')
		}
		const data = await response.json()

		return {
			props: {
				subscriptionsData: data
			}
		}
	} catch (error) {
		console.error('Error fetching user data:', error)

		return {
			props: {
				subscriptionsData: []
			}
		}
	}
}

export default SubscriptionsPage
