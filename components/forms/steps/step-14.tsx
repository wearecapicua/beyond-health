import { useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormContext } from "react-hook-form";
import FormFileDrop from "../form-file-drop";

interface FileData {
  fileUrl: string | null;
  fileName: string | null;
}

export default function StepFourteen() {
  const {
    formState: { errors },
  } = useFormContext();
  const [fileData, setFileData] = useState<FileData>({
    fileUrl: null,
    fileName: null,
  });

  return (
    <>
      <FormHeader
        title={"Upload a picture of yourself."}
        subtitle="Telemedicine laws require healthcare practitioners to know who they are treating."
      />
      <FormContainer>
        <FormFileDrop
          fieldName="picture"
          setFileData={setFileData}
          fileData={fileData}
        />
        {!!errors.picture && !fileData?.fileUrl ? (
          <p className="text-red-500 text-sm text-center pt-4">
            Please select an image
          </p>
        ) : null}
      </FormContainer>
    </>
  );
}
