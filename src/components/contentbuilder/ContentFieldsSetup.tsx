'use client';

import { Field } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { FieldType } from '@/types/enums';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ContentFieldsSetup = ({ fields }: { fields: Field[] }) => {
  const router = useRouter();

  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const [value, setValue] = useState(
    [...fields].map((field) => {
      return {
        id: field.id,
        fieldType: field.fieldType,
        fieldName: field.fieldName,
        value: field.value
          ? field.value
          : field.defaultValue
          ? field.defaultValue
          : '',
        defaultValue: field.defaultValue,
        isRequired: field.isRequired,
        isShortText: field.isShortText,
      };
    })
  );

  const setterValue = (currentValue: StateField, val: string) => {
    setValue((prevState) =>
      prevState.map((field) =>
        field.id === currentValue.id ? { ...field, value: val } : field
      )
    );
  };

  useEffect(() => {
    const dateField = fields.find(
      (field) => field.fieldType === FieldType.Date
    );
    if (dateField && dateField.defaultValue) {
      setDate(new Date(dateField.defaultValue));
    }
  }, [fields]);

  useEffect(() => {
    const allRequiredFieldsFilled = value.every((field) => {
      return !field.isRequired || (field.isRequired && field.value);
    });
    setIsSaveDisabled(!allRequiredFieldsFilled);
  }, [value]);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setValue((prevState) =>
        prevState.map((field) =>
          field.fieldType === FieldType.Date
            ? { ...field, value: selectedDate.toISOString() }
            : field
        )
      );
    }
  };

  const handleValueSave = () => {
    const payload = value.filter((field) => field.value);
    toast.promise(updateFields(payload), {
      loading: 'Loading...',
      success: <b>Fields updated successfully</b>,
      error: <b>Unexpected error occured while updating the fields</b>,
    });
  };

  const updateFields = async (payload: StateField[]) => {
    setLoading(true);
    const res = await fetch('/api/update-value', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setLoading(false);
      toast('Network error occured while updating the fields');
    }

    if (res.ok) {
      const data = await res.json();

      if (data.success) {
        setLoading(false);
        router.refresh();
      } else {
        setLoading(false);
        toast(data.message);
      }
    }
  };

  return (
    <>
      {value.map((val) => {
        return (
          <div className='my-5 w-1/2' key={val.id}>
            <section className='my-2'>
              {val.fieldType === FieldType.Text && (
                <div className='flex flex-col space-y-1.5 my-7'>
                  <Label htmlFor={val.fieldName}>
                    {val.fieldName}{' '}
                    {val.isRequired && <span className='text-red-500'>*</span>}
                  </Label>
                  <Input
                    type='text'
                    id={val.fieldName}
                    value={val.value}
                    onChange={(e) => setterValue(val, e.target.value)}
                  />
                </div>
              )}
              {val.fieldType === FieldType.Boolean && (
                <div className='flex items-center gap-2 space-y-1.5 my-7'>
                  <Switch
                    id={val.fieldName}
                    checked={val.value === 'true' ? true : false}
                    onCheckedChange={(e) =>
                      setterValue(val, e ? 'true' : 'false')
                    }
                  />
                  <Label htmlFor={val.fieldName} className='relative bottom-1'>
                    {val.fieldName}{' '}
                    {val.isRequired && <span className='text-red-500'>*</span>}
                  </Label>
                </div>
              )}
              {/* {val.fieldType === FieldType.RichText && (
                <div className='flex items-center gap-2 space-y-1.5 my-7'>
                  coming soon...
                </div>
              )} */}
              {val.fieldType === FieldType.Number && (
                <div className='flex flex-col space-y-1.5 my-7'>
                  <Label htmlFor={val.fieldName}>
                    {val.fieldName}{' '}
                    {val.isRequired && <span className='text-red-500'>*</span>}
                  </Label>
                  <Input
                    type='number'
                    id={val.fieldName}
                    value={val.value}
                    onChange={(e) => setterValue(val, e.target.value)}
                  />
                </div>
              )}
              {val.fieldType === FieldType.Email && (
                <div className='flex flex-col space-y-1.5 my-7'>
                  <Label htmlFor={val.fieldName}>
                    {val.fieldName}{' '}
                    {val.isRequired && <span className='text-red-500'>*</span>}
                  </Label>
                  <Input
                    type='email'
                    id={val.fieldName}
                    value={val.value}
                    onChange={(e) => setterValue(val, e.target.value)}
                  />
                </div>
              )}
              {val.fieldType === FieldType.Date && (
                <div className='flex flex-col space-y-1.5 my-7'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'justify-start text-left font-normal',
                          !date && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {date ? (
                          format(date, 'PPP')
                        ) : (
                          <span>{val.fieldName}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={date}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              {val.fieldType === FieldType.Image && (
                <div className='flex flex-col space-y-1.5 my-7'>
                  coming soon...
                </div>
              )}
            </section>
          </div>
        );
      })}
      <section className='flex justify-end gap-2'>
        <Link href='/app/page-builder'>
          <Button variant='link'>Edit Fields</Button>
        </Link>
        <Button disabled={isSaveDisabled} variant='outline'>
          Publish
        </Button>
        <Button disabled={isSaveDisabled || loading} onClick={handleValueSave}>
          Save
        </Button>
      </section>
    </>
  );
};

export default ContentFieldsSetup;
