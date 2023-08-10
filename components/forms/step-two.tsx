import FormHeader from "./form-header";

type StepOneProps = {
 
};

export default function StepOne({
}: StepOneProps) {
  return (
    <>
      <FormHeader title={"What’s your gender?"} subtitle="We know these options aren't comprehensive, but this is for hormonal purposes."/>
    </>
  );
}