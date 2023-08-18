import { useState, useEffect } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormSelectorButton from "../form-selector-button";
import { useFormContext } from "react-hook-form";
import { useFormStore } from 'store/useFormStore';

export default function StepTwo() {
  const [selected, setSelected] = useState("");
  const { setValue, formState: { errors } } = useFormContext();
  const { formStore } = useFormStore();

  const radioButtonOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "transgender", label: "Transgender / Non-binary" },
  ];

  useEffect(() => {
    if (!selected && formStore.gender) {
      setSelected(formStore.gender);
      setValue("gender", formStore.gender)
    }
  }, [formStore.gender]);

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
