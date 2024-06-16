import { auth } from '@/auth';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Home',
  description: 'The home page of Quick CMS',
};

const AppPage = async () => {
  const session = await auth();

  return (
    <section className='my-2'>
      <h1 className='text-2xl'>Hello {session?.user?.name}</h1>
      <h1 className='text-xl'>User ID {session?.user?.id}</h1>
    </section>
  );
};

export default AppPage;
