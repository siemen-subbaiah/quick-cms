'use client';

import React from 'react';
import {
  MdOutlineAccountCircle,
  MdOutlineBuildCircle,
  MdSettings,
} from 'react-icons/md';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

const PageNavItems = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <div className='my-2 flex flex-col'>
      <Link href='/app/page-builder'>
        <Button
          variant='link'
          className={`${
            pathname.includes('page-builder')
              ? 'text-primary'
              : theme === 'dark'
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
            pathname === '/app/settings'
              ? 'text-primary'
              : theme === 'dark'
              ? 'text-white'
              : 'text-dark'
          } relative right-4`}
        >
          <MdSettings className='mr-2 h-6 w-6' />
          Settings
        </Button>
      </Link>
      <Link href='/app/account'>
        <Button
          variant='link'
          className={`${
            pathname === '/app/account'
              ? 'text-primary'
              : theme === 'dark'
              ? 'text-white'
              : 'text-dark'
          } relative right-4`}
        >
          <MdOutlineAccountCircle className='mr-2 h-6 w-6' />
          Account
        </Button>
      </Link>
    </div>
  );
};

export default PageNavItems;
