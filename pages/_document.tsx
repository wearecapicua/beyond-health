import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

const Document = () => {
	return (
		<Html lang="en">
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&family=Raleway:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<Script
					src="https://cdn.safecharge.com/safecharge_resources/v1/websdk/safecharge.js"
					strategy="beforeInteractive" // Asegura que el script se cargue antes de la renderización interactiva
					onLoad={() => console.log('safecharge.js cargado con éxito')}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
