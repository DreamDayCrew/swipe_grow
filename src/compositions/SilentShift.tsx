// swipe_grow — SilentShift
// Content type: "silent_shift"
// Structure: 3–5 video scenes (NO text) → ONE closing line on dark bg
// No voiceover. Perspective shift through visuals alone.
// IG music added manually after render.

import React from "react";
import {
  AbsoluteFill,
  Video,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, titleFontSize } from "../shared/brand";
import { FilmGrain } from "../shared/FilmGrain";

// ── Visual scene (no text) ────────────────────────────────────────────────────
interface VisualScene {
  id: number;
  duration: number;      // seconds
  videoFile: string;
}

// ── Closing line scene ────────────────────────────────────────────────────────
interface ClosingLine {
  duration: number;      // seconds — typically 4–6s
  mainText: string;      // ONE line only — brand rule
  subtext?: string | null;
}

export interface SilentShiftConfig {
  scenes: VisualScene[];    // 3–5 visual scenes
  closing: ClosingLine;     // exactly ONE closing line
}

// ── Single visual scene ───────────────────────────────────────────────────────
const VisualSceneFrame: React.FC<{ scene: VisualScene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = scene.duration * fps;

  const opacity = interpolate(
    frame,
    [0, BRAND.FADE_FRAMES, durationInFrames - BRAND.FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scale = interpolate(frame, [0, durationInFrames], [1.0, BRAND.KEN_BURNS_SCALE], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
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

      {/* Light vignette — no text so keep subtle */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(15,24,21,0.45) 100%)",
        }}
      />

      <FilmGrain />
    </AbsoluteFill>
  );
};

// ── Closing line screen ───────────────────────────────────────────────────────
const ClosingLineFrame: React.FC<{ closing: ClosingLine }> = ({ closing }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, BRAND.FADE_FRAMES, durationInFrames - BRAND.FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const textOpacity = interpolate(frame, [BRAND.FADE_FRAMES, BRAND.FADE_FRAMES + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity, background: BRAND.BG_GRADIENT }}>
      <FilmGrain />

      {/* ONE closing line — center */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: `${BRAND.PADDING_X}px`,
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontFamily: BRAND.FONT_TITLE,
            color: BRAND.MINT,
            fontSize: titleFontSize(closing.mainText),
            lineHeight: 1.05,
            letterSpacing: "-1px",
            textTransform: "uppercase",
            whiteSpace: "pre-line",
            textAlign: "center",
            textShadow: "0 2px 24px rgba(15,24,21,0.6)",
          }}
        >
          {closing.mainText}
        </span>

        {/* Amber line */}
        <div
          style={{
            width: `${BRAND.AMBER_LINE_WIDTH}px`,
            height: `${BRAND.AMBER_LINE_HEIGHT}px`,
            background: BRAND.AMBER,
            marginTop: "20px",
            borderRadius: "2px",
            opacity: 0.85,
          }}
        />

        {/* Optional Cormorant subtext */}
        {closing.subtext && (
          <span
            style={{
              fontFamily: BRAND.FONT_EDITORIAL,
              fontStyle: "italic",
              color: BRAND.MINT_MID,
              fontSize: "40px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            {closing.subtext}
          </span>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Main composition ──────────────────────────────────────────────────────────
export const SilentShift: React.FC<SilentShiftConfig> = ({ scenes, closing }) => {
  const fps = BRAND.FPS;
  let cursor = 0;

  return (
    <AbsoluteFill style={{ background: BRAND.BG_DARK }}>
      <style>{BRAND.GOOGLE_FONTS}</style>

      {/* Visual scenes — no text */}
      {scenes.map((scene) => {
        const from = cursor;
        const durationInFrames = scene.duration * fps;
        cursor += durationInFrames;

        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <VisualSceneFrame scene={scene} />
          </Sequence>
        );
      })}

      {/* ONE closing line */}
      <Sequence from={cursor} durationInFrames={closing.duration * fps}>
        <ClosingLineFrame closing={closing} />
      </Sequence>
    </AbsoluteFill>
  );
};
