"use client";
import styles from "./Slide6.module.css";

interface Props {
  step: number;
}

export default function Slide6({ step }: Props) {

  return (
    <div className={styles.slide}>

      {/* ── Title ──────────────────────────────────────────────────────────── */}
      <h1 className={styles.title}>Thank you for watching</h1>

    </div>
  );
}
