import getCurrentUser from './getCurrentUser'
import prisma from '@/app/libs/prismadb'

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return []
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      }
    })

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString()
    }))

    return safeFavorites
  } catch (error: any) {
    throw new Error(error)
  }
}

