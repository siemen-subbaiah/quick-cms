export const dynamic = 'force-dynamic';

import GlobalDrawer from '@/components/pagebuilder/GlobalDrawer';
import PageList from '@/components/pagebuilder/PageList';
import { listPages } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

export const metadata: Metadata = {
  title: 'Page Builder',
  description: 'Build and configure the page fields in page builder',
};

const PageBuilderPage = async () => {
  const pages = await listPages();

  return (
    <section className='my-5'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl'>Page Builder</h1>
        <GlobalDrawer launchMode='create' />
      </div>
      {pages.length >= 1 ? (
        <section className='mt-3 flex flex-wrap gap-5'>
          {pages.map((page) => (
            <PageList pageProps={page} key={page.id} />
          ))}
        </section>
      ) : (
        <section className='flex mt-14 ml-14 flex-col items-center justify-center'>
          <Image
            src='/empty-pagebuilder-state.svg'
            alt='empty-state'
            width='550'
            height='550'
          />
          <p className='mt-5 relative right-[5.8rem] text-sm mb-2 text-[18px]'>
            Ready, set, create! Click the button to create your first page
          </p>
        </section>
      )}
    </section>
  );
};

export default PageBuilderPage;
