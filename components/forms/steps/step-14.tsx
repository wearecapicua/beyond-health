import { useEffect, useState } from "react";
import FormContainer from "../form-container";
import FormHeader from "../form-header";
import { useFormStore } from 'store/useFormStore';
import { useFormContext, Controller } from "react-hook-form";


const imageMimeType = /image\/(png|jpg|jpeg)/i;

export default function StepFourteen() {
  const { formStore } = useFormStore();
  const { control, setValue, formState: { errors }  } = useFormContext();
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file)
      
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  }, [file]);

  return (
    <>
      <FormHeader
        title={"Hello, what’s your name"}
        subtitle="Enter your name exactly as it appears on your ID. You will upload ID later."
      />
      <FormContainer>
      {fileDataURL ?
        <p className="img-preview-wrapper">
          {
            <img src={fileDataURL} alt="preview" />
          }
        </p> : null}
      <Controller
            control={control}
            name={"picture"}
            rules={{ required: "Recipe picture is required" }}
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <input
                  {...field}
                  value={value?.fileName}
                  onChange={(event) => {
                    onChange(event.target.files[0]);
                    console.log("ee", event.target.files)
                    const file = event.target.files[0];
                    if (!file.type.match(imageMimeType)) {
                      alert("Image mime type is not valid");
                      return;
                    }
                    setFile(file);
                  }}
                  type="file"
                  id="picture"
                />
              );
            }}
          />
      </FormContainer>
    </>
  );
}