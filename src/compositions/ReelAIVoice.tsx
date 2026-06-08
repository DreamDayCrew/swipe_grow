// swipe_grow — ReelAIVoice
// Content type: "reel_ai_voice"
// Structure: scenes (video bg) + scene_N.mp3 per scene
// No hook — AI voice opening line IS the hook
// Audio files: public/audio/scene_1.mp3 … scene_N.mp3

import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { BRAND } from "../shared/brand";
import { SceneFrame, Scene } from "../shared/SceneFrame";

export interface ReelAIVoiceConfig {
  scenes: (Scene & { audioFile?: string | null })[];
}

export const ReelAIVoice: React.FC<ReelAIVoiceConfig> = ({ scenes }) => {
  const fps = BRAND.FPS;
  let cursor = 0;

  return (
    <AbsoluteFill style={{ background: BRAND.BG_DARK }}>
      <style>{BRAND.GOOGLE_FONTS}</style>

      {/* Per-scene audio — each scene plays its own mp3 */}
      {scenes.map((scene) => {
        const from = cursor;
        const durationInFrames = scene.duration * fps;
        cursor += durationInFrames;

        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <SceneFrame scene={scene} />
            {scene.audioFile && (
              <Audio
                src={staticFile(`audio/${scene.audioFile}`)}
                startFrom={0}
              />
            )}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
