'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { SafeListing, SafeUser } from '../types';

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const handleCancle = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Property deleted Successfully!');
          router.refresh();
        })
        .catch(error => {
          toast.error('Something went wrong. Please try again');
        })
        .finally(() => setDeletingId(''));
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties " />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={handleCancle}
            disabled={deletingId === listing.id}
            actionLabel={
              deletingId === listing.id
                ? 'Deleting Property...'
                : 'Delete Property'
            }
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
