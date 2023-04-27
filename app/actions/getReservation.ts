import prisma from '@/app/libs/prismadb'

interface IParams {
  listingId?: string
  userId?: string
  authorId?: string
}
// 获取预定
export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params

    const query: any = {}
    // 按不同的值 query
    // 对单一房源查询预定
    if (listingId) {
      query.listingId = listingId
    }
    // 对单一用户查询预定
    if (userId) {
      query.userId = userId
    }
    // 对不同的用户查询预定
    if (authorId) {
      query.listing = { userId: authorId }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString()
      }
    }))

    return safeReservations
  } catch (error: any) {
    throw new Error(error)
  }
}

