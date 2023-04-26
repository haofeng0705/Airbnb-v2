'use client'

import { SafeListing, SafeReservation, SafeUser } from '@/app/types'

import Container from '@/app/components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import { categories } from '@/app/components/navbar/Categories'
import { useMemo } from 'react'

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
  //获取当前房源的类别
  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category)
  }, [listing.category])

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
            className="
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
              mt-6
            "
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
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient

