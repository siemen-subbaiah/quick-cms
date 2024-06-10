'use client';

import React, { useState } from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Button } from '../ui/button';
import PageBuilderForm from './PageBuilderForm';
import DataTypeList from './DataTypeList';
import { usePageBuilderStore } from '@/store/pagebuilder-store-provider';
import FieldSetup from './FieldSetup';
import { MdAdd, MdEdit } from 'react-icons/md';

const GlobalDrawer = (drawerProps: DrawerProps) => {
  const { showFieldSelection, fieldType, proceedToFieldSelection } =
    usePageBuilderStore((state) => state);

  const [open, setOpen] = useState(false);

  return (
    <Drawer dismissible={false} open={open}>
      {drawerProps.launchMode === 'create' && (
        <Button onClick={() => setOpen(true)}>
          <MdAdd className='mr-2 h-6 w-6' />
          Create
        </Button>
      )}
      {drawerProps.launchMode === 'add' && (
        <Button
          onClick={() => {
            proceedToFieldSelection(true);
            setOpen(true);
          }}
        >
          <MdAdd className='mr-2 h-6 w-6' />
          Add Another Field
        </Button>
      )}
      {drawerProps.launchMode === 'edit' && (
        <MdEdit
          fontSize='1.5rem'
          style={{ cursor: 'pointer' }}
          onClick={() => setOpen(true)}
        />
      )}
      {drawerProps.launchMode === 'edit-form' && (
        <Button variant='outline' size='icon'>
          <MdEdit
            className='h-4 w-4'
            onClick={() => {
              proceedToFieldSelection(false);
              setOpen(true);
            }}
          />
        </Button>
      )}
      <DrawerContent className='p-5 mt-5'>
        {/* non edit launch! */}
        {!drawerProps.editProps &&
          !showFieldSelection &&
          fieldType === null && (
            <PageBuilderForm
              setOpen={setOpen}
              launchMode={drawerProps.launchMode}
              editPageProps={drawerProps.editPageProps}
            />
          )}
        {!drawerProps.editProps && showFieldSelection && fieldType === null && (
          <DataTypeList launchMode={drawerProps.launchMode} setOpen={setOpen} />
        )}
        {!drawerProps.editProps &&
          !showFieldSelection &&
          fieldType !== null && (
            <FieldSetup
              pageId={drawerProps.pageId}
              fieldType={fieldType}
              setOpen={setOpen}
              launchMode={drawerProps.launchMode}
            />
          )}

        {/* edit launch! */}
        {drawerProps.editProps && (
          <FieldSetup
            editProps={drawerProps.editProps}
            fieldType={drawerProps.editProps?.fieldType}
            setOpen={setOpen}
            launchMode={drawerProps.launchMode}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default GlobalDrawer;
