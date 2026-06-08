// swipe_grow — Brand Tokens
// Single source of truth. Never edit colors/fonts in compositions directly.
// All compositions import from here.

export const BRAND = {
  // ── Colors ──────────────────────────────────────────────────────────────
  BG_DARK: "#0F1815",
  BG_GRADIENT: "linear-gradient(180deg, #1a2620 0%, #0F1815 100%)",

  MINT: "#7FD1AE",                              // primary text + accent
  MINT_SOFT: "rgba(127, 209, 174, 0.55)",       // subtext pill
  MINT_MID: "rgba(127, 209, 174, 0.72)",        // Cormorant subtitle
  AMBER: "#E8A86B",                             // accent line (rare)

  SCRIM_MID: "rgba(15, 24, 21, 0.45)",              // uniform dark layer over video

  SCRIM_TOP:
    "linear-gradient(180deg, rgba(15,24,21,0.92) 0%, rgba(15,24,21,0.65) 40%, rgba(15,24,21,0.15) 70%, rgba(15,24,21,0.0) 100%)",
  SCRIM_BOTTOM:
    "linear-gradient(0deg, rgba(15,24,21,0.72) 0%, rgba(15,24,21,0.0) 40%)",

  // ── Fonts ────────────────────────────────────────────────────────────────
  FONT_TITLE: "'Anton', sans-serif",            // ALL CAPS, bold condensed
  FONT_BODY: "'Plus Jakarta Sans', sans-serif", // 400 / 500
  FONT_EDITORIAL: "'Cormorant Garamond', serif", // italic, pull quotes + hook subtitle

  GOOGLE_FONTS:
    "@import url('https://fonts.googleapis.com/css2?family=Anton&family=Plus+Jakarta+Sans:wght@400;500&family=Cormorant+Garamond:ital@1&display=swap');",

  // ── Canvas ───────────────────────────────────────────────────────────────
  WIDTH: 1080,
  HEIGHT: 1920,
  FPS: 30,
  ASPECT: "9:16",

  // ── Layout ───────────────────────────────────────────────────────────────
  PADDING_X: 72,                 // horizontal padding (px)
  TITLE_TOP: 172,                // paddingTop for top-aligned title (px)
  AMBER_LINE_WIDTH: 48,          // accent underline width (px)
  AMBER_LINE_HEIGHT: 3,          // accent underline height (px)

  // ── Animation ────────────────────────────────────────────────────────────
  FADE_FRAMES: 20,               // crossfade duration between scenes
  KEN_BURNS_SCALE: 1.07,         // max zoom for video bg
} as const;

// ── Font size helper ─────────────────────────────────────────────────────────
// Returns Anton font size based on text length
export function titleFontSize(text: string): string {
  const len = text.replaceAll("\n", "").length;
  if (len > 28) return "86px";
  if (len > 20) return "100px";
  return "116px";
}
