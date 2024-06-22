'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';
import { HiSparkles } from 'react-icons/hi2';
import { Input } from '../ui/input';
import toast from 'react-hot-toast';
import { Textarea } from '../ui/textarea';
import { Skeleton } from '../ui/skeleton';
import { MdContentCopy } from 'react-icons/md';

const GenerateContentModal = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [AIContent, setAIContent] = useState('');

  const handleGenerateContent = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/generate-content', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (res.ok) {
      setAIContent(data?.aiContent);
      setLoading(false);
    } else {
      toast('Something went wrong while generating content from AI');
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(AIContent)
      .then(() => {
        toast('content copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='absolute bottom-2 right-2' asChild>
            <DialogTrigger asChild>
              <Button variant='outline' size='icon'>
                <HiSparkles className='w-5 h-5 text-[#FFF618]' />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Generate content with AI</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className='sm:max-w-[550px]'>
        <DialogHeader>
          <DialogTitle>Generate Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleGenerateContent}>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Input
                type='text'
                placeholder='Tell me your content, AI will help you build it'
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
              />
            </div>
          </div>
          {loading && <Skeleton className='h-32 w-full my-5' />}
          {!loading && AIContent && (
            <div className='grid w-full items-center gap-4 mt-5'>
              <div className='flex flex-col space-y-1.5'>
                <Textarea
                  value={AIContent}
                  onChange={(e) => setAIContent(e.target.value)}
                  rows={6}
                  cols={6}
                />
              </div>
            </div>
          )}
        </form>
        <DialogFooter className='sm:justify-between items-center'>
          <div className='flex items-center'>
            <Button
              onClick={handleGenerateContent}
              disabled={!prompt || loading}
              type='submit'
            >
              <HiSparkles className='mr-2 w-5 h-5 text-[#FFF618]' />
              Generate Content
            </Button>
            <DialogClose asChild>
              <Button variant='ghost'>Cancel</Button>
            </DialogClose>
          </div>
          {AIContent && (
            <TooltipProvider>
              <Tooltip>
                <Button
                  asChild
                  variant='outline'
                  size='icon'
                  onClick={handleCopy}
                >
                  <TooltipTrigger>
                    <MdContentCopy className='w-4 h-4' />
                    <TooltipContent>Copy to clipboard</TooltipContent>
                  </TooltipTrigger>
                </Button>
              </Tooltip>
            </TooltipProvider>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateContentModal;
