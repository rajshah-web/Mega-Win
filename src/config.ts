import { casinoAudio } from "./utils/casinoAudio";

/**
 * Central Application Configuration
 * Hostable on Vercel with environment variable override support
 */
export const CONFIG = {
  SITE_NAME: "MegaWins",
  TAGLINE: "No.1 Free-to-Play Social Casino",
  // Logo Image (set to your image URL or local path like "/logo.png", or leave empty for default badge)
  LOGO_IMAGE_URL: "/games/mega-win.png",
  // Mega Win celebration popup graphic (set to image URL like "/games/mega-win.png")
  MEGA_WIN_IMAGE_URL: "/games/mega-win.png",
  // Redirect target requested by user; fallback to default if env var is unset
  TELEGRAM_URL:
    (import.meta.env.VITE_TELEGRAM_URL as string) ||
    "https://t.me/everestonlinegamingroom",
  SUPPORT_HANDLE: "@everestonlinegamingroom",
  INITIAL_JACKPOT: 147423.53,
  COMMUNITY_MEMBERS: "24,500+",
  TOTAL_GAMES: "500+",
  PLATFORMS_COUNT: "16",
};

/**
 * Global game action dispatcher
 * Plays authentic casino winning fanfare + coin clatter and opens the Telegram gaming room
 */
export const handlePlayRedirect = (gameName?: string) => {
  // 1. Play real casino winning sound
  try {
    casinoAudio.playCasinoWinningSound();
  } catch (e) {
    console.warn("Audio trigger:", e);
  }

  // 2. Dispatch custom event for visual celebration particles & announcement
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("megawins-win-celebration", {
        detail: { gameName: gameName || "MegaWins Jackpot" },
      })
    );
  }

  // 3. Open Telegram gaming room in new tab
  const url = CONFIG.TELEGRAM_URL;
  setTimeout(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, 120);
};
