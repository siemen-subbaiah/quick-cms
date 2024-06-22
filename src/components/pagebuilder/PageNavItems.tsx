'use client';

import React from 'react';
import {
  MdOutlineBuildCircle,
  MdOutlineHome,
  MdSettings,
} from 'react-icons/md';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

const PageNavItems = () => {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  return (
    <div className='my-2 flex flex-col'>
      <Link href='/app'>
        <Button
          variant='link'
          className={`${
            pathname === '/app'
              ? 'text-primary'
              : resolvedTheme === 'dark'
              ? 'text-white'
              : 'text-dark'
          } relative right-4 `}
        >
          <MdOutlineHome className='mr-2 h-6 w-6' />
          Home
        </Button>
      </Link>
      <Link href='/app/page-builder'>
        <Button
          variant='link'
          className={`${
            pathname.includes('page-builder')
              ? 'text-primary'
              : resolvedTheme === 'dark'
              ? 'text-white'
              : 'text-dark'
          } relative right-4 `}
        >
          <MdOutlineBuildCircle className='mr-2 h-6 w-6' />
          Page Builder
        </Button>
      </Link>
      <Link href='/app/settings'>
        <Button
          variant='link'
          className={`${
            pathname.includes('/settings')
              ? 'text-primary'
              : resolvedTheme === 'dark'
              ? 'text-white'
              : 'text-dark'
          } relative right-4`}
        >
          <MdSettings className='mr-2 h-6 w-6' />
          Settings
        </Button>
      </Link>
    </div>
  );
};

export default PageNavItems;
