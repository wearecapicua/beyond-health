import { useFormContext } from 'react-hook-form'
import { useFormStore } from 'store/useFormStore'

import FormContainer from '../form-container'
import FormHeader from '../form-header'

const StepNine = () => {
	const { register } = useFormContext()
	const { formStore } = useFormStore()

	return (
		<>
			<FormHeader
				title={
					'If you have any question you would like to ask the healthcare practitioner, please add it below'
				}
			/>
			<FormContainer>
				<textarea
					id="about"
					rows={6}
					defaultValue={formStore.questions as string}
					className="block w-full rounded-3xl border-0 px-6 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					placeholder={'Your answer'}
					{...register('questions')}
				/>
			</FormContainer>
		</>
	)
}

export default StepNine
