'use client';

import { FieldType } from '@/types/enums';
import { Field } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import {
  MdDateRange,
  MdEmail,
  MdImage,
  MdOutlineToggleOn,
  MdTextFields,
} from 'react-icons/md';
import GlobalDrawer from '../GlobalDrawer';
import AlertField from './AlertField';
import { TbSquareNumber1Filled } from 'react-icons/tb';

export const columns: ColumnDef<Field>[] = [
  {
    accessorKey: 'fieldName',
    header: 'Field Name',
  },
  {
    accessorKey: 'fieldType',
    header: 'Field Type',
    cell: ({ row }) => (
      <div className='capitalize flex items-center gap-2'>
        {row.getValue('fieldType') === 1 && (
          <MdTextFields className='h-4 w-4' />
        )}
        {row.getValue('fieldType') === 2 && (
          <MdOutlineToggleOn className='h-4 w-4' />
        )}
        {row.getValue('fieldType') === 3 && (
          <MdTextFields className='h-4 w-4' />
        )}
        {row.getValue('fieldType') === 4 && (
          <TbSquareNumber1Filled className='h-4 w-4' />
        )}
        {row.getValue('fieldType') === 5 && <MdEmail className='h-4 w-4' />}
        {row.getValue('fieldType') === 6 && <MdDateRange className='h-4 w-4' />}
        {row.getValue('fieldType') === 7 && <MdImage className='h-4 w-4' />}
        {FieldType[row.getValue('fieldType') as number]}
      </div>
    ),
  },
  {
    accessorKey: 'actions',
    enableHiding: false,
    header: '',
    cell: ({ row }) => {
      return (
        <div className='flex gap-2 items-center'>
          <GlobalDrawer launchMode='edit' editProps={row.original} />
          <AlertField fieldId={row.original.id} />
        </div>
      );
    },
  },
];
