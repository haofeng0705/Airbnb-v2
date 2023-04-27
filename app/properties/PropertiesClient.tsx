'use client'

import { SafeListing, SafeUser } from '@/app/types'
import { useCallback, useState } from 'react'

import Container from '@/app/components/Container'
import Heading from '@/app/components/Heading'
import ListingCard from '@/app/components/listings/ListingCard'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface PropertiesClientProps {
  listings: SafeListing[]
  currentUser?: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted')
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
        title='Properties'
        subtitle='List of your properties'
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
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel='Delete property'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default PropertiesClient
