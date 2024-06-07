'use client';

import React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './ui/resizable';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { signOut } from 'next-auth/react';
import { MdOutlineAccountCircle, MdOutlineBuildCircle } from 'react-icons/md';
import { GoGear } from 'react-icons/go';

const SideBar = () => {
  const pathname = usePathname();

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
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className='my-2 flex flex-col'>
            <Link href='/app/page-builder'>
              <Button
                variant='link'
                className={`${
                  pathname === '/app/page-builder'
                    ? 'text-primary'
                    : 'text-white'
                } relative right-4`}
              >
                <MdOutlineBuildCircle fontSize='1.5rem' className='mr-2' />
                Page Builder
              </Button>
            </Link>
            <Link href='/app/settings'>
              <Button
                variant='link'
                className={`${
                  pathname === '/app/settings' ? 'text-primary' : 'text-white'
                } relative right-4`}
              >
                <GoGear fontSize='1.5rem' className='mr-2' />
                Settings
              </Button>
            </Link>
            <Link href='/app/account'>
              <Button
                variant='link'
                className={`${
                  pathname === '/app/account' ? 'text-primary' : 'text-white'
                } relative right-4`}
              >
                <MdOutlineAccountCircle fontSize='1.5rem' className='mr-2' />
                Account
              </Button>
            </Link>
          </div>
        </ResizablePanel>
        <div className='fixed bottom-0'>
          <Button
            className='text-white relative right-[14px]'
            onClick={() => signOut()}
            variant='link'
          >
            <RiLogoutCircleLine fontSize='1.4rem' className='mr-2' />
            Log Out
          </Button>
        </div>
      </ResizablePanelGroup>
    </aside>
  );
};

export default SideBar;
