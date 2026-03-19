import { ApiConfig, DEFAULTS } from "./ai-config";

const REQUEST_TIMEOUT_MS = 45000;

const isBrowser = () => typeof window !== "undefined";

const shouldProxy = (url: URL) => {
  return isBrowser() && window.location.protocol === "https:" && url.protocol === "http:";
};

export const resolveRequestUrl = (rawUrl: string) => {
  const url = new URL(rawUrl);
  if (!shouldProxy(url)) return url.toString();
  return `${window.location.origin}/api/proxy?target=${encodeURIComponent(url.toString())}`;
};

const requireApiKey = (apiKey: string) => {
  const value = apiKey.trim();
  if (!value) throw new Error("API key is required");
  return value;
};

const buildGeminiBaseUrl = (config: ApiConfig) => {
  return (config.provider === "gemini-official" ? DEFAULTS.geminiOfficialBaseUrl : config.baseUrl).replace(/\/$/, "");
};

export const callGeminiGenerateContent = async (
  config: ApiConfig,
  model: string,
  contents: unknown,
  generationConfig?: Record<string, unknown>,
) => {
  const normalizedContents = typeof contents === "string"
    ? [{ role: "user", parts: [{ text: contents }] }]
    : contents;

  const url = resolveRequestUrl(`${buildGeminiBaseUrl(config)}/v1beta/models/${encodeURIComponent(model)}:generateContent`);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": requireApiKey(config.apiKey),
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    body: JSON.stringify({
      contents: normalizedContents,
      ...(generationConfig ? { generationConfig } : {}),
    }),
  });

  const raw = await response.text();
  if (!response.ok) throw new Error(raw);
  return JSON.parse(raw);
};

export const callOpenAICompatibleChat = async (
  config: ApiConfig,
  prompt: string,
  options?: {
    jsonMode?: boolean;
    referenceImages?: string[];
    model?: string;
  },
) => {
  const base = config.baseUrl.replace(/\/$/, "");
  const path = config.chatCompletionsPath.startsWith("/") ? config.chatCompletionsPath : `/${config.chatCompletionsPath}`;
  const url = resolveRequestUrl(`${base}${path}`);
  const content = options?.referenceImages?.length
    ? [{ type: "text", text: prompt }, ...options.referenceImages.map((url) => ({ type: "image_url", image_url: { url } }))]
    : prompt;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${requireApiKey(config.apiKey)}`,
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    body: JSON.stringify({
      model: options?.model || config.textModel,
      messages: [{ role: "user", content }],
      ...(options?.jsonMode ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  const raw = await response.text();
  if (!response.ok) throw new Error(raw);
  return JSON.parse(raw);
};
