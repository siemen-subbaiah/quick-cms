import { auth, signOut } from '@/auth';
import CopyAPIKey from '@/components/settings/CopyAPIKey';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { MdOutlineLogout } from 'react-icons/md';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Settings page for Quick CMS',
};

const SettingsPage = async () => {
  const session = await auth();

  return (
    <section className='my-5'>
      <h1 className='text-2xl'>Settings</h1>
      <section className='my-5'>
        <div className='p-3 bg-secondary rounded-md my-2'>
          <h2 className='font-semibold text-md'>General Settings</h2>
        </div>

        <Link href='/app/settings/api-permissions'>
          <Card className='my-5 hover:bg-primary-foreground transition-all'>
            <CardHeader>
              <CardTitle>API Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Easily Manage the API endpoints for your pages. Once enabled,
                you can view and manage your page content via the API.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href='/app/settings/webhooks'>
          <Card className='my-5 hover:bg-primary-foreground transition-all'>
            <CardHeader>
              <CardTitle>Web Hooks</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Easily integrate your favorite deployment services like Netlify
                and Vercel by adding their build hook URLs.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </section>
      <section className='my-2'>
        <div className='p-3 bg-secondary rounded-md my-2'>
          <h2 className='font-semibold text-md'>Account Settings</h2>
        </div>
        <section>
          <CopyAPIKey apiKey={session?.user?.apiKey} />
          <div className='grid w-1/4 items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='username'>Username</Label>
              <Input id='username' value={session?.user?.name} disabled />
            </div>
            <div className='flex flex-col space-y-1.5 mt-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' value={session?.user?.email} disabled />
            </div>
          </div>

          <form
            className='my-4'
            action={async () => {
              'use server';
              await signOut({
                redirectTo: '/',
              });
            }}
          >
            <Button variant='destructive' type='submit'>
              <MdOutlineLogout className='h-5 w-5' /> Sign Out
            </Button>
          </form>
        </section>
      </section>
    </section>
  );
};

export default SettingsPage;
