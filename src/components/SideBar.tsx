import React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './ui/resizable';
import { auth, signOut } from '@/auth';
import { Button } from './ui/button';

const SideBar = async () => {
  const session = await auth();
  return (
    <aside className='border-r p-3 h-screen'>
      <ResizablePanelGroup direction='vertical'>
        <ResizablePanel defaultSize={50}>
          <span className='font-semibold'>Content Builder</span>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className='my-2'>
            <span className='font-semibold'>Page Builder</span>
            {session?.user && (
              <form
                className='my-2'
                action={async () => {
                  'use server';
                  await signOut({
                    redirectTo: '/',
                  });
                }}
              >
                <Button type='submit'>Sign Out</Button>
              </form>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </aside>
  );
};

export default SideBar;
