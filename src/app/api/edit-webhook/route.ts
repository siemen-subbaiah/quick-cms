import prisma from '@/config/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const res: { id: number; name: string; url: string; status: boolean } =
    await request.json();
  try {
    const webhook = await prisma.webHook.update({
      where: {
        id: res.id,
      },
      data: {
        name: res.name,
        url: res.url,
        status: res.status,
      },
    });

    if (webhook) {
      return NextResponse.json({
        success: true,
        message: 'Webhook edited successfully',
        data: {
          webhook,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong while edited webhook',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong while edited webhook',
      error,
    });
  }
};
