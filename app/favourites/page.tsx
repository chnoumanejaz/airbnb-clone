import React from 'react';
import ClientOnly from '../ClientOnly';
import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getFavouriteListing from '../actions/getFavouriteListing';
import FavouritesClient from './FavouritesClient';

const FavouritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favourites = await getFavouriteListing();

  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login to see the favourites"
        />
      </ClientOnly>
    );

  if (favourites?.length === 0)
    return (
      <ClientOnly>
        <EmptyState
          title="No favourites"
          subtitle="Looks like you don't have any favourite listing."
          showReset
          resetLabel="Add some favourites"
        />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <FavouritesClient favourites={favourites} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavouritesPage;
