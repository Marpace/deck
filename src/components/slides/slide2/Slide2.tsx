"use client";
import styles from "./Slide2.module.css";

interface Props {
  step: number; // 0 = static layout, 1 = graphic animation plays
}

export default function Slide2_ConnectivityChallenges({ step }: Props) {
  const animated = step >= 1;

  return (
    <div className={styles.slide}>

      {/* ── Left: text content ─────────────────────────────────────────────── */}
      <div className={styles.leftCol}>
        <h1 className={styles.title}>CONNECTIVITY<br />CHALLENGES</h1>
        <p className={styles.body}>
          Connectivity challenges often disrupt
          presentations, such as laptop-projector
          mismatches, software glitches, and
          unexpected interruptions impacting
          engagement.
        </p>
      </div>

      {/* ── Right: cream card with illustration ───────────────────────────── */}
      <div className={styles.rightCol}>
        <div className={styles.card}>
          <svg
            className={styles.illustration}
            viewBox="0 0 320 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* ── Background circle ──────────────────────────────────────── */}
            <circle cx="160" cy="120" r="88" fill="#e8e3d8" />

            {/* ── LAPTOP ─────────────────────────────────────────────────── */}
            {/* Screen back */}
            <rect x="68" y="72" width="102" height="70" rx="5" fill="#c8c2b4" stroke="#9a9488" strokeWidth="1.5" />
            {/* Screen bezel inner */}
            <rect x="74" y="78" width="90" height="58" rx="3" fill="#d4dde8" />
            {/* Screen content — glitches when animated */}
            <rect
              x="78" y="82" width="82" height="50" rx="2"
              fill="#bfccd8"
              className={animated ? styles.screenGlitch : ""}
            />
            {/* Horizontal scan lines on screen */}
            {/* <line x1="78" y1="96"  x2="160" y2="96"  stroke="#a8b8c8" strokeWidth="0.8" opacity="0.5" />
            <line x1="78" y1="108" x2="160" y2="108" stroke="#a8b8c8" strokeWidth="0.8" opacity="0.5" />
            <line x1="78" y1="120" x2="160" y2="120" stroke="#a8b8c8" strokeWidth="0.8" opacity="0.5" /> */}
            {/* Glitch bar — only shows when animated */}
            {/* {animated && (
              <rect
                x="78" y="100" width="82" height="7" rx="1"
                fill="#7ab0d4" opacity="0.6"
                className={styles.glitchBar}
              />
            )} */}
            {/* Base / hinge */}
            <rect x="62" y="142" width="114" height="8" rx="4" fill="#b8b2a4" stroke="#9a9488" strokeWidth="1.5" />
            {/* Keyboard area */}
            <rect x="74" y="144" width="90" height="4" rx="2" fill="#a8a298" opacity="0.5" />

            {/* ── WIFI signal on laptop ──────────────────────────────────── */}
            {/* Arc 1 — smallest (always visible) */}
            <path
              d="M112 68 Q119 62 126 68"
              stroke={animated ? "#e05a40" : "#7a9ab8"}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              className={animated ? styles.wifiArc1Blink : ""}
            />
            {/* Arc 2 — medium */}
            <path
              d="M107 63 Q119 54 131 63"
              stroke={animated ? "#e05a40" : "#7a9ab8"}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity={animated ? 1 : 0.7}
              className={animated ? styles.wifiArc2Blink : ""}
            />
            {/* Arc 3 — largest */}
            <path
              d="M102 58 Q119 46 136 58"
              stroke={animated ? "#e05a40" : "#7a9ab8"}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity={animated ? 1 : 0.45}
              className={animated ? styles.wifiArc3Blink : ""}
            />
            {/* Wifi dot */}
            <circle
              cx="119" cy="71" r="2.5"
              fill={animated ? "#e05a40" : "#7a9ab8"}
              className={animated ? styles.wifiDotBlink : ""}
            />

            {/* ── DISCONNECTION ZAP / crack between laptop and projector ─── */}
            {/* {animated && (
              <g className={styles.zapGroup}>
                <polyline
                  points="182,118 190,108 185,114 193,104"
                  stroke="#f0c040"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            )} */}

            {/* ── PROJECTOR ──────────────────────────────────────────────── */}
            {/* Body */}
            <rect x="196" y="118" width="68" height="34" rx="6" fill="#b8b2a4" stroke="#9a9488" strokeWidth="1.5" />
            {/* Lens housing */}
            <circle cx="210" cy="135" r="11" fill="#9a9488" stroke="#7a7470" strokeWidth="1.5" />
            <circle cx="210" cy="135" r="7"  fill="#6a8898" />
            <circle cx="210" cy="135" r="4"  fill="#4a6878" />
            <circle cx="210" cy="135" r="1.5" fill="#2a4858" />
            {/* Lens glint */}
            <circle cx="207" cy="132" r="1.2" fill="rgba(255,255,255,0.5)" />
            {/* Vent lines on top */}
            <line x1="230" y1="122" x2="230" y2="130" stroke="#9a9488" strokeWidth="1.2" />
            <line x1="236" y1="122" x2="236" y2="130" stroke="#9a9488" strokeWidth="1.2" />
            <line x1="242" y1="122" x2="242" y2="130" stroke="#9a9488" strokeWidth="1.2" />
            {/* Indicator light */}
            <circle
              cx="250" cy="134" r="3"
              fill={animated ? "#e05a40" : "#7ab870"}
              className={animated ? styles.indicatorBlink : ""}
            />
            {/* Antenna */}
            <line x1="256" y1="118" x2="256" y2="102" stroke="#9a9488" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="256" cy="100" r="2.5" fill="#9a9488" />
            {/* Feet */}
            <rect x="202" y="150" width="8" height="5" rx="2" fill="#9a9488" />
            <rect x="254" y="150" width="8" height="5" rx="2" fill="#9a9488" />

            {/* ── PROJECTOR BEAM ─────────────────────────────────────────── */}
            {/* <polygon
              points="219,125 219,145 172,152 172,118"
              fill="url(#beamGrad)"
              className={animated ? styles.beamFlicker : ""}
            /> */}

            {/* ── SURFACE / TABLE LINE ───────────────────────────────────── */}
            <line x1="52" y1="154" x2="268" y2="154" stroke="#9a9488" strokeWidth="1.5" strokeLinecap="round" />

            {/* ── WARNING ICON — appears on step 1 ──────────────────────── */}
            {/* {animated && (
              <g className={styles.warningGroup}>
                <polygon
                  points="119,88 112,100 126,100"
                  fill="#f0c040"
                  stroke="#d4a830"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <line x1="119" y1="91.5" x2="119" y2="96.5" stroke="#3a3020" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="119" cy="98.5" r="0.9" fill="#3a3020" />
              </g>
            )} */}

            {/* ── Gradient defs ──────────────────────────────────────────── */}
            <defs>
              <linearGradient id="beamGrad" x1="219" y1="135" x2="172" y2="135" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#d4c8a0" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#d4c8a0" stopOpacity="0.08" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

    </div>
  );
}
