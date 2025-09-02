'use client'

import { useEffect, useState } from 'react'

import Layout from 'components/layout'
import { ProductOrder } from 'lib/types/global'
import { useSession } from 'next-auth/react'

const statusColors: Record<string, string> = {
	Paid: 'text-green-600',
	'Pending Approve': 'text-yellow-600',
	Rejected: 'text-red-500'
}

const PER_PAGE = 9

const MyOrdersPage = () => {
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [allOrders, setAllOrders] = useState([] as ProductOrder[])
	const [visibleOrders, setVisibleOrders] = useState([] as ProductOrder[])

	const [totalPages, setTotalPages] = useState(0)

	const { data: session } = useSession()

	useEffect(() => {
		if (session?.user?.id) getData(session?.user?.id)
	}, [session])

	useEffect(() => {
		const start = (page - 1) * PER_PAGE
		const end = start + PER_PAGE

		const searchResult = allOrders
			.filter((o) => {
				return (
					o.products?.name?.toLowerCase().includes(search.toLowerCase()) ||
					o.status?.toLowerCase().includes(search.toLowerCase()) ||
					new Date(o.created_at)
						.toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric'
						})
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					search === ''
				)
			})
			.slice(start, end)
		setVisibleOrders(searchResult)
	}, [page, search, allOrders])

	const getOrders = async (userId: string) => {
		const res = await fetch('/api/get-user-orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId
			})
		})

		return res.json()
	}

	const getData = async (userId: string) => {
		const { orders } = await getOrders(userId)

		setAllOrders(orders)

		const totalPages = Math.ceil(orders.length / PER_PAGE)
		setTotalPages(totalPages)
	}

	return (
		<Layout>
			<div className="px-4 sm:px-0">
				<div className="mx-auto max-w-7xl py-9">
					<h1 className="text-3xl font-semibold">My Orders</h1>

					{allOrders.length > 0 ? (
						<div>
							{/* Search */}
							<div className="mb-4 flex justify-end">
								<div className="relative w-80">
									<input
										type="text"
										placeholder="Search"
										className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 text-gray-700 placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
										value={search}
										onChange={(e) => setSearch(e.target.value)}
									/>
									<span className="absolute left-4 top-2.5 text-gray-400">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
											/>
										</svg>
									</span>
								</div>
							</div>
							{/* Table */}
							{visibleOrders.length > 0 ? (
								<div className="min-h-[28rem] overflow-auto">
									<table className="w-full table-fixed">
										<thead className="border-b border-blue-500">
											<tr>
												<th className="px-4 py-2 text-left text-base font-medium text-blue-600">
													Products
												</th>
												<th className="px-4 py-2 text-left text-base font-medium text-blue-600">
													Status
												</th>
												<th className="px-4 py-2 text-left text-base font-medium text-blue-600">
													Date
												</th>
											</tr>
										</thead>

										<tbody>
											{visibleOrders.map((order) => (
												<tr key={order.id} className="border-b border-gray-200">
													<td className="px-3 py-2 text-base">{order.products?.name}</td>
													<td
														className={`px-4 py-2 text-base ${
															statusColors[order.status]
														}`}>
														{order.status}
													</td>
													<td className="px-4 py-2 text-base text-gray-600">
														{new Date(order.created_at).toLocaleDateString('en-US', {
															month: 'short',
															day: 'numeric',
															year: 'numeric'
														})}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<div className="mt-8 text-center text-gray-500">No orders match your search.</div>
							)}

							{/* Pagination */}
							<div className="mt-8 flex flex-wrap items-center justify-between gap-4">
								<button
									onClick={() => setPage((p) => Math.max(1, p - 1))}
									disabled={page === 1}
									className="flex items-center gap-2 rounded-full border border-blue-600 px-6 py-2 font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40">
									<svg
										className="h-5 w-5"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
									</svg>
									Prev
								</button>

								<div className="flex items-center justify-center gap-2">
									{Array.from({ length: totalPages }).map((_, i) => {
										const num = i + 1
										const isActive = num === page

										return (
											<button
												key={num}
												onClick={() => setPage(num)}
												className={`flex h-10 items-center justify-center border px-4 font-semibold text-blue-600 transition ${
													isActive
														? 'rounded-full border-blue-600'
														: 'border-transparent hover:text-blue-800'
												}`}>
												{num}
											</button>
										)
									})}
								</div>
								<button
									onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
									disabled={page === totalPages}
									className="flex items-center gap-2 rounded-full border border-blue-600 px-6 py-2 font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40">
									Next
									<svg
										className="h-5 w-5"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
									</svg>
								</button>
							</div>
						</div>
					) : (
						<div className="mt-8 text-center text-gray-500">You don’t have any orders yet.</div>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default MyOrdersPage
