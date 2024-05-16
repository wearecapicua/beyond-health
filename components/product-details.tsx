import { Product } from 'lib/types'

type ProductDetailsProps = {
	product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
	// const { ingredients, term, name, price } = product

	// const ingredientList = ingredients.split(', ')

	return (
		<div className="mt-10 flex max-w-[430px] flex-1 flex-col  gap-10 px-8 md:mt-2 md:px-4">
			<div>
				<p className="pb-2 text-xl font-semibold text-main-blue">Note</p>
				<p className="pl-2 pr-10">
					• Please note without payment your telehealth visit will not be evaluated by a doctor.
				</p>
			</div>

			<div className="flex items-center justify-between border-t-[1px] border-solid border-main-black pb-3 pt-4">
				<p className="pb-2 text-xl font-semibold text-main-blue">What you pay today</p>
				<span className="text-2xl font-semibold text-main-black">$40</span>
			</div>
		</div>

		// <div className="mt-10 flex max-w-[430px] flex-1 flex-col justify-between gap-10 px-8 md:mt-2 md:px-4">
		// 	<div>
		// 		<p className="pb-2 text-xl font-semibold text-main-blue">Medication</p>
		// 		<ul className="list-inside list-disc pl-3">
		// 			{ingredientList.map((item) => (
		// 				<li key={item}>{item}</li>
		// 			))}
		// 		</ul>
		// 	</div>
		// 	<div>
		// 		<p className="pb-2 text-xl font-semibold text-main-blue">What you pay per shipment</p>
		// 		<ul className="list-inside list-disc pl-3">
		// 			<li>{name}</li>
		// 			<li>{term}</li>
		// 			<li>${price}</li>
		// 			<li>Shipping: FREE</li>
		// 		</ul>
		// 	</div>
		// 	<div className="flex items-center justify-between border-t-[1px] border-solid border-main-black pb-3 pt-4">
		// 		<p className="pb-2 text-xl font-semibold text-main-blue">What you pay today</p>
		// 		<span className="text-2xl font-semibold text-main-black">${price}</span>
		// 	</div>
		// </div>
	)
}

export default ProductDetails
