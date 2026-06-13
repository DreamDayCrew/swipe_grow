// swipe_grow — SceneFrame
// Shared scene wrapper used by ReelNoVoice, ReelMyVoice, ReelAIVoice.
// Design matches DM-POST-01 PointFrame:
//   TOP    — series label (amber) + topic title (Anton) + amber bar
//   BOTTOM — point number + typewriter title (Anton) + amber bar + Cormorant italic subtext
//   NAV    — dot pagination (centre) + @swipe_grow watermark

import React from "react";
import {
  AbsoluteFill,
  Video,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, titleFontSize } from "./brand";
import { FilmGrain } from "./FilmGrain";

const CHAR_FRAMES = 2;
const SUBTITLE_CHAR_FRAMES = 1;

// ── Dot navigator ─────────────────────────────────────────────────────────────
const DotNav: React.FC<{ total: number; active: number }> = ({ total, active }) => (
  <div style={{ display: "flex", flexDirection: "row", gap: "8px", alignItems: "center" }}>
    {Array.from({ length: total }, (_, i) => (
      <div
        key={`dot-${i}`}
        style={{
          width: i === active ? "18px" : "6px",
          height: "6px",
          background: i === active ? BRAND.MINT : "rgba(127, 209, 174, 0.3)",
          borderRadius: "3px",
        }}
      />
    ))}
  </div>
);

// ── Scene type ────────────────────────────────────────────────────────────────
export interface Scene {
  id: number;
  duration: number;
  videoFile: string | null;
  bgType: "video" | "solid";
  mainText: string;
  subtext?: string | null;
  textPosition?: "top" | "center";
  animation?: "fade" | "slide" | "scale";
  audioFile?: string | null;
  pointNumber?: number;  // 01, 02 … — omit or 0 to hide
}

