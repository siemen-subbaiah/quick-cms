import { auth } from '@/auth';
import BarChart from '@/components/BarChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { barGraphData, listPagesWithFields } from '@/lib/utils';
import { Metadata } from 'next';
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

  return (
    <section className='my-5'>
      <h1 className='text-2xl'>Home</h1>
      <Card className='my-5'>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl'>Enabled APIs</h2>
            <Link href='/settings/api-permissions'>
              <Button variant='link'>API Permissions</Button>
            </Link>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className='grid grid-cols-3'>
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
      </Card>
      <BarChart series={series} xAxisLabels={xAxisLabels} />
    </section>
  );
};

export default AppPage;
