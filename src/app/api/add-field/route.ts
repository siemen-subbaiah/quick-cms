import { auth } from '@/auth';
import prisma from '@/config/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const res: FieldConfig = await request.json();
  const session = await auth();

  try {
    const field = await prisma.field.create({
      data: {
        createdUserId: session?.user?.id as string,
        createdUserName: session?.user?.name as string,
        fieldType: res.fieldType,
        fieldName: res.fieldName,
        defaultValue: res.defaultValue,
        isRequired: res.isRequired,
        isShortText: res.isShortText,
        page: {
          connect: {
            id: res.pageId,
          },
        },
      },
    });

    if (field) {
      return NextResponse.json({
        success: true,
        message: 'Field added successfully',
        field,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong when adding the field',
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong when adding the field',
      error,
    });
  }
};
