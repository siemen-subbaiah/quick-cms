import { getPage, listPageFields } from '@/lib/utils';
import React from 'react';
import { DataTable } from '@/components/pagebuilder/FieldsTable/DataTable';
import { columns } from '@/components/pagebuilder/FieldsTable/columns';
import GlobalDrawer from '@/components/pagebuilder/GlobalDrawer';
import AlertPage from '@/components/pagebuilder/AlertPage';

const DetailPage = async ({
  params,
}: {
  params: { apiName: string; pageId: number };
}) => {
  const fields = await listPageFields(+params.pageId);
  const page = await getPage(+params.pageId);

  return (
    <section className='my-5'>
      <div className='flex justify-between'>
        <div className='flex gap-4 items-center'>
          <h1 className='text-2xl'>{page?.displayName}</h1>
          <div className='flex gap-2 items-center'>
            <GlobalDrawer launchMode='edit-form' editPageProps={page} />
            <AlertPage pageId={page?.id as number} />
          </div>
        </div>
        <GlobalDrawer launchMode='add' pageId={+params.pageId} />
      </div>

      <div className='my-5'>
        <DataTable columns={columns} data={fields} />
      </div>
    </section>
  );
};

export default DetailPage;
