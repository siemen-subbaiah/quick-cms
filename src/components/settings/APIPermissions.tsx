'use client';

import { Page } from '@prisma/client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Switch } from '../ui/switch';
import toast from 'react-hot-toast';
import { debounce } from '@/lib/utils';
import { MdContentCopy } from 'react-icons/md';

const APIPermissions = ({ page, apiKey }: { page: Page; apiKey: string }) => {
  const [isAPIPublished, setIsAPIPublished] = useState(page.isAPIPublished);

  const handlePermissionChange = debounce((e: any) => {
    setIsAPIPublished(e);
    toast.promise(
      editPermission({
        id: page.id,
        isAPIPublished: e as boolean,
      }),
      {
        loading: 'Loading...',
        success: <b>API Permission changed</b>,
        error: <b>Unexpected error occured while changing API Permission</b>,
      }
    );
  }, 300);

  const editPermission = async (payload: {
    id: number;
    isAPIPublished: boolean;
  }) => {
    const res = await fetch('/api/edit-page', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      toast('Network error occured while changing API Permission');
    }

    if (res.ok) {
      await res.json();
    }
  };

  const handleAPICopy = (apiName: string) => {
    navigator.clipboard
      .writeText(`/api/${apiName}?apiKey=${apiKey}`)
      .then(() => {
        toast('API Endpoint copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <Card className='my-5'>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle>{page.displayName}</CardTitle>
          <Switch
            checked={isAPIPublished as boolean}
            onCheckedChange={(e) => handlePermissionChange(e)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <section className='flex items-center gap-3'>
          <CardDescription>
            API Endpoint : /api/{page.apiName}?apiKey={apiKey}
          </CardDescription>
          <MdContentCopy
            className='w-4 h-4 cursor-pointer'
            onClick={() => handleAPICopy(page.apiName)}
          />
        </section>
      </CardContent>
    </Card>
  );
};

export default APIPermissions;
