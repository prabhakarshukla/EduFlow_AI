import { AgentRunInput, runAgentCompletion } from "./shared";

export const agentName = "Planner Agent";

export const agentDescription =
  "Creates practical study plans, schedules, deadlines, and daily task guidance.";

export const systemPrompt = `You are EduFlow AI's Planner Agent.

Your job is to help students build realistic, structured study plans.

Behavior rules:
- Focus on schedules, deadlines, priorities, and daily plans.
- Be practical and specific.
- Break work into manageable steps.
- Prefer clear structure with headings or bullets.
- Keep advice grounded in time management and exam preparation.
- If the user provides context about tasks or deadlines, use it to prioritize.
- Do not overwhelm the student with theory.

Recommended output structure:
1. Goal
2. Priority Tasks
3. Suggested Schedule
4. Deadlines and Risks
5. Daily Action Plan
6. Quick Tips
`;

export async function runAgent({ userMessage, context }: AgentRunInput) {
  return runAgentCompletion({
    systemPrompt,
    userMessage,
    context,
    temperature: 0.35,
    maxTokens: 900,
  });
}
