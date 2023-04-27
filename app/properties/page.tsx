import ClientOnly from '../ClientOnly'
import EmptyState from '../components/EmptyState'
import PropertiesClient from './PropertiesClient'
import getCurrentUser from '../actions/getCurrntUser'
import getListings from '../actions/getListings'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <EmptyState
        title='Unauthorized'
        subtitle='Please login'
      />
    )
  }

  const listings = await getListings({ userId: currentUser.id })

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No properties found'
          subtitle='Looks like you have no properties.'
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default PropertiesPage

