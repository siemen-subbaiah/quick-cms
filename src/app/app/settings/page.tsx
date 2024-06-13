import { auth, signOut } from '@/auth';
import CopyAPIKey from '@/components/CopyAPIKey';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

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
          <div className='border p-4 rounded-sm my-5 hover:bg-primary-foreground transition-all'>
            <h1 className='text-2xl'>API Permissions</h1>
            <p className='mt-2'>
              Easily Manage the API endpoints for your pages. Once enabled, you
              can view and manage your page content via the API.
            </p>
          </div>
        </Link>
        <Link href='/app/settings/webhooks'>
          <div className='border p-4 rounded-sm my-5 hover:bg-primary-foreground transition-all'>
            <h1 className='text-2xl'>Web Hooks</h1>
            <p className='mt-2'>
              Easily integrate your favorite deployment services like Netlify
              and Vercel by adding their build hook URLs.
              {/* Whenever a page entry
              is added or updated, our system will automatically trigger the
              webhook, ensuring your site stays up-to-date with the latest
              content changes. */}
            </p>
          </div>
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
