import { useEffect, useState } from 'react'

import { useFormContext } from 'react-hook-form'
import { useFormStore } from 'store/useFormStore'

import DatePicker from './form-date-picker'
import FormContainer from '../form-container'
import FormErrors from '../form-errors'
import FormHeader from '../form-header'

const StepThree = () => {
	const [fullDate, setFullDate] = useState('')
	const {
		setValue,
		formState: { errors }
	} = useFormContext()
	const { formStore } = useFormStore()

	useEffect(() => {
		if (!fullDate && formStore.birthdate) {
			setFullDate(formStore.birthdate as string)
			setValue('birthdate', formStore.birthdate)
		}
	}, [formStore.birthdate])

	return (
		<>
			<FormHeader
				title={'What’s your date of birth?'}
				subtitle="For some prescription must be 18 years or older"
			/>
			<FormContainer>
				<DatePicker
					setValue={setValue}
					defaultDate={formStore.birthdate as string}
					setFullDate={setFullDate}
				/>
				<div className="flex justify-center">
					<FormErrors errors={errors} id="birthdate" text="Birthdate required" />
				</div>
			</FormContainer>
		</>
	)
}

export default StepThree
