import { useEffect, useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";
import FormFileDrop from "../form-file-drop";
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function StepFourteen() {
  const { formStore } = useFormStore();
  const { formState: { errors }  } = useFormContext();
  const [fileDataURL, setFileDataURL] = useState<string | null>(null);

  useEffect(() => {
    if (!fileDataURL) {
      setFileDataURL(formStore.picture)
    }
  }, [formStore.picture]);

  const undoPhoto = () => {
    setFileDataURL(null)
  }

  return (
    <>
      <FormHeader
        title={"Hello, what’s your name"}
        subtitle="Enter your name exactly as it appears on your ID. You will upload ID later."
      />
      <FormContainer>
        {fileDataURL ?
          <div className="relative max-w-[320px] mx-auto">
            <button className="absolute top-[-12px] right-[-12px] w-10 bg-main-black text-white rounded-full p-1" onClick={undoPhoto}>
              <XMarkIcon />
            </button>
            <div className="rounded-xl overflow-hidden mb-10">
              <img src={fileDataURL} alt="preview" />
            </div>
          </div> : null}
        <FormFileDrop setFile={setFileDataURL} currentFile={fileDataURL} />
        {!!errors.picture && <p className="text-red-500 text-sm text-center">Please select an image</p>}
      </FormContainer>
    </>
  );
}