import ClientOnly from '@/app/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import ListingClient from './ListingClient'
import getCurrentUser from '@/app/actions/getCurrntUser'
import getListingById from '@/app/actions/getListingById'
import getReservations from '@/app/actions/getReservation'

interface IParams {
  listingId?: string
}
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ListingPage

function getReservationsByListingId(params: IParams) {
  throw new Error('Function not implemented.')
}

