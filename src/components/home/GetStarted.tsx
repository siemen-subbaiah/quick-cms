'use client';

import React from 'react';
import { HoverEffect } from '../ui/card-hover-effect';
import { Highlight } from '../ui/hero-highlight';

const GetStarted = () => {
  const items = [
    {
      title: 'Sign up',
      description:
        'Easily sign in with google or a test account to test the application',
    },
    {
      title: 'Configure',
      description: 'Create pages and configure the required fields',
    },
    {
      title: 'Add Content',
      description: 'After creating the page add content and generate the API',
    },
  ];

  return (
    <section className='p-10'>
      <Highlight className='text-white text-3xl text-center'>
        Get started in 3 simple steps!
      </Highlight>
      {/* <h1 className='text-3xl text-center'>Get started in 3 simple steps!</h1> */}
      <div className='max-w-5xl mx-auto px-8'>
        <HoverEffect items={items} />
      </div>
    </section>
  );
};

export default GetStarted;
