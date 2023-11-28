import { useEffect, useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";
import FormFileDrop from "../form-file-drop";
import FormSelectorButton from "../form-selector-button";
import { getInsuranceImage } from "lib/api/supabase";
import { deleteImage, sendUpdatedData } from "lib/api/supabase";

interface FileData {
  file: File | null;
  fileUrl: string | null;
  fileName: string | null;
}

export default function StepSeventeen() {
  const { formStore, updateFormStore } = useFormStore();
  const {setValue, formState: { errors }  } = useFormContext();
  const [fileData, setFileData] = useState<FileData>({
    file: null,
    fileUrl: null, 
    fileName: null 
  });
  const [selected, setSelected] = useState("");
  const [insuranceImage, setInsuranceImage] = useState<string>();

  useEffect(() => {
    async function getSavedInsuranceImage() {
      const insuranceImageSaved = await getInsuranceImage();
      setInsuranceImage(insuranceImageSaved?.signedUrl);
    }

    getSavedInsuranceImage();
    
    if (formStore.insurance_image_url) {
      setValue("has_insurance", true);
      setSelected("yes")
    } 

    if (!formStore.has_insurance) {
      setValue("has_insurance", false);
      setSelected("no")
    } 
  }, [formStore.insurance, formStore.insurance_image_url]);

  const customValidateYes = () => {
    setSelected("yes")
    updateFormStore({ has_insurance: true });
  }

  const customValidateNo = async () => {
    setSelected("no");
    if (insuranceImage) {
      updateFormStore({ insurance_image_url: null, insurance: null, has_insurance: false });
      await sendUpdatedData({ insurance_image_url: null });
      await deleteImage(insuranceImage);
    } else {
      updateFormStore({ has_insurance: false });
    }
  }

  return (
    <>
      <FormHeader
        title={"Do you have insurance?"}
        subtitle="Telemedicine laws require healthcare practitioners to know who they are treating."
      />
      <FormContainer>
        {selected === 'yes' ?
          <>
            <FormFileDrop 
              fieldName="insurance" 
              setFileData={setFileData} 
              fileData={fileData} 
              insuranceImageSaved={insuranceImage}
            />
            {!!errors.insurance && !fileData?.fileName && <p className="text-red-500 text-sm text-center pt-4">Please select an image</p>}
          </>
          : null
        }
        <>
          <FormSelectorButton
            label="Yes, I do have insurance"
            value="yes"
            groupId="has_insurance"
            selected={selected}
            setSelected={setSelected}
            customValidate={customValidateYes}
          />
          <FormSelectorButton
            label="No, I don't have insurance"
            value="no"
            groupId="insurance"
            selected={selected}
            setSelected={setSelected}
            customValidate={customValidateNo}
          />
          {!!errors.insurance && !fileData && <p className="text-red-500 text-sm text-center pt-4">Please select one</p>}
        </> 
      </FormContainer>
    </>
  );
}