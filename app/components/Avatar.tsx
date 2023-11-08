'use client';

import Image from 'next/image';
import React from 'react';

const Avatar = () => {
  return (
    <Image
      className="rounded-full h-auto w-auto"
      src="/images/placeholder.jpg"
      height={30}
      width={30}
      alt="avatar"
    />
  );
};

export default Avatar;
