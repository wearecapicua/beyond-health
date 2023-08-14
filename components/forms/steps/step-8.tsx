import { useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormInput from "../form-input";
import FormSelectorButton from "../form-selector-button";

export default function StepEight() {
  const [selected, setSelected] = useState("");

  return (
    <>
      <FormHeader
        title={"Do you have any medical conditions?"}
        subtitle="Please enter any and all medical conditions below"
      />
      <FormContainer>
        <FormInput
          name="medications"
          type="text"
          setSelected={setSelected}
          placeholder="Enter your answer here"
        />
        <FormSelectorButton
          text="I don't have any medical conditions"
          selected={selected}
          setSelected={setSelected}
        />
      </FormContainer>
    </>
  );
}