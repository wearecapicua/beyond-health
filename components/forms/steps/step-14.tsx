import { useEffect, useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";
import FormFileDrop from "../form-file-drop";


export default function StepFourteen() {
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
        title={"Hello, what’s your name"}
        subtitle="Enter your name exactly as it appears on your ID. You will upload ID later."
      />
      <FormContainer>
        
        <FormFileDrop setFile={setFileDataURL} currentFile={fileDataURL} />
        {!!errors.picture && <p className="text-red-500 text-sm text-center">Please select an image</p>}
      </FormContainer>
    </>
  );
}