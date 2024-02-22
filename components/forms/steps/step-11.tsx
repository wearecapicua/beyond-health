import { SetStateAction, useEffect, useState } from 'react'

import { StripeProduct } from 'lib/types'
import { useFormContext } from 'react-hook-form'
import { useFormStore } from 'store/useFormStore'
import { useProductStore } from 'store/useProductStore'

import FormContainer from '../form-container'
import FormHeader from '../form-header'
import FormSelectorButton from '../form-selector-button'

const StepEleven = () => {
	const [selected, setSelected] = useState('')
	const {
		setValue,
		formState: { errors }
	} = useFormContext()
	const { formStore } = useFormStore()
	const { productStore } = useProductStore()
	const [productOptions, setproductOptions] = useState<[StripeProduct]>()

	const filterProductArray = (productStore as unknown as [StripeProduct]).filter((product: StripeProduct) => {
		const stages = product?.metadata?.Stage?.split(', ')

		return stages.includes(formStore.stage as string)
	})

	// Always should be one product
	const filteredProducts = filterProductArray.slice(0, 1)

	const customValidate = () => {
		setValue('product', {
			default_price: filteredProducts[0].default_price,
			price: filteredProducts[0].price,
			name: filteredProducts[0].name,
			id: (filteredProducts[0] as unknown as { id: string }).id
		})
		setSelected(filteredProducts[0].default_price as string)
	}

	useEffect(() => {
		if ((!selected || selected === '') && filteredProducts) {
			setSelected(filteredProducts[0]?.default_price as string)
			setValue('product', filteredProducts[0])
		}
		setproductOptions(filteredProducts as unknown as SetStateAction<[StripeProduct] | undefined>)
	}, [formStore.product])

	return (
		<>
			<FormHeader
				title={'Select your scalp treatment below'}
				subtitle="Based on your input, this is the recommended hair growth solution final approval from your doctor"
			/>
			<FormContainer>
				{productOptions?.map((option: StripeProduct) => {
					return (
						<FormSelectorButton
							key={option.name}
							label={option.name}
							value={option.default_price}
							groupId="product"
							large
							selected={selected}
							setSelected={setSelected}
							customValidate={customValidate}
						/>
					)
				})}
				{!!errors.product && <p className="text-center text-sm text-red-500">Please select one</p>}
			</FormContainer>
		</>
	)
}

export default StepEleven
