import APIPermissions from '@/components/settings/APIPermissions';
import { listPages } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';

const APIPermissionsPage = async () => {
  const pages = await listPages();
  return (
    <section className='my-5'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-6 items-center'>
          <div className='flex gap-3 items-center'>
            <Link href='/app/settings'>
              <MdArrowBackIos className='h-6 w-6' />
            </Link>
            <h1 className='text-2xl'>API Permissions</h1>
          </div>
        </div>
      </div>
      <p className='mt-2 ml-9 text-sm'>
        Easily Manage the API endpoints for your pages here. Once enabled, you
        can view and manage your page content via the API.
      </p>
      <div className='my-5'>
        {pages.map((page) => (
          <APIPermissions key={page.id} page={page} />
        ))}
      </div>
    </section>
  );
};

export default APIPermissionsPage;
