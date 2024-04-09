import React from 'react'
type PostTitleProps = {
	children: React.ReactNode
}

const PostTitle = ({ children }: PostTitleProps) => {
	return (
		<h3 className="mb-12 mt-16 text-center font-bold leading-tight tracking-tighter md:leading-none">
			{children}
		</h3>
	)
}

export default PostTitle
