import { useFormContext, Controller } from "react-hook-form";

type FormSelectorButtonProps = {
  selected: string;
  label: string;
  value: string;
  id: string;
  setSelected: (text: string) => void;
};

export default function FormButton({
  selected,
  setSelected,
  label,
  value,
  id,
  groupId
}: FormSelectorButtonProps) {
  const handleChange = (value: string) => {
    setSelected(value);
  };
  const {
    register,
    watch,
    formState: { errors },
    control
  } = useFormContext();

  const watchValue = watch(groupId)
  console.log("error", errors)
  return (
    
    <div className="relative my-4 bg-white border-[1px] text-main-blue border-gray-400 rounded-full px-6 py-8 text-xl font-semibold leading-6">
    <input
      type="radio"
      id={id}
      value={value}
      //checked={value}
      {...register(groupId, {
        onChange: () => handleChange(value),
      })}
      className="w-full h-full opacity-0 absolute top-0"
    />
    <label
      htmlFor={id}
      className={`absolute inset-0 flex items-center justify-center cursor-pointer ${
        watchValue === value
          ? "bg-main-light-blue text-white"
          : "text-main-blue border-[1px] border-gray-400"
      } rounded-full`}
    >
      {label}
    </label>
  </div>
  );
}
