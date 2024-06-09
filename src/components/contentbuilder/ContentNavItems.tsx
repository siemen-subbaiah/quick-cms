export const dynamic = 'force-dynamic';

import { listPages } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

const ContentNavItems = async () => {
  const pages = await listPages();
  return (
    <>
      {pages.map((page) => {
        return (
          <Link
            className='my-0'
            key={page.id}
            href={`/app/content-builder/${page.apiName}`}
          >
            <Button className={`text-white relative right-4`} variant='link'>
              {page.displayName}
            </Button>
          </Link>
        );
      })}
    </>
  );
};

export default ContentNavItems;
