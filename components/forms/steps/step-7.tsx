import { SetStateAction, useEffect, useState } from 'react'

import { useFormContext } from 'react-hook-form'
import { useFormStore } from 'store/useFormStore'

import FormHeader from '../form-header'
import FormInput from '../form-input'
import FormSelectorButton from '../form-selector-button'

const StepSeven = () => {
	const [selected, setSelected] = useState('')
	const {
		setValue,
		formState: { errors }
	} = useFormContext()
	const { formStore } = useFormStore()

	useEffect(() => {
		if (!selected && formStore.medications) {
			setSelected(formStore.medications as string)
		}
	}, [formStore.medications])

	const customValidate = () => {
		setValue('medications', 'none')
	}

	const customValidateNone = () => {
		setSelected('none')
		setValue('medications', 'none')
	}

	return (
		<>
			<FormHeader
				title={'Do you take any medication, vitamins, herbals, or supplements?'}
				subtitle="Please enter all medications you currently take, including any and all medications containing Nitroglycerine as well as vitamins, herbals, and supplements. Also, please provide any additional details you may wish about any events, conditions, or symptoms."
			/>
			<div className="mx-auto max-w-[602px] px-6 md:px-3">
				<FormInput
					id="medications"
					type="text"
					large
					setSelected={setSelected as (value: SetStateAction<string | undefined>) => void}
					placeholder="Enter your answer here"
					defaultValue={formStore.medications as string}
					customValidate={customValidate}
				/>
				<FormSelectorButton
					label="I don't take any medication, vitamins, or supplements"
					value="none"
					groupId="medications"
					selected={selected}
					setSelected={setSelected}
					customValidate={customValidateNone}
				/>
				{!selected && !!errors.medications && (
					<p className="text-center text-sm text-red-500">Please select one</p>
				)}
			</div>
		</>
	)
}

export default StepSeven
