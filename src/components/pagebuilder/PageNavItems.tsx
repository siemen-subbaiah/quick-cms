'use client';

import React from 'react';
import { MdOutlineAccountCircle, MdOutlineBuildCircle } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PageNavItems = () => {
  const pathname = usePathname();

  return (
    <div className='my-2 flex flex-col'>
      <Link href='/app/page-builder'>
        <Button
          variant='link'
          className={`${
            pathname.includes('page-builder') ? 'text-primary' : 'text-white'
          } relative right-4`}
        >
          <MdOutlineBuildCircle fontSize='1.5rem' className='mr-2' />
          Page Builder
        </Button>
      </Link>
      <Link href='/app/settings'>
        <Button
          variant='link'
          className={`${
            pathname === '/app/settings' ? 'text-primary' : 'text-white'
          } relative right-4`}
        >
          <GoGear fontSize='1.5rem' className='mr-2' />
          Settings
        </Button>
      </Link>
      <Link href='/app/account'>
        <Button
          variant='link'
          className={`${
            pathname === '/app/account' ? 'text-primary' : 'text-white'
          } relative right-4`}
        >
          <MdOutlineAccountCircle fontSize='1.5rem' className='mr-2' />
          Account
        </Button>
      </Link>
    </div>
  );
};

export default PageNavItems;
