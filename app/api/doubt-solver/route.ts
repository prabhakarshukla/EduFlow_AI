import { NextResponse } from 'next/server';

const OPENROUTER_MODEL = process.env.OPENAI_MODEL || 'openrouter/free';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { question?: string };
    const question = body.question?.trim();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server is missing OPENAI_API_KEY.' },
        { status: 500 }
      );
    }

    const systemPrompt =
      'You are EduFlow AI, a helpful academic tutor. ' +
      'Give clear, concise, accurate explanations for students. ' +
      'Use simple language first, then include a short example when relevant.';

    const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question },
        ],
        temperature: 0.4,
      }),
    });

    const aiData = (await aiRes.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string };
    };

    if (!aiRes.ok) {
      return NextResponse.json(
        { error: aiData?.error?.message || 'AI provider request failed.' },
        { status: 502 }
      );
    }

    const answer = aiData.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return NextResponse.json(
        { error: 'AI returned an empty response.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      answer,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Unexpected server error while solving doubt.',
      },
      { status: 500 }
    );
  }
}