'use client'

import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import { useCallback, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Calendar from '../inputs/Calendar'
import Counter from '../inputs/Counter'
import Heading from '../Heading'
import Modal from './Modal'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import { formatISO } from 'date-fns'
import qs from 'query-string'
import useSearchModal from '@/app/hooks/useSearchModal'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {
  const router = useRouter()
  const searchModal = useSearchModal()
  const params = useSearchParams()
  // 当前步骤
  const [step, setStep] = useState(STEPS.LOCATION)

  const [location, setLocation] = useState<CountrySelectValue>()
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  //每次修改location都会重新渲染Map组件
  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  )

  const onBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    // 如果不是最后一步，直接进入下一步
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let currentQuery = {}
    // 从url中获取参数
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    // 更新参数
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }
    // 将参数转换为url
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    // 跳转到url
    router.push(url)
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params
  ])

  const actionLabel = useMemo(() => {
    // 如果是最后一步，显示Search
    if (step === STEPS.INFO) {
      return 'Search'
    }
    // 否则显示Next
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    // 如果是第一步，不显示Back
    if (step === STEPS.LOCATION) {
      return undefined
    }
    // 否则显示Back
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you wanna go?'
        subtitle='Find the perfect location!'
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='More information'
          subtitle='Find your perfect place!'
        />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title='Guests'
          subtitle='How many guests are coming?'
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title='Rooms'
          subtitle='How many rooms do you need?'
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value)
          }}
          value={bathroomCount}
          title='Bathrooms'
          subtitle='How many bahtrooms do you need?'
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title='Filters'
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  )
}

export default SearchModal

