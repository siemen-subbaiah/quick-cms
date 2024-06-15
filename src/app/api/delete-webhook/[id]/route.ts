import prisma from '@/config/db';
import { NextResponse } from 'next/server';

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const field = await prisma.webHook.delete({
      where: {
        id: +params.id,
      },
    });

    if (field) {
      return NextResponse.json({
        success: true,
        message: 'Webhook deleted successfully',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong when deleting webhook',
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong when deleting webhook',
      error,
    });
  }
};
