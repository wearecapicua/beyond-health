import { useState } from "react";
import FormHeader from "../form-header";
import FormSelector from "../form-selector";
import { useFormContext } from "react-hook-form";

export default function StepSix() {
  const [selected, setSelected] = useState("");
  const { formState: { errors } } = useFormContext();

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
      <div className="max-w-[730px] mx-auto">
        {texts.map((text, index) => (
          <FormSelector
            key={`option-${index}`}
            label={text}
            value={text}
            groupId="noticeHairLoss"
            selected={selected}
            setSelected={setSelected}
          />
        ))}
        {!!errors.noticeHairLoss && <p className="text-red-500 text-sm text-center">Please select one</p>}
      </div>
    </>
  );
}