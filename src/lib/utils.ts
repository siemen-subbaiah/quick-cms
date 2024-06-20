import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { randomBytes } from 'crypto';
import { auth } from '@/auth';
import prisma from '@/config/db';
import { Page } from '@/types/enums';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateApiKey = () => {
  return randomBytes(32).toString('hex');
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const debounce = (func: any, delay: number) => {
  let timeOutId: any;
  return (...args: any) => {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const barGraphData = (pages: Page[]) => {
  const pagesFields = pages.map((page) => {
    return {
      name: page.apiName,
      data: page.fields.length,
    };
  });

  const fieldsCount = pagesFields.map((page) => page.data);

  return {
    series: [
      {
        name: 'fields',
        data: fieldsCount,
      },
    ],
    xAxisLabels: pagesFields.map((page) => page.name),
  };
};

// queries

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
  const session = await auth();
  const pages = await prisma.page.findUnique({
    where: {
      createdUserId: session?.user?.id,
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

export const listWebHooks = async () => {
  const session = await auth();
  const pages = await prisma.webHook.findMany({
    where: {
      createdUserId: session?.user?.id,
    },
  });
  return pages;
};

export const listPagesWithFields = async () => {
  const session = await auth();
  const pages = await prisma.page.findMany({
    where: {
      createdUserId: session?.user?.id,
    },
    include: {
      fields: true,
    },
  });
  return pages;
};
