import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    location,
    roomCount,
    guestCount,
    bathroomCount,
    price,
  } = body;

  if (
    !title ||
    !description ||
    !imageSrc ||
    !category ||
    !location ||
    !roomCount ||
    !guestCount ||
    !bathroomCount ||
    !price
  )
    return NextResponse.error();

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      guestCount,
      bathroomCount,
      price: parseInt(price, 10),
      locationValue: location.value,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
