import ClientOnly from './ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState'
import ListingCard from './components/listings/ListingCard'
import getCurrentUser from './actions/getCurrntUser'
import getListings from './actions/getListings'

export default async function Home() {
  const listings = await getListings()
  const currentUser = await getCurrentUser()

  // 没有数据的时候显示空状态,当选中 icon 的时候,会触发 reset
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <h1
          className=' pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8'
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />


          ))}
        </h1>
      </Container>
    </ClientOnly>
  )
}

