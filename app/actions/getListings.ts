import { SafeListing } from './../types/index'
import prisma from '@/app/libs/prismadb'

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error)
  }
}

