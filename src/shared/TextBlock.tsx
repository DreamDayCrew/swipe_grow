// swipe_grow — TextBlock
// Reusable title block used by all compositions.
// Anton title → amber underline → optional subtext
// Position: top (default) or center

import React from "react";
import { AbsoluteFill } from "remotion";
import { BRAND, titleFontSize } from "./brand";

interface TextBlockProps {
  mainText: string;
  subtext?: string | null;
  position?: "top" | "center";   // default: "top"
  opacity?: number;               // animated opacity from parent
  translateY?: number;            // animated slide from parent
  scale?: number;                 // animated scale from parent
  subtextStyle?: "pill" | "cormorant"; // default: "pill"
}

export const TextBlock: React.FC<TextBlockProps> = ({
  mainText,
  subtext,
  position = "top",
  opacity = 1,
  translateY = 0,
  scale = 1,
  subtextStyle = "pill",
}) => {
  const isCenter = position === "center";

  return (
    <>
      {/* ── Main title + amber line ── */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: isCenter ? "center" : "flex-start",
          alignItems: isCenter ? "center" : "flex-start",
          padding: isCenter ? `${BRAND.PADDING_X}px` : `0 ${BRAND.PADDING_X}px`,
          paddingTop: isCenter ? undefined : `${BRAND.TITLE_TOP}px`,
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      >
        {/* Title */}
        <span
          style={{
            fontFamily: BRAND.FONT_TITLE,
            color: BRAND.MINT,
            fontSize: titleFontSize(mainText),
            lineHeight: 1.05,
            letterSpacing: "-1px",
            textTransform: "uppercase",
            whiteSpace: "pre-line",
            textAlign: isCenter ? "center" : "left",
            maxWidth: "920px",
            textShadow: "0 2px 24px rgba(15,24,21,0.6)",
          }}
        >
          {mainText}
        </span>

        {/* Amber underline */}
        <div
          style={{
            width: `${BRAND.AMBER_LINE_WIDTH}px`,
            height: `${BRAND.AMBER_LINE_HEIGHT}px`,
            background: BRAND.AMBER,
            marginTop: "16px",
            borderRadius: "2px",
            opacity: 0.85,
            alignSelf: isCenter ? "center" : "flex-start",
          }}
        />
      </AbsoluteFill>

      {/* ── Subtext ── */}
      {subtext && subtextStyle === "cormorant" && (
        // Cormorant italic — used by hook screen
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "18%",
            opacity,
          }}
        >
          <span
            style={{
              fontFamily: BRAND.FONT_EDITORIAL,
              fontStyle: "italic",
              fontWeight: 400,
              color: BRAND.MINT_MID,
              fontSize: "44px",
              lineHeight: 1.4,
              textAlign: "center",
              letterSpacing: "0.5px",
              marginTop: "28px",
            }}
          >
            {subtext}
          </span>
        </AbsoluteFill>
      )}

      {subtext && subtextStyle === "pill" && (
        // Pill — used by regular scenes (bottom zone)
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: isCenter ? "center" : "flex-start",
            padding: `0 ${BRAND.PADDING_X}px ${isCenter ? "18%" : "15%"}`,
            opacity,
          }}
        >
          <span
            style={{
              fontFamily: BRAND.FONT_BODY,
              fontWeight: 500,
              color: BRAND.MINT_SOFT,
              fontSize: "38px",
              lineHeight: 1.4,
              background: "rgba(15,24,21,0.62)",
              borderRadius: "999px",
              padding: "10px 28px",
              textAlign: isCenter ? "center" : "left",
            }}
          >
            {subtext}
          </span>
        </AbsoluteFill>
      )}
    </>
  );
};
