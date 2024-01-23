import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import ContactForm from '../components/contact-form'
import Container from '../components/container'
import Layout from '../components/layout'
import { createClient } from '../lib/prismic'

type IndexProps = InferGetStaticPropsType<typeof getStaticProps>

const ContactUsPage = ({ preview }: IndexProps) => {
	const imageLocationStyle = 'mx-auto relative top-[-64px]'
	const titleStyle = 'text-2xl font-bold text-center mb-[2%]'
	const textAreaStyle = 'mx-auto relative top-[-34px] text-center mb-[2%] text-[16px]'
	const textInfoStyle = 'text-center mb-[2%] text-[16px] flex justify-center'
	const iconStyle = 'mr-[15px]'

	return (
		<>
			<Layout preview={preview}>
				<Head>
					<title>Beyond Health</title>
				</Head>
				<div
					className="min-h-screen bg-gray-000"
					style={{
						backgroundImage:
							"url('/images/portrait-handsome-thinking-young-man-isolated-gray-wall 2.png')",
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain'
					}}>
					<Container>
						{/* FIXME: check if this keeps the page ok*/}
						{/* <div className="mb-[10%] flex h-[300px] max-[640px]:h-[200px] max-[640px]:h-[250px] md:mb-[10%] md:h-[360px] lg:mb-[15%] lg:h-[425px] xl:mb-[10%] xl:h-[521px] 2xl:mb-[17%] 2xl:h-[621px]"> */}
						<div className="mb-[10%] flex h-[300px] max-[640px]:h-[200px] md:mb-[10%] md:h-[360px] lg:mb-[15%] lg:h-[425px] xl:mb-[10%] xl:h-[521px] 2xl:mb-[17%] 2xl:h-[621px]">
							<div className="my-auto ml-[30px] w-[45%]">
								<p className="mb:text-4xl mb-[2%] text-left text-2xl font-bold lg:text-6xl xl:text-6xl">
									Contact Us
								</p>
								<p className="mb-[2%] text-left text-sm md:text-base lg:text-xl">
									Do you have questions about anything? Please let us know and we'll get back to
									you as soon as possible. For anything urgent, please call us.
								</p>
							</div>
						</div>
						<div className="mb-[6%] mt-[5%] flex justify-between text-white max-[860px]:flex-col">
							<div className="w-[49%] bg-accent-green-800 max-[860px]:mb-[10%] max-[860px]:w-[100%]">
								<Image
									src="/images/LocationGreen.png"
									alt="Icon Location Green"
									width={128}
									height={128}
									className={imageLocationStyle}
								/>
								<div className={textAreaStyle}>
									<p className={titleStyle}>Beyond Health Abbotsford</p>
									<div className={textInfoStyle}>
										<Image
											src="/images/location.svg"
											alt="Location Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>#150 - 1575 McCallum Rd Abbotsford, BC V2S 0K2</p>
									</div>
									<div className={textInfoStyle}>
										<Image
											src="/images/phoneIcon.svg"
											alt="Phone Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>1-604-529-7600</p>
									</div>
									<div className={textInfoStyle}>
										<Image
											src="/images/fax.svg"
											alt="Fax Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>1-604-529-7603</p>
									</div>
									<div className={textInfoStyle}>
										<Image
											src="/images/mail-icon.svg"
											alt="Mail Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>abby@beyondpharmacy.com</p>
									</div>
								</div>
							</div>
							<div className="w-[49%] bg-dark-blue max-[860px]:mb-[10%] max-[860px]:mt-[5%] max-[860px]:w-[100%]">
								<Image
									src="/images/LocationBlue.png"
									alt="Icon Location Green"
									width={128}
									height={128}
									className={imageLocationStyle}
								/>
								<div className={textAreaStyle}>
									<p className={titleStyle}>Beyond Health Surrey</p>
									<div className={textInfoStyle}>
										<Image
											src="/images/location.svg"
											alt="Location Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>#101 - 19211 Fraser Hwy Surrey, BC V3S 7C9</p>
									</div>
									<div className={textInfoStyle}>
										<Image
											src="/images/phoneIcon.svg"
											alt="Phone Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>1-604-245-6069</p>
									</div>
									<div className={textInfoStyle}>
										<Image
											src="/images/fax.svg"
											alt="Fax Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>1-604-245-6102</p>
									</div>
									<div className={textInfoStyle}>
										<Image
											src="/images/mail-icon.svg"
											alt="Mail Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>info@beyondpharmacy.com</p>
									</div>
								</div>
							</div>
						</div>
						<div className="mb-[10%] flex justify-between text-white max-[860px]:flex-col">
							<div className="w-[49%] bg-accent-green-800 max-[860px]:mb-[10%] max-[860px]:w-[100%]">
								<Image
									src="/images/LocationGreen.png"
									alt="Icon Location Green"
									width={128}
									height={128}
									className={imageLocationStyle}
								/>
								<div className={textAreaStyle}>
									<p className={titleStyle}>
										Beyond Health Abbotsford <br />
										(Cannon Clinic)
									</p>
									<div className={textInfoStyle}>
										<Image
											src="/images/location.svg"
											alt="Location Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>#140 - 1575 McCallum Rd Abbotsford BC V2S 0K2</p>
									</div>
									<div className={textInfoStyle}>
										<Image
											src="/images/phoneIcon.svg"
											alt="Phone Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>604-853-3311</p>
									</div>
									<div className={textInfoStyle}>
										<Image
											src="/images/fax.svg"
											alt="Fax Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>604-853-2171</p>
									</div>
								</div>
							</div>
							<div className="w-[49%] bg-dark-blue max-[860px]:mb-[10%] max-[860px]:mt-[5%] max-[860px]:w-[100%]">
								<Image
									src="/images/LocationBlue.png"
									alt="Icon Location Green"
									width={128}
									height={128}
									className={imageLocationStyle}
								/>
								<div className={textAreaStyle}>
									<p className={titleStyle}>Beyond Health Surrey</p>
									<div className={textInfoStyle}>
										<Image
											src="/images/location.svg"
											alt="Location Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>#101 - 19211 Fraser Hwy Surrey, BC V3S 7C9</p>
									</div>
									<div className={textInfoStyle}>
										<Image
											src="/images/phoneIcon.svg"
											alt="Phone Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>604-245-5797</p>
									</div>
									<div className={textInfoStyle}>
										<Image
											src="/images/fax.svg"
											alt="Fax Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>778-571-5604</p>
									</div>
									<div className={textInfoStyle}>
										<Image
											src="/images/mail-icon.svg"
											alt="Mail Icon"
											width={15}
											height={15}
											className={iconStyle}
										/>
										<p>info@beyondhealth.ca</p>
									</div>
								</div>
							</div>
						</div>
						<div className="mx-[20px]">
							<ContactForm />
						</div>
					</Container>
				</div>
			</Layout>
		</>
	)
}

export async function getStaticProps({ preview = false, previewData }: GetStaticPropsContext) {
	const client = createClient({ previewData })

	const page = await client.getSingle('terms_of_service')

	return {
		props: { preview, page }
	}
}

export default ContactUsPage
