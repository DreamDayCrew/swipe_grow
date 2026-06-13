// swipe_grow — ReelNoVoice
// Content type: "reel_no_voice"
// Structure: 3s HookScreen → content scenes (video bg) → optional CTA (solid)
// All scenes rendered via SceneFrame with DM-POST-01 point-slide design.

import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { BRAND } from "../shared/brand";
import { HookScreen } from "../shared/HookScreen";
import { SceneFrame, Scene } from "../shared/SceneFrame";

export interface ReelNoVoiceConfig {
  hook: {
    mainText: string;
    subtext: string;
    highlightWord?: string;
  };
  scenes: Scene[];
  reelCategory?: string;
  reelTitle?: string;
}

const HOOK_DURATION_S = 3;

export const ReelNoVoice: React.FC<ReelNoVoiceConfig> = ({
  hook,
  scenes,
  reelCategory,
  reelTitle,
}) => {
  const fps = BRAND.FPS;
  const hookFrames = HOOK_DURATION_S * fps;

  // Only video scenes get dot-nav and point-number treatment
  const contentScenes = scenes.filter((s) => s.bgType !== "solid");
  const totalSlides = contentScenes.length;

  let cursor = hookFrames;
  let contentIdx = 0;

  return (
    <AbsoluteFill style={{ background: BRAND.BG_DARK }}>
      <style>{BRAND.GOOGLE_FONTS}</style>

      {/* 3s Hook */}
      <Sequence from={0} durationInFrames={hookFrames}>
        <HookScreen
          mainText={hook.mainText}
          subtext={hook.subtext}
          videoFile={scenes[0]?.videoFile ?? null}
          highlightWord={hook.highlightWord}
        />
      </Sequence>

      {/* Content scenes */}
      {scenes.map((scene) => {
        const from = cursor;
        const durationInFrames = scene.duration * fps;
        cursor += durationInFrames;

        const isContent = scene.bgType !== "solid";
        const currentIdx = isContent ? contentIdx++ : -1;

        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <SceneFrame
              scene={scene}
              reelCategory={reelCategory}
              reelTitle={reelTitle}
              slideIndex={currentIdx}
              totalSlides={totalSlides}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
