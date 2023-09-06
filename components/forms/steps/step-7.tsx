import { useEffect, useState } from "react";
import FormHeader from "../form-header";
import FormInput from "../form-input";
import FormSelectorButton from "../form-selector-button";
import { useFormContext } from "react-hook-form";
import { useFormStore } from 'store/useFormStore';

export default function StepSeven() {
  const [selected, setSelected] = useState("");
  const { setValue, formState: { errors } } = useFormContext();
  const { formStore } = useFormStore();

  useEffect(() => {
    if (!selected && formStore.medications) {
      setSelected(formStore.medications);
    }
  }, [formStore.medications]);

  const customValidate = () => {
    setValue("medications", "none")
  }

  const customValidateNone = () => {
    setSelected("none")
    setValue("medications", "none")
  }

  return (
    <>
      <FormHeader
        title={"Do you take any medication, vitamins, herbals, or supplements?"}
        subtitle="Please enter all medications you currently take, including any and all medications containing Nitroglycerine as well as vitamins, herbals, and supplements. Also, please provide any additional details you may wish about any events, conditions, or symptoms."
      />
      <div className="max-w-[602px] mx-auto">
        <FormInput
          id="medications"
          type="text"
          large
          setSelected={setSelected}
          placeholder="Enter your answer here"
          defaultValue={formStore.medications} 
          customValidate={customValidate}
        />
        <FormSelectorButton
          label="I don't take any medication, vitamins, or supplements"
          value="none"
          groupId="medications"
          selected={selected}
          setSelected={setSelected}
          customValidate={customValidateNone}
        />
        {!selected && !!errors.medications && <p className="text-red-500 text-sm text-center">Please select one</p>}
      </div>
    </>
  );
}