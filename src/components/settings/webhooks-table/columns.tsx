'use client';

import { Switch } from '@/components/ui/switch';
import { debounce } from '@/lib/utils';
import { WebHook } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import AlertWebHook from './AlertWebHook';
import WebHookModal from '../WebHookModal';

export const columns: ColumnDef<WebHook>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'url',
    header: 'URL',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: function StatusCell({ row }) {
      const [status, setStatus] = useState(row.original.status);
      const router = useRouter();

      const handleEditStatus = debounce((e: any) => {
        setStatus(e);
        toast.promise(
          editStatus({
            id: row.original.id,
            status: e,
          }),
          {
            loading: 'Loading...',
            success: <b>Status changed successfully</b>,
            error: <b>Unexpected error occured while editing webhook</b>,
          }
        );
      }, 300);

      const editStatus = async (payload: { id: number; status: boolean }) => {
        const res = await fetch('/api/edit-webhook', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          toast('Network error occured while editing webhook');
        }

        if (res.ok) {
          await res.json();
          router.refresh();
        }
      };

      return (
        <>
          <Switch
            checked={status as boolean}
            onCheckedChange={(e) => handleEditStatus(e)}
          />
        </>
      );
    },
  },
  {
    accessorKey: 'actions',
    enableHiding: false,
    header: '',
    cell: ({ row }) => {
      return (
        <div className='flex gap-2 items-center'>
          <WebHookModal mode='edit' editProps={row.original} />
          <AlertWebHook webHookId={row.original.id} />
        </div>
      );
    },
  },
];
