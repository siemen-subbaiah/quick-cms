'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = ({ height, width }: { height: number; width: number }) => {
  const { resolvedTheme } = useTheme();

  return (
    <Link href='/app'>
      {resolvedTheme === 'dark' ? (
        <Image
          src='/logo.svg'
          alt='light-logo'
          width={width}
          height={height}
          className='mb-5 mt-1 relative bottom-[3px]'
        />
      ) : (
        <Image
          src='/logo-2.svg'
          alt='dark-logo'
          width={width}
          height={height}
          className='mb-5 mt-1 relative bottom-[3px]'
        />
      )}
    </Link>
  );
};

export default Logo;
