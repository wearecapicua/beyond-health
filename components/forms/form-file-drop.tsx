import { useFormContext, Controller } from "react-hook-form";
import { useCallback } from 'react';
import Dropzone from 'react-dropzone'

type FormFileDrop = {
  setFile: (file: any) => void;
  currentFile: File;
}
export default function StepFourteen({ setFile, currentFile }: FormFileDrop) {
  const { setValue, control } = useFormContext();
  console.log({currentFile})

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;
  
    file.onload = function() {
      setFile(file.result);
      setValue("picture", file.result)
    }
  
    file.readAsDataURL(acceptedFiles[0])
  }, [])

  return (
    <Controller
      control={control}
      name="picture"
      rules={{
        required: 'This field is required',
      }}
      render={() => (
        <Dropzone onDrop={onDrop} accept={{"image/jpeg":[], "image/png":[]}}>
          {({
            getRootProps,
            getInputProps,
            isDragActive,
          }) => (
            <div {...getRootProps()} >
              <input
                id="picture"
                {...getInputProps()}
              />
              <div className={`${isDragActive || currentFile ? "border-main-light-blue bg-blue-500 bg-opacity-5" : "border-main-black"} px-4 py-3 border-dashed border-[1px] rounded-full text-gray-800 flex justify-between items-center`}>
                {
                  isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drop files here or </p>
                }
                <div className="rounded-full border-[1px] border-solid border-main-light-blue text-main-light-blue text-center font-semibold px-12 py-3 w-1/3 bg-white">Upload</div>
              </div>
            </div>
          )}
        </Dropzone>
      )}
    />
  )
}