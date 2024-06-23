'use client';

import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useState } from 'react';

export function SignIn() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn('google', { redirectTo: '/app' });
  };

  return (
    <div className='flex justify-center flex-col items-center'>
      <button
        disabled={loading}
        onClick={handleSignIn}
        className='mt-5 bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block'
      >
        <span className='absolute inset-0 overflow-hidden rounded-full'>
          <span className='absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
        </span>
        <div className='relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 '>
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 48 48'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            style={{ display: 'block', width: 18, height: 18 }}
          >
            <path
              fill='#EA4335'
              d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
            />
            <path
              fill='#4285F4'
              d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
            />
            <path
              fill='#FBBC05'
              d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
            />
            <path
              fill='#34A853'
              d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
            />
            <path fill='none' d='M0 0h48v48H0z' />
          </svg>
          <span>Sign in with Google</span>
        </div>
        <span className='absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40' />
      </button>
      <Link href='/test-user' className='cursor-pointer z-50'>
        <Button className='text-white' variant='link' size='sm'>
          Login as test user
        </Button>
      </Link>
    </div>
  );
}
