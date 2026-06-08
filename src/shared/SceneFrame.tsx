// swipe_grow — SceneFrame
// Shared scene wrapper used by ReelNoVoice, ReelMyVoice, ReelAIVoice.
// Handles: video bg / solid bg, scrims, grain, Ken Burns, crossfade, TextBlock.

import React from "react";
import {
  AbsoluteFill,
  Video,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "./brand";
import { FilmGrain } from "./FilmGrain";
import { TextBlock } from "./TextBlock";

export interface Scene {
  id: number;
  duration: number;          // seconds
  videoFile: string | null;  // null = solid bg
  bgType: "video" | "solid"; // hook handled separately via HookScreen
  mainText: string;
  subtext?: string | null;
  textPosition?: "top" | "center";
  animation?: "fade" | "slide" | "scale";
  audioFile?: string | null; // used by ReelAIVoice only
}

export const SceneFrame: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = scene.duration * fps;
  const { FADE_FRAMES, KEN_BURNS_SCALE } = BRAND;

  // ── Crossfade envelope ───────────────────────────────────────────────────
  const opacity = interpolate(
    frame,
    [0, FADE_FRAMES, durationInFrames - FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── Ken Burns zoom ───────────────────────────────────────────────────────
  const scale = interpolate(frame, [0, durationInFrames], [1.0, KEN_BURNS_SCALE], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Text animations ──────────────────────────────────────────────────────
  const textOpacity = spring({
    frame,
    fps,
    config: { mass: 0.4, damping: 14, stiffness: 120 },
    durationInFrames: 20,
  });

  const textY =
    scene.animation === "slide"
      ? (1 - spring({
          frame,
          fps,
          config: { mass: 0.5, damping: 12, stiffness: 100 },
          durationInFrames: 20,
        })) * 32
      : 0;

  const textScale =
    scene.animation === "scale"
      ? spring({
          frame: frame - FADE_FRAMES,
          fps,
          config: { mass: 0.5, damping: 12, stiffness: 100 },
        })
      : 1;

  const isSolid = scene.bgType === "solid" || !scene.videoFile;
  const isCenter = scene.textPosition === "center";

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* ── Background ── */}
      {isSolid ? (
        <AbsoluteFill style={{ background: BRAND.BG_GRADIENT }} />
      ) : (
        <AbsoluteFill style={{ overflow: "hidden" }}>
          <Video
            src={staticFile(`videos/${scene.videoFile}`)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
            muted
            startFrom={0}
          />
        </AbsoluteFill>
      )}

      {/* ── Scrims (video only) ── */}
      {!isSolid && (
        <>
          <AbsoluteFill style={{ background: BRAND.SCRIM_TOP }} />
          <AbsoluteFill style={{ background: BRAND.SCRIM_BOTTOM }} />
        </>
      )}

      {/* ── Film grain ── */}
      <FilmGrain />

      {/* ── Text ── */}
      <TextBlock
        mainText={scene.mainText}
        subtext={scene.subtext}
        position={isCenter ? "center" : "top"}
        opacity={textOpacity}
        translateY={textY}
        scale={textScale}
        subtextStyle="pill"
      />
    </AbsoluteFill>
  );
};
