// EverRest — shared component library
// Ported from the design bundle (assets.jsx + illustrations.jsx).
// Pure presentational components used across every screen.

import React from "react";

/* ─── Logo mark (real PNG from brand assets) ─────────────────────── */
export const Mark = ({ size = 28, white = false }: { size?: number; white?: boolean }) => (
  <img
    src="/img/mark.png"
    alt="EverRest"
    style={{
      height: size,
      width: "auto",
      display: "block",
      filter: white ? "brightness(0) invert(1)" : "none",
    }}
  />
);

export const Logo = ({
  size = 22,
  color = "var(--ink)",
  white = false,
}: {
  size?: number;
  color?: string;
  white?: boolean;
}) => {
  if (white) {
    return (
      <img
        src="/img/logo-white.png"
        alt="EverRest"
        style={{ height: size + 10, width: "auto", display: "block" }}
      />
    );
  }
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
      <img src="/img/mark.png" alt="" style={{ height: size + 6, width: "auto", display: "block" }} />
      <span
        style={{
          fontFamily: "var(--display)",
          fontSize: size + 4,
          color,
          letterSpacing: "-0.025em",
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        EverRest
      </span>
    </div>
  );
};

/* Backward-compat aliases used by some screens */
export const EverRestLogo = Logo;
export const EverRestMark = Mark;

/* ─── Nature motifs ──────────────────────────────────────────────── */
export const LightRays = ({ width = 400, height = 200, opacity = 0.18 }: { width?: number; height?: number; opacity?: number }) => (
  <svg width={width} height={height} viewBox="0 0 400 200" style={{ opacity }} preserveAspectRatio="none">
    <defs>
      <radialGradient id="ray-grad" cx="50%" cy="0%" r="80%">
        <stop offset="0%" stopColor="#E8D9C0" stopOpacity="1" />
        <stop offset="60%" stopColor="#E8D9C0" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#E8D9C0" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="200" fill="url(#ray-grad)" />
  </svg>
);

export const WaterRipple = ({ size = 120, color = "var(--sage-mist)" }: { size?: number; color?: string }) => (
  <svg width={size} height={size / 2} viewBox="0 0 120 60" fill="none">
    <ellipse cx="60" cy="30" rx="55" ry="8" stroke={color} strokeWidth="1" opacity="0.7" />
    <ellipse cx="60" cy="30" rx="40" ry="6" stroke={color} strokeWidth="1" opacity="0.5" />
    <ellipse cx="60" cy="30" rx="25" ry="4" stroke={color} strokeWidth="1" opacity="0.35" />
    <ellipse cx="60" cy="30" rx="10" ry="2" stroke={color} strokeWidth="1" opacity="0.2" />
  </svg>
);

export const LeafSprig = ({ size = 80, opacity = 0.5, color = "var(--sage)" }: { size?: number; opacity?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ opacity }}>
    <path d="M40 75 Q 40 50 40 20" stroke={color} strokeWidth="1.2" />
    <path d="M40 30 Q 28 25 22 18 Q 30 22 40 25" fill={color} opacity="0.6" />
    <path d="M40 38 Q 54 33 60 24 Q 50 30 40 33" fill={color} opacity="0.5" />
    <path d="M40 48 Q 30 45 24 38 Q 32 44 40 45" fill={color} opacity="0.45" />
    <path d="M40 56 Q 52 52 58 44 Q 50 50 40 52" fill={color} opacity="0.4" />
  </svg>
);

export const BotanicalBackdrop = ({ opacity = 0.08 }: { opacity?: number }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid slice"
    style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}
  >
    <g stroke="#2D3B2D" fill="none" strokeWidth="0.8">
      <path d="M 50 600 Q 80 400 120 250 Q 140 180 180 100" />
      <path d="M 120 250 Q 90 245 70 230" />
      <path d="M 140 200 Q 170 195 195 180" />
      <path d="M 110 290 Q 80 285 60 270" />
      <path d="M 145 165 Q 175 162 200 148" />
      <path d="M 750 600 Q 730 420 700 280 Q 685 200 665 130" />
      <path d="M 700 280 Q 730 275 750 260" />
      <path d="M 680 230 Q 650 226 625 215" />
      <path d="M 690 180 Q 720 178 745 165" />
      <path d="M 670 140 Q 640 138 620 128" />
      <path d="M 400 620 Q 410 480 425 380 Q 435 320 445 270" />
      <path d="M 420 420 Q 395 416 375 405" />
      <path d="M 432 350 Q 460 346 480 335" />
    </g>
  </svg>
);

