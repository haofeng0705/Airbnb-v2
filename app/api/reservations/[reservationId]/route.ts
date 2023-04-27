import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

interface IParams {
  reservationId?: string
}

// 根据 id 获取预约信息
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()
  // 如果没有登录，返回 401
  if (!currentUser) {
    return NextResponse.error()
  }

  const { reservationId } = params
  // 如果没有传入 id 或者 id 不是字符串，报错
  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID')
  }
  // 根据 id 删除预约信息,保证能删除信息的只有创建者和房东
  const reservation = await prisma.reservation.deleteMany({
    where: {
      // 只能删除自己的预约信息
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }]
    }
  })

  return NextResponse.json(reservation)
}

