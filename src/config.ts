// swipe_grow — config.ts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EDIT THIS FILE for every new render.
// contentType drives which composition loads in Root.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type ContentType =
  | "reel_no_voice"   // stock video + text, no audio, 3s hook
  | "reel_my_voice"   // stock video + text + voiceover.mp3
  | "reel_ai_voice"   // stock video + text + scene_N.mp3
  | "post"            // carousel slides
  | "loop"            // pure mood video, no text
  | "silent_shift";   // 3–5 scenes + one closing line

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ACTIVE CONFIG — change this block per render
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const CONFIG = {
  contentType: "post" as ContentType,
  reelId: "DM-POST-01",
  title: "Our Brain is Awesome",

  // ── Hook (reel_no_voice only) ──────────────────────────
  hook: {
    mainText: "YOUR BRAIN IS RUNNING YOUR LIFE.",
    subtext: "And you never gave it permission.",
  },

  // ── Scenes (reel_no_voice / reel_my_voice / reel_ai_voice) ──
  scenes: [
    {
      id: 1,
      duration: 7,
      videoFile: "scene_1.mp4",
      bgType: "video" as const,
      mainText: "OUR BRAIN IS AWESOME.",
      subtext: null,
      textPosition: "top" as const,
      animation: "fade" as const,
      audioFile: "scene_1.mp3", // reel_ai_voice only — ignored otherwise
    },
    {
      id: 2,
      duration: 6,
      videoFile: "scene_2.mp4",
      bgType: "video" as const,
      mainText: "BRAIN-KU THINKING.",
      subtext: "One process. Entire life.",
      textPosition: "top" as const,
      animation: "fade" as const,
      audioFile: "scene_2.mp3",
    },
    {
      id: 3,
      duration: 7,
      videoFile: "scene_3.mp4",
      bgType: "video" as const,
      mainText: "THOUSANDS OF THOUGHTS.",
      subtext: "Daily.",
      textPosition: "top" as const,
      animation: "slide" as const,
      audioFile: "scene_3.mp3",
    },
    {
      id: 4,
      duration: 10,
      videoFile: "scene_4.mp4",
      bgType: "video" as const,
      mainText: "REAL DANGER.\nIMAGINARY DANGER.",
      subtext: "Brain-ku difference theriyadhu.",
      textPosition: "top" as const,
      animation: "fade" as const,
      audioFile: "scene_4.mp3",
    },
    {
      id: 5,
      duration: 10,
      videoFile: "scene_5.mp4",
      bgType: "video" as const,
      mainText: "ATHE BRAIN DHAAN.",
      subtext: "Dreams. Ideas. Life.",
      textPosition: "top" as const,
      animation: "fade" as const,
      audioFile: "scene_5.mp3",
    },
    {
      id: 6,
      duration: 12,
      videoFile: "scene_6.mp4",
      bgType: "video" as const,
      mainText: "REPEATED-AH ENNA KUDUKROMO…",
      subtext: "Atha dhaan strong panum.",
      textPosition: "top" as const,
      animation: "fade" as const,
      audioFile: "scene_6.mp3",
    },
    {
      id: 7,
      duration: 10,
      videoFile: "scene_7.mp4",
      bgType: "video" as const,
      mainText: "CONTENT. WORDS. PEOPLE.",
      subtext: "Romba important.",
      textPosition: "top" as const,
      animation: "fade" as const,
      audioFile: "scene_7.mp3",
    },
    {
      id: 8,
      duration: 8,
      videoFile: null,
      bgType: "solid" as const,
      mainText: "BIGGEST BATTLE\nIS INSIDE.",
      subtext: "Inside namma brain kooda dhaan.",
      textPosition: "center" as const,
      animation: "scale" as const,
      audioFile: "scene_8.mp3",
    },
    {
      id: 9,
      duration: 5,
      videoFile: null,
      bgType: "solid" as const,
      mainText: "FOLLOW\n@swipe-grow",
      subtext: "Stories that make you wonder.",
      textPosition: "center" as const,
      animation: "fade" as const,
      audioFile: null,
    },
  ],

  // ── Loop config (loop only) ────────────────────────────
  loop: {
    videoFile: "loop_scene.mp4",
    durationSeconds: 20,
  },

  // ── Silent Shift config (silent_shift only) ────────────
  silentShift: {
    scenes: [
      { id: 1, duration: 6, videoFile: "shift_1.mp4" },
      { id: 2, duration: 6, videoFile: "shift_2.mp4" },
      { id: 3, duration: 6, videoFile: "shift_3.mp4" },
    ],
    closing: {
      duration: 5,
      mainText: "YOU WERE NEVER THE PROBLEM.",
      subtext: null,
    },
  },

  // ── Post config (post only) ────────────────────────────
  post: {
    reelCategory: "DISCIPLINE OVER MOTIVATION",
    reelTitle: "THE REAL REASON YOU\nCAN'T BE CONSISTENT",
    slides: [
      {
        type: "cover" as const,
        duration: 3,
        videoFile: "DM-04-s1.mp4",
        pillarLabel: "DISCIPLINE",
        serialNumber: "004",
        mainText: "WHY YOU CAN'T\nBE CONSISTENT.",
        highlightWord: "CONSISTENT",
      },
      {
        type: "point" as const,
        duration: 6,
        videoFile: "DM-04-s1.mp4",
        pointNumber: 1,
        mainText: "YOUR GOAL IS\nTOO BIG TO START",
        subtitle: "Shrink it until it feels almost embarrassingly small. Then start.",
      },
      {
        type: "point" as const,
        duration: 6,
        videoFile: "DM-04-s2.mp4",
        pointNumber: 2,
        mainText: "YOU HAVE NO\nFIXED TIME FOR IT",
        subtitle: "A habit without a time slot is just a wish.",
      },
      {
        type: "point" as const,
        duration: 6,
        videoFile: "DM-04-s3.mp4",
        pointNumber: 3,
        mainText: "YOUR ENVIRONMENT\nWORKS AGAINST YOU",
        subtitle: "Remove friction. Put the book on the pillow. Shoes at the door.",
      },
      {
        type: "point" as const,
        duration: 6,
        videoFile: "DM-04-s4.mp4",
        pointNumber: 4,
        mainText: "YOU QUIT\nAFTER ONE MISS",
        subtitle: "Miss one. Never miss two. That is the only rule.",
      },
      {
        type: "point" as const,
        duration: 6,
        videoFile: "DM-04-s5.mp4",
        pointNumber: 5,
        mainText: "YOU NEVER MADE\nIT NON-NEGOTIABLE",
        subtitle: "Treat it like brushing your teeth. It just happens. Every day.",
      },
    ],
  },
};

// ── Duration calculator ────────────────────────────────────────────────────────
// Root.tsx uses this to set durationInFrames
export function getTotalFrames(): number {
  const fps = 30;
  const { contentType } = CONFIG;

  if (contentType === "reel_no_voice") {
    const sceneDuration = CONFIG.scenes.reduce((sum, s) => sum + s.duration, 0);
    return (3 + sceneDuration) * fps; // 3s hook + scenes
  }
  if (contentType === "reel_my_voice" || contentType === "reel_ai_voice") {
    return CONFIG.scenes.reduce((sum, s) => sum + s.duration, 0) * fps;
  }
  if (contentType === "loop") {
    return CONFIG.loop.durationSeconds * fps;
  }
  if (contentType === "silent_shift") {
    const sceneDuration = CONFIG.silentShift.scenes.reduce((sum, s) => sum + s.duration, 0);
    return (sceneDuration + CONFIG.silentShift.closing.duration) * fps;
  }
  if (contentType === "post") {
    return CONFIG.post.slides.reduce((sum, s) => sum + s.duration, 0) * fps;
  }
  return 1800; // fallback 60s
}
