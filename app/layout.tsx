import ClientOnly from './ClientOnly'
import RegisterModal from './components/Modals/RegisterModal'
import NavBar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnbv2 clone'
}
const font = Nunito({
  subsets: ['latin']
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <NavBar />
        </ClientOnly>

        {children}
      </body>
    </html>
  )
}

