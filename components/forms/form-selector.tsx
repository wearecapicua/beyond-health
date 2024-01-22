import { useFormContext } from 'react-hook-form'

type FormSelectorButtonProps = {
	selected: string
	label: string
	value: string
	groupId: string
	setSelected: (text: string) => void
}

const FormButton = ({ selected, setSelected, label, value, groupId }: FormSelectorButtonProps) => {
	const selectedStyles = selected === value ? 'bg-main-light-blue' : 'bg-transparent'
	const { register } = useFormContext()

	return (
		<div className="hover:opacity-8 relative my-4 flex w-full rounded-full border-[1px] border-gray-400 px-6 py-5 text-xl font-semibold leading-6 text-main-blue">
			<input
				type="radio"
				id={value}
				value={value}
				{...register(groupId, {
					onChange: (e) => setSelected(e.target.value)
				})}
				className="absolute top-0 h-full w-full opacity-0"
			/>
			<div className="flex w-full cursor-pointer items-center justify-between">
				<label className="mr-4" htmlFor={value}>
					{label}
				</label>
				<div className={`${selectedStyles} rounded-full border-[1px] border-gray-400 p-3`} />
			</div>
		</div>
	)
}

export default FormButton
