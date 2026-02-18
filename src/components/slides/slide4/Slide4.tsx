"use client";
import styles from "./Slide4.module.css";

interface Props {
  step: number; // 0 = base layout, 1 = Context, 2 = Specificity, 3 = Constraint
}

export default function Slide1_InitialPrompt({ step }: Props) {
  return (
    <div className={`${styles.slide} slide-area`}>

      {/* ── Left column label ─────────────────────────────────────────────── */}
      <div className={styles.leftCol}>
        <span className={styles.mainLabel}>INITIAL PROMPT</span>
      </div>

      {/* ── Right column: three sections ──────────────────────────────────── */}
      <div className={styles.rightCol}>

        {/* Section 1 – prompt text + Context label */}
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <p className={styles.promptText}>
              "Create a web application for presentations. It will be
              used in a room where each member of the audience
              has a laptop and the presenter will control the slides from a mobile device. It should have the following
              features:
            </p>
            <div className={`${styles.vDivider} ${step >= 1 ? styles.vDividerVisible : ""}`} />
            <div className={`${styles.hDivider} ${step >= 1 ? styles.hDividerVisible : ""}`} />
          </div>
          {/* Context label + top divider — reveal on step 1 */}
          <div className={`${styles.sectionLabel} ${step >= 1 ? styles.visible : ""}`}>
            <span className={styles.labelText}>Context</span>
          </div>
        </div>

        {/* Section 2 – feature list + Specificity label */}
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <p className={styles.sectionHeader}>For Presenter:</p>
            <ul className={styles.list}>
              <li>Prev and next controls for slides</li>
            </ul>

            <p className={styles.sectionHeader}>For Audience:</p>
            <ul className={styles.list}>
              <li>No slide controls - audience will see whichever slide is currently showing by the presenter</li>
              <li>Floating emojis can be sent during presentation</li>
              <li>Can quit and rejoin presentation</li>
              <li>Rejoining the presentation would show the current slide</li>
            </ul>

            <p className={styles.sectionHeader}>Use the following tech stack</p>
            <p className={styles.sectionHeader}>Backend:</p>
            <ul className={styles.list}>
              <li>Node, Express, Socket.io</li>
            </ul>

            <p className={styles.sectionHeader}>Fontend:</p>
            <ul className={styles.list}>
              <li>NextJS</li>
            </ul>
            <div className={`${styles.vDivider} ${step >= 2 ? styles.vDividerVisible : ""}`} />
            <div className={`${styles.hDivider} ${step >= 2 ? styles.hDividerVisible : ""}`} />
          </div>
          {/* Specificity label — reveal on step 2 */}
          <div className={`${styles.sectionLabel} ${step >= 2 ? styles.visible : ""}`}>
            <span className={styles.labelText}>Specificity</span>
          </div>
        </div>

        {/* Section 3 – constraint text + label */}
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <p className={styles.promptText}>
              Do not make a complex app. The slides will be hard coded.<br />
              Do not add an 'upload' or 'create slides' function."
            </p>
            <div className={`${styles.vDivider} ${step >= 3 ? styles.vDividerVisible : ""}`} />
            <div className={`${styles.hDivider} ${step >= 3 ? styles.hDividerVisible : ""}`} />
          </div>
          {/* Constraint label — reveal on step 3 */}
          <div className={`${styles.sectionLabel} ${step >= 3 ? styles.visible : ""}`}>
            <span className={styles.labelText}>Constraint</span>
          </div>
        </div>

      </div>{/* end rightCol */}
    </div>
  );
}
