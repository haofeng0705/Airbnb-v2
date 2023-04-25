import './globals.css'

import ClientOnly from './ClientOnly'
import LoginModal from './components/Modals/LoginModal'
import NavBar from './components/navbar/Navbar'
import { Nunito } from 'next/font/google'
import RegisterModal from './components/Modals/RegisterModal'
import RentModal from './components/Modals/RentModal'
import ToasterProvider from './providers/ToasterProvider'
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
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <NavBar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  )
}

