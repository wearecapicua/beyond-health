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

export default function StepFourteen() {
  const { formStore } = useFormStore();
  const {setValue, formState: { errors }  } = useFormContext();
  const [fileData, setFileData] = useState<FileData>({ fileUrl: null, fileName: null });
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (!fileData?.fileUrl) {
      setFileData({
        fileUrl: formStore.healthCard?.fileUrl || null,
        fileName: formStore.healthCard?.fileName || null,
      });
      setValue("healthCard", {
        fileUrl: formStore.healthCard?.fileUrl || null,
        fileName: formStore.healthCard?.fileName || null,
      });
    }
    if (formStore.healthCard?.fileName) {
      setValue("hasHealthCard", "yes")
      setSelected("yes")
    } else {
      setValue("hasHealthCard", formStore.hasHealthCard)
      setSelected(formStore.hasHealthCard)
    }
  }, [formStore.healthCard]);

  const customValidateYes = () => {
    setSelected("yes")
    setValue("hasHealthCard", "yes")
  }

  const customValidateNo = () => {
    setSelected("no")
    setValue("healthCard", null);
    setValue("hasHealthCard", "no")
  }

  return (
    <>
      <FormHeader
        title={"Do you have a Provincial Health Card?"}
        subtitle="Telemedicine laws require healthcare practitioners to know who they are treating."
      />
      <FormContainer>
        {selected === "yes" ?
          <>
            <FormFileDrop fieldName="healthCard" setFileData={setFileData} fileData={fileData} />
            {!!errors.healthCard && !fileData?.fileName && <p className="text-red-500 text-sm text-center pt-4">Please select an image</p>}
          </>
          : null
        }
        <>
          <FormSelectorButton
            label="Yes, I do have a Provincial Health Card"
            value="yes"
            groupId="hasHealthCard"
            selected={selected}
            setSelected={setSelected}
            customValidate={customValidateYes}
          />
          <FormSelectorButton
            label="No, I don't have a Provincial Health Card"
            value="no"
            groupId="healthCard"
            selected={selected}
            setSelected={setSelected}
            customValidate={customValidateNo}
          />
          {!!errors.healthCard && !fileData && <p className="text-red-500 text-sm text-center pt-4">Please select one</p>}
        </> 
      </FormContainer>
    </>
  );
}