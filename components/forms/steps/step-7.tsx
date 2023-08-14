import { useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormInput from "../form-input";
import FormSelectorButton from "../form-selector-button";

export default function StepSeven() {
  const [selected, setSelected] = useState("");

  return (
    <>
      <FormHeader
        title={"Do you take any medication, vitamins, herbals, or supplements?"}
        subtitle="Please enter all medications you currently take, including any and all medications containing Nitroglycerine as well as vitamins, herbals, and supplements. Also, please provide any additional details you may wish about any events, conditions, or symptoms."
      />
      <FormContainer>
        <FormInput
          name="medications"
          type="text"
          setSelected={setSelected}
          placeholder="Enter your answer here"
        />
        <FormSelectorButton
          text="I don't take any medication, vitamins, or supplements"
          selected={selected}
          setSelected={setSelected}
        />
      </FormContainer>
    </>
  );
}