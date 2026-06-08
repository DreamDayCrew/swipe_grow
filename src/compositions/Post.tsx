// swipe_grow — Post (Carousel)
// Content type: "post"
// Structure: cover slide → point slides (topic + point number + subtitle)
// No audio. Save-worthy reference content.
// Background: video or solid per slide.

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

// Typewriter speeds
const CHAR_FRAMES = 2;          // main text: 1 char per 2 frames (~15 chars/sec)
const SUBTITLE_CHAR_FRAMES = 1; // subtitle: 1 char per frame (~30 chars/sec)

// ── Slide types ───────────────────────────────────────────────────────────────
export interface CoverSlide {
  type: "cover";
  duration: number;
  videoFile?: string | null;
  pillarLabel: string;
  mainText: string;
  highlightWord?: string;
  serialNumber?: string;
}

export interface PointSlide {
  type: "point";
  duration: number;
  videoFile?: string | null;
  pointNumber: number;    // 01, 02 … — set 0 to hide number
  mainText: string;
  subtitle: string;
}

export interface EndSlide {
  type: "end";
  duration: number;
  mainText: string;
  subtext?: string | null;
}

export type Slide = CoverSlide | PointSlide | EndSlide;

export interface PostConfig {
  reelCategory?: string;
  reelTitle?: string;
  slides: Slide[];
}

// ── Hook cover helpers ────────────────────────────────────────────────────────

function hookFontSize(text: string): string {
  const len = text.replaceAll("\n", "").length;
  if (len > 28) return "118px";
  if (len > 20) return "138px";
  return "155px";
}

function HighlightedTitle({
  text,
  highlightWord,
  fontSize,
}: Readonly<{
  text: string;
  highlightWord?: string;
  fontSize: string;
}>) {
  const baseStyle: React.CSSProperties = {
    fontFamily: BRAND.FONT_TITLE,
    color: BRAND.MINT,
    fontSize,
    lineHeight: 1.15,
    letterSpacing: "-2px",
    textTransform: "uppercase",
    whiteSpace: "pre-line",
  };

  if (!highlightWord) {
    return <span style={baseStyle}>{text}</span>;
  }

  const upper = text.toUpperCase();
  const hw = highlightWord.toUpperCase();
  const idx = upper.indexOf(hw);
  if (idx === -1) return <span style={baseStyle}>{text}</span>;

  const before = text.slice(0, idx);
  const word   = text.slice(idx, idx + hw.length);
  const after  = text.slice(idx + hw.length);

  return (
    <span style={baseStyle}>
      {before}
      <span
        style={{
          background: BRAND.AMBER,
          color: BRAND.BG_DARK,
          padding: "0 10px 4px",
          borderRadius: "6px",
          display: "inline",
          letterSpacing: "-1px",
        }}
      >
        {word}
      </span>
      {after}
    </span>
  );
}

