'use client';

import { signIn } from '@/auth';
import { SignIn } from '@/components/SignIn';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  return (
    // <section className='px-4 md:px-20 my-5'>
    //   <h1 className='text-2xl'>This is the landing page</h1>
    //   <form
    //     className='my-5'
    //     action={async () => {
    //       'use server';
    //       await signIn('google', {
    //         redirectTo: '/app',
    //       });
    //     }}
    //   >
    //     <Button>Signin with Google</Button>
    //   </form>
    // </section>
    <div className='h-[40rem] w-full rounded-md bg-[#020817] relative flex flex-col items-center justify-center antialiased'>
      <div className='max-w-2xl mx-auto p-4'>
        <h1 className='relative z-10 text-lg md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold'>
          Instant Headless CMS Setup for Developers on the Go
        </h1>
        <div className='flex items-center flex-col justify-center mt-5'>
          <SignIn />
          <Link href='/test-user' className='cursor-pointer z-50'>
            <Button variant='link'>Login as test user</Button>
          </Link>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default HomePage;
