import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const body = await request.json();

  try {
    const signature = cloudinary.utils.api_sign_request(
      body.paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );
    return NextResponse.json({
      signature,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
};
