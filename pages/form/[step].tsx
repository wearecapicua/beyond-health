import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Spinner from 'components/forms/spinner'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { FormProvider, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Container from '../../components/container'
import FormButton from '../../components/forms/form-button'
import FormContainer from '../../components/forms/form-container'
import FormStepper from '../../components/forms/form-stepper'
import { FormStepType, formSteps, stepExists } from '../../components/forms/steps/form-steps'
import Layout from '../../components/layout'
import Snackbar from '../../components/snackbar'
import { createUserProfile, sendUpdatedData, uploadImages } from '../../lib/api/supabase'
import env from '../../lib/env'
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

	const numericSplit = activeStep.replace('step-', '')
	const numericStep = parseInt(numericSplit, 10)

	const { formStep, setFormStep } = useFormStatusStore()
	const { formStore, updateFormStore } = useFormStore()

	const { updateProductStore } = useProductStore()
	const stepNum = parseInt(activeStep.split('-')[1], 10)

	useEffect(() => {
		try {
			updateProductStore(products.productsWithPrices)
			if ((activeStep === 'step-16' || activeStep === 'step-17') && formStore?.country !== 'canada') {
				setActiveStep('step-19')
				router.push(`/form/step-19`)
			}
		} catch (ex) {
			console.log({ ex })
		}
	}, [])

	useEffect(() => {
		if (activeStep === 'step-13') {
			createUserProfile({ form_step: activeStep })
		}
	}, [activeStep])

	const currentSchema = schema[activeStep]
	const methods = useForm<IFormProps>({
		resolver: zodResolver(currentSchema) as unknown as Resolver<IFormProps>,
		mode: 'onBlur'
	})

	const { handleSubmit, trigger } = methods

	const handleCheckout = async () => {
		try {
			debugger
			const orderToken = await fetch(`http://localhost:3000/api/bambora/tokens`, {
				method: 'POST',
				body: JSON.stringify({
					number: formStore.card_number,
					expiry_date: formStore.expiry_date,
					cvd: formStore.cvc,
					userId: formStore.user_id
				})
			})
			const res = await orderToken.json()

			debugger

			return res.customer_code
		} catch (error) {
			console.log(error)
		}
	}

	const prevPage = () => {
		if (formStore.country === 'canada') {
			const next = decrementString(formData.step)
			setActiveStep(next)

			router.push(`/form/${next}`)
		} else {
			setActiveStep('step-15')

			router.push('/form/step-15')
		}
	}

	const submitFormData = async (data: Record<string, unknown>) => {
		updateFormStore(data as unknown as FormState)
		let updatedData: { form_step: string; customer_code: string } = {
			...formStore,
			...data,
			form_step: activeStep === 'step-19' ? 'COMPLETE' : activeStep,
			customer_code: ''
		}
		if (activeStep === 'step-19') {
			const customerCode = await handleCheckout()
			debugger
			if (!customerCode) throw new Error('Customer code not found')
			updatedData = { ...updatedData, customer_code: customerCode }
		}
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
		try {
			setIsLoading(true)
			const imageSaveData = await uploadImages(file)
			const imageWasUploaded = await sendUpdatedData({ [dbName]: imageSaveData.data?.path })
			updateFormStore({ [dbName]: imageSaveData?.data?.path, [temporalFileName]: null })
			const next =
				stepNum === 15 && formStore.country === 'anotherCountry'
					? 'step-19'
					: incrementString(formData.step)
			if (imageWasUploaded) setIsLoading(false)

			setActiveStep(next)

			router.push(`/form/${next}`)
		} catch (ex) {
			console.log({ ex })
		}
	}

	const updateStoreAndSubmit = async (data: FormState) => {
		try {
			updateFormStore(data)

			const next =
				stepNum === 15 && formStore.country === 'anotherCountry'
					? 'step-19'
					: incrementString(formData.step)
			setActiveStep(next)
			router.push(`/form/${next}`)
		} catch (ex) {
			console.log({ ex })
		}
	}

	const onSubmit: SubmitHandler<IFormProps> = async (data: {
		picture?: { file: File }
		photo_id?: { file: File }
		health_card?: { file: File }
		insurance?: { file: File }
		product?: { price: number; name: string; id: string }
	}) => {
		try {
			const isStepValid = await trigger()

			if (isStepValid && stepNum === 11) {
				await sendUpdatedData({ productId: data.product?.id })
				updateFormStore({ productId: data.product?.id })
			}
			if (isStepValid && stepNum === 14) {
				if (data.picture?.file && !formStore.profile_image_url) {
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
				if (data.photo_id?.file && !formStore.photo_id_url) {
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
				if (data.health_card?.file && formStore.has_health_card && !formStore.health_card_image_url) {
					uploadImageAndSubmit('health_card_image_url', 'health_card', data.health_card?.file)
				}
				if (!data.health_card?.file && formStore.has_health_card && !formStore.health_card_image_url) {
					toast.error('Please upload an image')
				}

				if ((formStore.has_health_card && formStore.health_image_url) || !formStore.has_health_card) {
					updateStoreAndSubmit(data as unknown as FormState)
				}
			}
			if (isStepValid && stepNum === 17 && formStore.country === 'canada') {
				if (data.insurance?.file && formStore.has_insurance && !formStore.insurance_image_url) {
					uploadImageAndSubmit('insurance_image_url', 'insurance', data.insurance?.file)
				}
				if (!data.insurance?.file && formStore.has_insurance && !formStore.insurance_image_url) {
					toast.error('Please upload an image')
				}

				if ((formStore.has_insurance && formStore.insurance_image_url) || !formStore.has_insurance) {
					updateStoreAndSubmit(data as unknown as FormState)
				}
			}

			if (isStepValid && stepNum < 14) {
				updateStoreAndSubmit(data as unknown as FormState)
			}

			if (isStepValid && stepNum === 18) {
				updateStoreAndSubmit(data as unknown as FormState)
			}
			if (isStepValid && activeStep === 'step-19') {
				const validateResults = getNullFieldsAndMap({ ...formStore, ...data })

				if (validateResults) {
					if (
						(validateResults === 'step-16' || validateResults === 'step-17') &&
						formStore.country === 'canada'
					) {
						toast.error('Missing data in previous step', {
							onClose: () => {
								setActiveStep(validateResults as FormStepType)

								router.push(`/form/${validateResults}`)
							}
						})

						return
					}
				}

				setIsSaving(true)
				await submitFormData(data)
				router.push(`/`)
			}
		} catch (ex) {
			console.log({ ex })
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
		try {
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
							router.push('/')
						}
					})
				} else {
					toast.error('Form not saved successfully')
				}
			}
		} catch (ex) {
			console.log({ ex })
		}
	}

	return (
		<Layout fullPage>
			<Container>
				<FormStepper activeStep={numericStep} />
			</Container>
			{isLoading && (
				<div className="flex h-[70vh] w-full flex-col justify-center">
					<Spinner />
				</div>
			)}
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<StepComponent />
					<FormContainer>
						<div className="flex flex-col gap-4 py-6">
							<FormButton
								disabled={isSaving}
								text={activeStep === 'step-19' ? 'Checkout' : 'Next'}
								type="submit"
								style="solid"
							/>

							<FormButton
								disabled={isSaving}
								text="Save for later"
								type="button"
								style="outline"
								onClick={handleSubmit(handleSave as SubmitHandler<IFormProps>)}
							/>
							{activeStep !== 'step-1' && (
								<FormButton disabled={isSaving} text="Go Back" type="button" onClick={prevPage} />
							)}
						</div>
					</FormContainer>
				</form>
			</FormProvider>

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
