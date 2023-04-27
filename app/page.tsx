import getListings, { IListingsParams } from '@/app/actions/getListings'

import ClientOnly from './components/ClientOnly'
import Container from '@/app/components/Container'
import EmptyState from '@/app/components/EmptyState'
import ListingCard from '@/app/components/listings/ListingCard'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface HomeProps {
  searchParams: IListingsParams
}

const Home = async ({ searchParams }: HomeProps) => {
  // console.log('searchParams->',searchParams)
  const listings = await getListings(searchParams)
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
        <div
          className='
            pt-24
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
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home

