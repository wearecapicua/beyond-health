import { DateDropdown } from 'react-date-dropdown'

type DatePickerProps = {
	defaultDate: string
	setFullDate: (date: string) => void
	setValue: (arg: string, date: string) => void
}

const DatePicker = ({ setValue, defaultDate, setFullDate }: DatePickerProps) => {
	const changeDate = (date: string) => {
		const birthdate = date.replace(/-/g, '/')
		setFullDate(birthdate)
		setValue('birthdate', birthdate)
	}
	const selectStyles = 'rounded-full flex-1 px-6 py-3 border-gray-400'

	return (
		<DateDropdown
			defaultDate={defaultDate}
			onDateChange={(date) => changeDate(date)}
			selectClass={selectStyles}
			containerClass="flex flex-col sm:flex-row justify-between gap-5 pb-2"
		/>
	)
}
export default DatePicker
