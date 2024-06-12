import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const LoadingPage = () => {
  return (
    <section className='my-5'>
      <Skeleton className='h-4 w-[200px]' />
      <section className='my-5'>
        <Skeleton className='h-[350px] w-full rounded-xl my-3' />
      </section>
    </section>
  );
};

export default LoadingPage;
