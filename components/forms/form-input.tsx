import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label?: string;
  type: string;
  id: string;
  placeholder?: string;
  large?: boolean;
  setSelected?: (name: any) => void;
};

export default function FormInput({
  label,
  type,
  id,
  placeholder,
  large,
  setSelected
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
 
  const errorMsg = errors[id]?.message || ""
  return (
    <div className="py-3">
      <label htmlFor={id} className="block leading-6">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          id={id}
          className={`${large ? "py-5" : "py-3"} block w-full rounded-full border-0 px-6 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-light-blue sm:leading-6`}
          placeholder={placeholder || ""}
          {...register(id, {
            onChange: () => setSelected && setSelected(""),
          })}
        />
      </div>
      {/* @ts-ignore */}
      {!!errors[id] && <p className="text-red-500 text-sm pt-2">{errorMsg}</p>}
    </div>
  );
}