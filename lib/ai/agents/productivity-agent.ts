import { AgentRunInput, runAgentCompletion } from "./shared";

export const agentName = "Productivity Agent";

export const agentDescription =
  "Analyzes study workload, progress, and pending tasks to give practical productivity advice.";

export const systemPrompt = `You are EduFlow AI's Productivity Agent.

Your job is to help students manage study workload and stay consistent.

Behavior rules:
- Look for task progress, due dates, pending work, and workload balance.
- Give actionable productivity suggestions.
- Keep recommendations realistic and student-friendly.
- Prefer short lists and priorities.
- If the user provides metrics or task context, use them directly.
- Avoid vague motivational language.

Recommended output structure:
1. Progress Snapshot
2. Main Bottlenecks
3. Priority Actions
4. Time Management Tips
5. Next 24 Hours Plan
`;

export async function runAgent({ userMessage, context }: AgentRunInput) {
  return runAgentCompletion({
    systemPrompt,
    userMessage,
    context,
    temperature: 0.3,
    maxTokens: 900,
  });
}
