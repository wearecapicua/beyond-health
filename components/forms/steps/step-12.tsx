import { SetStateAction, useEffect, useState } from 'react'

import { Product } from 'lib/types'
import { useFormContext } from 'react-hook-form'
import { useFormStore } from 'store/useFormStore'
import { useProductStore } from 'store/useProductStore'

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
	const [productOptions, setproductOptions] = useState<[Product]>()

	const filteredProducts = (productStore as unknown as [Product]).filter((product: Product) => {
		const stages = product?.stage?.split(', ')

		return stages?.includes(formStore.stage as string)
	})
	useEffect(() => {
		setSelected((formStore.product as unknown as { id: string })?.id)
		setValue('product', formStore.product)
		setproductOptions(filteredProducts as SetStateAction<[Product] | undefined>)
	}, [formStore.product])

	return (
		<>
			<FormHeader
				title="You will receive a 3 month supply of hair growth solution in your shipment"
				subtitle="Unless the healthcare practitioner has a medical reason to prescribe you less, you will always get a year's worth of medication with prescriptions written through Beyond Health & Medical."
			/>
			<FormContainer wide>
				{productOptions?.map((option: Product) => {
					return (
						<FormSelectorProduct
							key={option.name}
							label={option.name}
							value={option.id}
							groupId="product"
							price={option.price}
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
