import { useEffect, useState } from 'react'

import Container from 'components/container'
import CountryDropdown from 'components/country-dropdown'
import ProductDetails from 'components/product-details'
import { BillingAddress, Product } from 'lib/types'
import { Controller, useFormContext } from 'react-hook-form'
import { useFormStore } from 'store/useFormStore'

import FormContainer from '../form-container'
import FormHeader from '../form-header'
import FormInput from '../form-input'

const StepEighteen = () => {
	const {
		setValue,
		formState: { errors },
		control
	} = useFormContext()
	const { formStore } = useFormStore()
	const [billingAddress, setBillingAddress] = useState<BillingAddress>()
	const [useShipping, setUseShipping] = useState<boolean>(false)

	useEffect(() => {
		setBillingAddress(formStore.billing_address as BillingAddress)
	}, [])

	useEffect(() => {
		if (useShipping === true) {
			setValue('billing_address', {
				...(formStore.shipping_address as object)
			})
			setValue('billing_address.country', { ...(formStore.shipping_address as BillingAddress)?.country })
		} else {
			if (
				formStore.country &&
				!(formStore.billing_address as BillingAddress)?.country?.label &&
				formStore.country === 'canada'
			) {
				setValue('billing_address', {
					...(formStore.billing_address as BillingAddress)
				})
				setValue('billing_address.country', { value: 'CA', label: 'Canada' })
			} else {
				setValue('billing_address', {
					...(formStore.billing_address as BillingAddress)
				})
			}
		}
	}, [useShipping])

	const handleCheck = () => {
		setUseShipping((prev) => !prev)
	}

	return (
		<>
			<FormHeader
				title={'Please submit your payment for your telehealth visit'}
				// title={'Review and submit your online visit'}
				// subtitle="Confirm the formula and auto-refill schedule and submit your online visit."
			/>
			<Container>
				<div className="justify-center gap-10 pb-10 md:flex">
					<div className="max-w-[580px] flex-1">
						<FormContainer wide>
							<p className="pb-2 text-xl font-semibold text-main-blue">Billing Address</p>
							<div className="my-2 flex items-center">
								<input
									id="default-checkbox"
									type="checkbox"
									value=""
									onClick={handleCheck}
									className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
								/>
								<label
									htmlFor="default-checkbox"
									className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
									Same as shipping address
								</label>
							</div>
							<FormInput
								label="Street Address*"
								id="billing_address.line1"
								type="text"
								defaultValue={(formStore.billing_address as BillingAddress)?.line1}
							/>
							<FormInput
								label="Address Line 2 (optional)"
								id="billing_address.line2"
								type="text"
								defaultValue={(formStore.billing_address as BillingAddress)?.line2}
								isRequired={false}
							/>
							<div className="gap-4 lg:grid lg:grid-cols-2">
								<FormInput
									label="City*"
									id="billing_address.city"
									type="text"
									defaultValue={(formStore.billing_address as BillingAddress)?.city}
								/>
								<FormInput
									label="State / Province*"
									id="billing_address.state"
									type="text"
									defaultValue={(formStore.billing_address as BillingAddress)?.state}
								/>
							</div>
							<div className="gap-4 sm:grid sm:grid-cols-2">
								{billingAddress && (
									<Controller
										name="billing_address.country"
										control={control}
										defaultValue={(formStore.billing_address as BillingAddress)?.country}
										render={({ field }) => (
											<CountryDropdown {...field} setValue={setValue} errors={errors} />
										)}
									/>
								)}
								<FormInput
									label="ZIP / Postal Code*"
									id="billing_address.postal_code"
									type="text"
									defaultValue={
										(formStore.billing_address as { postal_code: string })?.postal_code
									}
								/>
							</div>
							<p className="pt-2">
								Depending on your benefits, your medication may be free. Prices shown here do not
								reflect any coverage you may have.
							</p>
						</FormContainer>
					</div>
					{formStore.product && <ProductDetails product={formStore.product as Product} />}
				</div>
			</Container>
		</>
	)
}

export default StepEighteen
