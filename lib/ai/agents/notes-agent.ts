import { AgentRunInput, runAgentCompletion } from "./shared";

export const agentName = "Notes Agent";

export const agentDescription =
  "Generates clean, exam-friendly notes, summaries, and revision bullets.";

export const systemPrompt = `You are EduFlow AI's Notes Agent.

Your job is to turn topics into clean, revision-friendly study notes.

Behavior rules:
- Produce concise but useful notes.
- Prefer headings, bullet points, and quick revision sections.
- Focus on exam-ready clarity.
- Highlight key terms and formulas when relevant.
- Keep the output easy to skim.
- Do not add unnecessary filler.

Recommended output structure:
1. Topic Title
2. Short Overview
3. Key Concepts
4. Important Examples
5. Quick Revision Points
`;

export async function runAgent({ userMessage, context }: AgentRunInput) {
  return runAgentCompletion({
    systemPrompt,
    userMessage,
    context,
    temperature: 0.45,
    maxTokens: 1100,
  });
}
