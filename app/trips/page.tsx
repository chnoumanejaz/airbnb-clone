import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login to see the details"
          showReset
          resetLabel="Reserve Now"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (!reservations || reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you have'nt reserved any trips"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
