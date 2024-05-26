import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import React from 'react';

const HomePage = async () => {
  return (
    <section className='px-4 md:px-20 my-5'>
      <h1 className='text-2xl'>This is the landing page</h1>
      <form
        className='my-5'
        action={async () => {
          'use server';
          await signIn('google', {
            redirectTo: '/app',
          });
        }}
      >
        <Button>Signin with Google</Button>
      </form>
    </section>
  );
};

export default HomePage;
