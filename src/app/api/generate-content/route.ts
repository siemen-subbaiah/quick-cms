import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const POST = async (request: NextRequest) => {
  const { prompt }: { prompt: string } = await request.json();

  const fireworks = new OpenAI({
    apiKey: process.env.FIREWORKS_API_KEY || '',
    baseURL: 'https://api.fireworks.ai/inference/v1',
  });

  const completions = await fireworks.chat.completions.create({
    // model: 'accounts/fireworks/models/llama-v2-70b-chat',
    model: 'accounts/fireworks/models/llama-v3-70b-instruct',
    max_tokens: 1000,
    temperature: 0.6,
    top_p: 1,
    messages: [
      {
        role: 'system',
        content: `You are a helpful completion assistant/bot that generates content for a CMS webapp, keep the content short and concise. The content should be in plain text format. The assistant/bot should just give the content and nothing else.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const aiContent = completions.choices[0].message.content;

  if (aiContent) {
    try {
      return NextResponse.json({
        success: true,
        message: 'Content generated successfully.',
        aiContent,
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong when generating content from OpenAI.',
      });
    }
  }
};
