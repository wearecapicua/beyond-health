import PaymentForm from 'components/forms/form-payment'

import FormHeader from '../form-header'

const StepNineteen = () => {
	return (
		<>
			<FormHeader
				title={'Review and submit your online visit'}
				subtitle="Confirm the formula and auto-refill schedule and submit your online visit."
			/>
			<PaymentForm />
		</>
	)
}

export default StepNineteen
