'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()

  return (
    <>
      <Image
        // 点击回首页
        onClick={() => router.push('/')}
        className='hidden md:block cursor-pointer'
        src='/images/logo.png'
        alt='Logo'
        width={100}
        height={100}
      />
    </>
  )
}

export default Logo

