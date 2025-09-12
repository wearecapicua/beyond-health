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

type ClientOrdersProps = {
	ordersData: any[]
	preview: boolean | undefined
}

const statusColors: Record<string, string> = {
	Charged: 'text-green-600',
	'Pending Approve': 'text-yellow-600',
	Rejected: 'text-red-500',
	'Scheduled Charged': 'text-blue-600'
}

const ClientOrders = ({ preview, ordersData }: ClientOrdersProps) => {
	const { userId: filteredIds } = useRouter().query
	const userId = filteredIds?.[0]

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

	// filter by userId from router query
	const filteredByUser = ordersData.filter((order) => !userId || order.user_id === userId)

	// then apply search filter
	const filteredOrders = filteredByUser.filter(({ user, profile, products, origin }) => {
		const fullName = `${profile.first_name} ${profile.last_name}`.toLowerCase()
		const email = user.email.toLowerCase()
		const productName = products?.name?.toLowerCase() ?? ''
		const originName = origin?.toLowerCase() ?? ''

		return (
			fullName.includes(searchTerm.toLowerCase()) ||
			email.includes(searchTerm.toLowerCase()) ||
			productName.includes(searchTerm.toLowerCase()) ||
			originName.includes(searchTerm.toLowerCase())
		)
	})

	// pagination
	const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

	return (
		<Layout preview={preview} fullPage>
			<Head>
				<title>Beyond Health</title>
			</Head>
			<Container>
				<ScreenLoader active={busy} />
				{isAdmin ? (
					<div>
						<h3 className="mb-7 mt-12">Orders</h3>

						{/* Search + Pagination */}
						<div className="mb-6 flex items-center justify-between">
							<input
								type="text"
								placeholder="Search by name, email, product, or origin..."
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

						{/* Table or no results */}
						{filteredOrders.length > 0 ? (
							<table className="w-full text-left">
								<tbody>
									<tr>
										<th className="p-4">Download</th>
										<th className="p-4">Name</th>
										<th className="p-4">Email</th>
										<th className="p-4">Product</th>
										<th className="p-4">Price</th>
										<th className="p-4">Origin</th>
										<th className="p-4">Submit</th>
										<th className="w-[190px] p-4">Shippo</th>
										<th className="p-4">Reject</th>
									</tr>
									{currentOrders.map(
										(
											{
												user,
												profile,
												products,
												subscriptions: {
													user_token_id,
													transaction_id,
													user_payment_option_id,
													card_name
												},
												id,
												status,
												payment_date,
												shipo_order_number,
												origin
											},
											index
										) => {
											const date = payment_date
												? format(new Date(payment_date), 'MM-dd-yyyy HH:mm')
												: ''

											return (
												<tr key={`order-${index}`}>
													<td className="p-4">
														<Pdf user={user} profile={profile} products={products} />
													</td>
													<td className="p-4">{`${profile.first_name} ${profile.last_name}`}</td>
													<td className="p-4">{user.email}</td>
													<td className="max-w-sm p-4">{products?.name}</td>
													<PriceColumn product={products} />
													<td className="max-w-sm p-4">{origin}</td>
													<td className={`px-4 py-2 text-base ${statusColors[status]}`}>
														{status === 'Pending Approve' ? (
															<PaymentButton
																order={{
																	orderId: id,
																	userTokenId: user_token_id,
																	transactionId: transaction_id,
																	userPaymentOptionId: user_payment_option_id,
																	cardName: card_name
																}}
																user={user}
																product={products}
																profile={profile}
																refresh={refresh}
																setBusy={setBusy}
															/>
														) : status === 'Charged' ? (
															'Charged'
														) : status === 'Scheduled Charged' ? (
															'Scheduled Charged'
														) : (
															'-'
														)}
													</td>
													<td className="w-[190px] p-4">
														<div className="mb-2 text-xs font-normal">
															<span className="mr-3">
																{shipo_order_number || 'N/A'}
															</span>
															<span>{date}</span>
														</div>
													</td>
													<td className={`px-4 py-2 text-base ${statusColors[status]}`}>
														{status === 'Pending Approve' ? (
															<CancelOrderButton
																order={{ orderId: id }}
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
						) : (
							<p>No results found</p>
						)}
					</div>
				) : (
					<p>Not authorized</p>
				)}
			</Container>
		</Layout>
	)
}

export const getServerSideProps = async () => {
	try {
		const response = await fetch(`${env.host}/api/get-customer-orders`)
		if (response.status === 500) {
			throw new Error('Internal Server Error')
		}
		const data = await response.json()

		return {
			props: {
				ordersData: data
			}
		}
	} catch (error) {
		console.error('Error fetching user data:', error)

		return {
			props: {
				ordersData: []
			}
		}
	}
}

export default ClientOrders
