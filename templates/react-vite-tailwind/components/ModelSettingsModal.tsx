import React from "react";
import { ApiConfig, IMAGE_MODEL_OPTIONS, TEXT_MODEL_OPTIONS } from "../services/ai-config";

interface ModelSettingsModalProps {
  open: boolean;
  value: ApiConfig;
  onClose: () => void;
  onSave: (next: Pick<ApiConfig, "textModel" | "imageModel">) => void;
}

export function ModelSettingsModal({ open, value, onClose, onSave }: ModelSettingsModalProps) {
  const [textModel, setTextModel] = React.useState(value.textModel);
  const [imageModel, setImageModel] = React.useState(value.imageModel);

  React.useEffect(() => {
    if (!open) return;
    setTextModel(value.textModel);
    setImageModel(value.imageModel);
  }, [open, value]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <h3 className="text-lg font-bold mb-4">Model Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1">Text Model</label>
            <select value={textModel} onChange={(e) => setTextModel(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              {TEXT_MODEL_OPTIONS.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Image Model</label>
            <select value={imageModel} onChange={(e) => setImageModel(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              {IMAGE_MODEL_OPTIONS.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
          <p className="text-xs text-gray-500">
            Models stay visible for all providers. Unsupported combinations should fail at request time, not save time.
          </p>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
          <button onClick={() => onSave({ textModel, imageModel })} className="px-4 py-2 rounded-lg bg-sky-600 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}
