import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const LoadingPage = () => {
  return (
    <section className='my-5'>
      <div>
        <Skeleton className='h-4 w-[200px]' />
        <Skeleton className='h-4 w-[500px] mt-2' />
      </div>
      <section className='my-5'>
        <Skeleton className='h-[60px] w-full rounded-xl my-5' />
        <Skeleton className='h-[60px] w-full rounded-xl my-5' />
        <Skeleton className='h-[60px] w-full rounded-xl my-5' />
        <Skeleton className='h-[60px] w-full rounded-xl my-5' />
      </section>
    </section>
  );
};

export default LoadingPage;
