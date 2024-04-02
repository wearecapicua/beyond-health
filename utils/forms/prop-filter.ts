const expectedProperties: string[] = [
	'first_name',
	'last_name',
	'gender',
	'birthdate',
	'country',
	'phone_number',
	'notice_hair_loss',
	'medications',
	'conditions',
	'questions',
	'stage',
	'product',
	'shipping_address',
	'billing_address',
	'has_health_card',
	'has_insurance',
	'form_step',
	'stripe_customer_id',
	'stripe_setup_id'
]

const expectedBillingProperties: string[] = [
	'first_name',
	'last_name',
	'country',
	'phone_number',
	'product',
	'shipping_address',
	'billing_address',
	'stripe_customer_id',

	'stripe_setup_id'
]

export const filterFormData = <T>(obj: T): { filteredData: Partial<T>; filteredBillingData: Partial<T> } => {
	const filteredData: Partial<T> = {}
	const filteredBillingData: Partial<T> = {}

	for (const prop of expectedProperties) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			filteredData[prop as keyof T] = (obj as Record<string, unknown>)[prop] as T[keyof T]
		}
	}

	for (const prop of expectedBillingProperties) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			filteredBillingData[prop as keyof T] = (obj as Record<string, unknown>)[prop] as T[keyof T]
		}
	}

	return { filteredData, filteredBillingData }
}
