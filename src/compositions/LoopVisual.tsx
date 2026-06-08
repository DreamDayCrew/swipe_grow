// swipe_grow — LoopVisual
// Content type: "loop"
// Structure: pure video loop, NO text, NO voiceover
// Only: video + film grain + subtle vignette
// IG music added manually after render

import React from "react";
import { AbsoluteFill, Video, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BRAND } from "../shared/brand";
import { FilmGrain } from "../shared/FilmGrain";

export interface LoopVisualConfig {
  videoFile: string;      // e.g. "loop_scene.mp4"
  durationSeconds: number;
}

export const LoopVisual: React.FC<LoopVisualConfig> = ({
  videoFile,
  durationSeconds,
}) => {
  const frame = useCurrentFrame();
  const durationInFrames = durationSeconds * BRAND.FPS;

  // Subtle Ken Burns
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gentle fade in / fade out
  const opacity = interpolate(
    frame,
    [0, 20, durationInFrames - 20, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: BRAND.BG_DARK, opacity }}>
      {/* Video */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Video
          src={staticFile(`videos/${videoFile}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
          muted
          startFrom={0}
          loop
        />
      </AbsoluteFill>

      {/* Subtle dark vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(15,24,21,0.55) 100%)",
        }}
      />

      {/* Film grain */}
      <FilmGrain />
    </AbsoluteFill>
  );
};
