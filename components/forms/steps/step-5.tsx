import { useFormStore } from 'store/useFormStore'

import FormContainer from '../form-container'
import FormHeader from '../form-header'
import FormInput from '../form-input'

const StepFive = () => {
	const { formStore } = useFormStore()

	return (
		<>
			<FormHeader
				title={'What is your phone number?'}
				subtitle="We may need to reach you to confirm details"
			/>
			<FormContainer>
				<FormInput
					label="Phone Number*"
					id="phone_number"
					type="text"
					defaultValue={formStore.phone_number}
				/>
			</FormContainer>
		</>
	)
}

export default StepFive
