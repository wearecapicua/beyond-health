import { DateDropdown } from 'react-date-dropdown';

interface IDateDropdown {
  /** Required. Callback for date change: Format: YYYY-MM-DD */
  onDateChange: (date: string) => void;
  /** Default Date set: Format: YYYY-MM-DD */
  defaultDate?: string;

  /** className for container */
  containerClass?: string;
  /** className for <option/> */
  optionClass?: string;
  /** className for <select/> */
  selectClass?: string;
  /** Placeholder for <select/> input */
  selectPlaceholder?: {
    year: string;
    month: string;
    day: string;
  };
  /** Starting year: Format: YYYY */
  yearStart?: number;
  /** Ending year: Format: YYYY */
  yearEnd?: number;
}

type DatePickerProps = {
  defaultDate: string;
  setFullDate: (date: string) => void;
  setValue: (arg: string, date: string) => void;
}

export default function DatePicker({ setValue, defaultDate, setFullDate }: DatePickerProps) {
  const changeDate = (date: string) => {
    const birthdate = date.replace(/-/g, '/')
    setFullDate(birthdate)
    setValue("birthdate", birthdate)
  }
  const selectStyles = "rounded-full flex-1 px-6 py-3"
  
  return (
    <DateDropdown
      defaultDate={defaultDate}
      onDateChange={(date) => changeDate(date)}
      selectClass={selectStyles}
      containerClass="flex justify-between gap-5 pb-2"
    />
  )
}
