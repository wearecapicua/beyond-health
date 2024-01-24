import { useEffect, useState } from 'react'

import { getProfileImage } from 'lib/api/supabase'
import { useFormContext } from 'react-hook-form'
import { useFormStore } from 'store/useFormStore'

import FormContainer from '../form-container'
import FormFileDrop from '../form-file-drop'
import FormHeader from '../form-header'

interface FileData {
	file: File | null
	fileUrl: string | null
	fileName: string | null
}

const StepFourteen = () => {
	const { formStore } = useFormStore()
	const {
		formState: { errors }
	} = useFormContext()
	const [fileData, setFileData] = useState<FileData>({
		file: null,
		fileUrl: null,
		fileName: null
	})
	const [profileImage, setProfileImage] = useState<string>()

	useEffect(() => {
		async function getSavedProfileImage() {
			const profileImageSaved = await getProfileImage()
			setProfileImage(profileImageSaved?.signedUrl)
		}

		getSavedProfileImage()
	}, [formStore.picture, formStore.profile_image_url])

	return (
		<>
			<FormHeader
				title={'Upload a picture of yourself.'}
				subtitle="Telemedicine laws require healthcare practitioners to know who they are treating."
			/>
			<FormContainer>
				<FormFileDrop
					fieldName="picture"
					setFileData={setFileData}
					fileData={fileData}
					profileImageSaved={profileImage}
				/>
				{!!errors.picture && !fileData?.fileUrl ? (
					<p className="pt-4 text-center text-sm text-red-500">Please select an image</p>
				) : null}
			</FormContainer>
		</>
	)
}

export default StepFourteen
