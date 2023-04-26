'use client'

import { SafeListing, SafeReservation, SafeUser } from '@/app/types'
import {
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval
} from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'

import Container from '@/app/components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingReservation from '@/app/components/listings/ListingReservation'
import { Range } from 'react-date-range'
import axios from 'axios'
import { categories } from '@/app/components/navbar/Categories'
import toast from 'react-hot-toast'
import useLoginModal from '@/app/hooks/useLoginModal'
import { useRouter } from 'next/navigation'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}
interface ListingClientProps {
  reservations?: SafeReservation[]
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}
const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()
  //获取当前房源的不可预定日期
  const disabledDates = useMemo(() => {
    let dates: Date[] = []
    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })
      //将不可预定日期添加到dates数组中
      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  //获取当前房源的类别
  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category)
  }, [listing.category])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  // 预定房源
  const onCreateReservation = useCallback(() => {
    //判断是否登录
    if (!currentUser) {
      return loginModal.onOpen()
    }
    setIsLoading(true)

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      .then(() => {
        toast.success('Listing reserved!')
        setDateRange(initialDateRange)
        //跳转到trips页面
        router.push('/trips')
        // router.refresh()
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal])

  //计算总价
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      // 计算两个日期之间的天数
      // const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate)
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )

      if (dayCount && listing.price) {
        // 计算总价
        setTotalPrice(dayCount * listing.price)
      } else {
        // 如果没有天数，就设置为默认价格
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  return (
    <Container>
      <div
        className='
          max-w-screen-lg
          mx-auto
        '
      >
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className='
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
              mt-6
            '
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div
              className='
                order-first
                mb-10
                md:order-last
                md:col-span-3
              '
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient

