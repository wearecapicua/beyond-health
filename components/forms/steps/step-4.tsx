import { useEffect, useState } from 'react'

import { useFormContext } from 'react-hook-form'
import { useFormStore } from 'store/useFormStore'

import FormContainer from '../form-container'
import FormHeader from '../form-header'
import FormSelectorButton from '../form-selector-button'

const StepFour = () => {
	const [selected, setSelected] = useState('')
	const { setValue } = useFormContext()
	const { formStore } = useFormStore()

	const radioButtonOptions = [
		{ value: 'canada', label: 'Canada' },
		{ value: 'anotherCountry', label: 'Another Country' }
	]

	useEffect(() => {
		if (!selected && formStore.country) {
			setSelected(formStore.country as string)
			setValue('country', formStore.country)
		}
	}, [formStore.gender])

	return (
		<>
			<FormHeader title={'Where do you live?'} />
			<FormContainer>
				{radioButtonOptions.map((option) => {
					return (
						<FormSelectorButton
							key={option.label}
							label={option.label}
							value={option.value}
							groupId="country"
							selected={selected}
							setSelected={setSelected}
						/>
					)
				})}
			</FormContainer>
		</>
	)
}

export default StepFour