/* ─── Icon set (line, 1.5 stroke) ────────────────────────────────── */
export const I: Record<string, (s?: number) => React.ReactElement> = {
  arrow: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  back: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 5l-7 7 7 7"/></svg>,
  check: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  plus: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  close: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  search: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  filter: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>,
  home: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/></svg>,
  heart: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>,
  mic: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M19 11a7 7 0 0 1-14 0M12 18v4"/></svg>,
  video: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4z"/></svg>,
  doc: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>,
  lock: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><rect x="4" y="11" width="16" height="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>,
  shield: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/></svg>,
  vault: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="13" cy="12" r="3"/><path d="M13 6v2M13 16v2"/></svg>,
  user: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>,
  users: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 6a3 3 0 0 1 0 6M21 20a4 4 0 0 0-4-4"/></svg>,
  bell: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 21a2 2 0 0 0 4 0"/></svg>,
  calendar: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  map: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M2 6l7-3 6 3 7-3v15l-7 3-6-3-7 3z"/><path d="M9 3v15M15 6v15"/></svg>,
  star: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 2l3 7 7 .5-5.5 4.5L18 21l-6-3.5L6 21l1.5-7L2 9.5 9 9z"/></svg>,
  sparkle: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18"/></svg>,
  play: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>,
  pause: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>,
  menu: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>,
  more: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>,
  settings: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8L4.1 7a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>,
  chevR: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>,
  chevD: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>,
  pin: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></svg>,
  globe: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>,
  dollar: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 3v18M16 7H10a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H8"/></svg>,
  trend: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"><path d="M3 17l6-6 4 4 8-8M14 7h7v7"/></svg>,
  upload: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>,
  flame: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3-2-5s-1-4-1-6c0 0-3 2-5 5s-3 3-3 6a4 4 0 0 0 4 4"/></svg>,
  music: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  flower: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 9V3M12 21v-6M9 12H3M21 12h-6M9.5 9.5L5 5M19 19l-4.5-4.5M14.5 9.5L19 5M5 19l4.5-4.5"/></svg>,
  edit: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"><path d="M11 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6M17.5 3.5a2.1 2.1 0 0 1 3 3L13 14l-4 1 1-4z"/></svg>,
};

/* ─── Status pills ───────────────────────────────────────────────── */
export const Status = ({ tone = "neutral", children }: { tone?: string; children?: React.ReactNode }) => {
  const tones: Record<string, { bg: string; fg: string }> = {
    success: { bg: "rgba(74,122,74,0.12)", fg: "var(--success)" },
    warning: { bg: "rgba(198,138,58,0.14)", fg: "var(--warning)" },
    danger: { bg: "rgba(168,90,74,0.12)", fg: "var(--danger)" },
    info: { bg: "rgba(90,122,142,0.12)", fg: "var(--info)" },
    neutral: { bg: "var(--bg-warm)", fg: "var(--ink-3)" },
    accent: { bg: "rgba(201,168,124,0.18)", fg: "var(--bronze)" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        fontSize: 11,
        fontWeight: 500,
        borderRadius: 999,
        background: t.bg,
        color: t.fg,
        letterSpacing: "0.01em",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: 5, background: t.fg }} />
      {children}
    </span>
  );
};

