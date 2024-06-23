'use client';

import { HeroHighlight } from '@/components/ui/hero-highlight';
import React from 'react';
import { motion } from 'framer-motion';
import { SignIn } from '../SignIn';
import Image from 'next/image';

const Hero = () => {
  return (
    <HeroHighlight>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className='flex justify-center'
      >
        <Image
          src='/logo.svg'
          alt='logo'
          width={200}
          height={200}
          className='mb-5 mt-1 relative bottom-[3px]'
        />
      </motion.div>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className='text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto '
      >
        Instant Headless CMS Setup for Developers on the Go
      </motion.h1>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >
        <SignIn />
      </motion.div>
    </HeroHighlight>
  );
};

export default Hero;
