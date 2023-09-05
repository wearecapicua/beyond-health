import { useEffect, useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";
import FormFileDrop from "../form-file-drop";
import FormSelectorButton from "../form-selector-button";

interface FileData {
  fileUrl: string | null;
  fileName: string | null;
}

export default function StepSeventeen() {
  const { formStore } = useFormStore();
  const {setValue, formState: { errors }  } = useFormContext();
  const [fileData, setFileData] = useState<FileData>({ fileUrl: null, fileName: null });
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (!fileData?.fileUrl) {
      setFileData({
        fileUrl: formStore.insurance?.fileUrl || null,
        fileName: formStore.insurance?.fileName || null,
      });
      setValue("insurance", {
        fileUrl: formStore.insurance?.fileUrl || null,
        fileName: formStore.insurance?.fileName || null,
      });
    }
    if (formStore.insurance?.fileName) {
      setValue("hasInsurance", "yes")
      setSelected("yes")
    } else {
      setValue("hasInsurance", formStore.hasInsurance)
      setSelected(formStore.hasInsurance)
    }
  }, [formStore.insurance]);

  const customValidateYes = () => {
    setSelected("yes")
    setValue("hasInsurance", "yes")
  }

  const customValidateNo = () => {
    setSelected("no")
    setValue("insurance", null);
    setValue("hasInsurance", "no")
  }

  return (
    <>
      <FormHeader
        title={"Do you have insurance?"}
        subtitle="Telemedicine laws require healthcare practitioners to know who they are treating."
      />
      <FormContainer>
        {selected === "yes" ?
          <>
            <FormFileDrop fieldName="insurance" setFileData={setFileData} fileData={fileData} />
            {!!errors.insurance && !fileData?.fileName && <p className="text-red-500 text-sm text-center pt-4">Please select an image</p>}
          </>
          : null
        }
        <>
          <FormSelectorButton
            label="Yes, I do have insurance"
            value="yes"
            groupId="hasInsurance"
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