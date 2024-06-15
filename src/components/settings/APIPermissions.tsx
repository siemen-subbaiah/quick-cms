'use client';

import { Page } from '@prisma/client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import toast from 'react-hot-toast';
import { debounce } from '@/lib/utils';

const APIPermissions = ({ page }: { page: Page }) => {
  const [isPublished, setIsPublished] = useState(page.isPublished);

  const handlePermissionChange = debounce((e: any) => {
    setIsPublished(e);
    toast.promise(
      editPermission({
        id: page.id,
        isPublished: e as boolean,
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
    isPublished: boolean;
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

  return (
    <Card className='my-5'>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle>{page.displayName}</CardTitle>
          <Switch
            checked={isPublished as boolean}
            onCheckedChange={(e) => handlePermissionChange(e)}
          />
        </div>
      </CardHeader>
    </Card>
  );
};

export default APIPermissions;
