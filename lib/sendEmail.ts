import { FormData } from '../components/contact-form'
import { fetchPostJSON } from '../lib/http'

export async function sendEmail(data: FormData) {
	try {
		const response = await fetchPostJSON('/api/email/route', {
			method: 'POST',
			data
		})

		if (response) {
			const data = await response

			return data
		} else {
			return null
		}
	} catch (error) {
		return null
	}
}
