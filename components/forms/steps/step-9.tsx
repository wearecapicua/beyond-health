import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormContext } from "react-hook-form";

export default function StepNine() {
  const { register } = useFormContext();

  return (
    <>
      <FormHeader
        title={"If you have any question you would like to ask the healthcare practitioner, please add it below"}
      />
      <FormContainer>
        <textarea
          id="about"
          rows={6}
          className="block w-full rounded-3xl border-0 py-3 px-6 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={'Your answer'}
          {...register("questions")}
        />
      </FormContainer>
    </>
  );
}