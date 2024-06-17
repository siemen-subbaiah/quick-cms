'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { FieldType } from '@/types/enums';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { usePageBuilderStore } from '@/store/pagebuilder-store-provider';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// interface FieldSetupProps {
//   fieldType: number;
//   setOpen: (state: boolean) => void;
//   launchMode:'create' | 'edit' | 'add';
// }

const FieldSetup = ({
  fieldType,
  setOpen,
  launchMode,
  editProps,
  pageId,
}: {
  fieldType: number;
  setOpen: (state: boolean) => void;
  launchMode: 'create' | 'edit' | 'add' | 'edit-form';
  editProps?: Field;
  pageId?: number;
}) => {
  const router = useRouter();

  const {
    proceedToFieldSelection,
    setFieldType,
    setPageBuilderData,
    pageBuilderData,
  } = usePageBuilderStore((state) => state);

  const [fieldName, setFieldName] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [isShortText, setIsShortText] = useState(true);
  const [date, setDate] = React.useState<Date>();
  const [loading, setLoading] = useState(false);
  const [textFieldType, setTextFieldType] = useState('shortText');
  const [booleanDefaultType, setBooleanDefaultType] = useState('true');

  useEffect(() => {
    if (editProps) {
      setFieldName(editProps?.fieldName as string);
      setIsRequired(editProps?.isRequired as boolean);
      setIsShortText(editProps?.isShortText as boolean);
      setDefaultValue(editProps?.defaultValue as string);

      if (editProps?.fieldType === FieldType.Text) {
        if (editProps?.isShortText) {
          setTextFieldType('shortText');
        } else {
          setTextFieldType('longText');
        }
      }

      if (editProps?.fieldType === FieldType.Boolean) {
        if (editProps?.defaultValue === 'true') {
          setBooleanDefaultType('true');
        } else if (editProps?.defaultValue === 'false') {
          setBooleanDefaultType('false');
        }
      }

      if (editProps?.fieldType === FieldType.Date) {
        setDate(new Date(editProps?.defaultValue as string));
      }
    }
  }, [editProps]);

  const captureTextType = (e: 'longText' | 'shortText') => {
    if (e === 'shortText') {
      setIsShortText(true);
      setTextFieldType('shortText');
    } else {
      setIsShortText(false);
      setTextFieldType('longText');
    }
  };

  const captureBooleanDefault = (e: 'true' | 'false') => {
    if (e === 'true') {
      setDefaultValue('true');
    } else {
      setDefaultValue('false');
    }
  };

  const handleFieldConfig = async () => {
    const fieldConfig = {
      id: editProps?.id,
      pageId,
      fieldType,
      fieldName,
      defaultValue:
        fieldType === FieldType.Date
          ? date?.toLocaleDateString()
          : defaultValue,
      isRequired,
      isShortText: fieldType === FieldType.Text ? isShortText : null,
    };
    if (fieldConfig) {
      if (launchMode === 'create') {
        const payload = {
          pageBuilderData,
          fieldConfig,
        };

        toast.promise(createPageAndFirstField(payload), {
          loading: 'Loading...',
          success: <b>Page created successfully</b>,
          error: <b>Unexpected error occured while creating the page</b>,
        });
      }
      if (launchMode === 'add') {
        toast.promise(addField(fieldConfig), {
          loading: 'Loading...',
          success: <b>Field added successfully</b>,
          error: <b>Unexpected error occured while adding the field</b>,
        });
      }
      if (launchMode === 'edit') {
        toast.promise(editField(fieldConfig), {
          loading: 'Loading...',
          success: <b>Field edited successfully</b>,
          error: <b>Unexpected error occured while editing the field</b>,
        });
      }
    }
  };

  const resetStore = () => {
    proceedToFieldSelection(false);
    setPageBuilderData(null);
    setFieldType(null);
  };

  const createPageAndFirstField = async (payload: {
    pageBuilderData: PageBuilder | null;
    fieldConfig: FieldConfig | null;
  }) => {
    setLoading(true);
    const res = await fetch('/api/create-page', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setLoading(false);
      toast('Network error occured while creating the page');
    }

    if (res.ok) {
      const data = await res.json();

      if (data.success) {
        setLoading(false);
        setOpen(false);
        resetStore();
        router.push(`/app/page-builder/${data.data.apiName}/${data.data.id}`);
      } else {
        setLoading(false);
        toast(data.message);
      }
    }
  };

  const editField = async (payload: FieldConfig) => {
    setLoading(true);
    const res = await fetch('/api/edit-field', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setLoading(false);
      toast('Network error occured while editing the field');
    }

    if (res.ok) {
      const data = await res.json();

      if (data.success) {
        setLoading(false);
        setOpen(false);
        resetStore();
        router.refresh();
      } else {
        setLoading(false);
        toast(data.message);
      }
    }
  };

  const addField = async (payload: FieldConfig) => {
    setLoading(true);
    const res = await fetch('/api/add-field', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setLoading(false);
      toast('Network error occured while editing the field');
    }

    if (res.ok) {
      const data = await res.json();

      if (data.success) {
        setLoading(false);
        setOpen(false);
        resetStore();
        router.refresh();
      } else {
        setLoading(false);
        toast(data.message);
      }
    }
  };

  return (
    <section className='w-2/4 mx-auto mt-5'>
      {!editProps && (
        <Button
          variant='ghost'
          className='mb-2'
          onClick={() => {
            proceedToFieldSelection(true);
            setFieldType(null);
          }}
        >
          <MdOutlineKeyboardArrowLeft fontSize='1.5rem' />
          Back
        </Button>
      )}
      <Card>
        <CardHeader>
          <CardTitle>{FieldType[fieldType]}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='fieldName'>
                  Name <span className='text-red-500'>*</span>
                </Label>
                <Input
                  placeholder='Enter field name'
                  id='fieldName'
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value.trim())}
                />
              </div>
              {fieldType === FieldType.Text && (
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='fieldName'>Type</Label>
                  <RadioGroup
                    onValueChange={captureTextType}
                    value={textFieldType}
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='shortText' id='r1' />
                      <Label htmlFor='r1'>Short Text</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='longText' id='r2' />
                      <Label htmlFor='r2'>Long Text</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='defaultValue'>Default Value</Label>
                {fieldType === FieldType.Text && (
                  <Input
                    placeholder='Set a default value'
                    id='defaultValue'
                    value={defaultValue}
                    onChange={(e) => setDefaultValue(e.target.value)}
                  />
                )}
                {fieldType === FieldType.Boolean && (
                  <Select
                    onValueChange={captureBooleanDefault}
                    defaultValue={booleanDefaultType}
                    value={booleanDefaultType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select a default value' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='true'>true</SelectItem>
                        <SelectItem value='false'>false</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                {fieldType === FieldType.Number && (
                  <Input
                    placeholder='Set a default number'
                    type='number'
                    id='defaultValue'
                    value={defaultValue}
                    onChange={(e) => setDefaultValue(e.target.value)}
                  />
                )}
                {fieldType === FieldType.Email && (
                  <Input
                    placeholder='Set a default email'
                    type='email'
                    id='defaultValue'
                    value={defaultValue}
                    onChange={(e) => setDefaultValue(e.target.value)}
                  />
                )}
                {fieldType === FieldType.Date && (
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
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
              <div className='flex items-center gap-2 space-y-1.5'>
                <Switch
                  id='requiredField'
                  checked={isRequired}
                  onCheckedChange={(e) => setIsRequired(e)}
                />
                <Label htmlFor='requiredField' className='relative bottom-1'>
                  Required Field
                </Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex gap-2'>
          <Button disabled={!fieldName || loading} onClick={handleFieldConfig}>
            Save
          </Button>
          {editProps && (
            <Button onClick={() => setOpen(false)} variant='ghost'>
              Cancel
            </Button>
          )}
          {!editProps && (
            <Button
              onClick={() => {
                setOpen(false);
                proceedToFieldSelection(true);
                setFieldType(null);
              }}
              variant='ghost'
            >
              Cancel
            </Button>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default FieldSetup;
