'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const MyToast = () => {
  const { theme } = useTheme();

  return (
    <Toaster
      toastOptions={{
        style: {
          backgroundColor: `${
            theme === 'dark' || theme === 'system' ? '#1E293B' : '#F1F5F9'
          }`,
          color: `${
            theme === 'dark' || theme === 'system' ? '#f8fafc' : '#020817'
          }`,
          border: `1px solid ${
            theme === 'dark' || theme === 'system' ? '#1e293b' : '#e2e8f0'
          }`,
        },
      }}
    />
  );
};

export default MyToast;
