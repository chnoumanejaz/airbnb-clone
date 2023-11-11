import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import ReservationClient from './ReservationClient';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login to see the details"
        />
      </ClientOnly>
    );

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservations Found"
          subtitle="Looks like you don't have any reservations on your properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
