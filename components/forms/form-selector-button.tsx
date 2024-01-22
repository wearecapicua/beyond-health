import { useFormContext } from 'react-hook-form'

type FormSelectorButtonProps = {
	selected: string | undefined
	label: string
	value: string
	groupId: string
	large?: boolean
	setSelected: (text: string) => void
	customValidate?: () => void
}

const FormButton = ({
	selected,
	setSelected,
	label,
	value,
	groupId,
	large,
	customValidate
}: FormSelectorButtonProps) => {
	const { register } = useFormContext()

	return (
		<div
			className={`${
				large ? 'py-10' : 'py-8'
			} relative my-4 rounded-full border-[1px] border-gray-400 bg-white px-6 text-xl font-semibold leading-6 text-main-blue`}>
			{customValidate ? (
				<input
					type="radio"
					id={value}
					value={value}
					onClick={customValidate}
					className="absolute top-0 h-full w-full opacity-0"
				/>
			) : (
				<input
					type="radio"
					id={value}
					value={value}
					{...register(groupId, {
						onChange: (e) => setSelected(e.target.value)
					})}
					className="absolute top-0 h-full w-full opacity-0"
				/>
			)}
			<label
				htmlFor={value}
				className={`absolute inset-0 flex cursor-pointer items-center justify-center px-6 text-center ${
					selected === value
						? 'bg-main-light-blue text-white'
						: 'border-[1px] border-gray-400 text-main-blue'
				} rounded-full`}>
				{label}
			</label>
		</div>
	)
}
export default FormButton
