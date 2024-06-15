import React from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './ToolBar';

const RichText = ({
  field,
  setterValue,
}: {
  field: StateField;
  setterValue: (currentValue: StateField, val: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: field.value,
    editorProps: {
      attributes: {
        class: 'rounded-md border min-h-[150px]',
      },
    },
    onUpdate({ editor }) {
      setterValue(field, editor.getHTML());
    },
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichText;
