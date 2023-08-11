import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormInput from "../form-input";

export default function StepOne() {

  return (
    <>
      <FormHeader
        title={"What is your phone number?"}
        subtitle="We may need to reach you to confirm details"
      />
      <FormContainer>
        <FormInput
          label="Phone Number*"
          name="phoneNumber"
          type="text"
        />
      </FormContainer>
    </>
  );
}