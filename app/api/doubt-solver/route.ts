import { NextResponse } from 'next/server';
import { routeAgent } from '@/lib/ai/agents/agent-router';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      question?: string;
      userMessage?: string;
      agentType?: string;
      context?: string | Record<string, unknown>;
    };
    const userMessage = (body.userMessage ?? body.question)?.trim();
    const agentType = body.agentType?.trim() || 'tutor';

    if (!userMessage) {
      return NextResponse.json(
        { error: 'User message is required.' },
        { status: 400 }
      );
    }

    const answer = await routeAgent({
      agentType,
      userMessage,
      context: body.context ?? { source: 'doubt-solver' },
    });

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