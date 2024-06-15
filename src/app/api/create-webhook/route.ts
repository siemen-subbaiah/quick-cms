import { auth } from '@/auth';
import prisma from '@/config/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const res: { name: string; url: string; status: boolean } =
    await request.json();
  const session = await auth();
  try {
    const webhook = await prisma.webHook.create({
      data: {
        createdUserId: session?.user?.id as string,
        createdUserName: session?.user?.name as string,
        name: res.name,
        url: res.url,
        status: res.status,
      },
    });

    if (webhook) {
      return NextResponse.json({
        success: true,
        message: 'Webhook created successfully',
        data: {
          webhook,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong while adding webhook',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong while adding webhook',
      error,
    });
  }
};
