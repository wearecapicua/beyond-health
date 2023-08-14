import { useState } from "react";
import FormHeader from "../form-header";
import FormSelector from "../form-selector";

export default function StepSix() {
  const [selected, setSelected] = useState("");

  const texts = [
    "No, but i would like to prevent it",
    "Yes, in the last month",
    "Yes, in the last 6 months",
    "Yes, in the last 6 months to a year",
    "Yes, for longer than a year"
  ]

  return (
    <>
      <FormHeader
        title={"Have you noticed thinning, recession, or other types of hair loss on your head?"}
      />
        {texts.map((text, index) => (
          <FormSelector
            key={`text-${index}`}
            text={text}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
    </>
  );
}