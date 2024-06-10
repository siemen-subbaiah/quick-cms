'use client';

import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { MdDelete } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AlertPage = ({ pageId }: { pageId: number }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePageDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/delete-page/${pageId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      setLoading(false);
      toast('Network error occured while deleting page');
    }

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        setOpen(false);
        setLoading(false);
        toast(data.message);
        router.push('/app/page-builder');
      } else {
        setLoading(false);
        toast(data.message);
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <MdDelete onClick={() => setOpen(true)} className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            entire page and all its fields
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={loading}
            onClick={handlePageDelete}
            variant='destructive'
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertPage;
