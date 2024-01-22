import React from 'react'
type ContainerProps = {
	children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
	return <div className="container mx-auto max-w-[1320px] sm:px-5">{children}</div>
}

export default Container
