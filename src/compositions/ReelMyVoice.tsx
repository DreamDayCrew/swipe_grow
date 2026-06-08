// swipe_grow — ReelMyVoice
// Content type: "reel_my_voice"
// Structure: scenes (video bg) + single voiceover.mp3
// No hook — your voice IS the hook (first 3 seconds of recording)
// Audio file: public/audio/voiceover.mp3

import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { BRAND } from "../shared/brand";
import { SceneFrame, Scene } from "../shared/SceneFrame";

export interface ReelMyVoiceConfig {
  scenes: Scene[];
}

export const ReelMyVoice: React.FC<ReelMyVoiceConfig> = ({ scenes }) => {
  const fps = BRAND.FPS;
  let cursor = 0;

  return (
    <AbsoluteFill style={{ background: BRAND.BG_DARK }}>
      <style>{BRAND.GOOGLE_FONTS}</style>

      {/* Single merged voiceover — your recorded voice */}
      <Audio src={staticFile("audio/voiceover.mp3")} startFrom={0} />

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
