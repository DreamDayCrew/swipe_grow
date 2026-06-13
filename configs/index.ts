// swipe_grow — configs/index.ts
// Registry of all bulk configs for rendering.
// Root.tsx imports ALL_REEL_CONFIGS and ALL_POST_CONFIGS and registers each as a Remotion composition.
// Add new configs here as you create them.

import type { Slide } from "../src/compositions/Post";

const HOOK_S = 3;
const FPS = 30;

// ── Reel (reel_no_voice) bulk ────────────────────────────────────────────────
export interface ReelConfig {
  contentType: "reel_no_voice";
  reelId: string;
  title: string;
  backgroundPrompt?: string;
  reelCategory?: string;
  reelTitle?: string;
  hook: {
    mainText: string;
    subtext: string;
    highlightWord?: string;
  };
  scenes: {
    id: number;
    duration: number;
    videoFile: string | null;
    bgType: "video" | "solid";
    mainText: string;
    subtext?: string | null;
    textPosition?: "top" | "center";
    animation?: "fade" | "slide" | "scale";
    audioFile?: string | null;
    pointNumber?: number;
  }[];
}

export function reelTotalFrames(cfg: ReelConfig): number {
  return (HOOK_S + cfg.scenes.reduce((sum, s) => sum + s.duration, 0)) * FPS;
}

export const ALL_REEL_CONFIGS: ReelConfig[] = [
  // add new reel configs here
];

// ── Post (carousel) bulk ─────────────────────────────────────────────────────
export interface PostEntry {
  reelId: string;
  reelCategory?: string;
  reelTitle?: string;
  slides: Slide[];
}

export function postTotalFrames(cfg: PostEntry): number {
  return cfg.slides.reduce((sum, s) => sum + s.duration, 0) * FPS;
}

export const ALL_POST_CONFIGS: PostEntry[] = [
  // add new post carousel configs here
];
