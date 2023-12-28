import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: Props) => {
	return (
		<button
			{...props}
			className={[
				'my-2 cursor-pointer bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-1 px-4 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0',
				props.className
			].join('')}
		/>
	)
}

export default Button
