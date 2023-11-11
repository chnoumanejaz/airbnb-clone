import ClientOnly from '@/app/ClientOnly';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing)
    return (
      <ClientOnly>
        <EmptyState
          title="Nothing found"
          subtitle="The listing you are looking for is no longer available"
          showReset
          resetLabel="Explore More"
        />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
