"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  function handlePresent() {
    const id = roomId.trim() || generateRoomId();
    router.push(`/present/${id}`);
  }

  function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    const id = roomId.trim();
    if (!id) {
      setError("Please enter a room code.");
      return;
    }
    router.push(`/watch/${id}`);
  }

  return (
    <main className={styles.main}>
      <div className={styles.bg} aria-hidden />

      <div className={styles.hero}>
        <div className="animate-in">
          <span className={styles.eyebrow}>Real-time Presentations</span>
        </div>

        <h1 className={`${styles.title} animate-in animate-in-delay-1`}>
          Deck
        </h1>

        <p className={`${styles.subtitle} animate-in animate-in-delay-2`}>
          Present live. Your audience follows every slide, reacts in real time,
          and always rejoins where you left off.
        </p>

        <div className={`${styles.cards} animate-in animate-in-delay-3`}>
          {/* Present card */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>▶</div>
            <h2 className={styles.cardTitle}>Present</h2>
            <p className={styles.cardDesc}>
              Start a new room and share the code with your audience.
            </p>
            <div className={styles.cardInput}>
              <input
                type="text"
                placeholder="Room code (optional)"
                value={roomId}
                onChange={(e) => { setRoomId(e.target.value); setError(""); }}
              />
            </div>
            <button className="btn btn-primary btn-lg" onClick={handlePresent}>
              Start Presenting
            </button>
          </div>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          {/* Watch card */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>◉</div>
            <h2 className={styles.cardTitle}>Watch</h2>
            <p className={styles.cardDesc}>
              Enter a room code to join as an audience member.
            </p>
            <form onSubmit={handleJoin} className={styles.cardInput}>
              <input
                type="text"
                placeholder="Enter room code"
                value={roomId}
                onChange={(e) => { setRoomId(e.target.value); setError(""); }}
              />
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className="btn btn-accent btn-lg">
                Join Presentation
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

function generateRoomId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}
