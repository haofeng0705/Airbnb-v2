import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import ReservationsClient from './ReservationsClient'
import TripsClient from '../trips/TripsClient'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservation'

const ReservationsPage = async () => {
  // 获取当前用户(房东)
  const currentUser = await getCurrentUser()
  // 如果没有当前用户，显示空状态
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
  // 获取房东的所有预定
  const reservations = await getReservations({ authorId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No reservations found'
          subtitle='Looks like you have no reservations on your properties.'
        />
      </ClientOnly>
    )
  }

  return (
    // <ClientOnly>
    //   <TripsClient
    //     reservations={reservations}
    //     currentUser={currentUser}
    //   />
    // </ClientOnly>
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ReservationsPage

