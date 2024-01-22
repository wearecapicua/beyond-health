import FacebookIcon from 'components/facebook-icon'
import GoogleIcon from 'components/google-icon'

type FormButtonProps = {
	type: 'button' | 'submit' | 'reset' | undefined
	text: string
	onClick?: () => void
	icon?: string
	style?: string
	disabled?: boolean
}

const FormButton = ({ disabled, type, text, onClick, icon, style }: FormButtonProps) => {
	const buttonStyles =
		style === 'outline'
			? 'border-[1px] text-main-light-blue border-main-light-blue hover:opacity-80'
			: style === 'solid'
				? 'bg-main-light-blue text-white hover:bg-main-light-blue-500'
				: ''

	return (
		<button
			disabled={disabled}
			type={type}
			onClick={onClick}
			className={`${buttonStyles} flex w-full items-center justify-center gap-4 rounded-full px-6 py-3 font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-light-blue-500 md:text-sm`}>
			{icon && icon === 'google' ? <GoogleIcon /> : null}
			{icon && icon === 'facebook' ? <FacebookIcon /> : null}
			{text}
		</button>
	)
}
export default FormButton
