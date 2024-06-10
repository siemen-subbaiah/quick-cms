import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const LoadingPage = () => {
  return (
    <section className='my-5'>
      <div className='flex justify-between'>
        <Skeleton className='h-4 w-[200px]' />
        <Skeleton className='h-8 w-[100px]' />
      </div>
      <section className='my-5 grid grid-cols-3'>
        <Skeleton className='h-[170px] w-[350px] rounded-xl' />
        <Skeleton className='h-[170px] w-[350px] rounded-xl' />
        <Skeleton className='h-[170px] w-[350px] rounded-xl' />
      </section>
    </section>
  );
};

export default LoadingPage;
