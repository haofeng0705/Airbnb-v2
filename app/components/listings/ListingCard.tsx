'use client'

import { Listing, Reservation } from '@prisma/client'
import { SafeListing, SafeUser } from '@/app/types'
import { useCallback, useMemo } from 'react'

import Button from '../Button'
import HeartButton from '../HeartButton'
import Image from 'next/image'
import { format } from 'date-fns'
import useCountries from '@/app/hooks/useCountries'
import { useRouter } from 'next/navigation'

// 可复用组件
interface ListingCardProps {
  data: SafeListing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [actionId, disabled, onAction]
  )

  // price it doesn't have to be recalculated unless a dependency changes.
  const price = useMemo(() => {
    // 如果传入了 reservation, 则使用 reservation 的 totalPrice
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [reservation, data.price])

  // 预定日期区间
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)
    // 传入的 PP 作为 pattern, 格式类似于 Apr 29, 1453
    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      // client routing
      onClick={() => router.push(`/listings/${data.id}`)}
      className='col-span-1 cursor-pointer group'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
          '
        >
          <Image
            fill
            className='
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            '
            src={data.imageSrc}
            alt='Listing'
          />
          <div
            className='
            absolute
            top-3
            right-3
          '
          >
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className='font-semibold text-lg'>
          {location?.region}, {location?.label}
        </div>
        <div className='font-light text-neutral-500'>
          {reservationDate || data.category}
        </div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>$ {price}</div>
          {!reservation && <div className='font-light'>night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard

