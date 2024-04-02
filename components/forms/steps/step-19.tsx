import PaymentForm from 'components/forms/form-payment'

import FormHeader from '../form-header'

const StepNineteen = () => {
	return (
		<>
			<FormHeader
				title={'Review and submit your online visit'}
				subtitle="Confirm the formula and auto-refill schedule and submit your online visit."
			/>
			{/* <Container>
				<div className="justify-center gap-10 pb-10 md:flex">
					<div className="max-w-[580px] flex-1">
					</div>
				</div>
			</Container> */}
			<PaymentForm />
		</>
	)
}

export default StepNineteen
