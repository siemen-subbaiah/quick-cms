import { auth } from '@/auth';
import React from 'react';

const AppPage = async () => {
  const session = await auth();
  return (
    <section className='my-5'>
      <h1 className='text-2xl'>Hello {session?.user?.name}</h1>
      <h1 className='text-xl'>User ID {session?.user?.id}</h1>
    </section>
  );
};

export default AppPage;