/* ─── Atmospheric horizon scene ──────────────────────────────────── */
export const HorizonScene = ({ width = "100%", height = "100%", tone = "dawn" }: { width?: string | number; height?: string | number; tone?: string }) => {
  const palettes: Record<string, Record<string, string>> = {
    dawn: { sky1: "#F5D9A7", sky2: "#F0B589", sky3: "#DC6D2E", sun: "#FFE4B0", hills1: "#3A5247", hills2: "#1F2D27", hills3: "#0F1311" },
    dusk: { sky1: "#1F2D27", sky2: "#3A2B1F", sky3: "#0F1311", sun: "#E8B259", hills1: "#252B26", hills2: "#1A1F1B", hills3: "#0F1311" },
    light: { sky1: "#F7F2E8", sky2: "#F0E8D6", sky3: "#E5DAC2", sun: "#FFE4B0", hills1: "#6B9381", hills2: "#3A5247", hills3: "#1A2520" },
  };
  const p = palettes[tone] || palettes.dawn;
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" style={{ width, height, display: "block" }}>
      <defs>
        <linearGradient id={`sky-${tone}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={p.sky1} />
          <stop offset="55%" stopColor={p.sky2} />
          <stop offset="100%" stopColor={p.sky3} />
        </linearGradient>
        <radialGradient id={`sun-${tone}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.sun} stopOpacity="1" />
          <stop offset="60%" stopColor={p.sun} stopOpacity="0.5" />
          <stop offset="100%" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
        <filter id={`grain-${tone}`}>
          <feTurbulence baseFrequency="0.9" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.08 0" />
        </filter>
      </defs>
      <rect width="800" height="500" fill={`url(#sky-${tone})`} />
      <circle cx="560" cy="220" r="160" fill={`url(#sun-${tone})`} />
      <circle cx="560" cy="220" r="38" fill={p.sun} opacity="0.95" />
      <path d="M 0 320 Q 200 290 400 305 Q 600 320 800 295 L 800 360 L 0 360 Z" fill={p.hills1} opacity="0.45" />
      <path d="M 0 360 Q 100 320 220 340 Q 360 365 480 335 Q 620 305 800 340 L 800 420 L 0 420 Z" fill={p.hills1} />
      <g fill={p.hills2}>
        <path d="M 80 420 Q 70 360 90 350 Q 110 360 100 420 Z" />
        <path d="M 140 420 Q 120 340 160 320 Q 200 340 180 420 Z" />
        <path d="M 230 420 Q 220 380 250 370 Q 280 380 270 420 Z" />
        <path d="M 380 420 Q 360 350 400 340 Q 440 350 420 420 Z" />
        <path d="M 600 420 Q 580 360 620 350 Q 660 360 640 420 Z" />
        <path d="M 700 420 Q 685 380 715 370 Q 745 380 730 420 Z" />
      </g>
      <path d="M 0 420 Q 200 410 400 425 Q 600 440 800 420 L 800 500 L 0 500 Z" fill={p.hills3} />
      <rect width="800" height="500" filter={`url(#grain-${tone})`} opacity="0.6" />
    </svg>
  );
};

