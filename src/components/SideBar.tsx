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
import ContentHeading from './contentbuilder/ContentHeading';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import Logo from './Logo';

const SideBar = () => {
  return (
    <aside className='border-r p-3 h-screen'>
      <ResizablePanelGroup direction='vertical'>
        <section className='flex justify-between'>
          <Logo width={120} height={120} />
          <ModeToggle />
        </section>
        <Separator />
        <ResizablePanel defaultSize={50}>
          <ContentHeading />
          <ScrollArea className='h-72'>
            <section className='flex flex-col mt-1 ml-1'>
              <ContentNavItems />
            </section>
          </ScrollArea>
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