// ── SceneFrame ────────────────────────────────────────────────────────────────
export const SceneFrame: React.FC<{
  scene: Scene;
  reelCategory?: string;
  reelTitle?: string;
  slideIndex?: number;   // 0-based among content (video) slides
  totalSlides?: number;  // total content slides, for dot nav
}> = ({ scene, reelCategory, reelTitle, slideIndex = 0, totalSlides = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = scene.duration * fps;
  const { FADE_FRAMES, KEN_BURNS_SCALE } = BRAND;

  const isSolid  = scene.bgType === "solid" || !scene.videoFile;
  const isCenter = scene.textPosition === "center";  // closing CTA slide

  // ── Crossfade envelope ───────────────────────────────────────────────────
  const opacity = interpolate(
    frame,
    [0, FADE_FRAMES, durationInFrames - FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── Ken Burns zoom ───────────────────────────────────────────────────────
  const scale = interpolate(frame, [0, durationInFrames], [1, KEN_BURNS_SCALE], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Text fade-in after crossfade ─────────────────────────────────────────
  const textOpacity = interpolate(frame, [FADE_FRAMES, FADE_FRAMES + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Typewriter — both start at FADE_FRAMES ───────────────────────────────
  const rawText = scene.mainText;
  const typedChars = Math.min(rawText.length, Math.max(0, Math.floor((frame - FADE_FRAMES) / CHAR_FRAMES)));
  const typedText = rawText.slice(0, typedChars);

  const rawSubtitle = scene.subtext ?? "";
  const subtitleTypedChars = Math.min(rawSubtitle.length, Math.max(0, Math.floor((frame - FADE_FRAMES) / SUBTITLE_CHAR_FRAMES)));
  const typedSubtitle = rawSubtitle.slice(0, subtitleTypedChars);

  const showPointNumber = (scene.pointNumber ?? 0) > 0;
  const pointLabel = (scene.pointNumber ?? 0) < 10
    ? `0${scene.pointNumber}`
    : `${scene.pointNumber}`;

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
              filter: "brightness(0.6) saturate(0.8)",
            }}
            muted
            startFrom={0}
          />
        </AbsoluteFill>
      )}

      {/* ── Scrims (video only) ── */}
      {!isSolid && (
        <>
          <AbsoluteFill style={{ background: BRAND.SCRIM_MID }} />
          <AbsoluteFill style={{ background: BRAND.SCRIM_TOP }} />
          <AbsoluteFill style={{ background: BRAND.SCRIM_BOTTOM }} />
        </>
      )}

      <FilmGrain />

      {/* ── TOP: series label + topic title (content slides only) ── */}
      {!isCenter && (reelCategory || reelTitle) && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: `0 ${BRAND.PADDING_X}px`,
            paddingTop: `${BRAND.TITLE_TOP}px`,
            opacity: textOpacity,
          }}
        >
          {reelCategory && (
            <span
              style={{
                fontFamily: BRAND.FONT_BODY,
                fontWeight: 500,
                color: BRAND.AMBER,
                fontSize: "28px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              {reelCategory}
            </span>
          )}
          {reelTitle && (
            <span
              style={{
                fontFamily: BRAND.FONT_TITLE,
                color: BRAND.MINT,
                fontSize: titleFontSize(reelTitle),
                lineHeight: 1.05,
                letterSpacing: "-1px",
                textTransform: "uppercase",
                whiteSpace: "pre-line",
                textShadow: "0 2px 24px rgba(15,24,21,0.6)",
              }}
            >
              {reelTitle}
            </span>
          )}
          <div
            style={{
              width: `${BRAND.AMBER_LINE_WIDTH}px`,
              height: `${BRAND.AMBER_LINE_HEIGHT}px`,
              background: BRAND.AMBER,
              marginTop: "16px",
              borderRadius: "2px",
            }}
          />
        </AbsoluteFill>
      )}

      {/* ── BOTTOM: point content ── */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: isCenter ? "center" : "flex-end",
          padding: `0 ${BRAND.PADDING_X}px`,
          paddingBottom: isCenter ? "0" : "18%",
        }}
      >
        {/* Point number */}
        {!isCenter && showPointNumber && (
          <span
            style={{
              fontFamily: BRAND.FONT_BODY,
              fontWeight: 500,
              color: BRAND.AMBER,
              fontSize: "36px",
              marginBottom: "8px",
              letterSpacing: "1px",
              opacity: textOpacity,
            }}
          >
            {pointLabel}
          </span>
        )}

        {/* Anton title — typewriter */}
        <span
          style={{
            fontFamily: BRAND.FONT_TITLE,
            color: BRAND.MINT,
            fontSize: titleFontSize(scene.mainText),
            lineHeight: 1.05,
            letterSpacing: "-1px",
            textTransform: "uppercase",
            whiteSpace: "pre-line",
            textShadow: "0 2px 24px rgba(15,24,21,0.6)",
            minHeight: isCenter ? undefined : "2.2em",
            textAlign: isCenter ? "center" : "left",
          }}
        >
          {isCenter ? scene.mainText : typedText}
        </span>

        {/* Amber underline */}
        <div
          style={{
            width: `${BRAND.AMBER_LINE_WIDTH}px`,
            height: `${BRAND.AMBER_LINE_HEIGHT}px`,
            background: BRAND.AMBER,
            marginTop: "14px",
            marginBottom: "18px",
            borderRadius: "2px",
            opacity: textOpacity,
            alignSelf: isCenter ? "center" : "flex-start",
          }}
        />

        {/* Cormorant italic subtext — typewriter (or static on closing slide) */}
        {rawSubtitle.length > 0 && (
          <span
            style={{
              fontFamily: BRAND.FONT_EDITORIAL,
              fontStyle: "italic",
              fontWeight: 400,
              color: BRAND.MINT_MID,
              fontSize: "40px",
              lineHeight: 1.45,
              maxWidth: "880px",
              minHeight: isCenter ? undefined : "4.35em",
              textAlign: isCenter ? "center" : "left",
            }}
          >
            {isCenter ? rawSubtitle : typedSubtitle}
          </span>
        )}
      </AbsoluteFill>

      {/* ── Dot navigator — content slides only ── */}
      {!isCenter && totalSlides > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "130px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: textOpacity,
          }}
        >
          <DotNav total={totalSlides} active={slideIndex} />
        </div>
      )}

      {/* ── @swipe_grow watermark ── */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontFamily: BRAND.FONT_BODY,
            fontWeight: 500,
            color: BRAND.MINT_SOFT,
            fontSize: "26px",
            letterSpacing: "2px",
          }}
        >
          @swipe_grow
        </span>
      </div>
    </AbsoluteFill>
  );
};
