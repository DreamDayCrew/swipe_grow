// swipe_grow — HighlightedTitle
// Anton headline with optional amber-background highlight on one word.
// Used by HookScreen (cover) and Post CoverFrame.

import React from "react";
import { BRAND } from "./brand";

interface Props {
  text: string;
  highlightWord?: string;
  fontSize: string;
  textAlign?: "left" | "center";
}

export const HighlightedTitle: React.FC<Props> = ({
  text,
  highlightWord,
  fontSize,
  textAlign = "left",
}) => {
  const baseStyle: React.CSSProperties = {
    fontFamily: BRAND.FONT_TITLE,
    color: BRAND.MINT,
    fontSize,
    lineHeight: 1.15,
    letterSpacing: "-2px",
    textTransform: "uppercase",
    whiteSpace: "pre-line",
    textAlign,
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
};
