'use client';

import { Field, Page, WebHook } from '@prisma/client';
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
import { Textarea } from '../ui/textarea';
import RichText from '../RichText';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { Card, CardContent } from '../ui/card';
import { MdClose } from 'react-icons/md';

const ContentFieldsSetup = ({
  fields,
  webHooks,
  page,
}: {
  fields: Field[];
  webHooks: WebHook[];
  page: Page;
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [assetLoading, setAssetLoading] = useState(false);
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

  useEffect(() => {
    const allRequiredFieldsFilled = value.every((field) => {
      return !field.isRequired || (field.isRequired && field.value);
    });
    setIsSaveDisabled(!allRequiredFieldsFilled);
  }, [value]);

  const setterValue = (currentValue: StateField, val: string) => {
    setValue((prevState) =>
      prevState.map((field) =>
        field.id === currentValue.id ? { ...field, value: val } : field
      )
    );
  };

  const handleDateChange = (
    currentValue: StateField,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) {
      setValue((prevState) =>
        prevState.map((field) =>
          field.fieldType === FieldType.Date && currentValue.id === field.id
            ? { ...field, value: selectedDate.toISOString() }
            : field
        )
      );
    }
  };

  const removeImage = (public_id: any, val: StateField) => {
    const payload = {
      public_id,
    };
    toast.promise(deleteAsset(payload, val), {
      loading: 'Loading...',
      success: <b>Asset deleted successfully</b>,
      error: <b>Unexpected error occured while deleting the asset</b>,
    });
  };

  const deleteAsset = async (payload: { public_id: any }, val: StateField) => {
    setAssetLoading(true);
    const res = await fetch('/api/delete-image', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      toast('Network error occured while deleting asset');
    }

    if (res.ok) {
      const data = await res.json();

      if (data.success) {
        setterValue(val, '');
        setAssetLoading(false);
      } else {
        toast(data.message);
        setAssetLoading(true);
      }
    }
  };

  const handlePagePublish = () => {
    toast.promise(
      publishPage({
        id: page.id,
        isPublished: page.isPublished ? false : true,
      }),
      {
        loading: 'Loading...',
        success: (
          <b>{page.isPublished ? 'Unpublished' : 'Published'} successfully</b>
        ),
        error: <b>Unexpected error occured while publishing/unpublishing</b>,
      }
    );
  };

  const publishPage = async (payload: { id: number; isPublished: boolean }) => {
    const res = await fetch('/api/edit-page', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      toast('Network error occured while publishing/unpublishing');
    }

    if (res.ok) {
      await res.json();
      router.refresh();
    }
  };

  const handleValueSave = () => {
    const payload = {
      fields: [...value],
      webHooks,
    };
    toast.promise(updateFields(payload), {
      loading: 'Loading...',
      success: <b>Fields updated successfully</b>,
      error: <b>Unexpected error occured while updating the fields</b>,
    });
  };

  const updateFields = async (payload: {
    fields: StateField[];
    webHooks: WebHook[];
  }) => {
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
              {val.fieldType === FieldType.Text && val.isShortText && (
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
              {val.fieldType === FieldType.Text && !val.isShortText && (
                <div className='flex flex-col space-y-1.5 my-7'>
                  <Label htmlFor={val.fieldName}>
                    {val.fieldName}{' '}
                    {val.isRequired && <span className='text-red-500'>*</span>}
                  </Label>
                  <Textarea
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
              {val.fieldType === FieldType.RichText && (
                <div className='flex flex-col space-y-1.5 my-7'>
                  <Label htmlFor={val.fieldName}>
                    {val.fieldName}{' '}
                    {val.isRequired && <span className='text-red-500'>*</span>}
                  </Label>
                  <RichText field={val} setterValue={setterValue} />
                </div>
              )}
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
                  <Label htmlFor={val.fieldName}>
                    {val.fieldName}{' '}
                    {val.isRequired && <span className='text-red-500'>*</span>}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'justify-start text-left font-normal',
                          !val.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {val.value ? (
                          format(val.value, 'PPP')
                        ) : (
                          <span>{val.fieldName}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={new Date(val.value)}
                        onSelect={(e) => handleDateChange(val, e)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              {val.fieldType === FieldType.Image && (
                <div className='flex flex-col space-y-1.5 my-7'>
                  <Label htmlFor={val.fieldName}>
                    {val.fieldName}{' '}
                    {val.isRequired && <span className='text-red-500'>*</span>}
                  </Label>
                  <Card>
                    <CardContent>
                      {!val.value ? (
                        <CldUploadWidget
                          signatureEndpoint='/api/secure-image'
                          onUpload={(result: any, widget) => {
                            const cloudinaryResult = {
                              attachmentPublicId: result?.info.public_id,
                              attachmentLink: result?.info?.secure_url,
                              attachmentExtension: result?.info?.format
                                ? result?.info?.format
                                : result?.info?.public_id.split('.')[1],
                            };
                            if (cloudinaryResult) {
                              setterValue(
                                val,
                                `${cloudinaryResult.attachmentLink}|${cloudinaryResult.attachmentPublicId}`
                              );
                            }
                            widget.close();
                          }}
                        >
                          {({ open }) => {
                            function handleOnClick(e: any) {
                              e.preventDefault();
                              open();
                            }
                            return (
                              <>
                                {!val.value ? (
                                  <div className='mt-2 flex justify-center flex-col items-center'>
                                    <p className='my-2'>Upload image here</p>
                                    <Button
                                      variant='secondary'
                                      onClick={handleOnClick}
                                    >
                                      Upload
                                    </Button>
                                  </div>
                                ) : (
                                  <div className='mt-3 flex gap-2'>
                                    <CldImage
                                      width='200'
                                      height='200'
                                      src={val.value.split('|')[1]}
                                      alt='Uploaded image'
                                    />
                                    <Button
                                      variant='outline'
                                      size='icon'
                                      disabled={assetLoading}
                                    >
                                      <MdClose
                                        className='h-6 w-6 cursor-pointer'
                                        onClick={() =>
                                          removeImage(
                                            val.value.split('|')[1],
                                            val
                                          )
                                        }
                                      />
                                    </Button>
                                  </div>
                                )}
                              </>
                            );
                          }}
                        </CldUploadWidget>
                      ) : (
                        <div className='mt-3 flex gap-2'>
                          <CldImage
                            width='200'
                            height='200'
                            src={val.value.split('|')[1]}
                            alt='Uploaded image'
                          />
                          <Button
                            variant='outline'
                            size='icon'
                            disabled={assetLoading}
                          >
                            <MdClose
                              className='h-6 w-6 cursor-pointer'
                              onClick={() =>
                                removeImage(val.value.split('|')[1], val)
                              }
                            />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
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
        <Button
          onClick={handlePagePublish}
          disabled={isSaveDisabled}
          variant='outline'
        >
          {page.isPublished ? 'Unpublish' : 'Publish'}
        </Button>
        <Button disabled={isSaveDisabled || loading} onClick={handleValueSave}>
          Save
        </Button>
      </section>
    </>
  );
};

export default ContentFieldsSetup;
