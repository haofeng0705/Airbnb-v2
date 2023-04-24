'use client'
import { SafeUser } from '@/app/types'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'
interface NavbarProps {
  currentUser?: SafeUser | null
}
const NavBar: React.FC<NavbarProps> = ({ currentUser }) => {
  // console.log('currentUser->', currentUser)
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default NavBar

