import prisma from '@/config/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const res: FieldConfig = await request.json();
  try {
    const field = await prisma.field.update({
      where: {
        id: res.id,
      },
      data: {
        defaultValue: res.defaultValue,
        fieldName: res.fieldName,
        isRequired: res.isRequired as boolean,
        isShortText: res.isShortText,
      },
    });

    if (field) {
      return NextResponse.json({
        success: true,
        message: 'Field edited successfully',
        field,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong when editing the field',
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong when editing the field',
      error,
    });
  }
};
