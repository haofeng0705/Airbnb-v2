import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import TripsClient from './TripsClient'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservation'

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='Unauthorized'
          subtitle='Please login'
        />
      </ClientOnly>
    )
  }
  // Get all reservations for the current user
  const reservations = await getReservations({ userId: currentUser.id })
  // 如果没有预定，显示空状态
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No trips found'
          subtitle='Looks like you havent reserved any trips.'
        />
      </ClientOnly>
    )
  }
  // 如果有预定，显示预定列表
  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default TripsPage

