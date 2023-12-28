import { useState, useEffect } from 'react'

import { formatAmountForDisplay } from 'lib/stripeUtils'
import { StripeProduct } from 'lib/types'
import { useFormContext } from 'react-hook-form'
import { useFormStore } from 'store/useFormStore'
import { useProductStore } from 'store/useProductStore'
import * as config from 'stripe.config'

import FormContainer from '../form-container'
import FormHeader from '../form-header'
import FormSelectorProduct from '../form-selector-product'

const StepTwelve = () => {
	const [selected, setSelected] = useState('')
	const {
		setValue,
		formState: { errors }
	} = useFormContext()
	const { formStore } = useFormStore()
	const { productStore } = useProductStore()
	const [productOptions, setproductOptions] = useState<[StripeProduct]>()

	const filteredProducts = productStore.filter(
		(product: StripeProduct) => product.default_price === formStore.product?.default_price
	)

	useEffect(() => {
		setSelected(formStore.product?.default_price)
		setValue('product', formStore.product)
		setproductOptions(filteredProducts)
	}, [formStore.product])

	return (
		<>
			<FormHeader
				title="You will receive a 3 month supply of hair growth solution in your shipment"
				subtitle="Unless the healthcare practitioner has a medical reason to prescribe you less, you will always get a year's worth of medication with prescriptions written through Beyond Health & Medical."
			/>
			<FormContainer wide>
				{productOptions?.map((option: StripeProduct) => {
					const productPrice = formatAmountForDisplay(option.price, config.CURRENCY)

					return (
						<FormSelectorProduct
							key={option.name}
							label={option.name}
							value={option.default_price}
							groupId="product"
							description={option?.description}
							price={productPrice}
							selected={selected}
							setSelected={setSelected}
						/>
					)
				})}
				{!!errors.product && <p className="text-center text-sm text-red-500">Please select one</p>}
			</FormContainer>
			<p className="mx-auto mb-6 mt-10 max-w-[820px] px-6 text-center text-lg leading-8 md:px-3">
				Pricing displayed here includes pharmacy fill fee but does not include benefits or insurance
				coverage
			</p>
		</>
	)
}

export default StepTwelve
