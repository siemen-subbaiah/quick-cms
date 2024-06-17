import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Page } from '@prisma/client';
import Link from 'next/link';

const PageList = ({ pageProps }: { pageProps: Page }) => {
  return (
    <Link href={`/app/page-builder/${pageProps.apiName}/${pageProps.id}`}>
      <Card className='w-[350px] cursor-pointer hover:bg-primary-foreground transition-all my-2'>
        <CardHeader>
          <CardTitle className='text-2xl'>{pageProps.displayName} </CardTitle>
        </CardHeader>
        <CardContent>
          <p>API ID : {pageProps.apiName}</p>
          <p>
            Created At : {new Date(pageProps.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PageList;
