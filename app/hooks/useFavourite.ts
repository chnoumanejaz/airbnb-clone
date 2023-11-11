import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { SafeUser } from '../types';
import useLoginModal from './useLoginModal';

interface IUseFavourite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) return loginModal.onOpen();

      try {
        let request;

        if (hasFavourited) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }

        setIsLoading(true);
        await request();
        router.refresh();
        if (hasFavourited) {
          toast.success('Listing removed from your favourites');
        } else {
          toast.success('Listing added to your favourites');
        }
        setIsLoading(false);
      } catch (error) {
        toast.error('Something went wrong! Please Try Again');
      }
    },
    [currentUser, hasFavourited, listingId, loginModal, router]
  );

  return {
    hasFavourited,
    toggleFavourite,
    isLoading,
  };
};

export default useFavourite;
