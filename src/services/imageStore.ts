import { useEffect, useState } from "react";

const DB_NAME = "megawins_images_db";
const DB_VERSION = 1;
const STORE_NAME = "game_artworks";

export interface GameImageMapping {
  key: string;
  name: string;
  expectedFilename: string;
  aliases: string[];
}

export const GAME_IMAGE_CATALOG: GameImageMapping[] = [
  {
    key: "mega-win",
    name: "Mega Win (Logo & Jackpot Trophy)",
    expectedFilename: "mega-win.png",
    aliases: ["gemini_generated_image", "megawin", "mega-win", "logo", "mega_win"],
  },
  {
    key: "cash-machine",
    name: "Cash Machine",
    expectedFilename: "cash-machine.png",
    aliases: ["cash-machine", "cashmachine", "flamingo", "cash"],
  },
  {
    key: "game-vault",
    name: "Game Vault",
    expectedFilename: "game-vault.png",
    aliases: ["game-vault", "gamevault", "vault"],
  },
  {
    key: "river-sweeps",
    name: "River Sweeps 777",
    expectedFilename: "river-sweeps.png",
    aliases: ["river-sweeps", "riversweeps", "river"],
  },
  {
    key: "mafia",
    name: "Mafia",
    expectedFilename: "mafia.png",
    aliases: ["mafia", "mob"],
  },
  {
    key: "blue-dragon",
    name: "Blue Dragon's 888",
    expectedFilename: "blue-dragon.png",
    aliases: ["blue-dragon", "bluedragon", "dragon"],
  },
  {
    key: "vegas-sweeps",
    name: "Vegas Sweeps",
    expectedFilename: "vegas-sweeps.png",
    aliases: ["vegas-sweeps", "vegassweeps", "vegas"],
  },
  {
    key: "vblink",
    name: "VBlink",
    expectedFilename: "vblink.png",
    aliases: ["vblink", "v-blink", "blink"],
  },
  {
    key: "game-room",
    name: "Game Room Online",
    expectedFilename: "game-room.png",
    aliases: ["game-room", "gameroom", "gameroomonline"],
  },
  {
    key: "egame",
    name: "EGame",
    expectedFilename: "egame.png",
    aliases: ["egame", "e-game"],
  },
  {
    key: "ultra-panda",
    name: "Ultra Panda",
    expectedFilename: "ultra-panda.png",
    aliases: ["ultra-panda", "ultrapanda"],
  },
  {
    key: "panda-master",
    name: "Panda Master",
    expectedFilename: "panda-master.png",
    aliases: ["panda-master", "pandamaster"],
  },
  {
    key: "juwa-2",
    name: "Juwa 2.0",
    expectedFilename: "juwa-2.png",
    aliases: ["juwa-2", "juwa", "juwa2"],
  },
  {
    key: "milky-way",
    name: "Milky Way 777",
    expectedFilename: "milky-way.png",
    aliases: ["milky-way", "milkyway", "milky"],
  },
  {
    key: "orion-stars",
    name: "Orion Stars 777",
    expectedFilename: "orion-stars.png",
    aliases: ["orion-stars", "orionstars", "orion"],
  },
  {
    key: "fire-kirin",
    name: "Fire Kirin 777",
    expectedFilename: "fire-kirin.png",
    aliases: ["fire-kirin", "firekirin", "kirin"],
  },
];

// Open IndexedDB database
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB not available"));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Memory cache for synchronous fast renders
const memoryCache = new Map<string, string>();

export function matchFilenameToKey(filename: string): string | null {
  const clean = filename.toLowerCase().replace(/\.[^/.]+$/, ""); // strip extension
  for (const item of GAME_IMAGE_CATALOG) {
    if (clean === item.key || clean === item.expectedFilename.replace(/\.[^/.]+$/, "")) {
      return item.key;
    }
    for (const alias of item.aliases) {
      if (clean.includes(alias)) {
        return item.key;
      }
    }
  }
  return null;
}

export async function saveGameImage(key: string, dataUrl: string): Promise<void> {
  memoryCache.set(key, dataUrl);

  // 1. Save to IndexedDB
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put({ key, dataUrl, updatedAt: Date.now() });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("IndexedDB save warning:", err);
  }

  // 2. Persist to server /public/games/<key>.png
  try {
    const catalogItem = GAME_IMAGE_CATALOG.find((c) => c.key === key);
    const filename = catalogItem ? catalogItem.expectedFilename : `${key}.png`;
    await fetch("/api/upload-game-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, base64: dataUrl }),
    });
  } catch {
    // server endpoint might not be reachable if client-only build, which is fine
  }

  // 3. Broadcast to all listening React components
  window.dispatchEvent(
    new CustomEvent("megawins-game-image-updated", {
      detail: { key, dataUrl },
    })
  );
}

export async function getStoredGameImage(key: string): Promise<string | null> {
  if (memoryCache.has(key)) {
    return memoryCache.get(key) || null;
  }

  try {
    const db = await openDB();
    return await new Promise<string | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        if (req.result?.dataUrl) {
          memoryCache.set(key, req.result.dataUrl);
          resolve(req.result.dataUrl);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function getAllStoredImages(): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  try {
    const db = await openDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        for (const item of req.result || []) {
          result[item.key] = item.dataUrl;
          memoryCache.set(item.key, item.dataUrl);
        }
        resolve();
      };
      req.onerror = () => resolve();
    });
  } catch {
    // fallback to memory cache
    memoryCache.forEach((v, k) => {
      result[k] = v;
    });
  }
  return result;
}

// React Hook for automatic reactive game image loading
export function useGameImage(key: string, defaultSrc?: string): string | undefined {
  const [src, setSrc] = useState<string | undefined>(() => memoryCache.get(key) || defaultSrc);

  useEffect(() => {
    let isMounted = true;

    // Check IndexedDB
    getStoredGameImage(key).then((stored) => {
      if (isMounted && stored) {
        setSrc(stored);
      }
    });

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; dataUrl: string }>;
      if (customEvent.detail?.key === key && isMounted) {
        setSrc(customEvent.detail.dataUrl);
      }
    };

    window.addEventListener("megawins-game-image-updated", handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener("megawins-game-image-updated", handleUpdate);
    };
  }, [key, defaultSrc]);

  return src;
}
