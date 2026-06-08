// swipe_grow — ReelNoVoice
// Content type: "reel_no_voice"
// Structure: 3s HookScreen → scenes (video bg, no audio)
// Used for: stock footage reels with IG music only

import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { BRAND } from "../shared/brand";
import { HookScreen } from "../shared/HookScreen";
import { SceneFrame, Scene } from "../shared/SceneFrame";

export interface ReelNoVoiceConfig {
  hook: {
    mainText: string;
    subtext: string;
  };
  scenes: Scene[];
}

const HOOK_DURATION_S = 3;

export const ReelNoVoice: React.FC<ReelNoVoiceConfig> = ({ hook, scenes }) => {
  const fps = BRAND.FPS;
  const hookFrames = HOOK_DURATION_S * fps;

  let cursor = hookFrames; // start scenes after hook

  return (
    <AbsoluteFill style={{ background: BRAND.BG_DARK }}>
      <style>{BRAND.GOOGLE_FONTS}</style>

      {/* 3s Hook */}
      <Sequence from={0} durationInFrames={hookFrames}>
        <HookScreen mainText={hook.mainText} subtext={hook.subtext} />
      </Sequence>

      {/* Content scenes */}
      {scenes.map((scene) => {
        const from = cursor;
        const durationInFrames = scene.duration * fps;
        cursor += durationInFrames;

        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <SceneFrame scene={scene} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
