import React, { useState, useEffect } from "react";
import { Upload, Sparkles } from "lucide-react";
import { matchFilenameToKey, saveGameImage } from "../services/imageStore";

interface GlobalDropZoneProps {
  onImagesUploaded?: (count: number) => void;
}

export const GlobalDropZone: React.FC<GlobalDropZoneProps> = ({ onImagesUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter++;
      if (e.dataTransfer && Array.from(e.dataTransfer.types).includes("Files")) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) {
        setIsDragging(false);
        dragCounter = 0;
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      dragCounter = 0;
      setIsDragging(false);

      if (!e.dataTransfer || !e.dataTransfer.files || e.dataTransfer.files.length === 0) {
        return;
      }

      const files = Array.from(e.dataTransfer.files);
      let matchedCount = 0;

      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        const key = matchFilenameToKey(file.name);
        if (key) {
          matchedCount++;
          const reader = new FileReader();
          await new Promise<void>((resolve) => {
            reader.onload = async () => {
              await saveGameImage(key, reader.result as string);
              resolve();
            };
            reader.readAsDataURL(file);
          });
        }
      }

      if (matchedCount > 0) {
        setToastMessage(`🎉 Applied ${matchedCount} game image(s) to website!`);
        if (onImagesUploaded) onImagesUploaded(matchedCount);
        setTimeout(() => setToastMessage(null), 5000);
      } else {
        setToastMessage(
          "⚠️ No matching game names found in dropped files. Expected: fire-kirin.png, ultra-panda.png, etc."
        );
        setTimeout(() => setToastMessage(null), 6000);
      }
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, [onImagesUploaded]);

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-sm shadow-2xl shadow-amber-500/50 flex items-center gap-2 animate-bounce border-2 border-white">
          <Sparkles className="w-5 h-5 text-purple-900" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Drag Overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md border-4 border-dashed border-amber-400 flex flex-col items-center justify-center p-6 text-center animate-fade-in pointer-events-none">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-2xl shadow-amber-500/50 mb-6 animate-pulse">
            <Upload className="w-12 h-12 text-slate-950" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Drop Game Images Here
          </h2>

          <p className="mt-3 text-sm md:text-base text-amber-200/90 max-w-md font-semibold">
            Drop any or all 16 game artwork files (Fire Kirin, Orion Stars, Ultra Panda, Mega Win, etc.) to immediately update the website!
          </p>
        </div>
      )}
    </>
  );
};
