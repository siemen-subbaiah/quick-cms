'use client';

import React from 'react';
import { Button } from './ui/button';
import { MdArrowBackIos } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <Button variant='ghost' size='icon' onClick={router.back}>
      <MdArrowBackIos className='w-4 h-4' />
    </Button>
  );
};

export default BackButton;
