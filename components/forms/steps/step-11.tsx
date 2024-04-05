import { SetStateAction, useEffect, useState } from 'react'

import { Product } from 'lib/types'
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
	const [productOptions, setproductOptions] = useState<[Product]>()

	const filterProductArray = (productStore as unknown as [Product]).filter((product: Product) => {
		const stages = product?.stage?.split(', ')

		return stages?.includes(formStore.stage as string)
	})

	// Always should be one product
	const filteredProducts = filterProductArray.slice(0, 1)

	const customValidate = () => {
		setValue('product', {
			price: filteredProducts[0].price,
			name: filteredProducts[0].name,
			id: filteredProducts[0].id,
			ingredients: filteredProducts[0].ingredients,
			term: filteredProducts[0].term
		})
		setSelected(`${filteredProducts[0].id}` as string)
	}

	useEffect(() => {
		if ((!selected || selected === '') && filteredProducts) {
			setSelected(`${filteredProducts[0].id}` as string)
			setValue('product', {
				price: filteredProducts[0].price,
				name: filteredProducts[0].name,
				id: filteredProducts[0].id,
				ingredients: filteredProducts[0].ingredients,
				term: filteredProducts[0].term
			})
		}
		setproductOptions(filteredProducts as unknown as SetStateAction<[Product] | undefined>)
	}, [formStore.product])

	return (
		<>
			<FormHeader
				title={'Select your scalp treatment below'}
				subtitle="Based on your input, this is the recommended hair growth solution final approval from your doctor"
			/>
			<FormContainer>
				{productOptions?.map((option: Product) => {
					return (
						<FormSelectorButton
							key={option.name}
							label={option.name}
							value={`${option.id}`}
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
