import { useEffect, useState } from 'react'

import Container from 'components/container'
import Layout from 'components/layout'
import Head from 'next/head'
import { useSession } from 'next-auth/react'

type AdminPageProps = {
	preview: boolean | undefined
}

const AdminPage = ({ preview }: AdminPageProps) => {
	const { data: session } = useSession()
	const [isLogin, setIsLogin] = useState(false)

	const [orders, setOrders] = useState<
		{ id: number; status: string; products: { id: number; name: string; price: number } }[]
	>([])

	const getOrders = async () => {
		const res = await fetch('/api/get-orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_id: session?.user?.id
			})
		})

		return res.json()
	}

	useEffect(() => {
		const fetchOrders = async () => {
			if (session !== undefined && session !== null) {
				const { orders } = await getOrders()
				console.log('Orders:', orders)

				setOrders(orders)
				setIsLogin(true)
			} else {
				setIsLogin(false)
			}
		}
		fetchOrders()
	}, [session])

	return (
		<Layout preview={preview} fullPage>
			<Head>
				<title>Beyond Health</title>
			</Head>
			<Container>
				{isLogin ? (
					<div>
						<h3 className="mb-7 mt-12">Orders</h3>
						<table className="text-left">
							<tbody>
								<tr className="border-t text-xs">
									<th className="p-4">Product Name</th>
									<th className="p-4">Price</th>
									<th className="p-4">status</th>

									<th className="p-4">Submit</th>
								</tr>

								{orders?.map((order, index) => {
									return (
										<tr key={`user-${index}`} className="border-t  text-xs">
											<td className="p-4">{order.products.name}</td>
											<td className="p-4">{order.products.price}</td>
											<td className="p-4">{order.status}</td>

											<td className="p-4">
												<button
													className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-slate-400"
													disabled={
														order.status === 'Pending' ||
														order.status === 'Paid' ||
														order.status === 'Pending Approve'
													}
													onClick={async () => {}}>
													Payment
												</button>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				) : (
					<p>Not authorized</p>
				)}
			</Container>
		</Layout>
	)
}

export default AdminPage
