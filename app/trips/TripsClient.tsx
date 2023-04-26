'use client'

import { SafeReservation, SafeUser } from '@/app/types'
import { useCallback, useState } from 'react'

import Container from '@/app/components/Container'
import Heading from '@/app/components/Heading'
import ListingCard from '@/app/components/listings/ListingCard'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface TripsClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')
  // 取消预定
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)
      // axios.delete(`/api/reservations/${id}`)
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled')
          // 刷新页面
          router.refresh()
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error)
        })
        .finally(() => {
          setDeletingId('')
        })
    },
    [router]
  )

  return (
    <Container>
      <Heading
        title='Trips'
        subtitle="Where you've been and where you're going"
      />
      <div
        className='
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        '
      >
        {reservations.map((reservation: any) => (
          // 组件复用
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            // 禁用取消按钮
            disabled={deletingId === reservation.id}
            actionLabel='Cancel reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient

