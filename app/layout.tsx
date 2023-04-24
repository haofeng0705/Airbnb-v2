import ClientOnly from './ClientOnly'
import RegisterModal from './components/Modals/RegisterModal'
import NavBar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/Modals/LoginModal'
import getCurrentUser from './actions/getCurrntUser'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnbv2 clone'
}
const font = Nunito({
  subsets: ['latin']
})

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  // console.log('currentUser->',currentUser)
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <NavBar currentUser={currentUser} />
        </ClientOnly>

        {children}
      </body>
    </html>
  )
}

