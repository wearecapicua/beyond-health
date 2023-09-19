import { useState, useEffect } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormSelectorButton from "../form-selector-button";
import { useFormContext } from "react-hook-form";
import { useFormStore } from 'store/useFormStore';

export default function StepFour() {
  const [selected, setSelected] = useState("");
  const { setValue } = useFormContext();
  const { formStore } = useFormStore();

  const radioButtonOptions = [
    { value: "canada", label: "Canada" },
    { value: "anotherCountry", label: "Another Country" },
  ];

  useEffect(() => {
    if (!selected && formStore.country) {
      setSelected(formStore.country);
      setValue("country", formStore.country)
    }
  }, [formStore.gender]);

  return (
    <>
      <FormHeader
        title={"Where do you live?"}
      />
      <FormContainer>
        {radioButtonOptions.map((option) => {
          return (
            <FormSelectorButton
              key={option.label}
              label={option.label}
              value={option.value}
              groupId="country"
              selected={selected}
              setSelected={setSelected}
            />
          )
        })}
      </FormContainer>
    </>
  );
}