// ── Cover slide ───────────────────────────────────────────────────────────────
const CoverFrame: React.FC<{ slide: CoverSlide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = slide.duration * fps;
  const isSolid = !slide.videoFile;

  const opacity = interpolate(
    frame,
    [0, BRAND.FADE_FRAMES, durationInFrames - BRAND.FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const textOpacity = interpolate(frame, [BRAND.FADE_FRAMES, BRAND.FADE_FRAMES + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, durationInFrames], [1, BRAND.KEN_BURNS_SCALE], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fontSize = hookFontSize(slide.mainText);

  return (
    <AbsoluteFill style={{ opacity }}>
      {isSolid ? (
        <AbsoluteFill style={{ background: BRAND.BG_GRADIENT }} />
      ) : (
        <AbsoluteFill style={{ overflow: "hidden" }}>
          <Video
            src={staticFile(`videos/${slide.videoFile}`)}
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})`, filter: "brightness(0.6) saturate(0.8)" }}
            muted startFrom={0}
          />
        </AbsoluteFill>
      )}
      {!isSolid && (
        <>
          <AbsoluteFill style={{ background: BRAND.SCRIM_MID }} />
          <AbsoluteFill style={{ background: BRAND.SCRIM_TOP }} />
          <AbsoluteFill style={{ background: BRAND.SCRIM_BOTTOM }} />
        </>
      )}
      <FilmGrain />

      {/* Main headline — vertically centered, fills the frame */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: `0 ${BRAND.PADDING_X}px`,
          opacity: textOpacity,
        }}
      >
        <HighlightedTitle
          text={slide.mainText}
          highlightWord={slide.highlightWord}
          fontSize={fontSize}
        />
        <div
          style={{
            width: `${BRAND.AMBER_LINE_WIDTH}px`,
            height: `${BRAND.AMBER_LINE_HEIGHT}px`,
            background: BRAND.AMBER,
            marginTop: "28px",
            borderRadius: "2px",
          }}
        />
      </AbsoluteFill>

      {/* @swipe_grow watermark — bottom center */}
      <div
        style={{
          position: "absolute",
          bottom: "80px",
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

// ── Dot navigator ─────────────────────────────────────────────────────────────
const DotNav: React.FC<Readonly<{ total: number; active: number }>> = ({ total, active }) => (
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

// ── Point slide ───────────────────────────────────────────────────────────────
const PointFrame: React.FC<{
  slide: PointSlide;
  reelCategory?: string;
  reelTitle?: string;
  slideIndex: number;
  totalPoints: number;
}> = ({ slide, reelCategory, reelTitle, slideIndex, totalPoints }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = slide.duration * fps;
  const isSolid = !slide.videoFile;

  const opacity = interpolate(
    frame,
    [0, BRAND.FADE_FRAMES, durationInFrames - BRAND.FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scale = interpolate(frame, [0, durationInFrames], [1, BRAND.KEN_BURNS_SCALE], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(frame, [BRAND.FADE_FRAMES, BRAND.FADE_FRAMES + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Both typewriters start together at FADE_FRAMES
  const typingStart = BRAND.FADE_FRAMES;
  const rawText = slide.mainText;
  const typedChars = Math.min(rawText.length, Math.max(0, Math.floor((frame - typingStart) / CHAR_FRAMES)));
  const typedText = rawText.slice(0, typedChars);

  const rawSubtitle = slide.subtitle;
  const subtitleTypedChars = Math.min(rawSubtitle.length, Math.max(0, Math.floor((frame - typingStart) / SUBTITLE_CHAR_FRAMES)));
  const typedSubtitle = rawSubtitle.slice(0, subtitleTypedChars);

  return (
    <AbsoluteFill style={{ opacity }}>
      {isSolid ? (
        <AbsoluteFill style={{ background: BRAND.BG_GRADIENT }} />
      ) : (
        <AbsoluteFill style={{ overflow: "hidden" }}>
          <Video
            src={staticFile(`videos/${slide.videoFile}`)}
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})`, filter: "brightness(0.6) saturate(0.8)" }}
            muted startFrom={0}
          />
        </AbsoluteFill>
      )}
      {!isSolid && (
        <>
          <AbsoluteFill style={{ background: BRAND.SCRIM_MID }} />
          <AbsoluteFill style={{ background: BRAND.SCRIM_TOP }} />
          <AbsoluteFill style={{ background: BRAND.SCRIM_BOTTOM }} />
        </>
      )}
      <FilmGrain />

      {/* TOP: persistent reel header — same on every point slide */}
      {(reelCategory || reelTitle) && (
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

      {/* BOTTOM: point content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: `0 ${BRAND.PADDING_X}px`,
          paddingBottom: "18%",
        }}
      >
        {/* Point number */}
        {slide.pointNumber > 0 && (
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
            {slide.pointNumber < 10 ? `0${slide.pointNumber}` : `${slide.pointNumber}`}
          </span>
        )}

        {/* Point title — typewriter reveal */}
        <span
          style={{
            fontFamily: BRAND.FONT_TITLE,
            color: BRAND.MINT,
            fontSize: titleFontSize(slide.mainText),
            lineHeight: 1.05,
            letterSpacing: "-1px",
            textTransform: "uppercase",
            whiteSpace: "pre-line",
            textShadow: "0 2px 24px rgba(15,24,21,0.6)",
            minHeight: "2.2em",
          }}
        >
          {typedText}
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
          }}
        />

        {/* Subtitle — typewriter reveal after main text completes */}
        <span
          style={{
            fontFamily: BRAND.FONT_EDITORIAL,
            fontStyle: "italic",
            fontWeight: 400,
            color: BRAND.MINT_MID,
            fontSize: "40px",
            lineHeight: 1.45,
            maxWidth: "880px",
            minHeight: "4.35em",
          }}
        >
          {typedSubtitle}
        </span>
      </AbsoluteFill>

      {/* Dot navigator — bottom center */}
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
        <DotNav total={totalPoints} active={slideIndex} />
      </div>

      {/* @swipe_grow watermark — bottom center */}
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

// ── End slide ─────────────────────────────────────────────────────────────────
const EndFrame: React.FC<{ slide: EndSlide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, BRAND.FADE_FRAMES, durationInFrames - BRAND.FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const textOpacity = interpolate(frame, [BRAND.FADE_FRAMES, BRAND.FADE_FRAMES + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity, background: BRAND.BG_GRADIENT }}>
      <FilmGrain />
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
            fontSize: titleFontSize(slide.mainText),
            lineHeight: 1.05,
            letterSpacing: "-1px",
            textTransform: "uppercase",
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {slide.mainText}
        </span>
        <div
          style={{
            width: `${BRAND.AMBER_LINE_WIDTH}px`,
            height: `${BRAND.AMBER_LINE_HEIGHT}px`,
            background: BRAND.AMBER,
            marginTop: "20px",
            borderRadius: "2px",
          }}
        />
        {slide.subtext && (
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
            {slide.subtext}
          </span>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Main composition ──────────────────────────────────────────────────────────
export const Post: React.FC<PostConfig> = ({ slides, reelCategory, reelTitle }) => {
  const fps = BRAND.FPS;
  const totalPoints = slides.filter(s => s.type === "point").length;
  let cursor = 0;
  let pointIdx = 0;

  return (
    <AbsoluteFill style={{ background: BRAND.BG_DARK }}>
      <style>{BRAND.GOOGLE_FONTS}</style>

      {slides.map((slide) => {
        const from = cursor;
        const durationInFrames = slide.duration * fps;
        cursor += durationInFrames;

        const key = slide.type === "point" ? `point-${slide.pointNumber}` : `${slide.type}-${from}`;
        const currentPointIdx = slide.type === "point" ? pointIdx++ : -1;

        return (
          <Sequence key={key} from={from} durationInFrames={durationInFrames}>
            {slide.type === "cover" && <CoverFrame slide={slide} />}
            {slide.type === "point" && (
              <PointFrame
                slide={slide}
                reelCategory={reelCategory}
                reelTitle={reelTitle}
                slideIndex={currentPointIdx}
                totalPoints={totalPoints}
              />
            )}
            {slide.type === "end" && <EndFrame slide={slide} />}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
