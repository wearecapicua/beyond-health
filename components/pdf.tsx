import { SetStateAction, useState } from 'react'

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { Document, Image, PDFViewer, Page, StyleSheet, Text, View, pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import { getUserImages } from 'lib/api/supabase'
import { User } from 'lib/types'

type UserImages = {
	profileImageUrl: {
		signedUrl: string
	}
	photoIdUrl: {
		signedUrl: string
	}
	healthCardImageUrl: {
		signedUrl: string
	}
	insuranceImageUrl: {
		signedUrl: string
	}
}

const PDFDocument = ({
	user,
	profile,
	products,
	userImages
}: {
	user: User
	profile: any
	products: any
	userImages: UserImages
}) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text style={styles.title}>{`${profile?.first_name} ${profile?.last_name}`}</Text>
				<Text>Email: {user?.email}</Text>
				<Text>Gender: {profile?.gender}</Text>
				<Text>Birthdate: {profile?.birthdate}</Text>
				<Text>Notice hair loss: {profile?.notice_hair_loss}</Text>
				<Text>Medications: {profile?.medications}</Text>
				<Text>Conditions: {profile?.conditions}</Text>
				<Text>Questions: {profile?.questions || 'none'}</Text>
				<Text>Stage: {profile?.stage}</Text>
				<Text>Has insurance: {profile?.has_insurance ? 'yes' : 'no'}</Text>
				{profile?.has_insurance && userImages?.insuranceImageUrl?.signedUrl && (
					<span>
						<Text>Insurance image:</Text>
						<View style={{ maxHeight: '100%', width: 300 }}>
							<Image
								style={{ width: 'auto', height: 'auto' }}
								src={userImages?.insuranceImageUrl?.signedUrl ?? ''}
							/>
						</View>
					</span>
				)}
				<Text>Has health card: {user?.has_health_card ? 'yes' : 'no'}</Text>
				{user?.has_health_card && userImages?.healthCardImageUrl?.signedUrl && (
					<span>
						<Text>Health card image:</Text>
						<View style={{ maxHeight: '100%', width: 300 }}>
							<Image
								style={{ width: 'auto', height: 'auto' }}
								src={userImages?.healthCardImageUrl?.signedUrl ?? ''}
							/>
						</View>
					</span>
				)}
				<Text>Product: {products.name}</Text>
				<Text>Phone number: {profile?.phone_number}</Text>
				<Text>Country: {profile?.country}</Text>
				<Text>Shipping address:</Text>
				<Text>{profile.shipping_address?.line1}</Text>
				<Text>{profile.shipping_address?.line2}</Text>
				<Text>{profile.shipping_address?.city}</Text>
				<Text>{profile.shipping_address?.state}</Text>
				<Text>{profile.shipping_address?.postal_code}</Text>
				<Text>Billing Address:</Text>
				<Text>{profile.billing_address?.line1}</Text>
				<Text>{profile.billing_address?.line2}</Text>
				<Text>{profile.billing_address?.city}</Text>
				<Text>{profile.billing_address?.state}</Text>
				<Text>{profile.billing_address?.postal_code}</Text>
				{userImages?.profileImageUrl?.signedUrl && (
					<span>
						<Text>Profile image:</Text>
						<View style={{ maxHeight: '100%', width: 300 }}>
							<Image
								style={{ width: 'auto', height: 'auto' }}
								src={userImages?.profileImageUrl?.signedUrl ?? ''}
							/>
						</View>
					</span>
				)}
				{userImages?.photoIdUrl?.signedUrl && (
					<span>
						<Text>ID Image:</Text>
						<View style={{ maxHeight: '100%', width: 300 }}>
							<Image
								style={{ width: 'auto', height: 'auto' }}
								src={userImages?.photoIdUrl?.signedUrl ?? ''}
							/>
						</View>
					</span>
				)}
			</View>
		</Page>
	</Document>
)

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		lineHeight: 1.5,
		fontSize: 14,
		margin: 10
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1
	},
	title: {
		fontSize: 18,
		marginBottom: 10,
		fontWeight: 'bold'
	}
})

const Pdf = ({ user, profile, products }: { user: User; profile: any; products: any }) => {
	const [showPdfViewer, setShowPdfViewer] = useState(false)
	// const pdfRef = useRef()

	const [userImagesUrls, setUserImagesUrls] = useState({
		profileImageUrl: {
			signedUrl: ''
		},
		photoIdUrl: {
			signedUrl: ''
		},
		healthCardImageUrl: {
			signedUrl: ''
		},
		insuranceImageUrl: {
			signedUrl: ''
		}
	})

	const handleOpenPdfViewer = async () => {
		if (user.id) {
			const userImages = await getUserImages(user.id)

			setUserImagesUrls(
				userImages as SetStateAction<{
					profileImageUrl: { signedUrl: string }
					photoIdUrl: { signedUrl: string }
					healthCardImageUrl: { signedUrl: string }
					insuranceImageUrl: { signedUrl: string }
				}>
			)
			setShowPdfViewer(true)
		}
	}

	const handleClosePdfViewer = () => {
		setShowPdfViewer(false)
	}

	const handleDownloadPDF = async () => {
		const blobPDF = await pdf(
			<PDFDocument user={user} profile={profile} products={products} userImages={userImagesUrls} />
		).toBlob()

		if (blobPDF) {
			saveAs(blobPDF, `${user.first_name}_${user.last_name}_information.pdf`)
		}
	}

	return (
		<div>
			<button className="flex items-center gap-3" onClick={handleOpenPdfViewer}>
				<ArrowDownTrayIcon className="h-5 w-5 text-main-blue" />
				<a className="text-xs text-main-blue" target="_blank">
					PDF
				</a>
			</button>
			{showPdfViewer && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
					<PDFViewer width="100%" height="100%">
						<PDFDocument
							user={user}
							profile={profile}
							products={products}
							userImages={userImagesUrls}
						/>
					</PDFViewer>
					<button
						className="absolute bottom-4 right-6 rounded-lg bg-red-500 px-4 py-2 text-white"
						onClick={handleClosePdfViewer}>
						Close
					</button>
					<button
						className="absolute bottom-4 left-4 rounded-lg bg-main-blue px-4 py-2 text-white"
						onClick={handleDownloadPDF}>
						Download PDF
					</button>
				</div>
			)}
		</div>
	)
}

export default Pdf
