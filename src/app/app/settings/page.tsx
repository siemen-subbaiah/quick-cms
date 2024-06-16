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
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

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
        <div className='p-3 bg-secondary rounded-sm my-2 w-1/5'>
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
        <div className='p-3 bg-secondary rounded-sm my-2 w-1/5'>
          <h2 className='font-semibold text-md'>Account Settings</h2>
        </div>
        <section>
          <CopyAPIKey apiKey={session?.user?.apiKey} />
          <form
            action={async () => {
              'use server';
              await signOut({
                redirectTo: '/',
              });
            }}
          >
            <Button type='submit'>Sign Out</Button>
          </form>
        </section>
      </section>
    </section>
  );
};

export default SettingsPage;
