import { useEffect, useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";
import FormFileDrop from "../form-file-drop";

export default function StepFifteen() {
  const { formStore } = useFormStore();
  const { formState: { errors }  } = useFormContext();
  const [fileDataURL, setFileDataURL] = useState<string | null>(null);

  useEffect(() => {
    if (!fileDataURL) {
      setFileDataURL(formStore.picture)
    }
  }, [formStore.picture]);

  return (
    <>
      <FormHeader
        title={"Now upload your photo ID"}
        subtitle="Telemedicine laws require healthcare practitioners to know who they are treating."
      />
      <FormContainer>
        <FormFileDrop setFile={setFileDataURL} currentFile={fileDataURL} />
        {!!errors.picture && !fileDataURL ? <p className="text-red-500 text-sm text-center pt-4">Please select an image</p> : null}
      </FormContainer>
    </>
  );
}