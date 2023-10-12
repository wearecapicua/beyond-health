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
        fileUrl: formStore.photo_id?.fileUrl || null,
        fileName: formStore.photo_id?.fileName || null,
      });
      setValue("photo_id", {
        fileUrl: formStore.photo_id?.fileUrl || null,
        fileName: formStore.photo_id?.fileName || null,
      });
    }
  }, [formStore.photo_id]);

  return (
    <>
      <FormHeader
        title={"Now upload your photo ID"}
        subtitle="Telemedicine laws require healthcare practitioners to know who they are treating."
      />
      <FormContainer>
        <FormFileDrop fieldName="photo_id" setFileData={setFileData} fileData={fileData} />
        {!!errors.photo_id && !fileData?.fileUrl ? <p className="text-red-500 text-sm text-center pt-4">Please select an image</p> : null}
      </FormContainer>
    </>
  );
}