import { useEffect, useState } from "react";
import FormHeader from "../form-header";
import FormInput from "../form-input";
import FormSelectorButton from "../form-selector-button";
import { useFormContext } from "react-hook-form";
import { useFormStore } from 'store/useFormStore';

export default function StepEight() {
  const [selected, setSelected] = useState("");
  const { setValue, formState: { errors } } = useFormContext();
  const { formStore } = useFormStore();

  useEffect(() => {
    if (!selected && formStore.conditions) {
      setSelected(formStore.conditions);
    }
  }, [formStore.conditions]);

  const customValidate = () => {
    setSelected(formStore.conditions)
    setValue("conditions", "none")
  }

  return (
    <>
      <FormHeader
        title={"Do you have any medical conditions?"}
        subtitle="Please enter any and all medical conditions below"
      />
      <div className="max-w-[602px] mx-auto">
        <FormInput
          id="conditions"
          type="text"
          large
          setSelected={setSelected}
          placeholder="Enter your answer here"
          defaultValue={formStore.conditions} 
          customValidate={customValidate}
        />
        <FormSelectorButton
          label="I don't have any medical conditions"
          value="none"
          groupId="conditions"
          selected={selected}
          setSelected={setSelected}
          customValidate={customValidate}
        />
        {!selected && !!errors.conditions && <p className="text-red-500 text-sm text-center">Please select one</p>}
      </div>
    </>
  );
}