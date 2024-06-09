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

const SideBar = () => {
  return (
    <aside className='border-r p-3 h-screen'>
      <ResizablePanelGroup direction='vertical'>
        <Link href='/app'>
          <Image
            src='/logo.svg'
            alt='logo'
            width='70'
            height='70'
            className='mb-5 mt-1'
          />
        </Link>
        <ResizablePanel defaultSize={50}>
          <span className='font-semibold'>Content Builder</span>
          <section className='flex flex-col mt-1'>
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
