import prisma from '@/config/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const res = await request.json();
  try {
    const page = await prisma.page.update({
      where: {
        id: res.id,
      },
      data: {
        displayName: res.displayName,
        description: res.description,
      },
    });

    if (page) {
      return NextResponse.json({
        success: true,
        message: 'Page edited successfully',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong in editing page',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong in editing page',
      error,
    });
  }
};
