import { useEffect, useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";
import FormFileDrop from "../form-file-drop";
import { getIdImage } from "lib/api/supabase";

interface FileData {
  file: File | null;
  fileUrl: string | null;
  fileName: string | null;
}

export default function StepFifteen() {
  const { formStore } = useFormStore();
  const { formState: { errors }  } = useFormContext();
  const [fileData, setFileData] = useState<FileData>({ 
    file: null,
    fileUrl: null, 
    fileName: null 
  });
  const [photoId, setPhotoId] = useState<string>();

  useEffect(() => {
    async function getSavedPhotoId() {
      const photoIdSaved = await getIdImage();
      setPhotoId(photoIdSaved?.signedUrl);
    }

    getSavedPhotoId();

  }, [formStore.photo_id, formStore.photo_id_url]);

  return (
    <>
      <FormHeader
        title={"Now upload your photo ID"}
        subtitle="Telemedicine laws require healthcare practitioners to know who they are treating."
      />
      <FormContainer>
        <FormFileDrop 
          fieldName="photo_id" 
          setFileData={setFileData} 
          fileData={fileData} 
          photoIdSaved={photoId}
        />
        {!!errors.photo_id && !fileData?.fileUrl ? <p className="text-red-500 text-sm text-center pt-4">Please select an image</p> : null}
      </FormContainer>
    </>
  );
}