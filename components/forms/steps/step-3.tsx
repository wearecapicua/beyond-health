import { useState, useEffect } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import DatePicker from "./form-date-picker";
import { useFormContext } from "react-hook-form";
import { useFormStore } from 'store/useFormStore';
import FormErrors from "../form-errors";

export default function StepThree() {
  const [fullDate, setFullDate] = useState('');
  const { setValue, formState: { errors }} = useFormContext();
  const { formStore } = useFormStore();

  useEffect(() => {
    if (!fullDate && formStore.birthdate) {
      setFullDate(formStore.birthdate);
      setValue("birthdate", formStore.birthdate)
    }
  }, [formStore.birthdate]);

  return (
    <>
      <FormHeader
        title={"What’s your date of birth?"}
        subtitle="For some prescription must be 18 years or older"
      />
      <FormContainer>
        <DatePicker setValue={setValue} defaultDate={formStore.birthdate} setFullDate={setFullDate} />
        <div className="flex justify-center">
          <FormErrors errors={errors} id="birthdate" text="Birthdate required" />
        </div>
      </FormContainer>
    </>
  );
}