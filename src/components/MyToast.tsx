'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const MyToast = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      toastOptions={{
        style: {
          backgroundColor: `${
            resolvedTheme === 'dark' ? '#1E293B' : '#F1F5F9'
          }`,
          color: `${resolvedTheme === 'dark' ? '#f8fafc' : '#020817'}`,
          border: `1px solid ${
            resolvedTheme === 'dark' ? '#1e293b' : '#e2e8f0'
          }`,
        },
      }}
    />
  );
};

export default MyToast;
