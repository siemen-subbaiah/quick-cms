import prisma from '@/config/db';
import { WebHook } from '@prisma/client';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const res: {
    fields: StateField[];
    webHooks: WebHook[];
  } = await request.json();
  try {
    const updatePromises = res.fields.map((field: any) =>
      prisma.field.update({
        where: { id: field.id },
        data: { value: field.value },
      })
    );

    await Promise.all(updatePromises);

    if (res.webHooks.length > 0) {
      const webHookPromises = res.webHooks.map((webHook: WebHook) =>
        fetch(webHook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
      await Promise.all(webHookPromises);
      return NextResponse.json({
        success: true,
        message: 'Fields updated successfully',
      });
    } else {
      return NextResponse.json({
        success: true,
        message: 'Fields updated successfully',
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong when updated the fields',
      error,
    });
  }
};
