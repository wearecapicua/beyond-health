import { useEffect, useState } from 'react'

import { useFormContext } from 'react-hook-form'
import { useFormStore } from 'store/useFormStore'

import FormContainer from '../form-container'
import FormHeader from '../form-header'
import FormSelector from '../form-selector'

const StepSix = () => {
	const [selected, setSelected] = useState('')
	const {
		setValue,
		formState: { errors }
	} = useFormContext()
	const { formStore } = useFormStore()

	const texts = [
		'No, but i would like to prevent it',
		'Yes, in the last month',
		'Yes, in the last 6 months',
		'Yes, in the last 6 months to a year',
		'Yes, for longer than a year'
	]

	useEffect(() => {
		if (!selected && formStore.notice_hair_loss) {
			setSelected(formStore.notice_hair_loss as string)
			setValue('notice_hair_loss', formStore.notice_hair_loss)
		}
	}, [formStore.notice_hair_loss])

	return (
		<>
			<FormHeader
				title={'Have you noticed thinning, recession, or other types of hair loss on your head?'}
			/>
			<FormContainer wide>
				{texts.map((text, index) => (
					<FormSelector
						key={`option-${index}`}
						label={text}
						value={text}
						groupId="notice_hair_loss"
						selected={selected}
						setSelected={setSelected}
					/>
				))}
				{!!errors.notice_hair_loss && (
					<p className="text-center text-sm text-red-500">Please select one</p>
				)}
			</FormContainer>
		</>
	)
}

export default StepSix
