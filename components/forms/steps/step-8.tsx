import { useEffect, useState } from 'react'

import { useFormContext } from 'react-hook-form'
import { useFormStore } from 'store/useFormStore'

import FormHeader from '../form-header'
import FormInput from '../form-input'
import FormSelectorButton from '../form-selector-button'

const StepEight = () => {
	const [selected, setSelected] = useState<string | undefined>(undefined)
	const {
		setValue,
		formState: { errors }
	} = useFormContext()
	const { formStore } = useFormStore()

	useEffect(() => {
		if (!selected && formStore.conditions) {
			setSelected(formStore?.conditions)
		}
	}, [formStore.conditions])

	const customValidate = () => {
		setValue('conditions', 'none')
	}

	const customValidateNone = () => {
		setSelected('none')
		setValue('conditions', 'none')
	}

	return (
		<>
			<FormHeader
				title={'Do you have any medical conditions?'}
				subtitle="Please enter any and all medical conditions below"
			/>
			<div className="mx-auto max-w-[602px] px-6 md:px-3">
				<FormInput
					id="conditions"
					type="text"
					large
					setSelected={setSelected}
					placeholder="Enter your answer here"
					defaultValue={formStore.conditions}
					customValidate={customValidate}
				/>
				<FormSelectorButton
					label="I don't have any medical conditions"
					value="none"
					groupId="conditions"
					selected={selected}
					setSelected={setSelected}
					customValidate={customValidateNone}
				/>
				{!selected && !!errors.conditions && (
					<p className="text-center text-sm text-red-500">Please select one</p>
				)}
			</div>
		</>
	)
}

export default StepEight
