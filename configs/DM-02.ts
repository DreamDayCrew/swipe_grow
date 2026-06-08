// swipe_grow — configs/DM-02.ts
// Bucket: Discipline Over Motivation
// Topic: What actually separates people who finish from those who don't
// Format: Post (carousel) — 5 points
// BG Music: Search IG: "nature ambient warm"
// Post Date: 30-05-2026 (Saturday)

import { CONFIG as BaseConfig } from "../src/config";

const CONFIG = {
  ...BaseConfig,

  contentType: "post",
  reelId: "DM-02",
  title: "What actually separates people who finish from those who don't",

  post: {
    slides: [
      // ── Cover slide ──────────────────────────────────────────────────────
      {
        type: "cover" as const,
        duration: 6,
        videoFile: "DM-02-cover.mp4",
        pillarLabel: "DISCIPLINE OVER MOTIVATION",
        mainText: "WHAT SEPARATES\nPEOPLE WHO FINISH.",
      },

      // ── Point 1 ──────────────────────────────────────────────────────────
      {
        type: "point" as const,
        duration: 6,
        videoFile: "DM-02-scene-1.mp4",
        pointNumber: 1,
        mainText: "THEY SHOW UP\nON BAD DAYS.",
        subtitle:
          "Bad days, low energy, zero enthusiasm — they still do the minimum.",
      },

      // ── Point 2 ──────────────────────────────────────────────────────────
      {
        type: "point" as const,
        duration: 6,
        videoFile: "DM-02-scene-2.mp4",
        pointNumber: 2,
        mainText: "THE MINIMUM\nHOLDS EVERYTHING.",
        subtitle:
          "That minimum is the thread that holds everything together.",
      },

      // ── Point 3 ──────────────────────────────────────────────────────────
      {
        type: "point" as const,
        duration: 6,
        videoFile: "DM-02-scene-3.mp4",
        pointNumber: 3,
        mainText: "MOTIVATION STARTS.\nHABIT CONTINUES.",
        subtitle:
          "Motivation gets you started. Habit keeps you going.",
      },

      // ── Point 4 ──────────────────────────────────────────────────────────
      {
        type: "point" as const,
        duration: 6,
        videoFile: "DM-02-scene-4.mp4",
        pointNumber: 4,
        mainText: "THEY TRAIN\nANYWAY.",
        subtitle:
          "The best athletes don't feel like training every day. They train anyway.",
      },

      // ── Point 5 ──────────────────────────────────────────────────────────
      {
        type: "point" as const,
        duration: 6,
        videoFile: "DM-02-scene-5.mp4",
        pointNumber: 5,
        mainText: "DISCIPLINE IS\nBUILT MOTIVATION.",
        subtitle:
          "Discipline is just motivation you built into your schedule.",
      },

      // ── End slide ─────────────────────────────────────────────────────────
      {
        type: "end" as const,
        duration: 5,
        mainText: "FOLLOW\n@swipe-grow",
        subtext: "Stories that make you wonder.",
      },
    ],
  },
};

export default CONFIG;
