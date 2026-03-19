export type ApiProvider = "gemini" | "gemini-official" | "openai-compatible";

export interface ApiConfig {
  provider: ApiProvider;
  apiKey: string;
  baseUrl: string;
  chatCompletionsPath: string;
  textModel: string;
  imageModel: string;
}

export const STORAGE_KEYS = {
  apiProvider: "__APP_PREFIX___api_provider",
  apiKey: "__APP_PREFIX___api_key",
  apiBaseUrl: "__APP_PREFIX___api_base_url",
  apiPath: "__APP_PREFIX___api_path",
  textModel: "__APP_PREFIX___text_model",
  imageModel: "__APP_PREFIX___image_model",
} as const;

export const DEFAULTS = {
  geminiNativeBaseUrl: "http://proxy.ten-clock.com:7000/",
  geminiOfficialBaseUrl: "https://generativelanguage.googleapis.com/",
  openAIPath: "/v1/chat/completions",
  textModel: "gemini-3.1-pro-preview",
  imageModel: "gemini-3.1-pro-image-preview",
  previewUrl: "http://127.0.0.1:3000",
} as const;

export const TEXT_MODEL_OPTIONS = [
  "gemini-3.1-pro-preview",
  "gemini-3.1-flash-lite-preview",
  "gemini-3-flash-preview",
] as const;

export const IMAGE_MODEL_OPTIONS = [
  "gemini-3.1-pro-image-preview",
  "gemini-3.1-flash-image-preview",
  "gemini-3.0-pro-image-preview",
  "gemini-3.0-flash-image-preview",
  "gemini-3-pro-image-preview",
  "gemini-3-flash-image-preview",
] as const;

export const normalizeBaseUrl = (provider: ApiProvider, baseUrl: string): string => {
  const trimmed = baseUrl.trim();
  if (trimmed) return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
  if (provider === "gemini-official") return DEFAULTS.geminiOfficialBaseUrl;
  if (provider === "openai-compatible") return "https://example-openai-gateway.com/";
  return DEFAULTS.geminiNativeBaseUrl;
};

export const normalizePath = (path: string): string => {
  const trimmed = path.trim() || DEFAULTS.openAIPath;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

export const buildApiConfig = (input: Partial<ApiConfig>): ApiConfig => {
  const provider = (input.provider || "gemini") as ApiProvider;
  return {
    provider,
    apiKey: (input.apiKey || "").trim(),
    baseUrl: normalizeBaseUrl(provider, input.baseUrl || ""),
    chatCompletionsPath: normalizePath(input.chatCompletionsPath || DEFAULTS.openAIPath),
    textModel: (input.textModel || DEFAULTS.textModel).trim(),
    imageModel: (input.imageModel || DEFAULTS.imageModel).trim(),
  };
};

export const loadStoredApiConfig = (): ApiConfig => {
  return buildApiConfig({
    provider: (localStorage.getItem(STORAGE_KEYS.apiProvider) as ApiProvider | null) || "gemini",
    apiKey: localStorage.getItem(STORAGE_KEYS.apiKey) || "",
    baseUrl: localStorage.getItem(STORAGE_KEYS.apiBaseUrl) || "",
    chatCompletionsPath: localStorage.getItem(STORAGE_KEYS.apiPath) || DEFAULTS.openAIPath,
    textModel: localStorage.getItem(STORAGE_KEYS.textModel) || DEFAULTS.textModel,
    imageModel: localStorage.getItem(STORAGE_KEYS.imageModel) || DEFAULTS.imageModel,
  });
};

export const persistApiSettings = (config: ApiConfig) => {
  localStorage.setItem(STORAGE_KEYS.apiProvider, config.provider);
  localStorage.setItem(STORAGE_KEYS.apiKey, config.apiKey);
  localStorage.setItem(STORAGE_KEYS.apiBaseUrl, config.baseUrl);
  localStorage.setItem(STORAGE_KEYS.apiPath, config.chatCompletionsPath);
};

export const persistModelSettings = (config: ApiConfig) => {
  localStorage.setItem(STORAGE_KEYS.textModel, config.textModel);
  localStorage.setItem(STORAGE_KEYS.imageModel, config.imageModel);
};
