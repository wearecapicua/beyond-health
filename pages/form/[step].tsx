import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormProvider, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Container from '../../components/container'
import FormButton from '../../components/forms/form-button'
import FormContainer from '../../components/forms/form-container'
import FormStepper from '../../components/forms/form-stepper'
import Spinner from '../../components/forms/spinner'
import { FormStepType, formSteps, stepExists } from '../../components/forms/steps/form-steps'
import Layout from '../../components/layout'
import Snackbar from '../../components/snackbar'
import { captureUserPayment, createUserProfile, sendUpdatedData, uploadImages } from '../../lib/api/supabase'
import env from '../../lib/env'
import useStripe from '../../lib/useStripe'
import { useFormStatusStore } from '../../store/useFormStatusStore'
import { FormState, useFormStore } from '../../store/useFormStore'
import { useProductStore } from '../../store/useProductStore'
import { decrementString, getNullFieldsAndMap, incrementString } from '../../utils'
import { IFormProps, schema } from '../../utils/forms/form-schema'
import { filterFormData } from '../../utils/forms/prop-filter'

type StepProps = InferGetServerSidePropsType<typeof getServerSideProps>

const FormStep = ({ formData, products }: StepProps) => {
	const router = useRouter()
	const [activeStep, setActiveStep] = useState<FormStepType>(formData.step)
	const [isSaving, setIsSaving] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const StepComponent = formSteps[activeStep]
	const stripe = useStripe()

	const numericSplit = activeStep.replace('step-', '')
	const numericStep = parseInt(numericSplit, 10)

	const { formStep, setFormStep } = useFormStatusStore()
	const { formStore, updateFormStore } = useFormStore()

	const { updateProductStore } = useProductStore()
	const stepNum = parseInt(activeStep.split('-')[1])

	useEffect(() => {
		updateProductStore(products.productsWithPrices)
		if ((activeStep === 'step-16' || activeStep === 'step-17') && formStore?.country !== 'canada') {
			setActiveStep('step-18')
			setTimeout(() => {
				router.push(`/form/step-18`)
			}, 1500)
		}
	}, [])

	const currentSchema = schema[activeStep]
	const methods = useForm<IFormProps>({
		resolver: zodResolver(currentSchema) as unknown as Resolver<IFormProps>,
		mode: 'onBlur'
	})

	const { handleSubmit, trigger } = methods

	const handleCheckout = async (data: Record<string, unknown>) => {
		if (!stripe) {
			console.error('Failed to load Stripe.js')

			return
		}
		const updatedData = { ...formStore, ...data, form_step: activeStep }
		const { filteredBillingData } = filterFormData(updatedData)
		const response = await captureUserPayment(filteredBillingData)
		const { error } = await stripe.redirectToCheckout({
			sessionId: (response as { id: string }).id
		})
		setIsSaving(false)
		console.error({ error })
		console.warn(error.message)
	}

	const prevPage = () => {
		// if (formStore.country === 'canada') {
		const next = decrementString(formData.step)
		setActiveStep(next)

		router.push(`/form/${next}`)
		// } else {
		// 	setActiveStep('step-15')

		// 	router.push('/form/step-15')
		// }
	}

	const submitFormData = async (data: Record<string, unknown>) => {
		updateFormStore(data as unknown as FormState)
		const updatedData = { ...formStore, ...data, form_step: activeStep }
		const { filteredData } = filterFormData(updatedData)

		try {
			if (formStep) {
				return await sendUpdatedData(filteredData)
			} else {
				return await createUserProfile(filteredData)
			}
		} catch (error) {
			console.error('Form submission error:', error)

			return false
		}
	}

	const uploadImageAndSubmit = async (dbName: string, temporalFileName: string, file: File) => {
		setIsLoading(true)
		const imageSaveData = await uploadImages(file)
		const imageWasUploaded = await sendUpdatedData({ [dbName]: imageSaveData.data?.path })
		updateFormStore({ [dbName]: imageSaveData?.data?.path, [temporalFileName]: null })
		const next =
			stepNum === 15 && formStore.country === 'anotherCountry' ? 'step-18' : incrementString(formData.step)
		if (imageWasUploaded) setIsLoading(false)

		setActiveStep(next)
		setTimeout(() => {
			router.push(`/form/${next}`)
		}, 1500)
	}

	const updateStoreAndSubmit = async (data: FormState) => {
		updateFormStore(data)

		const next =
			stepNum === 15 && formStore.country === 'anotherCountry' ? 'step-18' : incrementString(formData.step)
		setActiveStep(next)

		setTimeout(() => {
			router.push(`/form/${next}`)
		}, 1500)
	}

	const onSubmit: SubmitHandler<IFormProps> = async (data: {
		picture?: { file: File }
		photo_id?: { file: File }
		health_card?: { file: File }
		insurance?: { file: File }
	}) => {
		const isStepValid = await trigger()

		if (isStepValid && stepNum === 14) {
			if (data.picture?.file && formStore.profile_image_url === null) {
				uploadImageAndSubmit('profile_image_url', 'picture', data.picture?.file)
			}
			if (!data.picture?.file && formStore.profile_image_url === null) {
				toast.error('Please upload an image')
			}
			if (formStore.profile_image_url) {
				updateStoreAndSubmit(data as unknown as FormState)
			}
		}

		if (isStepValid && stepNum === 15) {
			if (data.photo_id?.file && formStore.photo_id_url === null) {
				uploadImageAndSubmit('photo_id_url', 'photo_id', data.photo_id?.file)
			}
			if (!data.photo_id?.file && formStore.photo_id_url === null) {
				toast.error('Please upload an image')
			}
			if (formStore.photo_id_url) {
				updateStoreAndSubmit(data as unknown as FormState)
			}
		}

		if (isStepValid && stepNum === 16 && formStore.country === 'canada') {
			if (data.health_card?.file && formStore.has_health_card && formStore.health_card_image_url === null) {
				uploadImageAndSubmit('health_card_image_url', 'health_card', data.health_card?.file)
			}
			if (!data.health_card?.file && formStore.has_health_card && formStore.health_card_image_url === null) {
				toast.error('Please upload an image')
			}
			if (formStore.has_health_card === null) {
				toast.error('Please select an option')
			}
			if ((formStore.has_health_card && formStore.health_image_url) || formStore.has_health_card === false) {
				updateStoreAndSubmit(data as unknown as FormState)
			}
		}

		if (isStepValid && stepNum === 17 && formStore.country === 'canada') {
			if (data.insurance?.file && formStore.has_insurance && formStore.insurance_image_url === null) {
				uploadImageAndSubmit('insurance_image_url', 'insurance', data.insurance?.file)
			}
			if (!data.insurance?.file && formStore.has_insurance && formStore.insurance_image_url === null) {
				toast.error('Please upload an image')
			}
			if (formStore.has_insurance === null) {
				toast.error('Please select an option')
			}
			if ((formStore.has_insurance && formStore.insurance_image_url) || formStore.has_insurance === false) {
				updateStoreAndSubmit(data as unknown as FormState)
			}
		}

		if (isStepValid && stepNum < 14) {
			updateStoreAndSubmit(data as unknown as FormState)
		}

		if (isStepValid && activeStep === 'step-18') {
			const validateResults = getNullFieldsAndMap({ ...formStore, ...data })

			if (validateResults) {
				if (
					(validateResults === 'step-16' || validateResults === 'step-17') &&
					formStore.country === 'canada'
				) {
					toast.error('Missing data in previous step', {
						onClose: () => {
							setActiveStep(validateResults as FormStepType)
							setTimeout(() => {
								router.push(`/form/${validateResults}`)
							}, 1500)
						}
					})

					return
				}
			}

			setIsSaving(true)
			const isSubmitSuccess = await submitFormData(data)

			if (isSubmitSuccess) {
				handleCheckout(data)
			} else {
				toast.error('Form not saved successfully')
			}
		}
	}

	const handleSave = async (data: {
		profile_image_url: string
		picture: { file: File }
		photo_id_url: string
		photo_id: { file: File }
		health_card_image_url: string
		health_card: { file: File }
		insurance_image_url: string
		insurance: { file: File }
	}) => {
		setIsSaving(true)
		const isStepValid = await trigger()
		if (isStepValid) {
			if (!data.profile_image_url && data.picture?.file) {
				const imageSaveData = await uploadImages(data.picture?.file)
				await sendUpdatedData({ profile_image_url: imageSaveData?.data?.path })
				updateFormStore({ profile_image_url: imageSaveData?.data?.path })
			}

			if (!data.photo_id_url && data.photo_id?.file) {
				const photoIdSaveData = await uploadImages(data.photo_id?.file)
				await sendUpdatedData({ photo_id_url: photoIdSaveData?.data?.path })
				updateFormStore({ photo_id_url: photoIdSaveData?.data?.path })
			}

			if (!data.health_card_image_url && data.health_card?.file) {
				const healthCardImageSaveData = await uploadImages(data.health_card?.file)
				await sendUpdatedData({ health_card_image_url: healthCardImageSaveData?.data?.path })
				updateFormStore({ health_card_image_url: healthCardImageSaveData?.data?.path })
			}

			if (!data.insurance_image_url && data.insurance?.file) {
				const insuranceImageSaveData = await uploadImages(data.insurance?.file)
				await sendUpdatedData({ insurance_image_url: insuranceImageSaveData?.data?.path })
				updateFormStore({ insurance_image_url: insuranceImageSaveData?.data?.path })
			}

			const isSubmitSuccess = await submitFormData(data)
			if (isSubmitSuccess) {
				setFormStep(activeStep)
				toast.success('Form saved successfully', {
					onClose: () => {
						setTimeout(() => {
							router.push('/')
						}, 1500)
					}
				})
			} else {
				toast.error('Form not saved successfully')
			}
		}
	}

	return (
		<Layout fullPage>
			<Container>
				<FormStepper activeStep={numericStep} />
			</Container>
			{(activeStep === 'step-18' && isSaving) || isLoading ? (
				<div className="align-items flex h-[70vh] w-full flex-col justify-center">
					<Spinner />
				</div>
			) : (
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<StepComponent />
						<FormContainer>
							<div className="flex flex-col gap-4 py-6">
								{activeStep === 'step-18' ? (
									<FormButton
										disabled={isSaving}
										text="Go to Checkout"
										type="submit"
										style="solid"
									/>
								) : (
									<FormButton disabled={isSaving} text="Next" type="submit" style="solid" />
								)}
								<FormButton
									disabled={isSaving}
									text="Save for later"
									type="button"
									style="outline"
									onClick={handleSubmit(handleSave as SubmitHandler<IFormProps>)}
								/>
								{activeStep !== 'step-1' && (
									<FormButton
										disabled={isSaving}
										text="Go Back"
										type="button"
										onClick={prevPage}
									/>
								)}
							</div>
						</FormContainer>
					</form>
				</FormProvider>
			)}
			<Snackbar />
		</Layout>
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context)

	if (!session?.user) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}

	const step = context.params?.step?.toString() ?? ''

	if (!stepExists(step)) {
		return { notFound: true }
	}

	const res = await fetch(`${env.host}/api/all-products`)
	const products = await res.json()

	const restwo = await fetch(`${env.host}/api/get-stripe-customer`)
	await restwo.json()

	return {
		props: {
			products,
			formData: {
				step
			},
			user: session.user
		}
	}
}

export default FormStep
