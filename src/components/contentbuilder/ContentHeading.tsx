'use client';

import { reloadPageList } from '@/actions';
import React from 'react';
import { MdRefresh } from 'react-icons/md';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ContentHeading = () => {
  return (
    <div className='p-2 bg-secondary flex items-center justify-between rounded-sm'>
      <span className='font-semibold text-md'>Content Builder</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <MdRefresh
              className='h-5 w-5 cursor-pointer'
              onClick={() => reloadPageList()}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Refresh to see pages</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ContentHeading;
