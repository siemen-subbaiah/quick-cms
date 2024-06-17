import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fields } from '@/constants';
import { Button } from '../ui/button';
import {
  MdArrowRight,
  MdClose,
  MdOutlineKeyboardArrowLeft,
} from 'react-icons/md';
import { usePageBuilderStore } from '@/store/pagebuilder-store-provider';

const DataTypeList = ({
  launchMode,
  setOpen,
}: {
  launchMode: 'create' | 'edit' | 'add' | 'edit-form';
  setOpen: (state: boolean) => void;
}) => {
  const { proceedToFieldSelection, setFieldType } = usePageBuilderStore(
    (state) => state
  );

  return (
    <section className='w-2/4 mx-auto mt-5'>
      {launchMode !== 'add' && (
        <Button
          variant='ghost'
          className='mb-2'
          onClick={() => {
            proceedToFieldSelection(false);
            setFieldType(null);
          }}
        >
          <MdOutlineKeyboardArrowLeft fontSize='1.5rem' />
          Back
        </Button>
      )}
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle>Select Fields</CardTitle>
            {launchMode === 'add' && (
              <Button variant='outline' size='icon'>
                <MdClose
                  className='h-6 w-6'
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpen(false)}
                />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {fields.map((field) => {
            return (
              <section
                className='border p-2 rounded-md my-2 cursor-pointer hover:bg-primary-foreground transition-all'
                key={field.id}
                onClick={() => {
                  setFieldType(field.id);
                  proceedToFieldSelection(false);
                }}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <field.icon className={`${field.id === 4 && 'h-6 w-6'}`} />
                    <p className='text-sm'>{field.name}</p>
                  </div>
                  <MdArrowRight />
                </div>
              </section>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
};

export default DataTypeList;
