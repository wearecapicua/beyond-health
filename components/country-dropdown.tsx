import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface CountryDropdownProps {
  control: any; // Replace with your type for 'control'
  name: string;
  large?: boolean;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({ control, name, large }) => {
  const { field } = useController({ name, control });
  const {
    register,
    formState: { errors },
  } = useFormContext();

  //const errorMsg = error || "This field is required"

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    // Add more countries as needed
  ];
  console.log(field);

  return (
    <div className="py-3">
      <label htmlFor="country" className="block leading-6">
        Country
      </label>
      <div className="mt-2">
        <select {...field} className={`${large ? "py-5" : "py-3"} block w-full rounded-full border-0 px-6 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-light-blue sm:leading-6`}>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        {/* <input
          type={type}
          id={id}
          className={`${large ? "py-5" : "py-3"} block w-full rounded-full border-0 px-6 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-light-blue sm:leading-6`}
          placeholder={placeholder || ""}
          defaultValue={defaultValue || ""}
          {...register(id, {
            required: isRequired,
            onChange: () => setSelected && setSelected(undefined)
          })}
        /> */}
      </div>
      {/* {!customValidate && <FormErrors errors={errors} id={id} text="This field is required" />} */}
    </div>
  );
};

export default CountryDropdown;
