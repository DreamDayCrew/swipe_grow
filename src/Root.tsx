// swipe_grow — Root.tsx
// Config-driven. Edit src/config.ts per render.
// Bulk reels: add configs to configs/index.ts — they are auto-registered here.

import { Composition } from "remotion";
import { CONFIG, getTotalFrames } from "./config";
import { BRAND } from "./shared/brand";
import { ALL_REEL_CONFIGS, reelTotalFrames, ALL_POST_CONFIGS, postTotalFrames } from "../configs";

import { ReelNoVoice } from "./compositions/ReelNoVoice";
import { ReelMyVoice } from "./compositions/ReelMyVoice";
import { ReelAIVoice } from "./compositions/ReelAIVoice";
import { Post } from "./compositions/Post";
import { LoopVisual } from "./compositions/LoopVisual";
import { SilentShift } from "./compositions/SilentShift";

function getComponent() {
  switch (CONFIG.contentType) {
    case "reel_no_voice":  return ReelNoVoice;
    case "reel_my_voice":  return ReelMyVoice;
    case "reel_ai_voice":  return ReelAIVoice;
    case "post":           return Post;
    case "loop":           return LoopVisual;
    case "silent_shift":   return SilentShift;
  }
}

function getProps() {
  switch (CONFIG.contentType) {
    case "reel_no_voice":
      return { hook: CONFIG.hook, scenes: CONFIG.scenes, reelCategory: CONFIG.reelCategory, reelTitle: CONFIG.reelTitle };
    case "reel_my_voice":
      return { scenes: CONFIG.scenes };
    case "reel_ai_voice":
      return { scenes: CONFIG.scenes };
    case "post":
      return {
        slides: CONFIG.post.slides,
        reelCategory: CONFIG.post.reelCategory,
        reelTitle: CONFIG.post.reelTitle,
      };
    case "loop":
      return {
        videoFile: CONFIG.loop.videoFile,
        durationSeconds: CONFIG.loop.durationSeconds,
      };
    case "silent_shift":
      return {
        scenes: CONFIG.silentShift.scenes,
        closing: CONFIG.silentShift.closing,
      };
  }
}

export const RemotionRoot: React.FC = () => {
  const Component = getComponent() as React.FC<any>;
  const props = getProps();
  const totalFrames = getTotalFrames();

  return (
    <>
      {/* Active working config — edit src/config.ts to switch */}
      <Composition
        id={CONFIG.reelId}
        component={Component}
        durationInFrames={totalFrames}
        fps={BRAND.FPS}
        width={BRAND.WIDTH}
        height={BRAND.HEIGHT}
        defaultProps={props}
      />

      {/* All bulk reel configs — registered automatically from configs/index.ts */}
      {ALL_REEL_CONFIGS.map((cfg) => (
        <Composition
          key={cfg.reelId}
          id={cfg.reelId}
          component={ReelNoVoice as React.FC<any>}
          durationInFrames={reelTotalFrames(cfg)}
          fps={BRAND.FPS}
          width={BRAND.WIDTH}
          height={BRAND.HEIGHT}
          defaultProps={{ hook: cfg.hook, scenes: cfg.scenes, reelCategory: cfg.reelCategory, reelTitle: cfg.reelTitle }}
        />
      ))}

      {/* All bulk post (carousel) configs — registered automatically from configs/index.ts */}
      {ALL_POST_CONFIGS.map((cfg) => (
        <Composition
          key={cfg.reelId}
          id={cfg.reelId}
          component={Post as React.FC<any>}
          durationInFrames={postTotalFrames(cfg)}
          fps={BRAND.FPS}
          width={BRAND.WIDTH}
          height={BRAND.HEIGHT}
          defaultProps={{ slides: cfg.slides, reelCategory: cfg.reelCategory, reelTitle: cfg.reelTitle }}
        />
      ))}
    </>
  );
};