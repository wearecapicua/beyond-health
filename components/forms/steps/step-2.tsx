import { useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormSelectorButton from "../form-selector-button";

export default function StepTwo() {
  const [selected, setSelected] = useState("");
  const radioButtonOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "trasgender3", label: "Trasgender / Non-binary" },
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
              id="gender"
              selected={selected}
              setSelected={setSelected}
            />
          )
        })}
      </FormContainer>
    </>
  );
}