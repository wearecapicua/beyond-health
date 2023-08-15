import { useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormSelectorButton from "../form-selector-button";
import { useFormContext } from "react-hook-form";

export default function StepTwo() {
  const [selected, setSelected] = useState("");
  const { formState: { errors } } = useFormContext();

  const radioButtonOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "transgender", label: "Transgender / Non-binary" },
  ];

  return (
    <>
      <FormHeader
        title={"What’s your gender?"}
        subtitle="We know these options aren't comprehensive, but this is for hormonal purposes."
      />
      <FormContainer>
        {radioButtonOptions.map((option) => {
          return (
            <FormSelectorButton
              key={option.label}
              label={option.label}
              value={option.value}
              groupId="gender"
              selected={selected}
              setSelected={setSelected}
            />
          )
        })}
        {!!errors.gender && <p className="text-red-500 text-sm text-center">Please select one</p>}
      </FormContainer>
    </>
  );
}
