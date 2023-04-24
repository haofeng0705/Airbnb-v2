'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useCallback, useState } from 'react'

import { AiFillGithub } from 'react-icons/ai'
import Button from '../Button'
import { FcGoogle } from 'react-icons/fc'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import useLoginModal from '@/app/hooks/useLoginModal'
//next/navigation 是新版本的路由跳转
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { useRouter } from 'next/navigation'

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      setIsLoading(false)
      // 登录成功
      if (callback?.ok) {
        toast.success('Logged in')
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const onToggle = useCallback(() => {
    // toggle 跳转开关
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome back'
        subtitle='Login to your account!'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className='
      text-neutral-500 text-center mt-4 font-light'
      >
        <p>
          First time using Airbnb?
          <span
            onClick={onToggle}
            className='
              text-neutral-800
              cursor-pointer
              hover:underline
            '
          >
            {' '}
            Create an account
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal

