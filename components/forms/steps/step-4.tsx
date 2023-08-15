import { useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormSelectorButton from "../form-selector-button";

export default function StepFour() {
  const [selected, setSelected] = useState("");

  const radioButtonOptions = [
    { value: "canada", label: "Canada" },
    { value: "anotherCountry", label: "Another Country" },
  ];

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
              groupId="residence"
              selected={selected}
              setSelected={setSelected}
            />
          )
        })}
      </FormContainer>
    </>
  );
}