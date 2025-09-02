import { useEffect } from 'react'

import Container from 'components/container'
import FormInput from 'components/forms/form-input'
import { useSession } from 'next-auth/react'
import { useFormContext } from 'react-hook-form'
import { useFormStore } from 'store/useFormStore'

import FormContainer from '../form-container'
import FormHeader from '../form-header'

const StepNineteen = () => {
	const { formStore } = useFormStore()
	const { data: session } = useSession()
	const { setValue } = useFormContext()

	useEffect(() => {
		if (formStore.card_name === '' && session?.user?.name) {
			setValue('card_name', session.user.name)
		}
	}, [session?.user?.name])

	return (
		<>
			<FormHeader title={'Final Step'} />
			<Container>
				<div className="justify-center gap-10 pb-10 md:flex">
					<div className="max-w-[580px] flex-1">
						<FormContainer wide>
							<p className="mb-6 text-center text-gray-600">
								You pay nothing today and will only be charged if approved by the doctor
							</p>

							<div className="space-y-4">
								<FormInput
									label="Name on Card*"
									id="card_name"
									type="text"
									defaultValue={formStore.card_name}
								/>

								{/* Card Number */}
								<div>
									<label htmlFor="card-name" className="block leading-6">
										Card Information*
									</label>
									<div id="sc_form" className="rounded-xl border border-gray-300 bg-white p-4" />
								</div>

								{/* Optional Note */}
								{/* <div>
									<label htmlFor="note" className="mb-1 block text-sm font-medium">
										Any additional note?
									</label>
									<textarea
										id="note"
										rows={4}
										className="w-full rounded-lg border border-gray-300 p-3"
									/>
								</div> */}
							</div>
						</FormContainer>
					</div>
				</div>
			</Container>
		</>
	)
}

export default StepNineteen
