import React, { useCallback, useState } from 'react'

import { CameraIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { deleteImage, sendUpdatedData } from 'lib/api/supabase'
import dataURLtoFile from 'lib/dataURLtoFile'
import Dropzone from 'react-dropzone'
import { Controller, useFormContext } from 'react-hook-form'
import Webcam from 'react-webcam'
import useFormStore from 'store/useFormStore'

const videoConstraints = {
	width: 320,
	height: 320,
	facingMode: 'user'
}

interface FileData {
	file: File | null
	fileUrl: string | null
	fileName: string | null
}

type FormFileDropType = {
	setFileData: (data: any) => void
	fileData: FileData
	fieldName: string
	profileImageSaved?: string | undefined
	photoIdSaved?: string | undefined
	healthCardImageSaved?: string | undefined
	insuranceImageSaved?: string | undefined
}

const FormFileDrop = ({
	fieldName,
	fileData,
	setFileData,
	profileImageSaved,
	photoIdSaved,
	healthCardImageSaved,
	insuranceImageSaved
}: FormFileDropType) => {
	const { setValue, control } = useFormContext()
	const { updateFormStore } = useFormStore()
	const [openCam, setOpenCam] = useState(false)

	const webcamRef = React.useRef<Webcam>(null)

	const deleteSavedImage = async () => {
		if (profileImageSaved) {
			updateFormStore({ profile_image_url: null, picture: null })
			await sendUpdatedData({ profile_image_url: null })
			await deleteImage(profileImageSaved)
		}
		if (photoIdSaved) {
			updateFormStore({ photo_id_url: null, photo_id: null })
			await sendUpdatedData({ photo_id_url: null })
			await deleteImage(photoIdSaved)
		}
		if (healthCardImageSaved) {
			updateFormStore({ health_card_image_url: null, health_card: null })
			await sendUpdatedData({ health_card_image_url: null })
			await deleteImage(healthCardImageSaved)
		}
		if (insuranceImageSaved) {
			updateFormStore({ insurance_image_url: null, insurance: null })
			await sendUpdatedData({ insurance_image_url: null })
			await deleteImage(insuranceImageSaved)
		}
	}

	const capture = useCallback(async () => {
		const pictureSrc = webcamRef.current?.getScreenshot()
		if (!pictureSrc) {
			console.error('Error capturing image')

			return
		}
		setFileData({
			fileUrl: pictureSrc,
			fileName: `${fieldName}-screenshot.jpg`,
			file: dataURLtoFile(pictureSrc, `${fieldName}.jpg`)
		})

		setValue(fieldName, {
			file: dataURLtoFile(pictureSrc, `${fieldName}.jpg`),
			fileName: `${fieldName}-screenshot.jpg`,
			fileUrl: pictureSrc
		})
		setOpenCam(false)
		await deleteSavedImage()
	}, [webcamRef, profileImageSaved, photoIdSaved, healthCardImageSaved, insuranceImageSaved])

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const fileUrl = URL.createObjectURL(acceptedFiles[0])
			setFileData({
				file: acceptedFiles[0],
				fileName: acceptedFiles[0].name,
				fileUrl
			})
			setValue(fieldName, {
				file: acceptedFiles[0],

				fileName: (acceptedFiles[0] as unknown as { path: string }).path,
				fileUrl
			})
			await deleteSavedImage()
		},
		[profileImageSaved, photoIdSaved, healthCardImageSaved, insuranceImageSaved]
	)

	const undoPhoto = async () => {
		setValue(fieldName, null)
		setFileData(null)
		await deleteSavedImage()
	}

	const fileUrl = fileData?.fileUrl
	const fileName = fileData?.fileName

	const baseButtonStyles =
		'cursor-pointer transition px-4 py-3 border-dashed border-[1px] rounded-full text-gray-800 flex justify-between gap-2 items-center hover:bg-blue-500 hover:bg-opacity-5'
	const innerButtonStyles =
		'rounded-full border-[1px] border-solid border-main-light-blue text-main-light-blue text-center font-semibold px-3 sm:px-12 bg-white'

	return (
		<>
			{openCam ? (
				<div className="relative mx-auto mb-10 max-w-[320px] overflow-hidden rounded-xl">
					<Webcam
						audio={false}
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						videoConstraints={videoConstraints}
					/>
				</div>
			) : fileUrl || profileImageSaved || photoIdSaved || healthCardImageSaved || insuranceImageSaved ? (
				<div className="relative mx-auto max-w-[320px]">
					<button
						className="absolute right-[-12px] top-[-12px] w-10 rounded-full bg-main-black p-1 text-white"
						onClick={undoPhoto}>
						<XMarkIcon />
					</button>
					<div className="mb-10 overflow-hidden rounded-xl">
						<img
							src={
								fileUrl ||
								profileImageSaved ||
								photoIdSaved ||
								healthCardImageSaved ||
								insuranceImageSaved
							}
							alt="preview"
						/>
					</div>
				</div>
			) : null}
			{openCam ? (
				<div className="flex gap-4">
					<button
						onClick={(e) => {
							e.preventDefault()
							capture()
						}}
						className={`${innerButtonStyles} w-1/2 py-3 hover:bg-blue-500 hover:bg-opacity-5`}>
						Capture
					</button>
					<button
						onClick={() => setOpenCam(false)}
						className={`${innerButtonStyles} w-1/2 py-3 hover:bg-blue-500 hover:bg-opacity-5`}>
						Cancel
					</button>
				</div>
			) : (
				<>
					<Controller
						control={control}
						name={fieldName}
						rules={{
							required: 'This field is required'
						}}
						render={() => (
							<Dropzone onDrop={onDrop} accept={{ 'image/jpeg': [], 'image/png': [] }}>
								{({ getRootProps, getInputProps, isDragActive }) => (
									<div {...getRootProps()}>
										<input id={fieldName} {...getInputProps()} />
										<div
											className={`${
												isDragActive || fileName
													? 'border-main-light-blue bg-blue-500 bg-opacity-5'
													: 'border-main-black'
											} ${baseButtonStyles} mb-4`}>
											{isDragActive ? (
												<p>Drop the files here ...</p>
											) : !fileName ? (
												<p>Drop the files or</p>
											) : (
												<p>{fileName}</p>
											)}
											<div className={`${innerButtonStyles} w-1/3 py-3`}>Upload</div>
										</div>
									</div>
								)}
							</Dropzone>
						)}
					/>
					<div onClick={() => setOpenCam(true)} className={`border-main-black ${baseButtonStyles}`}>
						Use your webcam
						<div className={`${innerButtonStyles} flex w-1/2 justify-center`}>
							<CameraIcon className="w-8 py-2" />
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default FormFileDrop
