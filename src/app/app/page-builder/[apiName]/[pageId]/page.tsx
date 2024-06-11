import { getPage, listPageFields } from '@/lib/utils';
import React from 'react';
import { DataTable } from '@/components/pagebuilder/FieldsTable/DataTable';
import { columns } from '@/components/pagebuilder/FieldsTable/columns';
import GlobalDrawer from '@/components/pagebuilder/GlobalDrawer';
import AlertPage from '@/components/pagebuilder/AlertPage';
import Link from 'next/link';
import { MdArrowBackIos } from 'react-icons/md';
import { Button } from '@/components/ui/button';

const DetailPage = async ({
  params,
}: {
  params: { apiName: string; pageId: number };
}) => {
  const fields = await listPageFields(+params.pageId);
  const page = await getPage(+params.pageId);

  return (
    <>
      {page && (
        <section className='my-5'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-6 items-center'>
              <div className='flex gap-3 items-center'>
                <Link href='/app/page-builder'>
                  <MdArrowBackIos className='h-6 w-6' />
                </Link>
                <h1 className='text-2xl'>{page?.displayName}</h1>
              </div>
              <div className='flex gap-2 items-center'>
                <GlobalDrawer launchMode='edit-form' editPageProps={page} />
                <AlertPage pageId={page?.id as number} />
              </div>
            </div>
            <GlobalDrawer launchMode='add' pageId={+params.pageId} />
          </div>
          <p className='mt-3 ml-9 text-sm'>{page?.description}</p>

          <div className='my-5'>
            <DataTable columns={columns} data={fields} />
          </div>
        </section>
      )}
      {!page && (
        <section className='flex flex-col justify-center items-center mt-20'>
          <p className='text-xl'>No page found for this ID</p>
          <Link href='/app/page-builder' className='my-4'>
            <Button>Go to page builder</Button>
          </Link>
        </section>
      )}
    </>
  );
};

export default DetailPage;
