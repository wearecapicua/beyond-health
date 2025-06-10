import { fetchGetJSON, fetchPostJSON } from 'lib/http'
import { supabaseClient } from 'lib/supabaseClient'

export async function getProfileData() {
	const response = await fetchGetJSON('/api/get-profile')
	console.log(response)

	return response
}

export async function getFormStatus() {
	const response = await fetchGetJSON('/api/get-form-status')
	console.log(response)

	return response
}

export async function getImages() {
	const response = await fetchGetJSON('/api/upload-images')
	console.log(response)

	return response
}

export async function sendUpdatedData(updatedData: Record<string, unknown>) {
	const response = await fetchPostJSON('/api/update-profile', {
		method: 'PUT',
		updatedData
	})

	return response
}

export async function adminUpdateData(updatedData: Record<string, unknown>, userId: string) {
	const response = await fetchPostJSON('/api/admin/update-user', {
		method: 'PUT',
		updatedData,
		userId
	})
	console.log('res', response)

	return response
}

export async function adminUpdatePayments(userId: string, orderNumber: string) {
	const response = await fetchPostJSON('/api/admin/update-payment-history', {
		method: 'POST',
		userId,
		orderNumber
	})
	console.log('res', response)

	return response
}

export async function createOrder(userId: string, productId: string) {
	const response = await fetchPostJSON('/api/create-order', {
		method: 'POST',
		userId,
		productId
	})
	console.log('res', response)

	return response
}

export async function createUserProfile(updatedData: Record<string, unknown>) {
	const response = await fetchPostJSON('/api/update-profile', {
		method: 'POST',
		updatedData
	})
	console.log(response)

	return response
}

export async function captureUserPayment(filteredData: Record<string, unknown>) {
	const response = await fetchPostJSON('/api/checkout_sessions/capture-payment', {
		method: 'POST',
		filteredData
	})
	console.log('res', response)

	return response
}

export async function uploadImages(file: File) {
	const response: { path: string; token: string } = await fetchPostJSON('/api/get-signed-upload-url', {
		method: 'POST',
		file
	})

	return supabaseClient().storage.from('profile-images').uploadToSignedUrl(response.path, response.token, file)
}

export async function getProfileImage() {
	const response = await fetchGetJSON('/api/get-profile-image')

	return response
}

export async function getIdImage() {
	const response = await fetchGetJSON('/api/get-id-image')

	return response
}

export async function getHealthCardImage() {
	const response = await fetchGetJSON('/api/get-health-card-image')

	return response
}

export async function getInsuranceImage() {
	const response = await fetchGetJSON('/api/get-insurance-image')

	return response
}

export async function deleteImage(signedUrl: string) {
	const response = await fetchPostJSON('/api/delete-image', {
		method: 'POST',
		signedUrl
	})

	return response
}

export async function getUserImages(userId: string) {
	const response = await fetchPostJSON('/api/get-user-images', {
		method: 'POST',
		userId
	})

	return response
}

// export async function uploadImages(file: any) {
//   const body = new FormData();
//   body.append('file', file.fileObject);

//   const response = await fetch('/api/upload-images', {
//     method: 'POST',
//     headers: {
//       // Set the Content-Type to multipart/form-data
//       "Content-Type": "multipart/form-data",
//     },
//     body,
//   });
//   console.log(response)
//   return response
// }
