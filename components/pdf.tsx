import { useState, useRef } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, BlobProvider, pdf } from '@react-pdf/renderer';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { User } from "lib/types"
import { saveAs } from 'file-saver';

const PDFDocument = ({ user }: { user: User }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{`${user?.first_name} ${user?.last_name}`}</Text>
        <Text>Email: {user?.email}</Text>
        <Text>Gender: {user?.gender}</Text>
        <Text>Birthdate: {user?.birthdate}</Text>
        <Text>Notice hair loss: {user?.notice_hair_loss}</Text>
        <Text>Medications: {user?.medications}</Text>
        <Text>Conditions: {user?.conditions}</Text>
        <Text>Questions: {user?.questions || "none"}</Text>
        <Text>Stage: {user?.stage}</Text>
        <Text>Has insurance: {user?.has_insurance ? "yes" : "no" }</Text>
        {user?.has_insurance && 
          <span>
            <Text>Insurance image:</Text>
            <Image src={user?.insurance_image_url} />
          </span>
        }
        <Text>Has health card: {user?.has_health_card ? "yes" : "no" }</Text>
        {
          user?.has_health_card &&
          <span>
            <Text>Health card image:</Text>
            <Image src={user?.health_card_image_url} />
          </span>
        }
        <Text>Product: {user?.product.name}</Text>
        <Text>Phone number: {user?.phone_number}</Text>
        <Text>Country: {user?.country}</Text>
        <Text>Shipping address:</Text>
        <Text>{user.shipping_address?.line1}</Text>
        <Text>{user.shipping_address?.line2}</Text>
        <Text>{user.shipping_address?.city}</Text>
        <Text>{user.shipping_address?.state}</Text>
        <Text>{user.shipping_address?.postal_code}</Text>
        <Text>Billing Address:</Text>
        <Text>{user.billing_address?.line1}</Text>
        <Text>{user.billing_address?.line2}</Text>
        <Text>{user.billing_address?.city}</Text>
        <Text>{user.billing_address?.state}</Text>
        <Text>{user.billing_address?.postal_code}</Text>
        <Text>Profile image:</Text>
        <Image src={user?.profile_image_url} />
        <Text>ID Image:</Text>
        <Image src={user?.photo_id_url} />
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    lineHeight: 1.5,
    fontSize: 14,
    margin: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

const Pdf = ({ user }: { user: User }) => {
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const pdfRef = useRef();

  const handleOpenPdfViewer = () => {
    setShowPdfViewer(true);
  };

  const handleClosePdfViewer = () => {
    setShowPdfViewer(false);
  };

  const handleDownloadPDF = async () => {
    let blobPDF = await pdf(<PDFDocument user={user} />).toBlob();

    if (blobPDF) {
      saveAs(blobPDF, `${user.first_name}_${user.last_name}_information.pdf`);
    }
  };

  return (
    <div>
      <button className="flex gap-3 items-center" onClick={handleOpenPdfViewer}>
        <ArrowDownTrayIcon className="w-5 h-5 text-main-blue" />
        <a className="text-xs text-main-blue" target="_blank">PDF</a>
      </button>
      {showPdfViewer && (
        <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
          {/* @ts-ignore */}
          <PDFViewer width="100%" height="100%" ref={pdfRef} >
            <PDFDocument user={user} />
          </PDFViewer>
          <button
            className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={handleClosePdfViewer}
          >
            Close
          </button>
          <button
            className="absolute bottom-4 left-4 bg-main-blue text-white px-4 py-2 rounded-lg"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default Pdf;
