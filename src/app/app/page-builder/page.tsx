import GlobalDrawer from '@/components/pagebuilder/GlobalDrawer';
import PageList from '@/components/pagebuilder/PageList';
import { listPages } from '@/lib/utils';
import { Metadata } from 'next';
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
      <section className='my-7 grid grid-cols-3'>
        {pages.map((page) => (
          <PageList pageProps={page} key={page.id} />
        ))}
      </section>
    </section>
  );
};

export default PageBuilderPage;
