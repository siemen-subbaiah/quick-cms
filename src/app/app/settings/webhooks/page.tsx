import BackButton from '@/components/BackButton';
import WebHookModal from '@/components/settings/WebHookModal';
import { DataTable } from '@/components/settings/webhooks-table/DataTable';
import { columns } from '@/components/settings/webhooks-table/columns';
import { listWebHooks } from '@/lib/utils';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Webhooks',
  description: 'Manage the Webhooks for Quick CMS',
};

const WebHooksPage = async () => {
  const webHooks = await listWebHooks();
  return (
    <section className='my-5'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-6 items-center'>
          <div className='flex gap-3 items-center'>
            <BackButton />
            <h1 className='text-2xl'>Web Hooks</h1>
          </div>
        </div>
        <WebHookModal mode='create' />
      </div>
      <p className='mt-3 ml-12 text-sm'>
        Easily integrate your favorite deployment services like Netlify and
        Vercel by adding their build hook URLs. Whenever a page entry is added
        or updated, our system will automatically trigger the webhook, ensuring
        your site stays up-to-date with the latest content changes.
      </p>
      <div className='my-5'>
        <DataTable columns={columns} data={webHooks} />
      </div>
    </section>
  );
};

export default WebHooksPage;
