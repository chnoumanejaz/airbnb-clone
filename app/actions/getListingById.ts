import prisma from '@/app/libs/prismadb';
import { useRouter } from 'next/navigation';

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });

    if (!listing) return null;
    return listing;
  } catch (error: any) {
    // throw new Error(error);
    return null;
  }
}
