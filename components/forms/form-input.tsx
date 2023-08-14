import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label?: string;
  error?: string;
  type: string;
  id: string;
  placeholder?: string;
  setSelected?: (name: any) => void;
};

export default function FormInput({
  label,
  type,
  id,
  placeholder,
  setSelected
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  console.log("error", errors)
  
  return (
    <div className="py-3">
      <label htmlFor={id} className="block leading-6">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          id={id}
          className="block w-full rounded-full border-0 py-3 px-6 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-light-blue sm:leading-6"
          placeholder={placeholder || ""}
          {...register(id)}
          //onChange={setSelected ? () => setSelected("") : ()=> ("")}
        />
      </div>
      {errors && <p>{"error"}</p>}
    </div>
  );
}