import { formatAmountForDisplay } from 'lib/stripeUtils'
import { StripeProduct } from 'lib/types'
import * as config from 'stripe.config'

type ProductDetailsProps = {
	product: StripeProduct
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
	const { metadata, name, price } = product

	const ingredientList = metadata.Ingredients.split(', ')
	const formattedPrice = formatAmountForDisplay(price, config.CURRENCY)

	return (
		<div className="mt-10 flex max-w-[430px] flex-1 flex-col justify-between gap-10 px-8 md:mt-2 md:px-4">
			<div>
				<p className="pb-2 text-xl font-semibold text-main-blue">Medication</p>
				<ul className="list-inside list-disc pl-3">
					{ingredientList.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</div>
			<div>
				<p className="pb-2 text-xl font-semibold text-main-blue">What you pay per shipment</p>
				<ul className="list-inside list-disc pl-3">
					<li>{name}</li>
					<li>{metadata.Term}</li>
					<li>{formattedPrice}</li>
					<li>Shipping: FREE</li>
				</ul>
			</div>
			<div className="flex items-center justify-between border-t-[1px] border-solid border-main-black pb-3 pt-4">
				<p className="pb-2 text-xl font-semibold text-main-blue">What you pay today</p>
				<span className="text-2xl font-semibold text-main-black">$0.00</span>
			</div>
		</div>
	)
}

export default ProductDetails
