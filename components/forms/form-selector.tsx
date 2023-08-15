import { useFormContext } from "react-hook-form";

type FormSelectorButtonProps = {
  selected: string;
  label: string;
  value: string;
  groupId: string;
  setSelected: (text: string) => void;
};

export default function FormButton({
  selected,
  setSelected,
  label,
  value,
  groupId
}: FormSelectorButtonProps) {

  const selectedStyles = selected === value ? "bg-main-light-blue" : "bg-transparent"
  const { register } = useFormContext();

  return (
    <div className="relative my-4 border-[1px] text-main-blue border-gray-400 hover:opacity-8 flex w-full rounded-full px-6 py-5 text-xl font-semibold leading-6">
      <input
        type="radio"
        id={value}
        value={value}
        {...register(groupId, {
          onChange: (e) => setSelected(e.target.value)
        })}
        className="w-full h-full opacity-0 absolute top-0"
       />
       <div className="w-full flex justify-between cursor-pointer">
        <label htmlFor={value}>
          {label}
        </label>
        <div className={`${selectedStyles} rounded-full border-[1px] p-3 border-gray-400`} />
      </div>
    </div>
  );
}
