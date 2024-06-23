import React from 'react';
import Hero from '@/components/home/Hero';
import GetStarted from '@/components/home/GetStarted';
import CodeEx from '@/components/home/CodeEx';
import { Separator } from '@/components/ui/separator';

const HomePage = () => {
  return (
    <>
      <Hero />
      <section className='bg-black'>
        <GetStarted />
        <Separator />
        <CodeEx />
      </section>
    </>
  );
};

export default HomePage;
