import FormHeader from "./form-header";
import FormInput from "./form-input";

type StepOneProps = {
 
};

export default function StepOne({ 
}: StepOneProps) {

  return (
    <>
      <FormHeader
        title={"Hello, what’s your name"}
        subtitle="Enter your name exactly as it appears on your ID. You will upload ID later."
      />
      <div className="max-w-screen-sm mx-auto mt-2 px-3">
        <FormInput
          label="First Name"
          name="firstName"
          type="text"
        />
        <FormInput
          label="Last Name"
          name="lastName"
          type="text"
        />
      </div>
    </>
  );
}