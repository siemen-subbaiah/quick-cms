'use client';

import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MdContentCopy } from 'react-icons/md';
import toast from 'react-hot-toast';

const CopyAPIKey = ({ apiKey }: { apiKey: string }) => {
  const [textToCopy, setTextToCopy] = useState(apiKey);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast('API Key copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <section className='flex gap-2 items-center my-5'>
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor='apiKey'>API Key</Label>
        <Input type='text' id='apiKey' value={apiKey} disabled />
      </div>
      <Button
        variant='outline'
        size='icon'
        onClick={handleCopy}
        className='relative top-2'
      >
        <MdContentCopy className='w-4 h-4' />
      </Button>
    </section>
  );
};

export default CopyAPIKey;
