'use client';

import React from 'react';
import { type Editor } from '@tiptap/react';
import { Toggle } from './ui/toggle';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFort,
  MdOutlineStrikethroughS,
} from 'react-icons/md';

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='border border-input bg-transparent rounded-md'>
      <Toggle
        size='sm'
        pressed={editor.isActive('heading')}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <MdFort className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <MdFormatBold className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <MdFormatItalic className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <MdOutlineStrikethroughS className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <MdFormatListBulleted className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <MdFormatListNumbered className='h-4 w-4' />
      </Toggle>
    </div>
  );
};

export default Toolbar;
