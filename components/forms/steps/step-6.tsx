import { useState } from "react";
import FormHeader from "../form-header";
import FormSelector from "../form-selector";

export default function StepOne() {
  const [selected, setSelected] = useState("");

  return (
    <>
      <FormHeader
        title={"Have you noticed thinning, recession, or other types of hair loss on your head?"}
      />
        <FormSelector
          text="No, but i would like to prevent it"
          selected={selected}
          setSelected={setSelected}
        />
        <FormSelector
          text="Yes, in the last month"
          selected={selected}
          setSelected={setSelected}
        />
        <FormSelector
          text="Yes, in the last 6 months"
          selected={selected}
          setSelected={setSelected}
        />
        <FormSelector
          text="Yes, in the last 6 months to a year"
          selected={selected}
          setSelected={setSelected}
        />
        <FormSelector
          text="Yes, for longer than a year"
          selected={selected}
          setSelected={setSelected}
        />
    </>
  );
}