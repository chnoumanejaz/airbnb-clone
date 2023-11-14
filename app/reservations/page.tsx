import ClientOnly from '../ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import EmptyState from '../components/EmptyState';
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

  if (!reservations || reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservations Found"
          subtitle="Looks like you don't have any reservations on your properties"
          showReset
          resetLabel="Explore others"
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
