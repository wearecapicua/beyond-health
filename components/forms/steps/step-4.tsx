import { useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormSelectorButton from "../form-selector-button";

export default function StepFour() {
  const [selected, setSelected] = useState("");

  return (
    <>
      <FormHeader
        title={"Where do you live?"}
      />
      <FormContainer>
        <FormSelectorButton
          text="Canada"
          selected={selected}
          setSelected={setSelected}
        />
        <FormSelectorButton
          text="Another Country"
          selected={selected}
          setSelected={setSelected}
        />
      </FormContainer>
    </>
  );
}