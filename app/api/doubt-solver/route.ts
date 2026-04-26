import { NextResponse } from 'next/server';

const OPENROUTER_MODEL = process.env.OPENAI_MODEL || 'openrouter/free';

type RequestBody = {
  question?: string;
  agentType?: 'doubt' | 'mood';
  userMessage?: string;
  context?: { selectedMood?: string; recentTasks?: string[] };
};

const moodDescriptions: Record<string, string> = {
  tired: 'I\'m feeling tired and low on energy',
  neutral: 'I\'m feeling okay, neither energized nor drained',
  motivated: 'I\'m feeling motivated and energized',
};

function getMoodPrompt(selectedMood: string, recentTasks: string[] = []): string {
  const moodDesc = moodDescriptions[selectedMood] || 'feeling neutral';
  const taskContext = recentTasks.length > 0
    ? `\n\nRecent tasks/subjects: ${recentTasks.join(', ')}`
    : '';

  return (
    `${moodDesc}. Give me 2-3 short, actionable study suggestions that match my current mood and energy level. ` +
    `Keep each suggestion to 1-2 sentences. Focus on techniques that will help me study effectively right now.${taskContext}`
  );
}

function getMoodSystemPrompt(): string {
  return (
    'You are EduFlow AI, a helpful academic tutor focused on mood-aware productivity. ' +
    'Provide personalized, actionable study suggestions based on the user\'s current mood and energy level. ' +
    'Keep suggestions concise, friendly, and practical. ' +
    'Consider their mood when recommending study techniques and break strategies.'
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const agentType = body.agentType || 'doubt';

    let question: string | undefined;
    let systemPrompt: string;

    if (agentType === 'mood') {
      const selectedMood = body.context?.selectedMood || 'neutral';
      const recentTasks = body.context?.recentTasks || [];
      question = getMoodPrompt(selectedMood, recentTasks);
      systemPrompt = getMoodSystemPrompt();
    } else {
      question = body.question?.trim();
      systemPrompt =
        'You are EduFlow AI, a helpful academic tutor. ' +
        'Give clear, concise, accurate explanations for students. ' +
        'Use simple language first, then include a short example when relevant.';
    }

    if (!question) {
      return NextResponse.json(
        { error: 'Question or mood context is required.' },
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
        temperature: agentType === 'mood' ? 0.6 : 0.4,
        max_tokens: agentType === 'mood' ? 300 : 800,
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
      response: answer,
      answer,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Unexpected server error while processing request.',
      },
      { status: 500 }
    );
  }
}
