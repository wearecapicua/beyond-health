import React from 'react'

import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import Navbar from '../components/navbar'

type LayoutProps = {
	preview?: boolean
	fullPage?: boolean | undefined
	children: React.ReactNode
}

const Layout = ({ preview, fullPage, children }: LayoutProps) => {
	return (
		<>
			<Meta />
			<div className="min-h-screen">
				{preview && <Alert preview={preview} />}
				<Navbar fullPage={fullPage} />
				<main>{children}</main>
			</div>
			{!fullPage && <Footer />}
		</>
	)
}

export default Layout
