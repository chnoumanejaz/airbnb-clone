import React from 'react';
import { SafeListing, SafeUser } from '../types';
import Heading from '../components/Heading';
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';

interface FavouritesClientProps {
  currentUser?: SafeUser | null;
  favourites: SafeListing[] | null;
}

const FavouritesClient: React.FC<FavouritesClientProps> = ({
  favourites,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favourites"
        subtitle="List of places you have in your favourites"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favourites?.map(favourite => (
          <ListingCard
            key={favourite.id}
            currentUser={currentUser}
            data={favourite}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavouritesClient;
