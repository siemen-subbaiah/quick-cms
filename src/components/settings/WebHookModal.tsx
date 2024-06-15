'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MdAdd, MdEdit } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { WebHook } from '@prisma/client';

const WebHookModal = ({
  mode,
  editProps,
}: {
  mode: 'create' | 'edit';
  editProps?: WebHook;
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setURL] = useState('');
  const [id, setId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editProps) {
      setName(editProps.name);
      setURL(editProps.url);
      setId(editProps.id);
    }
  }, [editProps]);

  const handleAddOrEditWebHook = (e: any) => {
    e.preventDefault();
    if (mode === 'create') {
      toast.promise(
        addHook({
          name,
          url,
          status: true,
        }),
        {
          loading: 'Loading...',
          success: <b>Webhook added successfully</b>,
          error: <b>Unexpected error occured while adding the webhook</b>,
        }
      );
    } else {
      toast.promise(
        editHook({
          id: id as number,
          name,
          url,
        }),
        {
          loading: 'Loading...',
          success: <b>Webhook edited successfully</b>,
          error: <b>Unexpected error occured while editing the webhook</b>,
        }
      );
    }
  };

  const addHook = async (payload: {
    name: string;
    url: string;
    status: boolean;
  }) => {
    setLoading(true);
    const res = await fetch('/api/create-webhook', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setLoading(false);
      toast('Network error occured while adding webhook');
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

  const editHook = async (payload: {
    id: number;
    name: string;
    url: string;
  }) => {
    setLoading(true);
    const res = await fetch('/api/edit-webhook', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setLoading(false);
      toast('Network error occured while editing webhook');
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'create' ? (
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            <MdAdd className='mr-2 h-6 w-6' />
            Add Web Hook
          </Button>
        ) : (
          <MdEdit
            onClick={() => setOpen(true)}
            fontSize='1.5rem'
            style={{ cursor: 'pointer' }}
          />
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Web Hook</DialogTitle>
        </DialogHeader>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>
                Name <span className='text-red-500'>*</span>{' '}
              </Label>
              <Input
                id='name'
                placeholder='Enter the name of the hook'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='url'>
                URL <span className='text-red-500'>*</span>{' '}
              </Label>
              <Input
                id='url'
                placeholder='Paste the build hook URL from netlify or vercel here'
                value={url}
                onChange={(e) => setURL(e.target.value)}
              />
            </div>
          </div>
        </form>
        <DialogFooter className='sm:justify-start'>
          <Button
            disabled={!name || !url || loading}
            type='submit'
            onClick={handleAddOrEditWebHook}
          >
            Save
          </Button>
          <DialogClose asChild>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WebHookModal;
