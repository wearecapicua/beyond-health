import { useFormContext } from 'react-hook-form'

type FormSelectorImageProps = {
	selected: string
	image: string
	label: string
	value: string
	groupId: string
	setSelected: (text: string) => void
}

const FormSelectorImage = ({ selected, setSelected, image, label, value, groupId }: FormSelectorImageProps) => {
	const { register } = useFormContext()

	const selectedStyles =
		selected === value ? 'border-main-light-blue border-[2px]' : 'border-gray-400 border-[1px]'

	return (
		<div
			className={`${selectedStyles} hover:opacity-8 relative my-4 flex w-full rounded-full px-6 py-5 text-xl font-semibold leading-6 text-main-blue`}>
			<input
				type="radio"
				id={value}
				value={value}
				{...register(groupId, {
					onChange: (e) => setSelected(e.target.value)
				})}
				className="absolute top-0 h-full w-full opacity-0"
			/>
			<div className="flex w-full cursor-pointer items-center justify-center gap-12">
				<img src={image} className="w-20" />
				{label}
			</div>
		</div>
	)
}

export default FormSelectorImage
