import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

interface IParams {
  listingId?: string
}

//注意:不能使用默认导出,因为我们需要使用命名导出
// 添加操作
export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }
  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds.push(listingId)
  // 更新 favorite id 数据库
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  })

  return NextResponse.json(user)
}

// 删除操作
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.error()
  }
  const { listingId } = params
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }
  let favoriteIds = [...(currentUser.favoriteIds || [])]
  favoriteIds = favoriteIds.filter((id) => id !== listingId)
  // 更新 favorite id 数据库
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  })
  return NextResponse.json(user)
}

