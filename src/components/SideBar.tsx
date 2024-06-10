import React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './ui/resizable';
import Link from 'next/link';
import Image from 'next/image';
import ContentNavItems from './contentbuilder/ContentNavItems';
import PageNavItems from './pagebuilder/PageNavItems';
import { ModeToggle } from './ThemeToggle';

const SideBar = () => {
  return (
    <aside className='border-r p-3 h-screen'>
      <ResizablePanelGroup direction='vertical'>
        <section className='flex justify-between'>
          <Link href='/app'>
            <Image
              src='/logo.svg'
              alt='logo'
              width='70'
              height='70'
              className='mb-5 mt-1'
            />
          </Link>
          <ModeToggle />
        </section>
        <ResizablePanel defaultSize={50}>
          <div className='p-2 bg-secondary flex items-center rounded-sm'>
            <span className='font-semibold text-md'>Content Builder</span>
          </div>
          <section className='flex flex-col mt-1 ml-1'>
            <ContentNavItems />
          </section>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <PageNavItems />
        </ResizablePanel>
      </ResizablePanelGroup>
    </aside>
  );
};

export default SideBar;
