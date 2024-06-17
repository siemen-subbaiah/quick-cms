export const dynamic = 'force-dynamic';

import { listPages } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import ContentNavItemList from './ContentNavItemList';

const ContentNavItems = async () => {
  const pages = await listPages();

  return (
    <>
      {pages.length >= 1 &&
        pages.map((page) => <ContentNavItemList key={page.id} page={page} />)}
      {pages.length === 0 && (
        <>
          <section className='pl-8'>
            <Image
              src='/empty-content-state.svg'
              alt='empty-state'
              width='150'
              height='150'
            />
          </section>
          <p className='text-[12px] text-center'>
            Click Page Builder to create your first page.
          </p>
        </>
      )}
    </>
  );
};

export default ContentNavItems;
