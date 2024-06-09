import prisma from '@/config/db';
import { NextResponse } from 'next/server';

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const page = await prisma.page.delete({
      where: {
        id: +params.id,
      },
    });

    if (page) {
      return NextResponse.json({
        success: true,
        message: 'Page deleted successfully',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong when deleting the page',
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong when deleting the page',
      error,
    });
  }
};
