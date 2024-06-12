import prisma from '@/config/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const fields: StateField[] = await request.json();
  try {
    const updatePromises = fields.map((field: any) =>
      prisma.field.update({
        where: { id: field.id },
        data: { value: field.value },
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: 'Fields updated successfully',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong when updated the fields',
      error,
    });
  }
};
