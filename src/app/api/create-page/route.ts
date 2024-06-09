import { auth } from '@/auth';
import prisma from '@/config/db';
import { NextResponse } from 'next/server';

interface IncomingRes {
  pageBuilderData: PageBuilder | null;
  fieldConfig: FieldConfig | null;
}

export const POST = async (request: Request) => {
  const res: IncomingRes = await request.json();
  const session = await auth();
  try {
    const page = await prisma.page.create({
      data: {
        createdUserId: session?.user?.id as string,
        createdUserName: session?.user?.name as string,
        apiName: res.pageBuilderData?.apiName as string,
        displayName: res.pageBuilderData?.displayName as string,
        description: res.pageBuilderData?.description as string,
      },
    });

    if (page) {
      const field = await prisma.field.create({
        data: {
          createdUserId: session?.user?.id as string,
          createdUserName: session?.user?.name as string,
          fieldType: res.fieldConfig?.fieldType as number,
          fieldName: res.fieldConfig?.fieldName as string,
          defaultValue: res.fieldConfig?.defaultValue,
          isRequired: res.fieldConfig?.isRequired as boolean,
          isShortText: res.fieldConfig?.isShortText as boolean,
          page: {
            connect: {
              id: page.id,
            },
          },
        },
      });

      if (field) {
        return NextResponse.json({
          success: true,
          message: 'Page created successfully',
          data: {
            id: page.id,
            apiName: page.apiName,
          },
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Something went wrong in creating page',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong in creating page',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong in creating page',
      error,
    });
  }
};
