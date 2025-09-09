import { ImageFieldImage } from '@prismicio/client'
import { FieldState, RelationField, TitleField } from '@prismicio/types'
import { PostDocument } from 'prismic-types'

export type PostDocumentWithAuthor = PostDocument & {
	data: {
		author: AuthorContentRelationshipField
		title: TitleField
	}
}

export type AuthorContentRelationshipField = RelationField<
	'author',
	string,
	{
		name: TitleField
		picture: ImageFieldImage
	},
	FieldState
>

export type Product = {
	stage: string
	name: string
	price: number
	id: string
	ingredients: string
	term: string
	nuvei_plan_id: string
}

export type BillingAddress = {
	line1: string
	line2: string
	city: string
	state: string
	postal_code: string
	country: {
		value: string
		label: string
	}
}

export type ShippingAddress = {
	line1: string
	line2: string
	city: string
	state: string
	postal_code: string
	country: {
		value: string
		label: string
	}
	delivery_instructions: string
}

export type User = {
	id?: string
	user_id: string
	first_name: string
	last_name: string
	email: string
	gender: string
	birthdate: string
	notice_hair_loss: string
	medications: string
	conditions: string
	questions?: string
	stage: string
	has_insurance: boolean
	has_health_card: boolean
	products: Product
	phone_number: string
	country: string
	shipping_address: {
		line1: string
		line2: string
		city: string
		state: string
		postal_code: string
	}
	billing_address: {
		line1: string
		line2: string
		city: string
		state: string
		postal_code: string
	}
	// payments_history: string[]
	photo_id_url: string
	profile_image_url: string
	insurance_image_url: string
	health_card_image_url: string
	stripe_setup_id: string
}
