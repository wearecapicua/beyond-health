import { useFormContext } from "react-hook-form";

type FormSelectorButtonProps = {
  selected: string | undefined;
  label: string;
  value: string;
  groupId: string;
  setSelected: (text: any) => void;
  customValidate?: any;
};

export default function FormButton({
  selected,
  setSelected,
  label,
  value,
  groupId,
  customValidate
}: FormSelectorButtonProps) {

  const { register } = useFormContext();

  return (
    <div className="relative my-4 bg-white border-[1px] text-main-blue border-gray-400 rounded-full px-6 py-8 text-xl font-semibold leading-6">
      {customValidate ?
        <input
          type="radio"
          id={value}
          value={value}
          onClick={customValidate}
          className="w-full h-full opacity-0 absolute top-0"
        />
      :
        <input
          type="radio"
          id={value}
          value={value}
          {...register(groupId, {
            onChange: (e) => setSelected(e.target.value)
          })}
          className="w-full h-full opacity-0 absolute top-0"
        />
      }
      <label
        htmlFor={value}
        className={`absolute inset-0 flex items-center justify-center cursor-pointer text-center ${
          selected === value
            ? "bg-main-light-blue text-white"
            : "text-main-blue border-[1px] border-gray-400"
        } rounded-full`}
      >
        {label}
      </label>
    </div>
  );
}
