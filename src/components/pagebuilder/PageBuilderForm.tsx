'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { usePageBuilderStore } from '@/store/pagebuilder-store-provider';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const PageBuilderForm = ({
  setOpen,
  launchMode,
  editPageProps,
}: {
  setOpen: (state: boolean) => void;
  launchMode: 'create' | 'edit' | 'add' | 'edit-form';
  editPageProps?: PageBuilder | null;
}) => {
  const { proceedToFieldSelection, setPageBuilderData, pageBuilderData } =
    usePageBuilderStore((state) => state);

  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [apiName, setApiName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pageBuilderData) {
      setDisplayName(pageBuilderData.displayName);
      setApiName(pageBuilderData.apiName);
      setDescription(pageBuilderData.description);
    }
    if (editPageProps) {
      setDisplayName(editPageProps.displayName);
      setApiName(editPageProps.apiName);
      setDescription(editPageProps.description);
    }
  }, [pageBuilderData, editPageProps]);

  const handleSelectFields = () => {
    if (launchMode !== 'edit-form') {
      proceedToFieldSelection(true);
      setPageBuilderData({
        displayName,
        apiName,
        description,
      });
    } else {
      toast.promise(
        editPage({
          id: editPageProps?.id as number,
          displayName,
          description,
        }),
        {
          loading: 'Loading...',
          success: <b>Page edited successfully</b>,
          error: <b>Unexpected error occured while editing the page</b>,
        }
      );
    }
  };

  const editPage = async (payload: {
    id: number;
    displayName: string;
    description: string;
  }) => {
    setLoading(true);
    const res = await fetch('/api/edit-page', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setLoading(false);
      toast('Network error occured while editing the page');
    }

    if (res.ok) {
      const data = await res.json();

      if (data.success) {
        setLoading(false);
        setOpen(false);
        router.refresh();
      } else {
        setLoading(false);
        toast(data.message);
      }
    }
  };

  return (
    <section className='w-2/4 mx-auto mt-5'>
      <Card>
        <CardHeader>
          <CardTitle>Page Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='displayName'>
                  Display Name <span className='text-red-500'>*</span>{' '}
                </Label>
                <Input
                  id='displayName'
                  placeholder='Name of your page'
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                    launchMode !== 'edit-form' &&
                      setApiName(e.target.value.toLowerCase());
                  }}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='apiName'>
                  API Name <span className='text-red-500'>*</span>{' '}
                </Label>
                <Input
                  disabled={launchMode === 'edit-form'}
                  id='apiName'
                  placeholder='API name of your page'
                  value={apiName}
                  onChange={(e) => setApiName(e.target.value)}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex gap-2'>
          <Button
            disabled={!displayName || !apiName || loading}
            onClick={handleSelectFields}
          >
            {launchMode !== 'edit-form' ? 'Select Fields' : 'Save'}
          </Button>
          <Button variant='ghost' onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default PageBuilderForm;
