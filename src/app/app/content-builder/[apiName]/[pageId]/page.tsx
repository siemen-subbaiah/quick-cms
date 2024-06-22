import BackButton from '@/components/BackButton';
import ContentFieldsSetup from '@/components/contentbuilder/ContentFieldsSetup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { capitalize, getPage, listPageFields, listWebHooks } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export async function generateMetadata({
  params,
}: {
  params: { apiName: string; pageId: number };
}): Promise<Metadata> {
  return {
    title: `${capitalize(params.apiName)} - content`,
    description: `Build and configure the content for the ${params.apiName} page`,
  };
}

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
                <BackButton />
                <h1 className='text-2xl'>{page?.displayName}</h1>
              </div>
            </div>
          </div>
          <p className='mt-2 ml-12 text-sm'>{page?.description}</p>
          <section className='my-5'>
            <Card>
              <CardContent>
                {fields.length >= 1 ? (
                  <ContentFieldsSetup
                    fields={fields}
                    webHooks={webHooks}
                    page={page}
                  />
                ) : (
                  <section className='p-5 flex flex-col items-center justify-center'>
                    <Image
                      src='/empty-table-state.svg'
                      alt='empty-state'
                      width='280'
                      height='280'
                    />
                    <p className='text-sm mt-5 mb-2 text-[18px]'>
                      There are no fields added to {page.displayName} yet, add
                      atleast one field to fill content
                    </p>
                    <Button variant='link'>
                      <Link
                        href={`/app/page-builder/${page.apiName}/${page.id}`}
                      >
                        Add Field
                      </Link>
                    </Button>
                  </section>
                )}
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
