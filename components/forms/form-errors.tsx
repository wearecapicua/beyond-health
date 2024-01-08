import { FieldErrors } from 'react-hook-form'

type FormErrorProps = {
	id: string
	errors: FieldErrors<FormData>
	text: string
}

const ErrorComponent = ({ id, errors, text }: FormErrorProps) => {
	if (id.includes('.')) {
		const [key, subId] = id.split('.')

		return (
			<>
				{!!(errors as unknown as { [key: string]: string })[key]?.[subId as unknown as number] && (
					<p className="pt-2 text-sm text-red-500">{text}</p>
				)}
			</>
		)
	} else {
		return (
			<>
				{!!(errors as unknown as { [key: string]: string })[id] && (
					<p className="pt-2 text-sm text-red-500">{text}</p>
				)}
			</>
		)
	}
}

export default ErrorComponent
