import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormInput from "../form-input";
import { useFormStore } from 'store/useFormStore';

export default function StepOne() {
  const { formStore } = useFormStore();
  return (
    <>
      <FormHeader
        title={"Hello, what’s your name"}
        subtitle="Enter your name exactly as it appears on your ID. You will upload ID later."
      />
      <FormContainer>
        <FormInput
          label="First Name*"
          id="firstName"
          type="text"
          defaultValue={formStore.firstName} 
        />
        <FormInput
          label="Last Name*"
          id="lastName"
          type="text"
          defaultValue={formStore.lastName} 
        />
      </FormContainer>
    </>
  );
}