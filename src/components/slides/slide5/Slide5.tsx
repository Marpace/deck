"use client";
import styles from "./Slide5.module.css";

interface Props {
  step: number;
  // step 0 = title + body + image visible; dialogue hidden
  // step 1 = "Me: A little more to the left" types in
  // step 2 = "Claude: ..." appears with animated thinking dots
}

export default function Slide5_Limitations({ step }: Props) {
  const ME_TEXT = "A little more to the left";

  return (
    <div className={styles.slide}>

      {/* ── Title ──────────────────────────────────────────────────────────── */}
      <h1 className={styles.title}>LIMITATIONS</h1>

      
      {/* ── Lower section: dialogue left, image right ──────────────────────── */}
      <div className={styles.lower}>

      {/* ── Body paragraph ─────────────────────────────────────────────────── */}
           <p className={styles.body}> 
        AI excelled in setting up the app's structure and backend, but it struggled with
        specific instructions and nuances, requiring human intervention for fine-tuning
        and detail work.</p>

        {/* Image panel — static, no changes */}
        <div className={styles.imagePanel}>
          <img
            src="/Meme.png"
            alt="Two people moving a sofa"
            className={styles.image}
          />
        </div>

      </div>
    </div>
  );
}
