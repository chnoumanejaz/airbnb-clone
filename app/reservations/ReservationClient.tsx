'use client';
import React, { useCallback, useState } from 'react';
import { SafeReservation, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import ListingCard from '../components/listings/ListingCard';

interface ReservationClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const handleCancle = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('');
          router.refresh();
        })
        .catch(err => {
          toast.error('Something went wrong. Try Again');
        })
        .finally(() => setDeletingId(''));
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map(reservation => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={handleCancle}
            disabled={deletingId === reservation.id}
            actionLabel={
              deletingId === reservation.id
                ? 'Cancling guest reservation...'
                : 'Cancle guest reservation'
            }
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
