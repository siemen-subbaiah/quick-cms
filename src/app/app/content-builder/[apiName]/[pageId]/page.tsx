import ContentFieldsSetup from '@/components/contentbuilder/ContentFieldsSetup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getPage, listPageFields, listWebHooks } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';

const ContentBuilderPage = async ({
  params,
}: {
  params: { apiName: string; pageId: number };
}) => {
  const fields = await listPageFields(+params.pageId);
  const page = await getPage(+params.pageId);
  const webHooks = await listWebHooks();

  return (
    <>
      {page && (
        <section className='my-5'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-6 items-center'>
              <div className='flex gap-3 items-center'>
                <Link href='/app'>
                  <MdArrowBackIos className='h-6 w-6' />
                </Link>
                <h1 className='text-2xl'>{page?.displayName}</h1>
              </div>
            </div>
          </div>
          <p className='mt-2 ml-9 text-sm'>{page?.description}</p>
          <section className='my-5'>
            <Card>
              <CardContent>
                <ContentFieldsSetup fields={fields} webHooks={webHooks} />
              </CardContent>
            </Card>
          </section>
        </section>
      )}
      {!page && (
        <section className='flex flex-col justify-center items-center mt-20'>
          <p className='text-xl'>No page found for this ID</p>
          <Link href='/app' className='my-4'>
            <Button>Go to Home</Button>
          </Link>
        </section>
      )}
    </>
  );
};

export default ContentBuilderPage;
