import ClientOnly from '../ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import EmptyState from '../components/EmptyState';
import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login to see the details"
        />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (!listings || listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties found"
          subtitle="Looks like you don't have any property"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