/* ─── Foliage cluster ────────────────────────────────────────────── */
export const FoliageCluster = ({ size = 220, opacity = 0.9 }: { size?: number; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 220 220" fill="none" style={{ opacity }}>
    <defs>
      <linearGradient id="leaf-a" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#6B9381" />
        <stop offset="100%" stopColor="#14503A" />
      </linearGradient>
      <linearGradient id="leaf-b" x1="1" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#7A9474" />
        <stop offset="100%" stopColor="#3A5247" />
      </linearGradient>
    </defs>
    <path d="M 110 200 C 80 180, 50 140, 60 90 C 70 60, 100 50, 110 200" fill="url(#leaf-a)" />
    <path d="M 110 200 C 140 175, 170 135, 165 85 C 158 55, 130 48, 110 200" fill="url(#leaf-b)" opacity="0.9" />
    <path d="M 110 200 C 95 170, 80 130, 95 80 C 105 60, 115 60, 110 200" fill="#3A5247" opacity="0.55" />
    <path d="M 110 200 C 125 175, 138 138, 130 90 C 122 68, 113 65, 110 200" fill="#1A2520" opacity="0.4" />
    <path d="M 80 100 Q 90 130 105 165" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" fill="none" />
    <path d="M 140 100 Q 130 130 115 165" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" fill="none" />
    <circle cx="92" cy="92" r="3.5" fill="#DC6D2E" />
    <circle cx="96" cy="100" r="2.8" fill="#B45419" />
    <circle cx="138" cy="115" r="3" fill="#E8B259" />
  </svg>
);

/* ─── Water scene ────────────────────────────────────────────────── */
export const WaterScene = ({ size = 300, tone = "sage" }: { size?: number; tone?: string }) => {
  const c = tone === "amber" ? ["#F5D9A7", "#DC6D2E"] : ["#BDD0C5", "#14503A"];
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 300 165" fill="none">
      <defs>
        <linearGradient id={`wt-${tone}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={c[0]} stopOpacity="0.9" />
          <stop offset="100%" stopColor={c[1]} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <ellipse cx="150" cy="82" rx="140" ry="50" fill={`url(#wt-${tone})`} />
      <ellipse cx="150" cy="82" rx="110" ry="36" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" />
      <ellipse cx="150" cy="82" rx="80" ry="22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      <ellipse cx="150" cy="82" rx="48" ry="12" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <ellipse cx="150" cy="82" rx="20" ry="5" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
};

/* ─── Painterly photo plate (also used as PhotoPlaceholder) ──────── */
export const PaintedPlate = ({ aspect = "4/3", tone = "garden", label }: { aspect?: string; tone?: string; label?: string }) => {
  const scenes: Record<string, { palette: string[]; scene: string }> = {
    garden: { palette: ["#F4D9A7", "#7A9474", "#1A2520"], scene: "garden" },
    chapel: { palette: ["#F0E8D6", "#C26F5B", "#1A2520"], scene: "chapel" },
    coast: { palette: ["#E8DCC0", "#BDD0C5", "#3A5247"], scene: "coast" },
    dawn: { palette: ["#F5D9A7", "#DC6D2E", "#B45419"], scene: "dawn" },
    meadow: { palette: ["#F7F2E8", "#7A9474", "#14503A"], scene: "meadow" },
    candle: { palette: ["#1A1F1B", "#E8B259", "#DC6D2E"], scene: "candle" },
  };
  const s = scenes[tone] || scenes.garden;
  return (
    <div
      style={{
        aspectRatio: aspect,
        width: "100%",
        borderRadius: "var(--r-md)",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(165deg, ${s.palette[0]} 0%, ${s.palette[1]} 60%, ${s.palette[2]} 120%)`,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {s.scene === "garden" && (
          <>
            <ellipse cx="220" cy="60" rx="42" ry="42" fill="rgba(255,255,255,0.4)" />
            <path d="M -10 130 Q 70 110 150 130 Q 230 150 310 125" stroke="rgba(255,255,255,0.4)" fill="none" strokeWidth="1.2" />
            <path d="M 0 160 Q 80 140 150 160 Q 220 175 300 155" fill="rgba(15,19,17,0.18)" />
            <g>{[40, 100, 170, 240].map((x, i) => (<ellipse key={i} cx={x} cy="160" rx="14" ry="22" fill="rgba(15,19,17,0.35)" />))}</g>
            <g opacity="0.7">{[60, 130, 195, 265].map((x, i) => (<circle key={i} cx={x} cy="125" r={3 + i * 0.5} fill="#fff" />))}</g>
          </>
        )}
        {s.scene === "chapel" && (
          <>
            <path d="M 100 100 L 150 60 L 200 100 L 200 160 L 100 160 Z" fill="rgba(15,19,17,0.4)" />
            <rect x="140" y="115" width="20" height="45" fill="rgba(232,178,89,0.6)" />
            <path d="M -20 160 Q 150 145 320 160 L 320 200 L -20 200 Z" fill="rgba(15,19,17,0.5)" />
          </>
        )}
        {s.scene === "coast" && (
          <>
            <path d="M 0 110 Q 80 100 150 110 Q 220 125 300 105" fill="rgba(255,255,255,0.3)" />
            <path d="M 0 130 Q 80 120 150 130 Q 220 145 300 125" fill="rgba(255,255,255,0.2)" />
            <ellipse cx="50" cy="60" rx="20" ry="20" fill="rgba(255,255,255,0.45)" />
          </>
        )}
        {s.scene === "dawn" && (
          <>
            <circle cx="220" cy="80" r="42" fill="rgba(255,255,255,0.55)" />
            <circle cx="220" cy="80" r="26" fill="rgba(255,228,176,0.95)" />
            <path d="M 0 140 Q 80 130 150 140 Q 220 152 300 138" fill="rgba(15,19,17,0.35)" />
            <path d="M 0 170 Q 80 165 150 170 Q 220 178 300 168" fill="rgba(15,19,17,0.55)" />
          </>
        )}
        {s.scene === "meadow" && (
          <>
            <path d="M -10 130 Q 60 120 130 130 Q 210 145 310 120" stroke="rgba(122,148,116,0.5)" fill="none" strokeWidth="0.8" />
            <g>{[20, 60, 110, 150, 200, 250].map((x, i) => (<line key={i} x1={x} y1="180" x2={x - 3} y2="150" stroke="rgba(20,80,58,0.45)" strokeWidth="1.5" />))}</g>
            <circle cx="240" cy="50" r="22" fill="rgba(255,228,176,0.7)" />
          </>
        )}
        {s.scene === "candle" && (
          <>
            {[80, 150, 220].map((x, i) => (
              <g key={i}>
                <rect x={x - 4} y="100" width="8" height="60" fill="rgba(245,217,167,0.85)" />
                <path d={`M ${x} 100 Q ${x - 3} 90 ${x} 80 Q ${x + 3} 90 ${x} 100`} fill="rgba(220,109,46,0.9)" />
                <circle cx={x} cy="100" r="16" fill="rgba(232,178,89,0.18)" />
              </g>
            ))}
          </>
        )}
      </svg>
      {label && (
        <span
          style={{
            position: "absolute",
            bottom: 12,
            left: 14,
            fontFamily: "var(--display)",
            color: "rgba(255,255,255,0.92)",
            fontSize: 16,
            letterSpacing: "-0.01em",
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export const PhotoPlaceholder = PaintedPlate;

/* ─── Avatar ─────────────────────────────────────────────────────── */
export const Avatar = ({ size = 36, initials = "SM", tone = "amber" }: { size?: number; initials?: string; tone?: string }) => {
  const tones: Record<string, string[]> = {
    amber: ["#F4D9A7", "#DC6D2E"],
    jade: ["#BDD0C5", "#14503A"],
    rose: ["#F0C9B5", "#C26F5B"],
    sage: ["#BDD0C5", "#7A9474"],
    gold: ["#FFE4B0", "#B68534"],
    night: ["#3A5247", "#0F1311"],
  };
  const [a, b] = tones[tone] || tones.amber;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${a}, ${b})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--sans)",
        fontSize: size * 0.36,
        fontWeight: 500,
        color: "#fff",
        flexShrink: 0,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    >
      {initials}
    </div>
  );
};

/* ─── Aurora ribbon ──────────────────────────────────────────────── */
export const AuroraRibbon = ({ width = 400, height = 8 }: { width?: number; height?: number }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
    <defs>
      <linearGradient id={`au-${width}`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="#E8B259" />
        <stop offset="35%" stopColor="#DC6D2E" />
        <stop offset="65%" stopColor="#C26F5B" />
        <stop offset="100%" stopColor="#14503A" />
      </linearGradient>
    </defs>
    <rect width={width} height={height} fill={`url(#au-${width})`} rx={height / 2} />
  </svg>
);

/* ─── Image helper (cover-fit photo box) ─────────────────────────── */
export const Img = ({ src, aspect, style, alt = "" }: { src: string; aspect?: string; style?: React.CSSProperties; alt?: string }) => (
  <div style={{ aspectRatio: aspect, width: "100%", overflow: "hidden", background: "#0F1311", ...style }}>
    <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
  </div>
);
