import { useEffect, useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'

import CountryDropdown from '../../../components/country-dropdown'
import { ShippingAddress } from '../../../lib/types'
import { useFormStore } from '../../../store/useFormStore'
import FormContainer from '../form-container'
import FormHeader from '../form-header'
import FormInput from '../form-input'

const StepOne = () => {
	const { formStore } = useFormStore()
	const {
		register,
		setValue,
		control,
		formState: { errors }
	} = useFormContext()
	const [shippingAddress, setShippingAddress] = useState<ShippingAddress>()

	useEffect(() => {
		setShippingAddress(formStore.shipping_address as unknown as ShippingAddress)
	}, [])

	useEffect(() => {
		if (formStore.country && formStore.country === 'canada') {
			setValue('shipping_address.country', { value: 'CA', label: 'Canada' })
		}
	}, [])

	return (
		<>
			<FormHeader
				title={'Where would you like us to deliver your package?'}
				subtitle="Your shipment will arrive in a discreet package."
			/>
			<FormContainer wide>
				<FormInput
					label="Street Address*"
					id="shipping_address.line1"
					type="text"
					defaultValue={(formStore.shipping_address as unknown as ShippingAddress)?.line1}
				/>
				<FormInput
					label="Address Line 2 (optional)"
					id="shipping_address.line2"
					type="text"
					defaultValue={(formStore.shipping_address as unknown as ShippingAddress)?.line2}
					isRequired={false}
				/>
				<div className="gap-4 sm:grid sm:grid-cols-2">
					<FormInput
						label="City*"
						id="shipping_address.city"
						type="text"
						defaultValue={(formStore.shipping_address as unknown as ShippingAddress)?.city}
					/>
					<FormInput
						label="State / Province*"
						id="shipping_address.state"
						type="text"
						defaultValue={(formStore.shipping_address as unknown as ShippingAddress)?.state}
					/>
				</div>
				<div className="gap-4 sm:grid sm:grid-cols-2">
					<>
						{formStore.country === 'canada' ? (
							<></>
						) : (
							<>
								{shippingAddress ? (
									<Controller
										name="shipping_address.country"
										control={control}
										defaultValue={
											(formStore.shipping_address as unknown as ShippingAddress)?.country
										}
										render={({ field }) => (
											<CountryDropdown {...field} setValue={setValue} errors={errors} />
										)}
									/>
								) : (
									<Controller
										name="shipping_address.country"
										control={control}
										defaultValue={
											(formStore.shipping_address as unknown as ShippingAddress)?.country
										}
										render={({ field }) => (
											<CountryDropdown {...field} setValue={setValue} errors={errors} />
										)}
									/>
								)}
							</>
						)}
					</>

					<FormInput
						label="ZIP / Postal Code*"
						id="shipping_address.postal_code"
						type="text"
						defaultValue={(formStore.shipping_address as unknown as ShippingAddress)?.postal_code}
					/>
				</div>
				<p className="pt-2.5">{'Delivery Instructions (optional)'}</p>
				<textarea
					id="shipping_address.delivery_instructions"
					rows={6}
					defaultValue={
						(formStore.shipping_address as unknown as ShippingAddress)?.delivery_instructions
					}
					className="mt-2 block w-full rounded-3xl border-0 px-6 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					{...register('shipping_address.delivery_instructions')}
				/>
			</FormContainer>
		</>
	)
}

export default StepOne
