import { NextResponse } from "next/server";
import { routeAgent } from "@/lib/ai/agents/agent-router";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic || !topic.trim()) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const notes = await routeAgent({
      agentType: "notes",
      userMessage: topic,
      context: { source: "notes-generator", topic },
    });

    return NextResponse.json({ notes });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while generating notes." },
      { status: 500 }
    );
  }
}