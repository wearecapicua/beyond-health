import { useState } from "react";
import FormContainer from "./form-container";
import FormHeader from "./form-header";
import FormSelectorButton from "./form-selector-button";

export default function StepOne() {
  const [selected, setSelected] = useState(false);


  return (
    <>
      <FormHeader
        title={"What’s your gender?"}
        subtitle="We know these options aren't comprehensive, but this is for hormonal purposes."
      />
      <FormContainer>
        <FormSelectorButton
          text="Male"
          selected={selected}
          setSelected={setSelected}
        />
        <FormSelectorButton
          text="Female"
          selected={selected}
          setSelected={setSelected}
        />
        <FormSelectorButton
          text="Trasgender / Non-binary"
          selected={selected}
          setSelected={setSelected}
        />
      </FormContainer>
    </>
  );
}