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
  const {setValue, formState: { errors }  } = useFormContext();
  const [fileData, setFileData] = useState<FileData>({ fileUrl: null, fileName: null });

  useEffect(() => {
    if (!fileData.fileUrl) {
      setFileData({
        fileUrl: formStore.healthCard?.fileUrl || null,
        fileName: formStore.healthCard?.fileName || null,
      });
      setValue("healthCard", {
        fileUrl: formStore.healthCard?.fileUrl || null,
        fileName: formStore.healthCard?.fileName || null,
      });
    }
  }, [formStore.healthCard]);

  return (
    <>
      <FormHeader
        title={"Do you have a Provincial Health Card?"}
        subtitle="Telemedicine laws require healthcare practitioners to know who they are treating."
      />
      <FormContainer>
        <FormFileDrop fieldName="healthCard" setFileData={setFileData} fileData={fileData} />
        {!!errors.healthCard && !fileData ? <p className="text-red-500 text-sm text-center pt-4">Please select an image</p> : null}
      </FormContainer>
    </>
  );
}