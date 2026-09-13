import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Upload,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  HelpCircle,
  Download,
} from "lucide-react";
import {
  GAME_IMAGE_CATALOG,
  getAllStoredImages,
  matchFilenameToKey,
  saveGameImage,
} from "../services/imageStore";

interface ImageUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({ isOpen, onClose }) => {
  const [storedImages, setStoredImages] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadCurrentImages = async () => {
    const images = await getAllStoredImages();
    setStoredImages(images);
  };

  useEffect(() => {
    if (isOpen) {
      loadCurrentImages();
    }
  }, [isOpen]);

  const handleFiles = async (files: FileList | File[]) => {
    setUploading(true);
    setUploadMessage("Processing image artwork...");
    let matchedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      const matchedKey = matchFilenameToKey(file.name);
      if (matchedKey) {
        matchedCount++;
        const reader = new FileReader();
        await new Promise<void>((resolve) => {
          reader.onload = async () => {
            const dataUrl = reader.result as string;
            await saveGameImage(matchedKey, dataUrl);
            setStoredImages((prev) => ({ ...prev, [matchedKey]: dataUrl }));
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
    }

    setUploading(false);
    if (matchedCount > 0) {
      setUploadMessage(`Successfully updated ${matchedCount} game artwork image(s)!`);
      setTimeout(() => setUploadMessage(null), 4000);
    } else {
      setUploadMessage(
        "No matching game filenames found. Make sure filenames match like 'fire-kirin.png', 'milky-way.png', etc."
      );
      setTimeout(() => setUploadMessage(null), 6000);
    }
  };

  const handleSingleGameUpload = (key: string, file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      await saveGameImage(key, dataUrl);
      setStoredImages((prev) => ({ ...prev, [key]: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  const uploadedCount = Object.keys(storedImages).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                Game Artwork Manager
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  {uploadedCount} / {GAME_IMAGE_CATALOG.length} Ready
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Drop all 16 game images anywhere or select them below to update the live website.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFiles(e.target.files);
                }
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 transition active:scale-95 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {uploading ? "Updating..." : "Select & Upload All 16 Files"}
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Files auto-save to <code>public/games/</code> & local storage</span>
          </div>
        </div>

        {uploadMessage && (
          <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-xs font-semibold text-amber-300 text-center animate-fade-in">
            {uploadMessage}
          </div>
        )}

        {/* Game List Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {GAME_IMAGE_CATALOG.map((item) => {
            const hasImage = !!storedImages[item.key];
            const imgSrc = storedImages[item.key] || `/games/${item.expectedFilename}`;

            return (
              <div
                key={item.key}
                className={`relative rounded-xl border p-3 flex flex-col justify-between transition-all ${
                  hasImage
                    ? "bg-slate-800/80 border-emerald-500/40 shadow-sm"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Thumbnail Preview */}
                <div className="relative w-full aspect-square rounded-lg bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center">
                  <img
                    src={imgSrc}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).style.display = "block";
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none -z-0">
                    <span className="text-[11px] font-bold text-slate-500">{item.name}</span>
                    <span className="text-[9px] text-slate-600 mt-1">{item.expectedFilename}</span>
                  </div>

                  {hasImage && (
                    <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-slate-950 rounded-full p-0.5 shadow">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Info & Individual File Picker */}
                <div className="mt-2.5 flex items-center justify-between gap-1">
                  <div className="truncate">
                    <div className="text-xs font-bold text-white truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{item.expectedFilename}</div>
                  </div>

                  <label className="cursor-pointer p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition text-[10px] font-semibold flex items-center gap-1 shrink-0">
                    <Upload className="w-3 h-3" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleSingleGameUpload(item.key, e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Tip: You can also drop images straight onto any game card on the home screen!</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
