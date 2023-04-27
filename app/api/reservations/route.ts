import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()
  // 没有用户登录，返回错误
  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { listingId, startDate, endDate, totalPrice } = body
  // 没有listingId，startDate，endDate，totalPrice，返回错误
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error()
  }
  // 创建预定
  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice
        }
      }
    }
  })
  // 返回预定
  return NextResponse.json(listingAndReservation)
}

