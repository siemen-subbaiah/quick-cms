import GlobalDrawer from '@/components/pagebuilder/GlobalDrawer';
import PageList from '@/components/pagebuilder/PageList';
import { listPages } from '@/lib/utils';
import React from 'react';

const PageBuilderPage = async () => {
  const pages = await listPages();

  return (
    <section className='my-5'>
      <div className='flex justify-between'>
        <h1 className='text-xl'>Page Builder</h1>
        <GlobalDrawer launchMode='create' />
      </div>
      <section className='my-5 grid grid-cols-3'>
        {pages.map((page) => (
          <PageList pageProps={page} key={page.id} />
        ))}
      </section>
    </section>
  );
};

export default PageBuilderPage;
