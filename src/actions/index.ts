'use server';

import { listPages } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export const reloadPageList = async () => {
  await listPages();
  revalidatePath('/');
};
