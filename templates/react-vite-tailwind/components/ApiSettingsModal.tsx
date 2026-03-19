import React from "react";
import { ApiConfig, ApiProvider, DEFAULTS, buildApiConfig } from "../services/ai-config";

interface ApiSettingsModalProps {
  open: boolean;
  value: ApiConfig;
  onClose: () => void;
  onSave: (config: ApiConfig) => void;
}

export function ApiSettingsModal({ open, value, onClose, onSave }: ApiSettingsModalProps) {
  const [provider, setProvider] = React.useState<ApiProvider>(value.provider);
  const [apiKey, setApiKey] = React.useState(value.apiKey);
  const [baseUrl, setBaseUrl] = React.useState(value.baseUrl);
  const [path, setPath] = React.useState(value.chatCompletionsPath);

  React.useEffect(() => {
    if (!open) return;
    setProvider(value.provider);
    setApiKey(value.apiKey);
    setBaseUrl(value.baseUrl);
    setPath(value.chatCompletionsPath);
  }, [open, value]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <h3 className="text-lg font-bold mb-4">API Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1">Provider</label>
            <select value={provider} onChange={(e) => setProvider(e.target.value as ApiProvider)} className="w-full border rounded-lg px-3 py-2">
              <option value="gemini">Gemini native</option>
              <option value="gemini-official">Gemini official</option>
              <option value="openai-compatible">OpenAI-compatible</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">API Key</label>
            <textarea value={apiKey} onChange={(e) => setApiKey(e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2" />
          </div>
          {provider !== "gemini-official" && (
            <div>
              <label className="block text-xs font-bold mb-1">API Base URL</label>
              <input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder={provider === "gemini" ? DEFAULTS.geminiNativeBaseUrl : "https://example-openai-gateway.com/"} className="w-full border rounded-lg px-3 py-2" />
            </div>
          )}
          {provider === "openai-compatible" && (
            <div>
              <label className="block text-xs font-bold mb-1">Chat Completions Path</label>
              <input value={path} onChange={(e) => setPath(e.target.value)} placeholder={DEFAULTS.openAIPath} className="w-full border rounded-lg px-3 py-2" />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
          <button
            onClick={() => onSave(buildApiConfig({ ...value, provider, apiKey, baseUrl, chatCompletionsPath: path }))}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
