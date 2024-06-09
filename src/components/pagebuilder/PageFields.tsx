'use client';

import { usePageBuilderStore } from '@/store/pagebuilder-store-provider';
import React from 'react';

const PageFields = () => {
  const { fieldConfigData } = usePageBuilderStore((state) => state);

  console.log(fieldConfigData);

  return <div>PageFields</div>;
};

export default PageFields;
