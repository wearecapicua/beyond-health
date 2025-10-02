// global.d.ts
export interface PaymentService {
	openOrder: (params: {
		userTokenId: string
		clientUniqueId: string
		clientRequestId: string
		currency: string
		amount: string
	}) => void

	// Puedes agregar otros métodos que necesites aquí, como createPayment, checkout, etc.
}

interface BillingAddress {
	country: string
	email?: string
	firstName?: string
	lastName?: string
	address?: string
	cell?: string
	phone?: string
	zip?: string
	city?: string
	state?: string
	county?: string
}

// Definición del tipo para los parámetros de addCardUpo
interface AddCardUpoParams {
	useFields?: boolean
	cardNumber?: string
	expMonth: string
	expYear: string
	cardHolderName?: string
	billingAddress?: BillingAddress
}
interface AddCardUpoResponse {
	result: string
	errCode: string
	errorDescription?: string
	userPaymentOptionId?: string
	ccCardNumber?: string
	bin?: string
	last4Digits?: string
	ccExpMonth?: string
	ccExpYear?: string
	cancelled?: boolean
}

export interface CreatePaymentResponse {
	result: string
	errCode: string
	errorDescription?: string
}

interface CreatePaymentParams {
	sessionToken: string
	paymentOption: {
		card?: {
			cardNumber: string
			cardHolderName: string
			expirationMonth: string
			expirationYear: string
			CVV: string
		}
		userPaymentOptionId?: string
	}
	billingAddress?: {
		country: string
		email: string
		firstName: string
		lastName: string
		address?: string
		addressLine2?: string
		addressLine3?: string
		phone?: string
		zip?: string
		city?: string
		state?: string
		county?: string
	}
}
export type AddCardUpoCallback = (response: AddCardUpoResponse) => void
export type CreatePaymentCallback = (response: CreatePaymentResponse) => void

export interface SafeCharge {
	paymentService: PaymentService // Agrega esta línea
	getUserUPOs: (any) => void
	createPayment: (params: CreatePaymentParams, callback: CreatePaymentCallback) => void
	addCardUpo: (params: AddCardUpoParams, callback: AddCardUpoCallback) => AddCardUpoCallback
}

export type ProductOrder = {
	id: string
	status: string
	created_at: string
	products: { name: string }
	subscriptions: {
		next_payment_date: string
	}
}
type SafeChargeFunction = (params: {
	env: string
	merchantId: string
	merchantSiteId: string
	sessionToken?: string
	logLevel?: string
	blockCards?: string[]
	blockPasteCard?: boolean
	support19Digits?: boolean
	disableNuveiAnalytics?: boolean
	onPaymentEvent?: any[]
	showAccountCapture?: boolean
	strictCardBlocking?: boolean
	cvvIcon?: string
}) => SafeCharge

declare global {
	interface Window {
		SafeCharge: SafeChargeFunction
	}
}

export {}
