import React, { useState } from 'react'
import { useFormContext, Controller } from "react-hook-form";
import { useCallback } from 'react';
import Dropzone from 'react-dropzone'
import Webcam from 'react-webcam'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CameraIcon } from '@heroicons/react/24/outline'

const videoConstraints = {
  width: 320,
  height: 320,
  facingMode: 'user',
}

interface FileData {
  fileUrl: string | null;
  fileName: string | null;
}

type FormFileDrop = {
  setFileData: (data: any) => void;
  fileData: FileData;
  fieldName: string;
  setSelected?: (data: any) => void
};

export default function StepFourteen({ setFileData, fileData, fieldName, setSelected }: FormFileDrop) {
  const { setValue, control } = useFormContext();
  const [openCam, setOpenCam] = useState(false)
 
  const webcamRef = React.useRef(null)

  const capture = useCallback(() => {
    /* @ts-ignore */
    const pictureSrc = webcamRef.current.getScreenshot();
    console.log({pictureSrc})
    setFileData({ fileName: "Screenshot", fileUrl: pictureSrc });
    setValue(fieldName, { fileName: "Screenshot", fileUrl: pictureSrc })
    setOpenCam(false)
  }, [webcamRef]);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;
  
    file.onload = function() {
      setFileData({
        /* @ts-ignore */
        fileUrl: file.result,
        fileName: acceptedFiles[0]?.name,
      });
      setValue(fieldName, { fileName: acceptedFiles[0]?.name, fileUrl: file.result })
    }
    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const undoPhoto = () => {
    setFileData(null);
    setValue(fieldName, null)
    setSelected && setSelected("no")
  }
  const fileUrl = fileData && fileData.fileUrl
  const fileName = fileData && fileData.fileName
  const baseButtonStyles = "cursor-pointer transition px-4 py-3 border-dashed border-[1px] rounded-full text-gray-800 flex justify-between items-center hover:bg-blue-500 hover:bg-opacity-5"
  const innerButtonStyles = "rounded-full border-[1px] border-solid border-main-light-blue text-main-light-blue text-center font-semibold px-12 bg-white"

  return (
    <>
      {openCam ? (
        <div className="relative max-w-[320px] mx-auto rounded-xl overflow-hidden mb-10">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        </div>
      ) : (
        fileUrl ?
          <div className="relative max-w-[320px] mx-auto">
            <button className="absolute top-[-12px] right-[-12px] w-10 bg-main-black text-white rounded-full p-1" onClick={undoPhoto}>
              <XMarkIcon />
            </button>
            <div className="rounded-xl overflow-hidden mb-10">
              <img src={fileUrl} alt="preview" />
            </div>
          </div> : null
      )}
      {openCam ?
        <div className="flex gap-4">
          <button 
            onClick={(e) => {
            e.preventDefault()
            capture()
            }}
            className={`${innerButtonStyles} w-1/2 py-3 hover:bg-blue-500 hover:bg-opacity-5`}
          >
            Capture
          </button>
          <button onClick={()=> setOpenCam(false)} className={`${innerButtonStyles} w-1/2 py-3 hover:bg-blue-500 hover:bg-opacity-5`}>Cancel</button>
        </div>
      :
      <>
        <Controller
          control={control}
          name={fieldName}
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
                    id={fieldName}
                    {...getInputProps()}
                  />
                  <div className={`${isDragActive || fileName ? "border-main-light-blue bg-blue-500 bg-opacity-5" : "border-main-black"} ${baseButtonStyles} mb-4`}>
                    {isDragActive ?
                    <p>Drop the files here ...</p>
                      
                      : !fileName  ?
                        <p>Drop the files or</p>
                      : 
                      <p>{fileName}</p>
                      
                    }
                    <div className={`${innerButtonStyles} w-1/3 py-3`}>Upload</div>
                  </div>
                </div>
              )}
            </Dropzone>
          )}
        />
          <div 
            onClick={() =>setOpenCam(true)}
            className={`border-main-black ${baseButtonStyles}`}
          >
              Use your webcam
              <div className={`${innerButtonStyles} w-1/2 flex justify-center`}>
                <CameraIcon className="w-8 py-2" />
              </div>
          </div>
        </>
      }
    </>
  )
}