import React, { forwardRef } from 'react';
import Select from "react-select";
import FormErrors from './forms/form-errors';

interface CountryDropdownProps {
  value: string;
  name: string;
  setValue: (propertyName: string, value: object) => void;
  errors: any;
}

const countries = [
  { value: 'AR', label: 'Argentina' },
  { value: 'BB', label: 'Barbados' },
  { value: 'BO', label: 'Bolivia' },
  { value: 'BR', label: 'Brazil' },
  { value: 'CA', label: 'Canada' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  { value: 'CO', label: 'Colombia' },
  { value: 'CU', label: 'Cuba' },
  { value: 'DE', label: 'Germany' },
  { value: 'DO', label: 'Dominican Republic' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'EG', label: 'Egypt' },
  { value: 'ES', label: 'Spain' },
  { value: 'FR', label: 'France' },
  { value: 'GF', label: 'French Guiana' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'GY', label: 'Guyana' },
  { value: 'HT', label: 'Haiti' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'IN', label: 'India' },
  { value: 'IT', label: 'Italy' },
  { value: 'JM', label: 'Jamaica' },
  { value: 'JP', label: 'Japan' },
  { value: 'KR', label: 'South Korea' },
  { value: 'MX', label: 'Mexico' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'NO', label: 'Norway' },
  { value: 'PE', label: 'Peru' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'PY', label: 'Paraguay' },
  { value: 'RU', label: 'Russia' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'SE', label: 'Sweden' },
  { value: 'SG', label: 'Singapore' },
  { value: 'SR', label: 'Suriname' },
  { value: 'TT', label: 'Trinidad and Tobago' },
  { value: 'TR', label: 'Turkey' },
  { value: 'US', label: 'United States' },
  { value: 'UY', label: 'Uruguay' },
  { value: 'VE', label: 'Venezuela' },
  { value: 'ZA', label: 'South Africa' },
];

const controlSelectStyle = {
  // @ts-ignore
  control: (styles) => ({ ...styles,
    borderColor: 'transparent',
    borderRadius: 'none',
    borderStyle: 'none',
    borderWidth: '0',
    boxShadow: 'none',
    "&:hover": {
      borderColor: 'transparent',
    },
  }),
};

const CountryDropdown = ({value, name, setValue, errors}: CountryDropdownProps) => {

  return (
    <div className="py-3">
      <label htmlFor="country" className="block leading-6">
        Country *
      </label>
      <div className="mt-2">
        <Select
          id={name}
          // @ts-ignore
          options={countries}
          isSearchable
          placeholder="Select a country"
          onChange={(selectedOption) => {
            if (selectedOption) {
              // @ts-ignore
              setValue("shipping_address.country", selectedOption);
            }
          }}
          value={value}
          styles={controlSelectStyle}
          className={`py-1 block w-full rounded-full border-0 px-6 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-light-blue sm:leading-6`}
        />
      </div>
      {errors && <FormErrors errors={errors} id={name} text="This field is required" />}
    </div>
  );
};

export default forwardRef(CountryDropdown);
