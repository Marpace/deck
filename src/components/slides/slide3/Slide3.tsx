"use client";
import styles from "./Slide3.module.css";

interface Props {
  step: number;
  // step 0 = heading only
  // step 1 = Claude AI card animates in
  // step 2 = Canva AI card animates in
}

export default function Slide3_BuiltWith({ step }: Props) {
  return (
    <div className={styles.slide}>

      <h2 className={styles.heading}>BUILT WITH</h2>

      <div className={styles.columns}>

        {/* ── Claude AI ─────────────────────────────────────────────────── */}
        <div className={`${styles.col} ${step >= 1 ? styles.colVisible : ""}`}>
          <p className={styles.label}>Claude</p>

          <div className={styles.card}>
            {/* ── Claude graphic: terminal + chat bubble aesthetic ──────── */}
            <svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>

              {/* Outer glow blob */}
              <ellipse cx="130" cy="105" rx="90" ry="72" fill="#1a1a2e" />

              {/* Terminal window */}
              <rect x="40" y="44" width="180" height="118" rx="10" fill="#0d0d1a" stroke="#3a3a5c" strokeWidth="1.5"/>
              {/* Title bar */}
              <rect x="40" y="44" width="180" height="24" rx="10" fill="#1e1e3a"/>
              <rect x="40" y="56" width="180" height="12" fill="#1e1e3a"/>
              {/* Traffic lights */}
              <circle cx="58"  cy="56" r="5" fill="#e05a5a"/>
              <circle cx="74"  cy="56" r="5" fill="#d4a030"/>
              <circle cx="90" cy="56" r="5" fill="#50b850"/>
              {/* Window title */}
              <text x="130" y="61" textAnchor="middle" fontSize="8" fill="#6060a0" fontFamily="monospace">claude — terminal</text>

              {/* Code lines — appear with step 1 stagger */}
              <g className={step >= 1 ? styles.codeLine1 : styles.hidden}>
                <rect x="56" y="84" width="14" height="5" rx="1" fill="#7070d0"/>
                <rect x="75" y="84" width="60" height="5" rx="1" fill="#4a9a6a"/>
              </g>
              <g className={step >= 1 ? styles.codeLine2 : styles.hidden}>
                <rect x="56" y="96" width="24" height="5" rx="1" fill="#c07840"/>
                <rect x="85" y="96" width="44" height="5" rx="1" fill="#8888c0"/>
                <rect x="134" y="96" width="16" height="5" rx="1" fill="#c07840"/>
              </g>
              <g className={step >= 1 ? styles.codeLine3 : styles.hidden}>
                <rect x="56" y="108" width="8" height="5" rx="1" fill="#7070d0"/>
                <rect x="69" y="108" width="36" height="5" rx="1" fill="#50a8a8"/>
                <rect x="110" y="108" width="52" height="5" rx="1" fill="#c8c8e8"/>
              </g>
              <g className={step >= 1 ? styles.codeLine4 : styles.hidden}>
                <rect x="56" y="120" width="52" height="5" rx="1" fill="#4a9a6a"/>
                <rect x="113" y="120" width="30" height="5" rx="1" fill="#c8c8e8"/>
              </g>

              {/* Blinking cursor */}
              {step >= 1 && (
                <rect x="56" y="132" width="7" height="9" rx="1" fill="#a0a0e0" className={styles.cursor}/>
              )}

              {/* Chat bubble — Claude's response */}
              <g className={step >= 1 ? styles.bubbleIn : styles.hidden}>
                <rect x="54" y="148" width="148" height="6" rx="3" fill="#2e2e5a"/>
                <rect x="54" y="158" width="112" height="6" rx="3" fill="#2e2e5a"/>
                {/* Anthropic orange accent dot */}
                <circle cx="218" cy="161" r="6" fill="#d4622a"/>
                <text x="218" y="165" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif">✦</text>
              </g>

            </svg>
          </div>
        </div>

        {/* ── Canva AI ──────────────────────────────────────────────────── */}
        <div className={`${styles.col} ${step >= 2 ? styles.colVisible : ""}`}>
          <p className={styles.label}>Canva AI</p>

          <div className={styles.card}>
            {/* ── Canva graphic: design canvas with colorful shapes ──────── */}
            <svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>

              {/* Canvas background */}
              <rect x="30" y="30" width="200" height="148" rx="8" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1"/>

              {/* Top toolbar strip */}
              <rect x="30" y="30" width="200" height="22" rx="8" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="1"/>
              <rect x="30" y="44" width="200" height="8" fill="#f5f5f5"/>
              {/* Toolbar dots / tools */}
              <circle cx="46" cy="41" r="4" fill="#8b5cf6"/>
              <rect x="56" y="37" width="20" height="8" rx="2" fill="#e0e0e0"/>
              <rect x="80" y="37" width="20" height="8" rx="2" fill="#e0e0e0"/>
              <rect x="104" y="37" width="20" height="8" rx="2" fill="#e0e0e0"/>
              {/* Canva publish button */}
              <rect x="194" y="36" width="30" height="10" rx="5" fill="#8b5cf6"/>
              <text x="209" y="44" textAnchor="middle" fontSize="5.5" fill="#fff" fontFamily="sans-serif" fontWeight="600">Publish</text>

              {/* ── Design elements on canvas — staggered in ──────────── */}
              {/* Slide title text mock */}
              <g className={step >= 2 ? styles.canvaEl1 : styles.hidden}>
                <rect x="46" y="62" width="80" height="10" rx="2" fill="#1a1a2e"/>
                <rect x="46" y="76" width="56" height="7" rx="2" fill="#4a4a6a"/>
              </g>

              {/* Purple hero shape */}
              <g className={step >= 2 ? styles.canvaEl2 : styles.hidden}>
                <rect x="46" y="92" width="84" height="56" rx="6" fill="#7c3aed"/>
                <rect x="54" y="100" width="52" height="6" rx="2" fill="rgba(255,255,255,0.35)"/>
                <rect x="54" y="110" width="38" height="6" rx="2" fill="rgba(255,255,255,0.2)"/>
                <rect x="54" y="120" width="44" height="6" rx="2" fill="rgba(255,255,255,0.2)"/>
                <circle cx="114" cy="120" r="18" fill="#a855f7" opacity="0.5"/>
              </g>

              {/* Right column images mock */}
              <g className={step >= 2 ? styles.canvaEl3 : styles.hidden}>
                <rect x="140" y="62" width="76" height="44" rx="4" fill="#fbbf24"/>
                {/* Simple sun icon */}
                <circle cx="178" cy="84" r="10" fill="#f59e0b"/>
                <line x1="178" y1="68" x2="178" y2="64" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                <line x1="178" y1="100" x2="178" y2="104" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                <line x1="162" y1="84" x2="158" y2="84" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                <line x1="194" y1="84" x2="198" y2="84" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                <line x1="167" y1="73" x2="164" y2="70" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                <line x1="189" y1="95" x2="192" y2="98" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                <line x1="167" y1="95" x2="164" y2="98" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                <line x1="189" y1="73" x2="192" y2="70" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
              </g>

              <g className={step >= 2 ? styles.canvaEl4 : styles.hidden}>
                <rect x="140" y="110" width="76" height="38" rx="4" fill="#10b981"/>
                <rect x="148" y="118" width="40" height="5" rx="2" fill="rgba(255,255,255,0.5)"/>
                <rect x="148" y="127" width="28" height="5" rx="2" fill="rgba(255,255,255,0.3)"/>
                <rect x="148" y="136" width="34" height="5" rx="2" fill="rgba(255,255,255,0.3)"/>
                {/* check badge */}
                <circle cx="200" cy="129" r="9" fill="rgba(255,255,255,0.2)"/>
                <polyline points="195,129 199,133 206,125" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </g>

              {/* AI sparkle badge */}
              {step >= 2 && (
                <g className={styles.aiSpark}>
                  <circle cx="210" cy="62" r="12" fill="#8b5cf6"/>
                  <text x="210" y="59" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="sans-serif">✦</text>
                  <text x="210" y="69" textAnchor="middle" fontSize="5" fill="#e0d0ff" fontFamily="sans-serif" fontWeight="600">AI</text>
                </g>
              )}

            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
