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

const AlertField = ({ fieldId }: { fieldId: number }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFieldDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/delete-field/${fieldId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      setLoading(false);
      toast('Network error occured while deleting field');
    }

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        setOpen(false);
        setLoading(false);
        toast(data.message);
        router.refresh();
      } else {
        setLoading(false);
        toast(data.message);
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <MdDelete
          onClick={() => setOpen(true)}
          fontSize='1.5rem'
          style={{ cursor: 'pointer' }}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            concerned field.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={loading}
            onClick={handleFieldDelete}
            variant='destructive'
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertField;
