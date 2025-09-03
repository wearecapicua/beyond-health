import crypto from 'crypto'

import { useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Spinner from 'components/forms/spinner'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'
import { ScreenLoader } from 'pages/screenLoader'
import { FormProvider, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Container from '../../components/container'
import FormButton from '../../components/forms/form-button'
import FormContainer from '../../components/forms/form-container'
import FormStepper from '../../components/forms/form-stepper'
import { formSteps, FormStepType, stepExists } from '../../components/forms/steps/form-steps'
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
	const [sessionToken, setSessionToken] = useState()
	// const [step19Error, setStep19Error] = useState('')
	const StepComponent = formSteps[activeStep]
	const [timeStamp, setTimeStamp] = useState('')
	const scRef = useRef<any>(null)
	const cardRef = useRef<any>(null)

	const numericSplit = activeStep.replace('step-', '')
	const numericStep = parseInt(numericSplit, 10)

	const { formStep, setFormStep } = useFormStatusStore()
	const { formStore, updateFormStore } = useFormStore()

	const { updateProductStore } = useProductStore()
	const stepNum = parseInt(activeStep.split('-')[1], 10)

	const { data: session } = useSession()

	useEffect(() => {
		if (activeStep === 'step-19') {
			const initSafeCharge = async () => {
				const ts = getNuveiTimeStamp() // current UNIX timestamp in milliseconds
				const product = formStore.product as { price: number; name: string; id: string }
				setTimeStamp(ts)
				const { user_id } = formStore
				const client_request_id = `mit-${Date.now()}`

				const orderPayload = {
					sessionToken,
					transactionType: 'Auth',
					merchantId: env.publicMerchantId,
					merchantSiteId: env.publicMerchantSiteId,
					clientUniqueId: user_id,
					clientRequestId: client_request_id,
					currency: 'USD',
					amount: product.price.toString(),
					isRebilling: 0,
					timeStamp: ts,
					paymentOption: {
						card: {
							threeD: {
								v2AdditionalParams: {
									rebillExpiry: '20260201',
									rebillFrequency: '90'
								}
							}
						}
					},
					items: [
						{
							name: product.name,
							quantity: 1,
							price: product.price.toString()
						}
					],
					checksum: ''
				}

				const orderChecksumStr =
					env.publicMerchantId +
					env.publicMerchantSiteId +
					orderPayload.clientRequestId +
					orderPayload.amount +
					orderPayload.currency +
					ts +
					env.publicMerchantSecretKey

				orderPayload.checksum = crypto.createHash('sha256').update(orderChecksumStr).digest('hex')

				const responseOrders = await fetch('https://ppp-test.safecharge.com/ppp/api/v1/openOrder.do', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(orderPayload)
				})

				const dataOrders = await responseOrders.json()

				const st = dataOrders.sessionToken

				setSessionToken(st)

				const sc = window.SafeCharge({
					env: 'int', // Use "prod" in production
					sessionToken: st,
					merchantId: env.publicMerchantId,
					merchantSiteId: env.publicMerchantSiteId,
					logLevel: '6',
					showAccountCapture: true
				})

				const style = {
					base: {
						fontSize: '16px',
						color: '#000',
						fontFamily: 'inherit',
						padding: '12px 16px',
						border: '1px solid #e5e7eb', // Tailwind border-gray-300
						borderRadius: '9999px' // fully rounded
					},
					focus: {
						borderColor: '#2563eb' // Tailwind blue-600
					},
					invalid: {
						color: '#dc2626' // Tailwind red-600
					}
				}

				// eslint-disable-next-line
				// @ts-ignore
				const fields = sc.fields({
					locale: 'en',
					style,
					fields: {
						cardNumber: { id: 'sc-card-number', placeholder: 'Card Number' },
						expirationDate: { id: 'sc-expiry', placeholder: 'MM / YY' },
						cvv: { id: 'sc-cvv', placeholder: 'CVV' }
					}
				})

				const card = fields.create('card', {
					// This will create card number + expiry + CVV together
					style: {
						base: {
							color: '#000'
						}
					}
				})

				card.attach(document.getElementById('sc_form'))

				cardRef.current = card
				scRef.current = sc
			}

			initSafeCharge()
		}
		if (activeStep === 'step-13') {
			createUserProfile({ form_step: activeStep })
		}
	}, [activeStep])

	useEffect(() => {
		try {
			updateProductStore(products.productsWithPrices)
			if ((activeStep === 'step-16' || activeStep === 'step-17') && formStore?.country !== 'canada') {
				setActiveStep('step-18')
				router.push(`/form/step-18`)
			}
		} catch (ex) {
			console.log({ ex })
		}
	}, [])

	const currentSchema = schema[activeStep]
	const methods = useForm<IFormProps>({
		resolver: zodResolver(currentSchema) as unknown as Resolver<IFormProps>,
		mode: 'onBlur'
	})

	const { handleSubmit, trigger } = methods

	const getNuveiTimeStamp = (): string => {
		const now = new Date()

		const YYYY = now.getFullYear().toString()
		const MM = String(now.getMonth() + 1).padStart(2, '0')
		const DD = String(now.getDate()).padStart(2, '0')
		const HH = String(now.getHours()).padStart(2, '0')
		const mm = String(now.getMinutes()).padStart(2, '0')
		const ss = String(now.getSeconds()).padStart(2, '0')

		return `${YYYY}${MM}${DD}${HH}${mm}${ss}`
	}

	const splitName = (fullName = '') => {
		const parts = fullName.trim().split(/\s+/).filter(Boolean)
		if (parts.length === 0) return { firstName: '', lastName: '' }
		if (parts.length === 1) return { firstName: parts[0], lastName: '' }

		const [firstName, ...rest] = parts
		const lastName = rest.join(' ') // keeps compound last names

		return { firstName, lastName }
	}

	const handleCheckout = async () => {
		try {
			setIsSaving(true)
			const { billing_address, card_name } = formStore
			// eslint-disable-next-line
			// @ts-ignore
			const { country, line1, city, postal_code, state } = billing_address

			// eslint-disable-next-line
			// @ts-ignore
			const { user } = session
			const { email, id, name } = user
			const { firstName, lastName } = splitName(name)

			const userTokenId = `utid-${timeStamp}`
			const ipData = await fetch('/api/get-user-ip', {
				method: 'get'
			})

			const { ip } = await ipData.json()

			const sc = scRef.current

			if (!sc || !sessionToken) {
				console.error('❌ Nuvei form or session token not ready')

				toast.error('❌ Payment failed')

				return
			}
			const card = cardRef.current

			const { ccTempToken } = await sc.getToken(card, { cardHolderName: card_name })

			sc.createPayment(
				{
					transactionType: 'Auth',
					sessionToken,
					userTokenId,
					clientUniqueId: id,
					currency: 'USD',
					amount: '0.00',
					items: [
						{
							name: 'Tokenization Setup',
							quantity: 1,
							price: '0.00'
						}
					],
					isRebilling: 0,
					authenticationOnlyType: 'addCard',
					paymentOption: {
						card: { ccTempToken, cardHolderName: card_name }
					},
					paymentFlow: 'redirect',
					billingAddress: {
						firstName,
						lastName,
						email, // shopper’s e-mail
						address: line1, // street line 1
						city,
						state, // 2-letter for US/CA; full name elsewhere
						country: country.value, // ISO-2 or ISO-3
						/* still smart to keep the old risk helpers */
						zip: postal_code
					},
					deviceDetails: {
						ipAddress: ip // **IPv4** string
					}
				},
				(response: any) => {
					setIsSaving(false)

					if (response.result === 'APPROVED') {
						console.log('✅ Approved:', response)
						insertOrder(response.transactionId, response.userPaymentOptionId, userTokenId)
					} else {
						console.error('❌ Payment failed:', response)

						toast.error('❌ Payment failed: ' + response.errorDescription)
					}
				}
			)

			return null
		} catch (error) {
			console.log(error)
		}
	}

	const insertOrder = async (transactionId: string, userPaymentOptionId: string, userTokenId: string) => {
		const { user_id } = formStore
		const product = formStore.product as { price: number; name: string; id: string }

		const data = await fetch('/api/insert-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_id,
				product_id: product.id,
				transactionId,
				userPaymentOptionId,
				userTokenId
			})
		})

		router.push(`/orders`)

		return data
	}

	const prevPage = () => {
		if (formStore.country === 'canada') {
			const next = decrementString(formData.step)
			setActiveStep(next)

			// console.log('prevPage', next)
			router.push(`/form/${next}`)
		} else {
			setActiveStep('step-15')

			router.push('/form/step-15')
		}
	}

	const submitFormData = async (data: Record<string, unknown>) => {
		updateFormStore(data as unknown as FormState)
		try {
			let updatedData: { form_step: string; customer_code: string } = {
				...formStore,
				...data,
				form_step: activeStep === 'step-19' ? 'COMPLETE' : activeStep,
				customer_code: ''
			}

			if (activeStep === 'step-19') {
				await handleCheckout()
				updatedData = { ...updatedData }
			}
			const { filteredData } = filterFormData(updatedData)

			if (formStep) {
				return await sendUpdatedData(filteredData)
			} else {
				return await createUserProfile(filteredData)
			}
		} catch (error) {
			// const err = error as string
			// setStep19Error(err)
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
					? 'step-18'
					: incrementString(formData.step)
			if (imageWasUploaded) setIsLoading(false)

			setActiveStep(next)

			// console.log('uploadImageAndSubmit', next)
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
			// console.log('updateStoreAndSubmit', next)
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
					{activeStep === 'step-19' ? <ScreenLoader active={isSaving} /> : null}

					<FormContainer>
						<div className="flex flex-col gap-4 py-6">
							<FormButton
								disabled={isSaving}
								text={
									activeStep === 'step-19'
										? 'Complete'
										: activeStep === 'step-18'
											? 'Submit'
											: 'Next'
								}
								type="submit"
								style="solid"
							/>

							{activeStep !== 'step-19' && (
								<FormButton
									disabled={isSaving}
									text="Save for later"
									type="button"
									style="outline"
									onClick={handleSubmit(handleSave as SubmitHandler<IFormProps>)}
								/>
							)}
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
			user: session.user,
			host: env.host
		}
	}
}

export default FormStep
