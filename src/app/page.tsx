import React from 'react';
import Hero from '@/components/home/Hero';
import GetStarted from '@/components/home/GetStarted';
import CodeEx from '@/components/home/CodeEx';
import { Separator } from '@/components/ui/separator';
import Features from '@/components/home/Features';
import Footer from '@/components/home/Footer';

const HomePage = () => {
  return (
    <>
      <Hero />
      <section className='bg-black'>
        <GetStarted />
        <Separator />
        <CodeEx />
        <Separator />
        <Features />
        <Footer />
      </section>
    </>
  );
};

export default HomePage;
