import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getFavouriteListing() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])],
        },
      },
    });

    const safeFavourites = favourites.map(favourite => {
      return { ...favourite, createdAt: favourite.createdAt.toISOString() };
    });

    return safeFavourites;
  } catch (error: any) {
    return null;
  }
}
