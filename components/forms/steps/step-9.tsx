import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormInput from "../form-input";
import FormSelectorButton from "../form-selector-button";

export default function StepNine() {

  return (
    <>
      <FormHeader
        title={"If you have any question you would like to ask the healthcare practitioner, please add it below"}
      />
      <FormContainer>
        <textarea
          id="about"
          name="about"
          rows={6}
          className="block w-full rounded-3xl border-0 py-3 px-6 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={'Your answer'}
        />
      </FormContainer>
    </>
  );
}