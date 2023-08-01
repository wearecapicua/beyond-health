import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import Navbar from '../components/navbar'

type LayoutProps = {
  preview: boolean
  children: React.ReactNode
}

export default function Layout({ preview, children }: LayoutProps) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {preview && <Alert preview={preview} /> }
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
