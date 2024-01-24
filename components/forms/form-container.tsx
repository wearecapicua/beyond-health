import React from 'react'
type FormContainerProps = {
	children: React.ReactNode
	wide?: boolean
}

const FormContainer = ({ children, wide }: FormContainerProps) => {
	return (
		<div className={`${wide ? 'max-w-[750px]' : 'max-w-[520px]'} mx-auto my-2 px-6 md:px-3`}>{children}</div>
	)
}

export default FormContainer
