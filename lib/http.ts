import { FormData } from '../components/contact-form'

export async function fetchGetJSON(url: string) {
	try {
		const data = await fetch(url).then((res) => res.json())

		return data
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message)
		}
		throw err
	}
}

export async function fetchPostJSON<Response = unknown>(
	url: string,
	data: {
		email?: string
		method?: string
		productId?: string
		amount?: number
		setupId?: string
		price?: number
		file?: File
		signedUrl?: string
		userId?: string
		updatedData?: Record<string, unknown>
		filteredData?: Record<string, unknown>
		orderNumber?: string
		data?: FormData
		productName?: string
		orderId?: number
		status?: string
		origin?: string
		subscriptionId?: string
		active?: boolean
	}
) {
	const { method } = data

	try {
		// Default options are marked with *
		const response = await fetch(url, {
			method, // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(data || {}) // body data type must match "Content-Type" header
		})

		return response.json() as Promise<Response> // parses JSON response into native JavaScript objects
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message)
		}
		throw err
	}
}
