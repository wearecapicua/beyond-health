import { SetStateAction } from 'react'

import { useFormContext } from 'react-hook-form'

import FormErrors from './form-errors'

type FormInputProps = {
	label?: string
	type: string
	id: string
	placeholder?: string
	large?: boolean
	setSelected?: (value: SetStateAction<string | undefined>) => void
	defaultValue: string
	customValidate?: () => void
	isRequired?: boolean
	error?: string
}

const FormInput = ({
	label,
	type,
	id,
	placeholder,
	defaultValue,
	large,
	setSelected,
	customValidate,
	isRequired,
	error
}: FormInputProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	const errorMsg = error || 'This field is required'

	return (
		<div className="py-3">
			<label htmlFor={id} className="block leading-6">
				{label}
			</label>
			<div className="mt-2">
				<input
					type={type}
					id={id}
					className={`${
						large ? 'py-5' : 'py-3'
					} block w-full rounded-full border-0 px-6 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-light-blue sm:leading-6`}
					placeholder={placeholder || ''}
					defaultValue={defaultValue || ''}
					{...register(id, {
						required: isRequired,
						onChange: () => setSelected && setSelected(undefined)
					})}
				/>
			</div>
			{!customValidate && <FormErrors errors={errors} id={id} text={errorMsg} />}
		</div>
	)
}

export default FormInput
