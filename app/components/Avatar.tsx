'use client';

import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full h-auto w-auto"
      src={src || '/images/placeholder.jpg'}
      height={30}
      width={30}
      alt="avatar"
    />
  );
};

export default Avatar;
