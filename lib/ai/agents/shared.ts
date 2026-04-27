export type AgentType = "planner" | "tutor" | "notes" | "productivity" | "mood";

export type AgentContext = string | Record<string, unknown> | null | undefined;

export type AgentRunInput = {
  userMessage: string;
  context?: AgentContext;
};

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

const DEFAULT_MODEL = process.env.OPENAI_MODEL || "openrouter/free";
const DEFAULT_BASE_URL =
  process.env.OPENAI_BASE_URL ||
  process.env.OPENROUTER_BASE_URL ||
  "https://openrouter.ai/api/v1";
const DEFAULT_REFERER =
  process.env.OPENAI_HTTP_REFERER || "http://localhost:3000";
const DEFAULT_TITLE = process.env.OPENAI_APP_TITLE || "EduFlow AI";

function resolveChatCompletionsUrl(baseUrl: string) {
  const trimmed = baseUrl.trim().replace(/\/+$/, "");
  if (trimmed.endsWith("/chat/completions")) {
    return trimmed;
  }
  return `${trimmed}/chat/completions`;
}

function formatContext(context: AgentContext): string | null {
  if (context == null) return null;
  if (typeof context === "string") {
    const trimmed = context.trim();
    return trimmed || null;
  }

  try {
    return JSON.stringify(context, null, 2);
  } catch (error) {
    return null;
  }
}

function buildHeaders() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Server is missing OPENAI_API_KEY.");
  }

  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "HTTP-Referer": DEFAULT_REFERER,
    "X-Title": DEFAULT_TITLE,
  };
}

export async function runAgentCompletion({
  systemPrompt,
  userMessage,
  context,
  temperature = 0.4,
  maxTokens = 1200,
}: {
  systemPrompt: string;
  userMessage: string;
  context?: AgentContext;
  temperature?: number;
  maxTokens?: number;
}) {
  const prompt = userMessage.trim();
  if (!prompt) {
    throw new Error("User message is required.");
  }

  const contextText = formatContext(context);
  const messages: Array<{ role: "system" | "user"; content: string }> = [
    { role: "system", content: systemPrompt },
  ];

  if (contextText) {
    messages.push({
      role: "system",
      content: `Additional context:\n${contextText}`,
    });
  }

  messages.push({ role: "user", content: prompt });

  const url = resolveChatCompletionsUrl(DEFAULT_BASE_URL);
  const headers = buildHeaders();
  const body = JSON.stringify({
    model: DEFAULT_MODEL,
    messages,
    temperature,
    max_tokens: maxTokens,
  });

  console.log("[runAgentCompletion] Request details:", {
    url,
    model: DEFAULT_MODEL,
    messageCount: messages.length,
  });

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });
  } catch (fetchError) {
    const errorMsg =
      fetchError instanceof Error ? fetchError.message : "Network error";
    console.error("[runAgentCompletion] Fetch error:", errorMsg);
    throw new Error(`Network error: ${errorMsg}`);
  }

  let data: ChatCompletionResponse;
  try {
    data = (await response.json()) as ChatCompletionResponse;
  } catch (parseError) {
    const errorMsg =
      parseError instanceof Error ? parseError.message : "JSON parse error";
    console.error("[runAgentCompletion] JSON parse error:", errorMsg);
    throw new Error(`Failed to parse response: ${errorMsg}`);
  }

  if (!response.ok) {
    const errorMsg = data?.error?.message || `HTTP ${response.status}`;
    console.error("[runAgentCompletion] API error:", errorMsg);
    throw new Error(`AI provider returned error: ${errorMsg}`);
  }

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    console.error("[runAgentCompletion] Empty response from AI");
    throw new Error("AI returned an empty response.");
  }

  return content;
}
