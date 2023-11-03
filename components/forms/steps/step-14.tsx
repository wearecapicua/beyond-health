import { useEffect, useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormContext } from "react-hook-form";
import FormFileDrop from "../form-file-drop";
import { useFormStore } from 'store/useFormStore';
import { getProfileImage } from "lib/api/supabase";

interface FileData {
  file: File | null;
  fileUrl: string | null;
  fileName: string | null;
}

export default function StepFourteen() {
  const { formStore } = useFormStore();
  const { formState: { errors }  } = useFormContext();
  const [fileData, setFileData] = useState<FileData>({
    file: null,
    fileUrl: null,
    fileName: null,
  });
  const [profileImage, setProfileImage] = useState<string>();

  useEffect(() => {
    async function getSavedProfileImage() {
      const profileImageSaved = await getProfileImage();
      setProfileImage(profileImageSaved?.signedUrl);
    }

    getSavedProfileImage();

  }, [formStore.picture]);

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
          profileImageSaved={profileImage}
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
