'use client'

import { useCallback, useState } from 'react'

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import LoginModal from '../Modals/LoginModal'
import MenuItem from './MenuItem'
import { SafeUser } from '@/app/types'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    // 跳转登录页面, 并提示
    if (!currentUser) {
      // 提示信息
      toast('Login First !', {
        duration: 1000,
        // Custom Icon
        icon: '👏'
      })
      return loginModal.onOpen()
    }

    // 跳转 rent 界面
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onRent}
          className='
          hidden
          md:block
          text-sm
          font-semibold
          py-3
          px-4
          rounded-full
          hover:bg-neutral-100
          transition
          cursor-pointer'
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className='
          p-4
          md:py-1
          md:px-2
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          cursor-pointer
          hover:shadow-md
          transition
          '
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className='absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm'
        >
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  label='My trips'
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label='My favorites'
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label='My reservations'
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label='My properties'
                  onClick={() => router.push('/properties')}
                />
                <MenuItem
                  label='Airbnb my home'
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem
                  label='Logout'
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label='Login'
                  onClick={loginModal.onOpen}
                />
                <MenuItem
                  label='Sign up'
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu

