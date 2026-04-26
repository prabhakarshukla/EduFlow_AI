import { AgentContext, AgentType } from "./shared";
import { agentName as plannerAgentName, runAgent as runPlannerAgent } from "./planner-agent";
import { agentName as tutorAgentName, runAgent as runTutorAgent } from "./tutor-agent";
import { agentName as notesAgentName, runAgent as runNotesAgent } from "./notes-agent";
import { agentName as productivityAgentName, runAgent as runProductivityAgent } from "./productivity-agent";
import { agentName as moodAgentName, runAgent as runMoodAgent } from "./mood-agent";

export type AgentRouterInput = {
  agentType?: AgentType | string;
  userMessage: string;
  context?: AgentContext;
};

const agentMap = {
  planner: {
    name: plannerAgentName,
    runAgent: runPlannerAgent,
  },
  tutor: {
    name: tutorAgentName,
    runAgent: runTutorAgent,
  },
  notes: {
    name: notesAgentName,
    runAgent: runNotesAgent,
  },
  productivity: {
    name: productivityAgentName,
    runAgent: runProductivityAgent,
  },
  mood: {
    name: moodAgentName,
    runAgent: runMoodAgent,
  },
} as const;

function normalizeAgentType(agentType?: AgentType | string) {
  if (!agentType) return "tutor" as const;

  const normalized = agentType.trim().toLowerCase();
  if (normalized in agentMap) {
    return normalized as keyof typeof agentMap;
  }

  return "tutor" as const;
}

export async function routeAgent({ agentType, userMessage, context }: AgentRouterInput) {
  const selected = agentMap[normalizeAgentType(agentType)];
  return selected.runAgent({ userMessage, context });
}

export function getAgentName(agentType?: AgentType | string) {
  return agentMap[normalizeAgentType(agentType)].name;
}
