'use client';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import useFavourite from '../hooks/useFavourite';
import { SafeUser } from '../types';

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavourited, toggleFavourite, isLoading } = useFavourite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavourite}
      className="relative hover:opacity-80 transition cursor-pointe ">
      {isLoading ? (
        <button
          disabled={isLoading}
          className="disabled:cursor-progress text-white font-bold absolute -top-[2px] -right-[2px] animate-spin">
          <BiLoaderCircle size={28} />
        </button>
      ) : (
        <>
          <AiOutlineHeart
            size={28}
            className="fill-white absolute -top-[2px] -right-[2px] "
          />
          <AiFillHeart
            size={24}
            className={hasFavourited ? 'fill-rose-500' : 'fill-neutral-500/10'}
          />
        </>
      )}
    </div>
  );
};

export default HeartButton;
