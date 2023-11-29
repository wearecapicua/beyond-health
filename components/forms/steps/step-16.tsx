import { useEffect, useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";
import FormFileDrop from "../form-file-drop";
import FormSelectorButton from "../form-selector-button";
import { getHealthCardImage } from "lib/api/supabase";
import { deleteImage, sendUpdatedData } from "lib/api/supabase";

interface FileData {
  file: File | null;
  fileUrl: string | null;
  fileName: string | null;
}

export default function StepSixteen() {
  const { formStore, updateFormStore } = useFormStore();
  const {setValue, formState: { errors }  } = useFormContext();
  const [fileData, setFileData] = useState<FileData>({
    file: null,
    fileUrl: null, 
    fileName: null 
  });
  const [selected, setSelected] = useState("");
  const [healthCardImage, setHealthCardImage] = useState<string>();

  useEffect(() => {
    async function getSavedHealthCardImage() {
      const healthCardImageSaved = await getHealthCardImage();
      setHealthCardImage(healthCardImageSaved?.signedUrl);
    }

    getSavedHealthCardImage();
    
    if (formStore.health_card_image_url) {
      setValue("has_health_card", true);
      setSelected("yes")
    }

    if (formStore.has_health_card && !formStore.health_card_image_url) {
      updateFormStore({ has_health_card: null });
    }
    
    if (formStore.has_health_card === false) {
      setValue("has_health_card", false);
      setSelected("no")
    }
    
  }, [formStore.health_card, formStore.health_card_image_url]);

  const customValidateYes = () => {
    setSelected("yes")
    updateFormStore({ has_health_card: true});
  }

  const customValidateNo = async () => {
    setSelected("no")
    if (healthCardImage) {
      updateFormStore({ health_card_image_url: null, health_card: null, has_health_card: false });
      await sendUpdatedData({ health_card_image_url: null });
      await deleteImage(healthCardImage);
    } else {
      updateFormStore({ has_health_card: false, health_card: null});
    }
  }

  return (
    <>
      <FormHeader
        title={"Do you have a Provincial Health Card?"}
        subtitle="Telemedicine laws require healthcare practitioners to know who they are treating."
      />
      <FormContainer>
        {selected === 'yes' ?
          <>
            <FormFileDrop 
              fieldName="health_card" 
              setFileData={setFileData} 
              fileData={fileData}
              healthCardImageSaved={healthCardImage} 
            />
            {!!errors.health_card && !fileData?.fileName && <p className="text-red-500 text-sm text-center pt-4">Please select an image</p>}
          </>
          : null
        }
        <>
          <FormSelectorButton
            label="Yes, I do have a Provincial Health Card"
            value="yes"
            groupId="has_health_card"
            selected={selected}
            setSelected={setSelected}
            customValidate={customValidateYes}
          />
          <FormSelectorButton
            label="No, I don't have a Provincial Health Card"
            value="no"
            groupId="health_card"
            selected={selected}
            setSelected={setSelected}
            customValidate={customValidateNo}
          />
          {!!errors.health_card && !fileData && <p className="text-red-500 text-sm text-center pt-4">Please select one</p>}
        </> 
      </FormContainer>
    </>
  );
}