// import { useFormContext } from "react-hook-form";

type FormSelectorButtonProps = {
	selected: string
	label: string
	value: string
	groupId: string
	price: number
	setSelected: (text: string) => void
}

const FormSelectorProduct = ({ selected, label, value, price }: FormSelectorButtonProps) => {
	const selectedOuterBtn = selected === value ? 'border-main-light-blue' : 'border-gray-400'
	const selectedInnerBtn = selected === value ? 'bg-main-light-blue' : 'bg-transparent'
	const monthlyPrice = price / 3
	// const { register } = useFormContext();

	return (
		<div
			className={`${
				selected === value ? 'border-main-light-blue bg-blue-500 bg-opacity-5' : 'border-gray-400'
			} hover:opacity-8 relative my-3 flex w-full overflow-hidden rounded-[40px] border-[1px] px-10 py-5 leading-6 sm:px-12`}>
			<input
				type="radio"
				id={value}
				value={value}
				className="absolute top-0 h-full w-full cursor-pointer opacity-0"
			/>
			<div className="flex w-full cursor-pointer items-center justify-between gap-2">
				<label htmlFor={value}>
					<p className="text-xl font-semibold">{label}</p>
					<p className="mt-2 text-2xl font-semibold text-main-blue sm:text-3xl">
						3 Month supply ${monthlyPrice.toFixed(2)}/month
					</p>
					<p className="mt-3 font-medium">{`You will be billed ${price} for every shipment`}</p>
				</label>
				<div className={`${selectedOuterBtn} rounded-full border-[1px]`}>
					<div className={`${selectedInnerBtn} rounded-full border-[3px] border-white p-2`} />
				</div>
			</div>
		</div>
	)
}

export default FormSelectorProduct
