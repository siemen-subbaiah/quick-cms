import { auth } from '@/auth';
import BackButton from '@/components/BackButton';
import APIPermissions from '@/components/settings/APIPermissions';
import { listPages } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

export const metadata: Metadata = {
  title: 'API Permissions',
  description: 'Manage the API endpoints for your pages here',
};

const APIPermissionsPage = async () => {
  const pages = await listPages();
  const session = await auth();

  return (
    <section className='my-5'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-6 items-center'>
          <div className='flex gap-3 items-center'>
            <BackButton />
            <h1 className='text-2xl'>API Permissions</h1>
          </div>
        </div>
      </div>
      <p className='mt-2 ml-12 text-sm'>
        Easily Manage the API endpoints for your pages here. Once enabled, you
        can view and manage your page content via the API.
      </p>
      <div className='my-5'>
        {pages.length >= 1 ? (
          pages.map((page) => (
            <APIPermissions
              key={page.id}
              page={page}
              apiKey={session?.user.apiKey}
            />
          ))
        ) : (
          <section className='flex mt-32 flex-col items-center justify-center'>
            <Image
              src='/empty-table-state.svg'
              alt='empty-state'
              width='280'
              height='280'
            />
            <p className='mt-5 text-sm mb-2 text-[18px]'>
              API Permissions are empty, add some pages to see data here
            </p>
          </section>
        )}
      </div>
    </section>
  );
};

export default APIPermissionsPage;
