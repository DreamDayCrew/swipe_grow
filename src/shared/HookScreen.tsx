// swipe_grow — HookScreen (Option C)
// Used ONLY by ReelNoVoice.tsx
// 3 seconds. Dark bg. Anton title + amber line + Cormorant italic subtitle.
// This is the scroll-stopper. Everything else comes after.

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "./brand";
import { FilmGrain } from "./FilmGrain";
import { TextBlock } from "./TextBlock";

interface HookScreenProps {
  mainText: string;   // e.g. "YOUR BRAIN IS RUNNING YOUR LIFE."
  subtext: string;    // e.g. "And you never gave it permission."
}

export const HookScreen: React.FC<HookScreenProps> = ({
  mainText,
  subtext,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fade in + fade out envelope
  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Spring scale — snappy entrance
  const scale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90 },
    durationInFrames: 20,
  });

  // Text fade in
  const textOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity, background: BRAND.BG_GRADIENT }}>
      <style>{BRAND.GOOGLE_FONTS}</style>

      <FilmGrain />

      <TextBlock
        mainText={mainText}
        subtext={subtext}
        position="center"
        opacity={textOpacity}
        scale={scale}
        subtextStyle="cormorant"
      />
    </AbsoluteFill>
  );
};
