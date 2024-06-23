import { auth } from '@/auth';
import BarChart from '@/components/BarChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { barGraphData, listPagesWithFields } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Home',
  description: 'The home page of Quick CMS',
};

const AppPage = async () => {
  const pages = await listPagesWithFields();
  const enabledAPIs = pages.filter((page) => page.isAPIPublished);
  const { series, xAxisLabels } = barGraphData(pages);

  const isGraphEmpty = series.every((item) =>
    item.data.every((value) => value === 0)
  );

  return (
    <section className='my-5'>
      <h1 className='text-2xl'>Home</h1>
      <Card className='my-5'>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl'>Enabled APIs</h2>
            <Link href='/app/settings/api-permissions'>
              <Button variant='link'>API Permissions</Button>
            </Link>
          </div>
          <Separator />
        </CardHeader>
        {enabledAPIs.length >= 1 ? (
          <CardContent className='flex flex-wrap gap-5'>
            {enabledAPIs.map((item) => {
              return (
                <Card key={item.id} className='w-[350px] my-2'>
                  <CardHeader>
                    <CardTitle className='text-2xl'>
                      {item.displayName}{' '}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>API ID : {item.apiName}</p>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        ) : (
          <section className='flex flex-col items-center justify-center'>
            <Image
              src='/empty-widget-state.svg'
              alt='empty-state'
              width='280'
              height='280'
            />
            <p className='text-sm mb-5 text-[18px]'>
              Wondering why its empty? Click the API permissions button to learn
              more.
            </p>
          </section>
        )}
      </Card>
      {!isGraphEmpty ? (
        <BarChart series={series} xAxisLabels={xAxisLabels} />
      ) : (
        <Card>
          <CardHeader>
            <h2 className='text-xl'>Fields Count</h2>
          </CardHeader>
          <CardContent>
            <section className='flex flex-col items-center justify-center'>
              <Image
                src='/empty-widget-state.svg'
                alt='empty-state'
                width='280'
                height='280'
              />
              <p className='text-sm mb-5 text-[18px]'>
                Add some pages and fields for the graph to pop up
              </p>
            </section>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default AppPage;
