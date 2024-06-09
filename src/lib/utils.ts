import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { randomBytes } from 'crypto';
import { auth } from '@/auth';
import prisma from '@/config/db';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateApiKey = () => {
  return randomBytes(32).toString('hex');
};

export const listPages = async () => {
  const session = await auth();
  const pages = await prisma.page.findMany({
    where: {
      createdUserId: session?.user?.id,
    },
  });
  return pages;
};

export const getPage = async (pageId: number) => {
  const pages = await prisma.page.findUnique({
    where: {
      id: pageId,
    },
  });
  return pages;
};

export const listPageFields = async (pageId: number) => {
  const session = await auth();
  const fields = await prisma.field.findMany({
    where: {
      createdUserId: session?.user?.id,
      AND: {
        pageId,
      },
    },
  });
  return fields;
};
