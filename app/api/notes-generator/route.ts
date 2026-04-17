import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic || !topic.trim()) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server is missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const prompt = `
You are a top-tier AI study assistant designed to help students learn efficiently.

Generate detailed, structured, and exam-ready notes based on the topic given.

Guidelines:
- Use clear headings and subheadings
- Keep explanations simple but conceptually strong
- Use bullet points for readability
- Include examples for better understanding
- Highlight important keywords in bold
- Add formulas where needed
- Avoid unnecessary long paragraphs
- Keep the notes clean, student-friendly, and easy to revise
- Do NOT ask for the topic again
- Generate the notes directly

Structure:
1. Topic Title
2. Definition
3. Core Concepts
4. Examples
5. Key Points / Formulas
6. Real-life Applications
7. Quick Revision Summary

Topic: ${topic}
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "EduFlow AI",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "openrouter/free",
        messages: [
          {
            role: "system",
            content:
              "You are an expert academic note-making assistant for students.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message || "Failed to generate notes from AI",
        },
        { status: response.status }
      );
    }

    const notes =
      data?.choices?.[0]?.message?.content?.trim() || "";

    if (!notes) {
      return NextResponse.json(
        { error: "AI returned empty notes." },
        { status: 502 }
      );
    }

    return NextResponse.json({ notes });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while generating notes." },
      { status: 500 }
    );
  }
}