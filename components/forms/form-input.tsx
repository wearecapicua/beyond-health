type FormInputProps = {
  label: string;
  error?: string;
  type: string;
  name: string;
  placeholder?: string;
};

export default function FormInput({
  label,
  type,
  name,
  placeholder,
  error
}: FormInputProps) {
  
  return (
    <div className="py-3">
      <label htmlFor={name} className="block leading-6">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={name}
          id={name}
          className="block w-full rounded-full border-0 py-5 px-6 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-light-blue sm:leading-6"
          placeholder={placeholder || ""}
        />
      </div>
    </div>
  );
}