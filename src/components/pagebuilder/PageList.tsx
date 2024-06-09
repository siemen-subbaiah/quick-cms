import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Page } from '@prisma/client';
import Link from 'next/link';

const PageList = ({ pageProps }: { pageProps: Page }) => {
  return (
    <Link href={`/app/page-builder/${pageProps.apiName}/${pageProps.id}`}>
      <Card className='w-[350px] cursor-pointer hover:scale-105 transition-all'>
        <CardHeader>
          <CardTitle className='text-2xl'>{pageProps.displayName} </CardTitle>
        </CardHeader>
        <CardContent>
          <p>API name : {pageProps.apiName}</p>
          <CardDescription>{pageProps.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PageList;
