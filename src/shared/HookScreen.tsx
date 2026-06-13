// swipe_grow — HookScreen
// 3s scroll-stopper. Matches DM-POST-01 CoverFrame design:
// vertically-centered Anton headline (with optional amber highlight) →
// amber underline → Cormorant italic tagline → @swipe_grow watermark.

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
import { HighlightedTitle } from "./HighlightedTitle";

function hookFontSize(text: string): string {
  const len = text.replaceAll("\n", "").length;
  if (len > 28) return "118px";
  if (len > 20) return "138px";
  return "155px";
}

interface HookScreenProps {
  mainText: string;
  subtext?: string | null;
  videoFile?: string | null;
  highlightWord?: string;
}

export const HookScreen: React.FC<HookScreenProps> = ({
  mainText,
  subtext,
  videoFile,
  highlightWord,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const isSolid = !videoFile;

  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const videoScale = interpolate(frame, [0, durationInFrames], [1, BRAND.KEN_BURNS_SCALE], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90 },
    durationInFrames: 20,
  });

  const textOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fontSize = hookFontSize(mainText);

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* ── Background ── */}
      {isSolid ? (
        <AbsoluteFill style={{ background: BRAND.BG_GRADIENT }} />
      ) : (
        <AbsoluteFill style={{ overflow: "hidden" }}>
          <Video
            src={staticFile(`videos/${videoFile}`)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${videoScale})`,
              filter: "brightness(0.6) saturate(0.8)",
            }}
            muted
            startFrom={0}
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
      <style>{BRAND.GOOGLE_FONTS}</style>

      {/* ── Center headline block ── */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: `0 ${BRAND.PADDING_X}px`,
          opacity: textOpacity,
          transform: `scale(${scale})`,
        }}
      >
        <HighlightedTitle
          text={mainText}
          highlightWord={highlightWord}
          fontSize={fontSize}
          textAlign="left"
        />

        {/* Amber underline */}
        <div
          style={{
            width: `${BRAND.AMBER_LINE_WIDTH}px`,
            height: `${BRAND.AMBER_LINE_HEIGHT}px`,
            background: BRAND.AMBER,
            marginTop: "28px",
            borderRadius: "2px",
          }}
        />

        {/* Cormorant italic tagline */}
        {subtext && (
          <span
            style={{
              fontFamily: BRAND.FONT_EDITORIAL,
              fontStyle: "italic",
              fontWeight: 400,
              color: BRAND.MINT_MID,
              fontSize: "40px",
              lineHeight: 1.45,
              marginTop: "24px",
              maxWidth: "880px",
            }}
          >
            {subtext}
          </span>
        )}
      </AbsoluteFill>

      {/* ── @swipe_grow watermark ── */}
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
