import { useFormContext, Controller } from "react-hook-form";
import { useCallback } from 'react';
import Dropzone from 'react-dropzone'

type FormFileDrop = {
  setFile: (file: any) => void;
}
export default function StepFourteen({ setFile }: FormFileDrop) {
  const { setValue, control } = useFormContext();

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
            <div {...getRootProps()}>
              <input
                id="picture"
                {...getInputProps()}
              />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop some files here, or click to select files</p>
              }
            </div>
          )}
        </Dropzone>
      )}
    />
  )
}