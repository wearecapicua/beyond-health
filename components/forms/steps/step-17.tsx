import { useEffect, useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";
import FormFileDrop from "../form-file-drop";
import FormSelectorButton from "../form-selector-button";
import { getInsuranceImage } from "lib/api/supabase";

interface FileData {
  file: File | null;
  fileUrl: string | null;
  fileName: string | null;
}

export default function StepSeventeen() {
  const { formStore } = useFormStore();
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
      setValue("has_insurance", true)
      setSelected("yes")
    } else {
      setValue("has_insurance", formStore.has_insurance)
      setSelected(formStore.has_insurance || null)
    }
  }, [formStore.insurance, formStore.insurance_image_url]);

  const customValidateYes = () => {
    setSelected("yes")
    setValue("has_insurance", true)
  }

  const customValidateNo = () => {
    setSelected("no")
    setValue("insurance", null);
    setValue("has_insurance", false)
  }

  return (
    <>
      <FormHeader
        title={"Do you have insurance?"}
        subtitle="Telemedicine laws require healthcare practitioners to know who they are treating."
      />
      <FormContainer>
        {selected ?
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
            selected={selected ? "yes" : ""}
            setSelected={setSelected}
            customValidate={customValidateYes}
          />
          <FormSelectorButton
            label="No, I don't have insurance"
            value="no"
            groupId="insurance"
            selected={!selected && selected !== null ? "no" : ""}
            setSelected={setSelected}
            customValidate={customValidateNo}
          />
          {!!errors.insurance && !fileData && <p className="text-red-500 text-sm text-center pt-4">Please select one</p>}
        </> 
      </FormContainer>
    </>
  );
}