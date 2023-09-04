import { useEffect, useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";
import FormFileDrop from "../form-file-drop";

interface FileData {
  fileUrl: string | null;
  fileName: string | null;
}

export default function StepFourteen() {
  const { formStore } = useFormStore();
  const { setValue, formState: { errors }  } = useFormContext();
  const [fileData, setFileData] = useState<FileData>({ fileUrl: null, fileName: null });

  useEffect(() => {
    if (!fileData.fileUrl) {
      setFileData({
        fileUrl: formStore.insurance?.fileUrl || null,
        fileName: formStore.insurance?.fileName || null,
      });
      setValue("insurance", {
        fileUrl: formStore.insurance?.fileUrl || null,
        fileName: formStore.insurance?.fileName || null,
      });
    }
  }, [formStore.insurance]);

  return (
    <>
      <FormHeader
        title={"Do you want to upload insurance?"}
        subtitle="We'll send your insurance info to the pharmacy and if you are covered, they will deduct the coverage amount from your medication cost. We recommend you check with your insurance to confirm your coverage."
      />
      <FormContainer>
        <FormFileDrop fieldName="insurance" setFileData={setFileData} fileData={fileData} />
        {!!errors.insurance && !fileData ? <p className="text-red-500 text-sm text-center pt-4">Please select an image</p> : null}
      </FormContainer>
    </>
  );
}