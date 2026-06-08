// swipe_grow — FilmGrain
// SVG noise overlay. No external file needed.
// Drop inside any AbsoluteFill — always on top of bg, under text.

import React from "react";
import { AbsoluteFill } from "remotion";

export const FilmGrain: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      mixBlendMode: "overlay",
      opacity: 0.045,
    }}
  >
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.75"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" opacity="1" />
    </svg>
  </AbsoluteFill>
);
