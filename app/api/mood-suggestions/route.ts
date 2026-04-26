import { NextResponse } from 'next/server';

const OPENROUTER_MODEL = process.env.OPENAI_MODEL || 'openrouter/free';

type MoodLevel = 'tired' | 'neutral' | 'motivated';

const moodDescriptions: Record<MoodLevel, string> = {
  tired: 'I\'m feeling tired and low on energy',
  neutral: 'I\'m feeling okay, neither energized nor drained',
  motivated: 'I\'m feeling motivated and energized',
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { mood?: MoodLevel; recentTasks?: string[] };
    const mood = body.mood?.toLowerCase() as MoodLevel | undefined;

    if (!mood || !moodDescriptions[mood]) {
      return NextResponse.json(
        { error: 'Valid mood is required: tired, neutral, or motivated' },
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

    const taskContext = body.recentTasks && body.recentTasks.length > 0
      ? `\n\nThe user has these recent tasks/subjects: ${body.recentTasks.join(', ')}`
      : '';

    const systemPrompt =
      'You are EduFlow AI, a helpful academic tutor focused on mood-aware productivity. ' +
      'Provide personalized, actionable study suggestions based on the user\'s current mood and energy level. ' +
      'Keep suggestions concise, friendly, and practical. ' +
      'Consider their mood when recommending study techniques and break strategies.';

    const userPrompt =
      `${moodDescriptions[mood]}. Give me 2-3 short, actionable study suggestions that match my current mood and energy level. ` +
      `Keep each suggestion to 1-2 sentences. Focus on techniques that will help me study effectively right now.${taskContext}`;

    const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'EduFlow AI',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens: 300,
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

    const suggestion = aiData.choices?.[0]?.message?.content?.trim();

    if (!suggestion) {
      return NextResponse.json(
        { error: 'AI returned an empty response.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      suggestion,
      mood,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Unexpected server error while generating mood suggestions.',
      },
      { status: 500 }
    );
  }
}
