export const dynamic = 'force-dynamic';

import prisma from '@/config/db';
import { FieldType } from '@/types/enums';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { page: string } }
) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('apiKey');
  const apiId = params.page;
  try {
    if (query) {
      const apiKeyExists = await prisma.user.findMany({
        where: {
          apiKey: query,
        },
      });

      if (apiKeyExists.length >= 1) {
        const page = await prisma.page.findMany({
          where: {
            createdUserId: apiKeyExists[0].id,
            apiName: apiId,
          },
          include: {
            fields: true,
          },
        });

        if (page.length >= 1) {
          if (page[0].isAPIPublished) {
            if (page[0].isPublished) {
              const fieldsObject: any = {};
              page[0].fields.forEach((field) => {
                if (field.fieldType === FieldType.Image) {
                  fieldsObject[field.fieldName] = field.value?.split('|')[0];
                } else {
                  fieldsObject[field.fieldName] = field.value;
                }
              });

              const finalResponse = {
                data: fieldsObject,
                createdAt: page[0].createdAt,
                updatedAt: page[0].updatedAt,
              };

              return NextResponse.json({
                success: true,
                message: 'Page content fetched successfully',
                data: finalResponse,
              });
            } else {
              return NextResponse.json({
                success: false,
                message: `The page content is not published yet, please publish the page`,
              });
            }
          } else {
            return NextResponse.json({
              success: false,
              message: `The endpoint is not published yet, please go to the API Permissions settings to publish the endpoint`,
            });
          }
        } else {
          return NextResponse.json({
            success: false,
            message: `No page named ${apiId} found`,
          });
        }
      } else {
        return NextResponse.json({
          success: false,
          message: 'Invalid API Key',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'No API Key provided',
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong when fetching page content',
      error,
    });
  }
};
