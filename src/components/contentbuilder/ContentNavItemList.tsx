'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

const ContentNavItemList = ({ page }: { page: any }) => {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  return (
    <Link
      className='my-0'
      key={page.id}
      href={`/app/content-builder/${page.apiName}/${page.id}`}
    >
      <Button
        className={`${
          pathname === `/app/content-builder/${page.apiName}/${page.id}`
            ? 'text-primary'
            : resolvedTheme === 'dark'
            ? 'text-white'
            : 'text-dark'
        } relative right-4`}
        variant='link'
      >
        {page.displayName}
      </Button>
    </Link>
  );
};

export default ContentNavItemList;
