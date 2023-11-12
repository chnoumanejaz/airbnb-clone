'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      src="/images/logo.png"
      alt="airbnb logo"
      height={100}
      width={100}
      priority={true}
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer w-auto h-auto"
    />
  );
};

export default Logo;
