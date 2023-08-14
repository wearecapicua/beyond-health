import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormInput from "../form-input";

type StepOneProps = {

};

export default function StepOne() {
  
  return (
    <>
      <FormHeader
        title={"Hello, what’s your name"}
        subtitle="Enter your name exactly as it appears on your ID. You will upload ID later."
      />
      <FormContainer>
        <FormInput
          label="First Name*"
          type="text"
          id="firstName"
        />
        <FormInput
          label="Last Name*"
          id="lastName"
          type="text"
        />
      </FormContainer>
    </>
  );
}